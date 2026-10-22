import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const appData =
  process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
const obsidianConfigFile = path.join(appData, 'obsidian', 'obsidian.json');

if (!fs.existsSync(obsidianConfigFile)) {
  console.warn(
    `Warning: Obsidian configuration file not found at ${obsidianConfigFile}`,
  );
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(obsidianConfigFile, 'utf8'));
const vaults = config.vaults ? Object.values(config.vaults) : [];

if (vaults.length === 0) {
  console.log('No Obsidian vaults found in configuration.');
  process.exit(0);
}

const srcDir = path.resolve('obsidian');
const themeCss = fs.readFileSync(path.join(srcDir, 'theme.css'));
const license = fs.readFileSync(path.join(srcDir, 'LICENSE'));

let installedCount = 0;

for (const vault of vaults) {
  const vaultPath = vault.path;
  if (!vaultPath || !fs.existsSync(vaultPath)) continue;

  const themesDir = path.join(vaultPath, '.obsidian', 'themes');
  if (!fs.existsSync(themesDir)) continue;

  // Install to Hakimi and Hakimi Deuteranopia Safe folders
  for (const themeName of ['Hakimi', 'Hakimi Deuteranopia Safe']) {
    const targetDir = path.join(themesDir, themeName);
    fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(path.join(targetDir, 'theme.css'), themeCss);
    fs.writeFileSync(path.join(targetDir, 'LICENSE'), license);

    const manifestPath = path.join(targetDir, 'manifest.json');
    const manifest = {
      name: themeName,
      version: '2.0.0',
      minAppVersion: '1.13.0',
      author: 'hakimi',
      authorUrl: 'https://github.com/zogwosh/hakimi-theme',
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`✓ Installed theme "${themeName}" to:\n  ${targetDir}`);
    installedCount++;
  }
}

console.log(
  `\nDone! Successfully updated ${installedCount} Obsidian theme installation(s).`,
);
