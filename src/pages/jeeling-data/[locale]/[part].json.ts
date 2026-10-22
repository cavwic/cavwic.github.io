import type { APIRoute, GetStaticPaths } from 'astro';
import { getJeelingEncodedPart, getJeelingParts } from '../../../data/repository/jeeling-delivery';
import { isPagesBuild } from '../../../data/build-scope';
export const getStaticPaths: GetStaticPaths = () => isPagesBuild ? [] : (['zh', 'en'] as const).flatMap(locale =>
  getJeelingParts(locale).map(part => ({ params: { locale, part } })));
export const GET: APIRoute = ({ params, request }) => {
  if (params.locale !== 'zh' && params.locale !== 'en') return new Response(null, { status: 404 });
  const result = getJeelingEncodedPart(params.locale, params.part || '');
  if (!result) return new Response(null, { status: 404 });
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache', ETag: result.etag };
  return request.headers.get('If-None-Match') === result.etag
    ? new Response(null, { status: 304, headers })
    : new Response(result.body, { headers });
};
