import { flavors, theme, version } from '../dist/index.js';
import fs from 'node:fs';

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

// 3. Check token definitions count in both flavors
const expectedTokens = [
  'background',
  'foreground',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'accent',
  'syn_keyword',
  'syn_string',
  'syn_function',
  'syn_type',
  'syn_comment',
  'pair1_light',
  'pair1_dark',
  'pair2_light',
  'pair2_dark',
  'pair3_light',
  'pair3_dark',
  'pair4_light',
  'pair4_dark',
  'pair5_light',
  'pair5_dark',
  'pair6_light',
  'pair6_dark',
  'pair7_light',
  'pair7_dark',
  'pair8_light',
  'pair8_dark',
  'ibm_blue',
  'ibm_violet',
  'ibm_magenta',
  'ibm_orange',
  'ibm_yellow',
  'wong_orange',
  'wong_skyblue',
  'wong_bluishgreen',
  'wong_yellow',
  'wong_blue',
  'wong_vermillion',
  'wong_reddishpurple',
  'tol_blue',
  'tol_cyan',
  'tol_green',
  'tol_yellow',
  'tol_red',
  'tol_purple',
  'tol_grey',
];

for (const flavorName of ['light', 'dark']) {
  const flavorColors = flavors[flavorName].colors;
  for (const token of expectedTokens) {
    if (!flavorColors[token]) {
      console.error(`FAIL: Flavor ${flavorName} is missing token ${token}`);
      process.exit(1);
    }
  }
}
console.log(
  `✓ All ${expectedTokens.length} color tokens are present in both light and dark flavors`,
);

// 4. Verify specific color hex codes in light and dark flavors
const checkLightColors = {
  background: '#dfccc0',
  foreground: '#45494c',
  primary: '#4c6698',
  success: '#00543f',
  error: '#6f1f65',
  syn_keyword: '#4c6698',
  syn_string: '#004b8f',
  syn_function: '#704400',
  syn_type: '#4a250e',
  syn_comment: '#6f706f',
};

const checkDarkColors = {
  background: '#263238',
  foreground: '#e0e0e0',
  primary: '#7ab2ff',
  success: '#50c0b6',
  error: '#ff8585',
  syn_keyword: '#7ab2ff',
  syn_string: '#80dcff',
  syn_function: '#f0d68f',
  syn_type: '#ff9536',
  syn_comment: '#99a0a8',
};

for (const [key, expectedHex] of Object.entries(checkLightColors)) {
  const actualHex = flavors.light.colors[key].hex;
  if (actualHex !== expectedHex) {
    console.error(
      `FAIL: Light flavor ${key} hex is ${actualHex}, expected ${expectedHex}`,
    );
    process.exit(1);
  }
}

for (const [key, expectedHex] of Object.entries(checkDarkColors)) {
  const actualHex = flavors.dark.colors[key].hex;
  if (actualHex !== expectedHex) {
    console.error(
      `FAIL: Dark flavor ${key} hex is ${actualHex}, expected ${expectedHex}`,
    );
    process.exit(1);
  }
}
console.log('✓ Specific color hex values matched exactly in both flavors');

// 5. Verify styling and theme files exist and have content
const styleFiles = [
  'dist/hakimi-deuteranopia.css',
  'dist/hakimi-deuteranopia.scss',
  'dist/hakimi-deuteranopia.less',
  'vscode-themes/hakimi-deuteranopia-light.json',
  'vscode-themes/hakimi-deuteranopia-dark.json',
  'zed/themes/hakimi-deuteranopia.json',
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
  '✓ CSS, SCSS, Less, VSCode and Zed theme files successfully compiled',
);

// 6. Verify VSCode theme files content
const lightTheme = JSON.parse(
  fs.readFileSync('vscode-themes/hakimi-deuteranopia-light.json', 'utf8'),
);
const darkTheme = JSON.parse(
  fs.readFileSync('vscode-themes/hakimi-deuteranopia-dark.json', 'utf8'),
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

console.log(
  '\nALL TESTS PASSED SUCCESSFULLY! The Light and Dark deuteranopia theme tokens are verified.',
);
