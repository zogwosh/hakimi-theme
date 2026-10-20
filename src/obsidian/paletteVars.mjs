import { hexToRgb } from '../colors.mjs';

/**
 * Compiles all Obsidian color palette variables and theme mappings.
 *
 * @param {Object} palettes Source palettes with light and dark flavors
 * @returns {string} Compiled CSS for palettes, accents, and core Obsidian mappings
 */
export function compileObsidianPaletteVariables(palettes) {
  const lightTokensCss = compileFlavorPaletteTokens('light', palettes.light);
  const darkTokensCss = compileFlavorPaletteTokens('dark', palettes.dark);
  const colorMappingsCss = compileColorMappings();
  const accentMappingsCss = compileAccentMappings();
  const coreVariablesCss = compileCoreObsidianVariables();
  const colorSchemeCss = compileColorSchemeAdjustments();

  return [
    '/* ------------------Hakimi Deuteranopia Safe Palettes------------------- */',
    lightTokensCss,
    darkTokensCss,
    colorMappingsCss,
    accentMappingsCss,
    coreVariablesCss,
    colorSchemeCss,
  ].join('\n\n');
}

/**
 * Compiles 26 color tokens for a given flavor into CSS variables.
 *
 * @param {'light' | 'dark'} flavor Palette flavor
 * @param {Record<string, string>} tokens Token names and hex values
 * @returns {string} CSS rule binding tokens to flavor selectors
 */
function compileFlavorPaletteTokens(flavor, tokens) {
  const selector =
    flavor === 'light'
      ? '.theme-light,\n.theme-light.ctp-latte'
      : '.theme-dark,\n.theme-dark.ctp-mocha,\n.theme-dark.ctp-macchiato,\n.theme-dark.ctp-frappe';

  const variableDeclarations = compileTokenVariables(tokens);
  return `${selector} {\n${variableDeclarations}\n}`;
}

/**
 * Formats token declarations as --ctp-<token> (RGB channels) and --hex-<token> (hex string).
 *
 * @param {Record<string, string>} tokens
 * @returns {string}
 */
function compileTokenVariables(tokens) {
  const rgbDeclarations = [];
  const hexDeclarations = [];

  for (const [token, hex] of Object.entries(tokens)) {
    const { r, g, b } = hexToRgb(hex);
    rgbDeclarations.push(`  --ctp-${token}: ${r}, ${g}, ${b};`);
    hexDeclarations.push(`  --hex-${token}: ${hex.toLowerCase()};`);
  }

  return [...rgbDeclarations, ...hexDeclarations].join('\n');
}

/**
 * Maps semantic color variables (--color-*) to Catppuccin color tokens.
 *
 * @returns {string}
 */
function compileColorMappings() {
  return `.theme-light,
.theme-dark {
  --color-red-rgb: var(--ctp-red);
  --color-red: var(--hex-red);
  --color-orange-rgb: var(--ctp-peach);
  --color-orange: var(--hex-peach);
  --color-yellow-rgb: var(--ctp-yellow);
  --color-yellow: var(--hex-yellow);
  --color-green-rgb: var(--ctp-green);
  --color-green: var(--hex-green);
  --color-cyan-rgb: var(--ctp-sapphire);
  --color-cyan: var(--hex-sapphire);
  --color-blue-rgb: var(--ctp-blue);
  --color-blue: var(--hex-blue);
  --color-purple-rgb: var(--ctp-mauve);
  --color-purple: var(--hex-mauve);
  --color-pink-rgb: var(--ctp-pink);
  --color-pink: var(--hex-pink);
}`;
}

/**
 * Generates accent selector classes with Sapphire as the default deuteranopia-safe accent.
 *
 * @returns {string}
 */
function compileAccentMappings() {
  return `/* ------------------Selecting Accents------------------- */
:root,
body,
.ctp-full-palette {
  --ctp-accent: var(--ctp-sapphire);
}

.ctp-accent-rosewater {
  --ctp-accent: var(--ctp-rosewater);
}

.ctp-accent-flamingo {
  --ctp-accent: var(--ctp-flamingo);
}

.ctp-accent-pink {
  --ctp-accent: var(--ctp-pink);
}

.ctp-accent-mauve {
  --ctp-accent: var(--ctp-mauve);
}

.ctp-accent-red {
  --ctp-accent: var(--ctp-red);
}

.ctp-accent-maroon {
  --ctp-accent: var(--ctp-maroon);
}

.ctp-accent-peach {
  --ctp-accent: var(--ctp-peach);
}

.ctp-accent-yellow {
  --ctp-accent: var(--ctp-yellow);
}

.ctp-accent-green {
  --ctp-accent: var(--ctp-green);
}

.ctp-accent-teal {
  --ctp-accent: var(--ctp-teal);
}

.ctp-accent-sky {
  --ctp-accent: var(--ctp-sky);
}

.ctp-accent-sapphire {
  --ctp-accent: var(--ctp-sapphire);
}

.ctp-accent-blue {
  --ctp-accent: var(--ctp-blue);
}

.ctp-accent-lavender {
  --ctp-accent: var(--ctp-lavender);
}`;
}

/**
 * Compiles core Obsidian application variables matching Catppuccin and Hakimi accessible tokens.
 *
 * @returns {string}
 */
function compileCoreObsidianVariables() {
  return `/* ------------------Actual Configs-------------------- */
.theme-dark,
.theme-light {
  --background-primary: rgb(var(--ctp-base));
  --background-primary-rgb: var(--ctp-base);
  --background-primary-alt: rgb(var(--ctp-mantle));
  --background-secondary: rgb(var(--ctp-mantle));
  --background-secondary-alt: rgb(var(--ctp-crust));
  --background-modifier-border: rgb(var(--ctp-surface0));
  --background-modifier-form-field: rgb(var(--ctp-crust), 30%);
  --background-modifier-form-field-highlighted: rgb(var(--ctp-crust), 22%);
  --background-modifier-box-shadow: rgb(var(--ctp-crust), 30%);
  --background-modifier-success: rgb(var(--ctp-green), 90%);
  --background-modifier-success-rgb: var(--ctp-green);
  --background-modifier-error: rgb(var(--ctp-red), 90%);
  --background-modifier-error-rgb: var(--ctp-red);
  --background-modifier-error-hover: rgb(var(--ctp-red), 100%);
  --background-modifier-cover: rgb(var(--ctp-crust), 90%);
  --color-accent: rgb(var(--ctp-accent));
  --color-accent-1: rgb(var(--ctp-accent));
  --color-accent-2: rgb(var(--ctp-accent), 90%);
  --text-accent: rgb(var(--ctp-accent));
  --text-accent-hover: rgb(var(--ctp-accent));
  --text-normal: rgb(var(--ctp-text));
  --text-muted: rgb(var(--ctp-subtext0));
  --text-muted-rgb: var(--ctp-subtext0);
  --text-faint: rgb(var(--ctp-overlay1));
  --text-error: rgb(var(--ctp-red));
  --text-error-hover: rgb(var(--ctp-red), 80%);
  --text-highlight-bg: rgb(var(--ctp-rosewater), 100%);
  --text-highlight-bg-active: rgb(var(--ctp-rosewater), 100%);
  --text-selection: rgb(var(--ctp-overlay2), 30%);
  --text-on-accent: rgb(var(--ctp-crust));
  --text-on-accent-inverted: rgb(var(--ctp-crust));
  --interactive-normal: rgb(var(--ctp-surface0));
  --interactive-hover: rgb(var(--ctp-surface1));
  --interactive-accent: rgb(var(--ctp-accent));
  --interactive-accent-rgb: var(--ctp-accent);
  --interactive-accent-hover: rgb(var(--ctp-accent));
  --interactive-success: rgb(var(--ctp-green));
  --scrollbar-active-thumb-bg: rgb(var(--ctp-text), 20%);
  --scrollbar-bg: rgb(var(--ctp-text), 5%);
  --scrollbar-thumb-bg: rgb(var(--ctp-text), 10%);
  --mono-rgb-0: var(--ctp-crust);
  --mono-rgb-100: var(--ctp-text);
  --color-red: rgb(var(--ctp-red));
  --color-green: rgb(var(--ctp-green));
  --color-orange: rgb(var(--ctp-peach));
  --color-yellow: rgb(var(--ctp-yellow));
  --color-cyan: rgb(var(--ctp-sky));
  --color-blue: rgb(var(--ctp-blue));
  --color-purple: rgb(var(--ctp-lavender));
  --color-pink: rgb(var(--ctp-pink));
  --color-base-00: rgb(var(--ctp-crust));
  --color-base-10: rgb(var(--ctp-mantle));
  --color-base-20: rgb(var(--ctp-base));
  --color-base-25: rgb(var(--ctp-surface0));
  --color-base-30: rgb(var(--ctp-surface1));
  --color-base-35: rgb(var(--ctp-surface2));
  --color-base-40: rgb(var(--ctp-overlay0));
  --color-base-50: rgb(var(--ctp-overlay1));
  --color-base-60: rgb(var(--ctp-overlay2));
  --color-base-70: rgb(var(--ctp-subtext0));
  --color-base-100: rgb(var(--ctp-text));
}`;
}

/**
 * Configures dark/light color-scheme and highlight mix blend modes.
 *
 * @returns {string}
 */
function compileColorSchemeAdjustments() {
  return `.theme-dark {
  color-scheme: dark;
  --highlight-mix-blend-mode: lighten;
}

.theme-light {
  color-scheme: light;
  --highlight-mix-blend-mode: darken;
}`;
}
