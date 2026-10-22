import type {FinderParameter, FinderParameterMetric} from './product-finder-demo';

const bilateralSpanRecords = new Set(['exp-robotera-l7','exp-robotera-q5','exp-robotera-m7','deep-linker-platform-2']);

// The cited records describe bilateral spans, not a single-arm reach radius.
export function applyReviewedParameterIndex(id: string, parameters: FinderParameter[]): FinderParameter[] {
  return parameters.map(field => {
    if (id === 'ubtech-walker-x' && /^(视觉|Vision)$/.test(field.label) && /四目系统与双 RGB-D 传感器|Four-camera system and dual RGB-D sensors/.test(field.value)) {
      return {...field,normalized:[{metric:'genericNumber',unit:'number',values:[4,2],min:2,max:4,relation:'list',sourceLabel:field.label}]};
    }
    if (/^noetix-e1-(?:standard|education)$/.test(id) && /^XT30 (?:外部电源接口|external-power ports)$/.test(field.label)) {
      return {...field,normalized:[
        {metric:'voltageV',unit:'V',values:[12],min:12,max:12,relation:'point',sourceLabel:field.label},
        {metric:'currentA',unit:'A',values:[5],min:5,max:5,relation:'maximum',sourceLabel:field.label},
      ]};
    }
    if (!field.normalized?.length) return field;
    const bilateralSpan = (bilateralSpanRecords.has(id) || id.startsWith('fourier-')) && /臂展|arm.span|wingspan/i.test(field.label);
    const metrics = field.normalized.map(row => {
      let metric: FinderParameterMetric = row.metric;
      if (bilateralSpan && /^(?:reachMm|genericNumber)$/.test(metric) && row.unit === 'mm') metric = 'dimensionsMm';
      return metric === row.metric ? row : {...row,metric};
    });
    return {...field,normalized:metrics};
  });
}
