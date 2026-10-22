/**
 * Hakimi Theme Primitive Tokens
 *
 * Foundational color scales, editor anchor colors, and deuteranopia-safe chromatic palettes.
 * No Catppuccin dependencies.
 */

export const ANCHOR_EDITOR_BACKGROUND = {
  dark: '#263238',
  light: '#ffead8',
};

export const CHROMATIC_PALETTES = {
  dark: {
    blue: '#7ab2ff',
    cyan: '#80dcff',
    teal: '#50c0b6',
    amber: '#e1be6a',
    peach: '#ff9536',
    violet: '#e878cf',
    red: '#ff8585',
  },
  light: {
    blue: '#336fd6',
    cyan: '#005b9f',
    teal: '#00747a',
    amber: '#684100',
    peach: '#7a3f00',
    violet: '#6f1f65',
    red: '#8a1f1f',
  },
};

export const NEUTRAL_PALETTES = {
  dark: {
    textHighContrast: '#f5f7fa',
    textDefault: '#e0e0e0',
    textMuted: '#99a0a8',
    textSubtle: '#6c7880',
    borderStrong: '#41535c',
    borderSubtle: '#33424a',
    borderMuted: '#2b373e',
  },
  light: {
    textHighContrast: '#1f2328',
    textDefault: '#45494c',
    textMuted: '#6f706f',
    textSubtle: '#9e9085',
    borderStrong: '#c4af9d',
    borderSubtle: '#dec9b7',
    borderMuted: '#ebd9c9',
  },
};

/**
 * Calibrated ANSI 16-Color Terminal Palettes (8 Normal + 8 Bright).
 *
 * Implements:
 * 1. Semantic Inversion for Light mode (White slots provide readable dark text).
 * 2. Distinct OKLCH perceptual lightness and chroma gradients between Normal and Bright.
 * 3. Integrates Hakimi signature Peach warm tone.
 * 4. High-discrimination Yellow pair in Light mode (#8f6300 vs #4a2800, ΔE > 0.22).
 */
export const TERMINAL_ANSI_PALETTES = {
  dark: {
    black: '#192226',
    red: '#ff8585',
    green: '#50c0b6',
    yellow: '#e1be6a',
    blue: '#7ab2ff',
    magenta: '#e878cf',
    cyan: '#80dcff',
    white: '#e0e0e0',
    brightBlack: '#99a0a8',
    brightRed: '#ffa3a3',
    brightGreen: '#72ded5',
    brightYellow: '#ff9536',
    brightBlue: '#9ec8ff',
    brightMagenta: '#f0a3e0',
    brightCyan: '#a8e7ff',
    brightWhite: '#ffffff',
  },
  light: {
    black: '#1f2328',
    red: '#8a1f1f',
    green: '#00747a',
    yellow: '#8f6300',
    blue: '#336fd6',
    magenta: '#6f1f65',
    cyan: '#005b9f',
    white: '#45494c',
    brightBlack: '#6f706f',
    brightRed: '#aa2222',
    brightGreen: '#00575c',
    brightYellow: '#4a2800',
    brightBlue: '#255ec4',
    brightMagenta: '#851d78',
    brightCyan: '#004c85',
    brightWhite: '#1f2328',
  },
};
