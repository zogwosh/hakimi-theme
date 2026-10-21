import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const isWindows = process.platform === 'win32';
const zedThemesDir = isWindows
  ? path.join(
      process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
      'Zed',
      'themes',
    )
  : path.join(os.homedir(), '.config', 'zed', 'themes');

fs.mkdirSync(zedThemesDir, { recursive: true });

const src = path.resolve('zed/themes/hakimi-deuteranopia.json');
const dest = path.join(zedThemesDir, 'hakimi-deuteranopia.json');

fs.copyFileSync(src, dest);
console.log(`✓ Successfully installed Hakimi theme to Zed:\n  ${dest}`);
