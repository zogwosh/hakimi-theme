import { flavors, theme, version } from '../dist/index.js';
import fs from 'fs';

console.log('Validating generated colorblindness theme tokens...');

// 1. Verify version and theme name
if (version !== '1.2.0') {
  console.error(`FAIL: Version is ${version}, expected 1.2.0`);
  process.exit(1);
}
if (theme !== 'colorblindness') {
  console.error(`FAIL: Theme is ${theme}, expected colorblindness`);
  process.exit(1);
}
console.log('✓ Theme meta parameters are correct (1.1.0, colorblindness)');

// 2. Check flavors exist
if (!flavors.light || !flavors.dark) {
  console.error('FAIL: Light or Dark flavor is missing in flavors', flavors);
  process.exit(1);
}
console.log('✓ Both light and dark flavors are present');

// 3. Check token definitions count in both flavors
const expectedTokens = [
  "background", "foreground", "primary", "secondary", "success", "warning", "error", "info", "accent",
  "syn_keyword", "syn_string", "syn_function", "syn_type", "syn_comment",
  "pair1_light", "pair1_dark", "pair2_light", "pair2_dark", "pair3_light", "pair3_dark", "pair4_light", "pair4_dark",
  "pair5_light", "pair5_dark", "pair6_light", "pair6_dark", "pair7_light", "pair7_dark", "pair8_light", "pair8_dark",
  "ibm_blue", "ibm_violet", "ibm_magenta", "ibm_orange", "ibm_yellow",
  "wong_orange", "wong_skyblue", "wong_bluishgreen", "wong_yellow", "wong_blue", "wong_vermillion", "wong_reddishpurple",
  "tol_blue", "tol_cyan", "tol_green", "tol_yellow", "tol_red", "tol_purple", "tol_grey"
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
console.log(`✓ All ${expectedTokens.length} color tokens are present in both light and dark flavors`);

// 4. Verify specific color hex codes in light and dark flavors
const checkLightColors = {
  background: '#ffffff',
  foreground: '#000000',
  primary: '#0a3d91',
  success: '#009e73',
  error: '#c4141a',
  syn_keyword: '#0a3d91',
  syn_string: '#1d6fd0',
  syn_function: '#c2570a',
  syn_type: '#7a2e00',
  syn_comment: '#6e6e6e'
};

const checkDarkColors = {
  background: '#121212',
  foreground: '#e0e0e0',
  primary: '#6aa6ff',
  success: '#40b0a6',
  error: '#ff5e5e',
  syn_keyword: '#6aa6ff',
  syn_string: '#74d7e3',
  syn_function: '#e2cb8d',
  syn_type: '#f5933f',
  syn_comment: '#99a0a8'
};

for (const [key, expectedHex] of Object.entries(checkLightColors)) {
  const actualHex = flavors.light.colors[key].hex;
  if (actualHex !== expectedHex) {
    console.error(`FAIL: Light flavor ${key} hex is ${actualHex}, expected ${expectedHex}`);
    process.exit(1);
  }
}

for (const [key, expectedHex] of Object.entries(checkDarkColors)) {
  const actualHex = flavors.dark.colors[key].hex;
  if (actualHex !== expectedHex) {
    console.error(`FAIL: Dark flavor ${key} hex is ${actualHex}, expected ${expectedHex}`);
    process.exit(1);
  }
}
console.log('✓ Specific color hex values matched exactly in both flavors');

// 5. Verify styling and theme files exist and have content
const styleFiles = [
  'dist/hakimi-colorblindness.css',
  'dist/hakimi-colorblindness.scss',
  'dist/hakimi-colorblindness.less',
  'themes/hakimi-colorblindness-light.json',
  'themes/hakimi-colorblindness-dark.json',
  'themes/hakimi-colorblindness-dark-bright.json',
  'themes/hakimi-colorblindness.json'
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
console.log('✓ CSS, SCSS, Less, VSCode and Zed theme files successfully compiled');

// 6. Verify VSCode theme files content
const lightTheme = JSON.parse(fs.readFileSync('themes/hakimi-colorblindness-light.json', 'utf8'));
const darkTheme = JSON.parse(fs.readFileSync('themes/hakimi-colorblindness-dark.json', 'utf8'));

if (lightTheme.name !== 'Hakimi Colorblindness Light' || lightTheme.type !== 'light') {
  console.error('FAIL: Light theme metadata is incorrect', lightTheme);
  process.exit(1);
}
if (darkTheme.name !== 'Hakimi Colorblindness Dark' || darkTheme.type !== 'dark') {
  console.error('FAIL: Dark theme metadata is incorrect', darkTheme);
  process.exit(1);
}
const darkBrightTheme = JSON.parse(fs.readFileSync('themes/hakimi-colorblindness-dark-bright.json', 'utf8'));
if (darkBrightTheme.name !== 'Hakimi Colorblindness Dark Bright' || darkBrightTheme.type !== 'dark') {
  console.error('FAIL: Dark Bright theme metadata is incorrect', darkBrightTheme);
  process.exit(1);
}
console.log('✓ Light, Dark, and Dark Bright theme configurations successfully validated');

// 7. Verify Zed theme family content
const zedThemeFamily = JSON.parse(fs.readFileSync('themes/hakimi-colorblindness.json', 'utf8'));
if (zedThemeFamily.$schema !== 'https://zed.dev/schema/themes/v0.2.0.json') {
  console.error(`FAIL: Zed theme schema is ${zedThemeFamily.$schema}, expected https://zed.dev/schema/themes/v0.2.0.json`);
  process.exit(1);
}
if (zedThemeFamily.name !== 'Hakimi Colorblindness Safe') {
  console.error(`FAIL: Zed theme family name is ${zedThemeFamily.name}, expected Hakimi Colorblindness Safe`);
  process.exit(1);
}
if (!Array.isArray(zedThemeFamily.themes) || zedThemeFamily.themes.length !== 3) {
  console.error(`FAIL: Expected 3 themes in Zed theme family, found ${zedThemeFamily.themes ? zedThemeFamily.themes.length : 0}`);
  process.exit(1);
}

const expectedZedThemes = {
  'Hakimi Colorblindness Light': 'light',
  'Hakimi Colorblindness Dark': 'dark',
  'Hakimi Colorblindness Dark Bright': 'dark'
};

for (const zedTheme of zedThemeFamily.themes) {
  const expectedAppearance = expectedZedThemes[zedTheme.name];
  if (!expectedAppearance) {
    console.error(`FAIL: Unexpected theme name in Zed family: ${zedTheme.name}`);
    process.exit(1);
  }
  if (zedTheme.appearance !== expectedAppearance) {
    console.error(`FAIL: Zed theme ${zedTheme.name} appearance is ${zedTheme.appearance}, expected ${expectedAppearance}`);
    process.exit(1);
  }
  if (!zedTheme.style || !zedTheme.style.syntax) {
    console.error(`FAIL: Zed theme ${zedTheme.name} is missing style or syntax definition`);
    process.exit(1);
  }
}
console.log('✓ Zed theme family file successfully validated');

console.log('\nALL TESTS PASSED SUCCESSFULLY! The Light and Dark colorblindness theme tokens are verified.');
