import { hexToRgb, rgbToHsl } from '../colors.mjs';

/**
 * Compiles foundational CSS variables for Obsidian for a given theme mode.
 * Conforms to the Obsidian Developer Documentation (Foundations: Colors, Backgrounds, Text).
 *
 * @param {import('../tokens/index.mjs').ThemeTokens} tokens
 * @returns {string} CSS declarations for the theme flavor
 */
export function compileFoundationsVariables(tokens) {
  const isDark = tokens.mode === 'dark';
  const accentChannels = formatRgbChannels(tokens.fg.accent);
  const accentHsl = computeAccentHsl(tokens.fg.accent);
  const accentHover = isDark ? '#79b8ff' : '#0842a0';

  return [
    '  /* --- Accent Colors & Channels --- */',
    `  --accent-h: ${accentHsl.h.toFixed(1)};`,
    `  --accent-s: ${accentHsl.s.toFixed(1)}%;`,
    `  --accent-l: ${accentHsl.l.toFixed(1)}%;`,
    `  --color-accent: ${tokens.fg.accent};`,
    `  --color-accent-1: ${accentHover};`,
    `  --color-accent-2: ${tokens.border.focus};`,
    `  --interactive-accent: ${tokens.fg.accent};`,
    `  --interactive-accent-hover: ${accentHover};`,
    `  --interactive-accent-rgb: ${accentChannels};`,
    '',
    '  /* --- Four-Zone Spatial Backgrounds --- */',
    `  --background-primary: ${tokens.bg.editor};`,
    `  --background-primary-alt: ${isDark ? '#242f35' : '#fce4cf'};`,
    `  --background-secondary: ${tokens.bg.sidebar};`,
    `  --background-secondary-alt: ${tokens.bg.chrome};`,
    `  --background-modifier-hover: ${tokens.bg.surfaceHover};`,
    `  --background-modifier-active-hover: ${tokens.bg.surfaceActive};`,
    `  --background-modifier-selected: ${tokens.bg.surfaceSelected};`,
    `  --background-modifier-box-shadow: ${tokens.bg.shadow};`,
    `  --background-modifier-form-field: ${tokens.bg.surfaceActive};`,
    `  --background-modifier-form-field-highlighted: ${tokens.bg.surfaceSelected};`,
    '',
    '  /* --- Borders & Focus Rings --- */',
    `  --background-modifier-border: ${tokens.border.subtle};`,
    `  --background-modifier-border-hover: ${tokens.border.strong};`,
    `  --background-modifier-border-focus: ${tokens.border.focus};`,
    `  --divider-color: ${tokens.border.subtle};`,
    `  --divider-color-hover: ${tokens.border.strong};`,
    '',
    '  /* --- Typography & Foregrounds --- */',
    `  --text-normal: ${tokens.fg.default};`,
    `  --text-muted: ${tokens.fg.muted};`,
    `  --text-faint: ${tokens.fg.subtle};`,
    `  --text-on-accent: ${tokens.fg.onAccent};`,
    `  --text-on-accent-inverted: ${tokens.fg.default};`,
    `  --text-selection: ${tokens.fg.highContrast};`,
    `  --text-highlight-bg: ${tokens.bg.selection};`,
    `  --text-highlight-bg-active: ${tokens.bg.selectionInactive};`,
    `  --text-accent: ${tokens.fg.accent};`,
    `  --text-accent-hover: ${accentHover};`,
    `  --caret-color: ${tokens.fg.accent};`,
    '',
    '  /* --- Neutral Base Scale (--color-base-*) --- */',
    compileBaseColorScale(tokens, isDark),
    '',
    '  /* --- Extended Semantic Colors & -rgb Channels --- */',
    compileExtendedColors(tokens),
  ].join('\n');
}

/**
 * Compiles the 12-step official Obsidian neutral base scale.
 *
 * @param {import('../tokens/index.mjs').ThemeTokens} tokens
 * @param {boolean} isDark
 * @returns {string}
 */
function compileBaseColorScale(tokens, isDark) {
  const scale = isDark
    ? {
        '00': tokens.bg.chrome,
        '05': '#1e272c',
        10: tokens.bg.chrome,
        20: tokens.bg.sidebar,
        25: tokens.bg.editor,
        30: '#2c3940',
        35: '#324149',
        40: tokens.border.subtle,
        50: tokens.border.muted,
        60: tokens.fg.subtle,
        70: tokens.fg.muted,
        100: tokens.fg.default,
      }
    : {
        '00': tokens.bg.editor,
        '05': '#fae4d1',
        10: tokens.bg.sidebar,
        20: '#f0d9c4',
        25: tokens.bg.chrome,
        30: '#e5ccb6',
        35: '#dcc0a8',
        40: tokens.border.subtle,
        50: tokens.border.muted,
        60: tokens.fg.subtle,
        70: tokens.fg.muted,
        100: tokens.fg.default,
      };

  return Object.entries(scale)
    .map(([step, color]) => `  --color-base-${step}: ${color};`)
    .join('\n');
}

/**
 * Compiles official extended functional colors with paired -rgb channel variables.
 *
 * @param {import('../tokens/index.mjs').ThemeTokens} tokens
 * @returns {string}
 */
function compileExtendedColors(tokens) {
  const extendedColorEntries = [
    ['red', tokens.intent.danger],
    ['orange', tokens.syntax.number],
    ['yellow', tokens.intent.warning],
    ['green', tokens.intent.success],
    ['cyan', tokens.intent.info],
    ['blue', tokens.fg.accent],
    ['purple', tokens.syntax.keyword],
    ['pink', tokens.syntax.regex],
  ];

  const declarations = [];
  for (const [name, hex] of extendedColorEntries) {
    const channels = formatRgbChannels(hex);
    declarations.push(`  --color-${name}: ${hex};`);
    declarations.push(`  --color-${name}-rgb: ${channels};`);
  }

  // Functional aliases
  declarations.push(`  --background-modifier-error: ${tokens.intent.danger};`);
  declarations.push(
    `  --background-modifier-error-rgb: ${formatRgbChannels(tokens.intent.danger)};`,
  );
  declarations.push(
    `  --background-modifier-success: ${tokens.intent.success};`,
  );
  declarations.push(
    `  --background-modifier-success-rgb: ${formatRgbChannels(tokens.intent.success)};`,
  );
  declarations.push(`  --text-error: ${tokens.intent.danger};`);
  declarations.push(`  --text-warning: ${tokens.intent.warning};`);
  declarations.push(`  --text-success: ${tokens.intent.success};`);

  return declarations.join('\n');
}

/**
 * Formats a hex color string into 'r, g, b' channel values.
 *
 * @param {string} hex
 * @returns {string}
 */
export function formatRgbChannels(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
}

/**
 * Computes HSL parameters for the given hex color.
 *
 * @param {string} hex
 * @returns {{ h: number, s: number, l: number }}
 */
function computeAccentHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}
