type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type PackedCatalog = { version: 1 | 2 | 3; strings: string[]; objects?: JsonValue[]; shapes?: string[][]; data: JsonValue };

// Intern repeated values and key sequences; tuples avoid repeating field names
// across hundreds of thousands of parameter rows without dropping provenance.
export function packCatalogPayload(value: unknown): PackedCatalog {
  const counts = new Map<string, number>();
  const visit = (item: unknown): void => {
    if (typeof item === 'string' && item.length >= 24) counts.set(item, (counts.get(item) ?? 0) + 1);
    else if (Array.isArray(item)) item.forEach(visit);
    else if (item && typeof item === 'object') {
      if ('$catalogText' in item || '$catalogObject' in item) throw new Error('Reserved catalog payload key');
      Object.values(item).forEach(visit);
    }
  };
  visit(value);
  const strings = [...counts].filter(([, count]) => count > 1).map(([text]) => text);
  const indices = new Map(strings.map((text, index) => [text, index]));
  const objects: JsonValue[] = [];
  const objectIndices = new Map<string, number>();
  const shapes: string[][] = [];
  const shapeIndices = new Map<string, number>();
  const sharedFields = new Set(['profile', 'evidence', 'financialDisclosure', 'parameters', 'companyTimeline', 'fundingRounds']);
  const pack = (item: unknown, field = ''): JsonValue => {
    if (typeof item === 'string') return indices.has(item) ? [-2, indices.get(item)!] : item;
    if (Array.isArray(item)) return [-1, ...item.map(value => pack(value, field))];
    if (item && typeof item === 'object') {
      const entries = Object.entries(item).filter(([, value]) => value !== undefined);
      const keys = entries.map(([key]) => key);
      const shapeKey = JSON.stringify(keys);
      let shape = shapeIndices.get(shapeKey);
      if (shape === undefined) {
        shape = shapes.length;
        shapes.push(keys);
        shapeIndices.set(shapeKey, shape);
      }
      const packed: JsonValue = [shape, ...entries.map(([key, value]) => pack(value, key))];
      if (!sharedFields.has(field)) return packed;
      const signature = JSON.stringify(packed);
      let index = objectIndices.get(signature);
      if (index === undefined) {
        index = objects.length;
        objectIndices.set(signature, index);
        objects.push(packed);
      }
      return [-3, index];
    }
    return item === undefined ? null : item as JsonValue;
  };
  const data = pack(value);
  return { version: 3, strings, objects, shapes, data };
}

export function unpackCatalogPayload(payload: PackedCatalog): JsonValue {
  if (![1, 2, 3].includes(payload.version) || !Array.isArray(payload.strings) || (payload.version >= 2 && !Array.isArray(payload.objects)) || (payload.version === 3 && !Array.isArray(payload.shapes))) throw new Error('Unsupported catalog payload');
  const decodedObjects = new Map<number, JsonValue>();
  const decoding = new Set<number>();
  const objectAt = (index: JsonValue): JsonValue => {
    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= (payload.objects?.length ?? 0) || decoding.has(index)) throw new Error('Invalid catalog object reference');
    if (!decodedObjects.has(index)) {
      decoding.add(index);
      decodedObjects.set(index, unpack(payload.objects![index]));
      decoding.delete(index);
    }
    return decodedObjects.get(index)!;
  };
  const textAt = (index: JsonValue): string => {
    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= payload.strings.length) throw new Error('Invalid catalog string reference');
    return payload.strings[index];
  };
  const unpack = (item: JsonValue): JsonValue => {
    if (payload.version === 3 && Array.isArray(item)) {
      const [tag, ...values] = item;
      if (tag === -1) return values.map(unpack);
      if (tag === -2 && values.length === 1) return textAt(values[0]);
      if (tag === -3 && values.length === 1) return objectAt(values[0]);
      if (typeof tag !== 'number' || !Number.isInteger(tag) || tag < 0 || tag >= payload.shapes!.length || payload.shapes![tag].length !== values.length) throw new Error('Invalid catalog shape');
      return Object.fromEntries(payload.shapes![tag].map((key, index) => [key, unpack(values[index])]));
    }
    if (Array.isArray(item)) return item.map(unpack);
    if (item && typeof item === 'object') {
      if ('$catalogObject' in item) {
        return objectAt(item.$catalogObject);
      }
      if ('$catalogText' in item) {
        return textAt(item.$catalogText);
      }
      return Object.fromEntries(Object.entries(item).map(([key, value]) => [key, unpack(value)]));
    }
    return item;
  };
  return unpack(payload.data);
}
