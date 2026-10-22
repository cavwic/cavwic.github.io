import {createHash} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';
import {packCatalogPayload,unpackCatalogPayload} from './catalog-payload.ts';

const format='catalog-enrichment-packed-gzip-v2';
const sha256=buffer=>createHash('sha256').update(buffer).digest('hex');

// Generated catalogs keep their reviewed importer as the editable source of truth.
export function serializeCatalogData(value){
 const raw=Buffer.from(JSON.stringify(packCatalogPayload(value)));
 return JSON.stringify({format,bytes:raw.length,sha256:sha256(raw),data:gzipSync(raw,{level:9}).toString('base64')})+'\n';
}

export function deserializeCatalogData(envelope){
 if(envelope?.format!==format||typeof envelope.data!=='string'||!Number.isSafeInteger(envelope.bytes)||envelope.bytes<0||envelope.bytes>512*1024*1024)throw new Error('Invalid generated catalog envelope');
 const raw=gunzipSync(Buffer.from(envelope.data,'base64'),{maxOutputLength:Math.max(1,envelope.bytes)});
 if(raw.length!==envelope.bytes||sha256(raw)!==envelope.sha256)throw new Error('Generated catalog integrity mismatch');
 return unpackCatalogPayload(JSON.parse(raw.toString('utf8')));
}
