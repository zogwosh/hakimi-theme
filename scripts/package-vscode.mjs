import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
);
const cli = path.join(root, 'node_modules/@vscode/vsce/vsce');
const output = path.join(root, 'artifacts', `${pkg.name}-${pkg.version}.vsix`);
const result = spawnSync(
  process.execPath,
  [cli, 'package', '--no-dependencies', '--out', output],
  {
    cwd: path.join(root, 'vscode'),
    stdio: 'inherit',
  },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
