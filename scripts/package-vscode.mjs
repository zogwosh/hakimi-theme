import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
);

const artifactsDir = path.join(root, 'artifacts');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

const output = path.join(artifactsDir, `${pkg.name}-${pkg.version}.vsix`);
const directCli = path.join(root, 'node_modules/@vscode/vsce/vsce');

let result;
if (fs.existsSync(directCli)) {
  result = spawnSync(
    process.execPath,
    [directCli, 'package', '--no-dependencies', '--out', output],
    {
      cwd: path.join(root, 'vscode'),
      stdio: 'inherit',
    },
  );
} else {
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  result = spawnSync(
    npxCmd,
    ['@vscode/vsce', 'package', '--no-dependencies', '--out', output],
    {
      cwd: path.join(root, 'vscode'),
      stdio: 'inherit',
      shell: process.platform === 'win32',
    },
  );
}

if (result.error) throw result.error;
process.exit(result.status ?? 1);
