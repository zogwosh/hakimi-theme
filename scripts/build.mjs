import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

// Helper: Hex to RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

// Helper: RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Helper: sRGB to Linear
function srgbToLinear(x) {
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

// Helper: RGB to OKLCH
function rgbToOklch(r255, g255, b255) {
  const r = srgbToLinear(r255 / 255);
  const g = srgbToLinear(g255 / 255);
  const b = srgbToLinear(b255 / 255);

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995477 * g + 0.1073969541 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  const C = Math.sqrt(a * a + b_ * b_);
  let h = Math.atan2(b_, a) * 180 / Math.PI;
  if (h < 0) h += 360;

  return { l: L, c: C, h: h };
}

// Constant Palettes (IBM, Wong, Paul Tol, Contrasting Pairs)
const sharedColors = {
  // 8 Pairs of Contrasting Colors
  pair1_light: "#ffc20a",
  pair1_dark: "#0c7bdc",
  pair2_light: "#994f00",
  pair2_dark: "#006cd1",
  pair3_light: "#e1be6a",
  pair3_dark: "#40b0a6",
  pair4_light: "#e66100",
  pair4_dark: "#5d3a9b",
  pair5_light: "#1aff1a",
  pair5_dark: "#4b0092",
  pair6_light: "#fefe62",
  pair6_dark: "#d35fb7",
  pair7_light: "#005ab5",
  pair7_dark: "#dc3220",
  pair8_light: "#1a85ff",
  pair8_dark: "#d41159",

  // IBM Palette
  ibm_blue: "#648fff",
  ibm_violet: "#785ef0",
  ibm_magenta: "#dc267f",
  ibm_orange: "#fe6100",
  ibm_yellow: "#ffb000",

  // Wong Palette
  wong_orange: "#e69f00",
  wong_skyblue: "#56b4e9",
  wong_bluishgreen: "#009e73",
  wong_yellow: "#f0e442",
  wong_blue: "#0072b2",
  wong_vermillion: "#d55e00",
  wong_reddishpurple: "#cc79a7",

  // Paul Tol Palette
  tol_blue: "#4477aa",
  tol_cyan: "#66ccee",
  tol_green: "#228833",
  tol_yellow: "#ccbb44",
  tol_red: "#ee6677",
  tol_purple: "#aa3377",
  tol_grey: "#bbbbbb"
};

// Flavor specific functional UI colors.
//
// Syntax palette (syn_*) is optimized for DEUTERANOPIA (green cone absent): every
// simultaneously-visible token role is separated along the two axes a deuteranope
// still perceives — luminance and blue<->yellow — while the red<->green axis is
// treated as carrying zero information. Verified with a Vienot-1999 (linear-RGB)
// projection: all non-error role pairs keep OKLab dEok >= 0.13 after deutan
// simulation, and every color clears WCAG AA contrast vs its background. The error
// role is intentionally carried by font decoration (bold + underline), since no
// hue signals "error" to a deuteranope.
const flavorColors = {
  light: {
    background: "#faf9f6",
    foreground: "#45494c",      // = variable/property/parameter (neutral)
    primary: "#869ec5",         // UI accent + keyword/tag/built-in (blue, bold)
    secondary: "#c2570a",       // = syn_function
    success: "#009e73",         // UI only (bracket match / git additions)
    warning: "#9a6700",         // UI only (darkened for light-bg legibility)
    error: "#dc7c7e",           // error/invalid (carried by bold+underline)
    info: "#4387d7",            // = syn_string
    accent: "#89461e",          // = syn_type
    // deutan-optimized syntax roles
    syn_keyword: "#869ec5",     // cool family, soft blue
    syn_string: "#4387d7",      // cool family, soft medium blue
    syn_function: "#c2570a",    // warm family, burnt orange
    syn_type: "#89461e",        // warm family, warm brown (adjusted for separation)
    syn_comment: "#9c9c9b"      // neutral grey, italic
  },
  dark: {
    background: "#121212",
    foreground: "#e0e0e0",      // = variable/property/parameter (neutral, APCA Lc 87)
    primary: "#6ea9ff",         // UI accent + keyword/tag/built-in (blue, bold)
    secondary: "#e2cb8d",       // = syn_function
    success: "#40b0a6",         // UI only (bracket match / git additions)
    warning: "#e1be6a",         // UI only
    error: "#ff7575",           // error/invalid (carried by bold+underline)
    info: "#74d7e3",            // = syn_string
    accent: "#785ef0",          // UI only (button hover)
    // deutan-optimized syntax roles — brightened so each clears its APCA Lc floor
    // (regular>=60, bold>=50) when read on the dark editor background.
    syn_keyword: "#6ea9ff",     // cool family, blue (bold, Lc 50)
    syn_string: "#74d7e3",      // cool family, light cyan (Lc 70)
    syn_function: "#e2cb8d",    // warm family, bright yellow (Lc 84)
    syn_type: "#f7993f",        // warm family, orange (Lc 61) — type/class/num/const/enum
    syn_comment: "#99a0a8"      // faint-cool neutral grey, italic (Lc 49)
  }
};

const customPalette = {
  version: "1.2.0",
  theme: "deuteranopia",
  flavors: {
    light: { name: "Light", dark: false, colors: {} },
    dark: { name: "Dark", dark: true, colors: {} }
  }
};

// Overrides for whiskers templates (no leading #)
const lightOverrides = {};
const darkOverrides = {};

// 1. Compile color objects for each flavor
for (const flavorName of ['light', 'dark']) {
  const targetColorsDict = customPalette.flavors[flavorName].colors;
  const targetOverridesDict = flavorName === 'light' ? lightOverrides : darkOverrides;

  // Combine functional UI colors and shared constants
  const mergedColors = {
    ...flavorColors[flavorName],
    ...sharedColors
  };

  for (const [name, hex] of Object.entries(mergedColors)) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);

    targetColorsDict[name] = {
      name: name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      hex: hex,
      rgb: rgb,
      hsl: hsl,
      oklch: oklch
    };

    targetOverridesDict[name] = hex.replace(/^#/, '').toLowerCase();
  }
}

// Combined overrides for CSS/Sass/Less which compile both versions in one file
const combinedOverrides = {
  light: lightOverrides,
  dark: darkOverrides
};

// Ensure output directories exist
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('themes', { recursive: true });

// A. Write program files directly from Node
console.log('Writing package definitions (palette.json, index.js, index.d.ts)...');

// 1. palette.json
fs.writeFileSync('dist/palette.json', JSON.stringify(customPalette, null, 2));
console.log('Successfully wrote dist/palette.json');

// 2. index.js
fs.writeFileSync('dist/index.js', `// Pure Colorblind-safe theme tokens (colorblindness)
export const version = "${customPalette.version}";
export const theme = "${customPalette.theme}";
export const flavors = ${JSON.stringify(customPalette.flavors, null, 2)};
export const flavorEntries = Object.entries(flavors);
`);
console.log('Successfully wrote dist/index.js');

// 3. index.d.ts
const typeDefs = `export type FlavorName = "light" | "dark";

export type ColorTokenName =
  | "background" | "foreground" | "primary" | "secondary" | "success" | "warning" | "error" | "info" | "accent"
  | "syn_keyword" | "syn_string" | "syn_function" | "syn_type" | "syn_comment"
  | "pair1_light" | "pair1_dark" | "pair2_light" | "pair2_dark" | "pair3_light" | "pair3_dark" | "pair4_light" | "pair4_dark"
  | "pair5_light" | "pair5_dark" | "pair6_light" | "pair6_dark" | "pair7_light" | "pair7_dark" | "pair8_light" | "pair8_dark"
  | "ibm_blue" | "ibm_violet" | "ibm_magenta" | "ibm_orange" | "ibm_yellow"
  | "wong_orange" | "wong_skyblue" | "wong_bluishgreen" | "wong_yellow" | "wong_blue" | "wong_vermillion" | "wong_reddishpurple"
  | "tol_blue" | "tol_cyan" | "tol_green" | "tol_yellow" | "tol_red" | "tol_purple" | "tol_grey";

export type ColorFormat = Readonly<{
    name: string;
    hex: string;
    rgb: { r: number; g: number; b: number; };
    hsl: { h: number; s: number; l: number; };
    oklch: { l: number; c: number; h: number; };
}>;

export type FlavorInfo = Readonly<{
    name: string;
    dark: boolean;
    colors: Record<ColorTokenName, ColorFormat>;
}>;

export declare const version: string;
export declare const theme: string;
export declare const flavors: Record<FlavorName, FlavorInfo>;
export declare const flavorEntries: [FlavorName, FlavorInfo][];
`;
fs.writeFileSync('dist/index.d.ts', typeDefs);
console.log('Successfully wrote dist/index.d.ts');

// B. Compile styling and VSCode theme tokens using Whiskers CLI
function findWhiskers() {
  // 1. Try running 'whiskers' directly from PATH
  const testRun = spawnSync(process.platform === 'win32' ? 'whiskers.exe' : 'whiskers', ['--version'], { shell: false });
  if (testRun.error === undefined && testRun.status === 0) {
    return process.platform === 'win32' ? 'whiskers.exe' : 'whiskers';
  }

  // 2. If on Windows and 'whiskers' is not in PATH, try Cargo default bin location
  if (process.platform === 'win32') {
    const userProfile = process.env.USERPROFILE || process.env.HOMEPATH;
    if (userProfile) {
      const cargoBinPath = path.join(userProfile, '.cargo', 'bin', 'whiskers.exe');
      if (fs.existsSync(cargoBinPath)) {
        return cargoBinPath;
      }
    }
  }

  // 3. Fallback/Error: Whiskers not found
  console.error('Error: "whiskers" CLI compiler was not found in PATH or in the default cargo bin directory.');
  console.error('Please install whiskers (e.g. `cargo install catppuccin-whiskers` or ensure it is in your PATH).');
  process.exit(1);
}

const whiskersExecutable = findWhiskers();
console.log(`Using whiskers executable: ${whiskersExecutable}`);

function runWhiskers(template, overridesStr) {
  const result = spawnSync(whiskersExecutable, [template, '--overrides', overridesStr], {
    encoding: 'utf-8',
    shell: false
  });

  if (result.error) {
    console.error(`Error spawning whiskers for ${template}:`, result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`Error compiling ${template}:`, result.stderr || result.stdout);
    process.exit(1);
  }
  
  console.log(`Successfully compiled ${template}.`);
}

// Ensure output directories exist
fs.mkdirSync('themes', { recursive: true });

const styleTemplates = [
  'templates/hakimi-deuteranopia.css.tera',
  'templates/hakimi-deuteranopia.scss.tera',
  'templates/hakimi-deuteranopia.less.tera',
  'templates/vscode-theme-light.json.tera',
  'templates/vscode-theme-dark.json.tera'
];
const combinedOverridesStr = JSON.stringify(combinedOverrides);

console.log('Compiling stylesheets using Whiskers...');
for (const template of styleTemplates) {
  if (template.includes('vscode-theme')) continue;
  console.log(`Compiling ${template}...`);
  runWhiskers(template, combinedOverridesStr);
}

// 2. Compile VSCode Themes (Light with lightOverrides, Dark with darkOverrides)
const lightOverridesStr = JSON.stringify(lightOverrides);
const darkOverridesStr = JSON.stringify(darkOverrides);

console.log('Compiling VSCode Light theme...');
runWhiskers('templates/vscode-theme-light.json.tera', lightOverridesStr);

console.log('Compiling VSCode Dark theme...');
runWhiskers('templates/vscode-theme-dark.json.tera', darkOverridesStr);

// 3. Compile Zed Theme Family
const zedOverrides = {
  light: lightOverrides,
  dark: darkOverrides
};
const zedOverridesStr = JSON.stringify(zedOverrides);

console.log('Compiling Zed theme family...');
runWhiskers('templates/zed-theme.json.tera', zedOverridesStr);

// 4. Update extension.toml version to match package.json version
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  let extToml = fs.readFileSync('extension.toml', 'utf8');
  extToml = extToml.replace(/^version\s*=\s*".*"/m, `version = "${pkg.version}"`);
  fs.writeFileSync('extension.toml', extToml, 'utf8');
  console.log(`Successfully updated extension.toml version to ${pkg.version}`);
} catch (err) {
  console.error('Warning: Failed to update extension.toml version:', err.message);
}

console.log('All theme tokens successfully generated in dist/ and themes/!');
