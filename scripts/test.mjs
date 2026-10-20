import { flavors, theme, version } from '../dist/index.js';
import fs from 'node:fs';
import { hexToRgb } from '../src/colors.mjs';

console.log('Validating generated deuteranopia theme tokens...');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 1. Verify version and theme name
if (version !== pkg.version) {
  console.error(
    `FAIL: Version is ${version}, expected package.json version ${pkg.version}`,
  );
  process.exit(1);
}
if (theme !== 'deuteranopia') {
  console.error(`FAIL: Theme is ${theme}, expected deuteranopia`);
  process.exit(1);
}
console.log(`✓ Theme meta parameters are correct (${version}, ${theme})`);

// 2. Check flavors exist
if (!flavors.light || !flavors.dark) {
  console.error('FAIL: Light or Dark flavor is missing in flavors', flavors);
  process.exit(1);
}
console.log('✓ Both light and dark flavors are present');

const palette = JSON.parse(fs.readFileSync('src/palette.json', 'utf8'));

// Validate every generated token against its source palette.
for (const [flavorName, source] of Object.entries(palette)) {
  const actual = flavors[flavorName].colors;
  if (Object.keys(actual).sort().join() !== Object.keys(source).sort().join()) {
    console.error('FAIL: Generated palette token names differ from the source');
    process.exit(1);
  }
  for (const [key, hex] of Object.entries(source)) {
    if (actual[key]?.hex !== hex) {
      console.error(`FAIL: ${flavorName}.${key} differs from its source`);
      process.exit(1);
    }
  }
}
console.log('✓ Both palettes match all source tokens');

// 5. Verify styling and theme files exist and have content
const styleFiles = [
  'dist/hakimi-deuteranopia.css',
  'dist/hakimi-deuteranopia.scss',
  'dist/hakimi-deuteranopia.less',
  'vscode/themes/hakimi-deuteranopia-light.json',
  'vscode/themes/hakimi-deuteranopia-dark.json',
  'zed/themes/hakimi-deuteranopia.json',
  'obsidian/theme.css',
  'obsidian/manifest.json',
];
for (const file of styleFiles) {
  if (!fs.existsSync(file)) {
    console.error(`FAIL: File ${file} does not exist`);
    process.exit(1);
  }
  const stat = fs.statSync(file);
  if (stat.size === 0) {
    console.error(`FAIL: File ${file} is empty`);
    process.exit(1);
  }
}
console.log(
  '✓ CSS, SCSS, Less, VSCode, Zed and Obsidian theme files successfully compiled',
);

// 6. Verify VSCode theme files content
const lightTheme = JSON.parse(
  fs.readFileSync('vscode/themes/hakimi-deuteranopia-light.json', 'utf8'),
);
const darkTheme = JSON.parse(
  fs.readFileSync('vscode/themes/hakimi-deuteranopia-dark.json', 'utf8'),
);

if (
  lightTheme.name !== 'Hakimi Deuteranopia Light' ||
  lightTheme.type !== 'light'
) {
  console.error('FAIL: Light theme metadata is incorrect', lightTheme);
  process.exit(1);
}
if (
  darkTheme.name !== 'Hakimi Deuteranopia Dark' ||
  darkTheme.type !== 'dark'
) {
  console.error('FAIL: Dark theme metadata is incorrect', darkTheme);
  process.exit(1);
}
console.log('✓ Light and Dark theme configurations successfully validated');

// 7. Verify Zed theme family content
const zedThemeFamily = JSON.parse(
  fs.readFileSync('zed/themes/hakimi-deuteranopia.json', 'utf8'),
);
if (zedThemeFamily.$schema !== 'https://zed.dev/schema/themes/v0.2.0.json') {
  console.error(
    `FAIL: Zed theme schema is ${zedThemeFamily.$schema}, expected https://zed.dev/schema/themes/v0.2.0.json`,
  );
  process.exit(1);
}
if (zedThemeFamily.name !== 'Hakimi Deuteranopia Safe') {
  console.error(
    `FAIL: Zed theme family name is ${zedThemeFamily.name}, expected Hakimi Deuteranopia Safe`,
  );
  process.exit(1);
}
if (
  !Array.isArray(zedThemeFamily.themes) ||
  zedThemeFamily.themes.length !== 2
) {
  console.error(
    `FAIL: Expected 2 themes in Zed theme family, found ${zedThemeFamily.themes ? zedThemeFamily.themes.length : 0}`,
  );
  process.exit(1);
}

const expectedZedThemes = {
  'Hakimi Deuteranopia Light': 'light',
  'Hakimi Deuteranopia Dark': 'dark',
};

for (const zedTheme of zedThemeFamily.themes) {
  const expectedAppearance = expectedZedThemes[zedTheme.name];
  if (!expectedAppearance) {
    console.error(
      `FAIL: Unexpected theme name in Zed family: ${zedTheme.name}`,
    );
    process.exit(1);
  }
  if (zedTheme.appearance !== expectedAppearance) {
    console.error(
      `FAIL: Zed theme ${zedTheme.name} appearance is ${zedTheme.appearance}, expected ${expectedAppearance}`,
    );
    process.exit(1);
  }
  if (!zedTheme.style?.syntax) {
    console.error(
      `FAIL: Zed theme ${zedTheme.name} is missing style or syntax definition`,
    );
    process.exit(1);
  }
}
console.log('✓ Zed theme family file successfully validated');

// 8. Verify Obsidian manifest and theme
const obsidianManifest = JSON.parse(
  fs.readFileSync('obsidian/manifest.json', 'utf8'),
);
if (obsidianManifest.name !== 'Hakimi Deuteranopia Safe') {
  console.error(
    `FAIL: Obsidian manifest name is ${obsidianManifest.name}, expected Hakimi Deuteranopia Safe`,
  );
  process.exit(1);
}
if (obsidianManifest.version !== pkg.version) {
  console.error(
    `FAIL: Obsidian manifest version is ${obsidianManifest.version}, expected ${pkg.version}`,
  );
  process.exit(1);
}
if (obsidianManifest.minAppVersion !== '1.13.0') {
  console.error(
    `FAIL: Obsidian manifest minAppVersion is ${obsidianManifest.minAppVersion}, expected 1.13.0`,
  );
  process.exit(1);
}
if (obsidianManifest.author !== 'hakimi') {
  console.error(
    `FAIL: Obsidian manifest author is ${obsidianManifest.author}, expected hakimi`,
  );
  process.exit(1);
}
console.log('✓ Obsidian manifest successfully validated');

// 9. Verify Obsidian theme.css contains all 26 --ctp-<token> RGB definitions for both light and dark
const obsidianThemeCss = fs.readFileSync('obsidian/theme.css', 'utf8');
for (const [flavorName, tokens] of Object.entries(palette)) {
  for (const [token, hex] of Object.entries(tokens)) {
    const { r, g, b } = hexToRgb(hex);
    const expectedVar = `--ctp-${token}: ${r}, ${g}, ${b};`;
    if (!obsidianThemeCss.includes(expectedVar)) {
      console.error(
        `FAIL: obsidian/theme.css missing expected ${flavorName} variable: ${expectedVar}`,
      );
      process.exit(1);
    }
  }
}
console.log(
  '✓ Obsidian theme.css contains all 26 --ctp-<token> RGB definitions for light and dark',
);

console.log(
  '\nALL TESTS PASSED SUCCESSFULLY! The Light and Dark deuteranopia theme tokens are verified.',
);
