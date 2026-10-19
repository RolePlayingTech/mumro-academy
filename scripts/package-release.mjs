import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile, access } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
if (git('status', '--porcelain')) {
  throw new Error('Commit the intended release before packaging.');
}
await access('dist/pl/index.html');
await access('dist/404.html');

const commit = git('rev-parse', 'HEAD');
const releaseId =
  new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z') + '-' + commit.slice(0, 12);
const directory = resolve('.cache/releases');
await mkdir(directory, { recursive: true });

const publicArchive = resolve(directory, `${releaseId}-public.tar.gz`);
const sourceArchive = resolve(directory, `${releaseId}-source.tar.gz`);

execFileSync('tar', ['-czf', publicArchive, '-C', 'dist', '.']);
execFileSync('git', ['archive', '--format=tar.gz', `--output=${sourceArchive}`, 'HEAD']);

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function inventory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const items = [];
  for (const e of entries) {
    const file = resolve(dir, e.name);
    if (e.isDirectory()) {
      items.push(...(await inventory(file)));
    } else {
      const bytes = await readFile(file);
      items.push({
        path: relative('dist', file).replaceAll('\\', '/'),
        bytes: bytes.length,
        sha256: hash(bytes),
      });
    }
  }
  return items;
}

const manifest = {
  releaseId,
  commit,
  publicArchive,
  sourceArchive,
  publicSha: hash(await readFile(publicArchive)),
  sourceSha: hash(await readFile(sourceArchive)),
  files: await inventory('dist'),
};

const manifestPath = resolve(directory, `${releaseId}.json`);
await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ ...manifest, files: manifest.files.length, manifestPath }));
