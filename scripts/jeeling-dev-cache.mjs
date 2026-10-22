import { createHash } from 'node:crypto';
import { readdir, stat, readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';

export async function jeelingCacheSignature(root) {
  const dataRoot = path.join(root, 'src', 'data');
  const entries = [];
  async function visit(directory) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name);
      if (item.isDirectory()) await visit(file);
      else if (/\.(?:ts|js|mjs|json)$/.test(item.name)) {
        const info = await stat(file, { bigint: true });
        entries.push(`${path.relative(dataRoot, file)}:${info.size}:${info.mtimeNs}`);
      }
    }
  }
  await visit(dataRoot);
  return createHash('sha256').update(entries.sort().join('\n')).digest('hex');
}
export async function writeJeelingCache(root, locale, part, signature, payload) {
  const file = path.join(root, '.astro', 'jeeling-cache', locale, `${part}.json`);
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify({ ...payload, signature }));
  await rename(temporary, file);
}

// Development-only disk cache. Static exports still use the Astro data endpoints.
export function jeelingDevCache() {
  return {
    name: 'jeeling-dev-cache', apply: 'serve',
    configureServer(server) {
      const root = server.config.root;
      const dataRoot = path.join(root, 'src', 'data');
      const cacheRoot = path.join(root, '.astro', 'jeeling-cache');
      const pending = new Map();
      let revision = 0;
      let fingerprint;
      const invalidate = file => {
        const relative = path.relative(dataRoot, path.resolve(file));
        if (!relative.startsWith('..') && !path.isAbsolute(relative)) { revision++; fingerprint = undefined; }
      };
      server.watcher.on('add', invalidate).on('change', invalidate).on('unlink', invalidate);
      const signature = () => fingerprint ||= jeelingCacheSignature(root);
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url || '/', 'http://localhost').pathname;
        const match = /^\/jeeling-data\/(zh|en)\/([a-zA-Z0-9_-]+)\.json$/.exec(pathname);
        if (!match || !['GET', 'HEAD'].includes(req.method)) return next();
        const [, locale, part] = match;
        try {
          const stamp = await signature();
          const file = path.join(cacheRoot, locale, `${part}.json`);
          let result;
          try {
            const stored = JSON.parse(await readFile(file, 'utf8'));
            if (stored.signature === stamp) result = stored;
          } catch (error) { if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error; }
          if (!result) {
            const key = `${stamp}/${locale}/${part}`;
            if (!pending.has(key)) pending.set(key, (async () => {
              const startedAt = revision;
              const delivery = await server.ssrLoadModule('/src/data/repository/jeeling-delivery.ts');
              const payload = delivery.getJeelingEncodedPart(locale, part);
              if (payload && startedAt === revision) {
                await writeJeelingCache(root, locale, part, stamp, payload);
              }
              return payload;
            })().finally(() => pending.delete(key)));
            result = await pending.get(key);
          }
          if (!result) { res.statusCode = 404; res.end(); return; }
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('ETag', result.etag);
          if (req.headers['if-none-match'] === result.etag) { res.statusCode = 304; res.end(); return; }
          res.setHeader('Content-Length', Buffer.byteLength(result.body));
          res.end(req.method === 'HEAD' ? undefined : result.body);
        } catch (error) { next(error); }
      });
    },
  };
}
