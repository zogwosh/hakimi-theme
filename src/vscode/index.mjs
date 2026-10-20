// Aligned with catppuccin-vsc/src/theme/index.ts
import { SYNTAX_PALETTE } from '../syntaxPalette.mjs';
import { getSemanticTokens } from './semanticTokens.mjs';
import { getTokenColors } from './tokenColors.mjs';
import { getUiColors } from './uiColors.mjs';

export const manifest = {
  publisher: 'hakimi',
  displayName: 'Hakimi Deuteranopia Safe',
  description:
    'A VSCode theme extension optimized specifically for deuteranopia (green-blindness) accessibility (Light and Dark versions)',
  engines: {
    vscode: '^1.80.0',
  },
  categories: ['Themes'],
  keywords: [
    'colorblind',
    'accessibility',
    'deuteranopia',
    'deutan',
    'theme',
    'colorblind-safe',
    'accessible',
  ],
  icon: 'images/icon.png',
  contributes: {
    themes: [
      {
        label: 'Hakimi Deuteranopia Light',
        uiTheme: 'vs',
        path: './themes/hakimi-deuteranopia-light.json',
      },
      {
        label: 'Hakimi Deuteranopia Dark',
        uiTheme: 'vs-dark',
        path: './themes/hakimi-deuteranopia-dark.json',
      },
    ],
  },
  files: ['themes/*.json', 'images/icon.png', 'README.md', 'LICENSE'],
};

export const defaultOptions = {
  accent: 'sapphire',
  boldKeywords: true,
  italicComments: true,
  italicKeywords: true,
  workbenchMode: 'default',
  bracketMode: 'rainbow',
  extraBordersEnabled: false,
};

export const compileTheme = (flavor, palette, options = defaultOptions) => {
  const isLatte = flavor === 'light';
  const paletteAnsi = {
    normal: {
      black: isLatte ? palette.subtext1 : palette.surface1,
      red: palette.red,
      green: palette.green,
      yellow: palette.yellow,
      blue: palette.blue,
      magenta: palette.pink,
      cyan: palette.teal,
      white: isLatte ? palette.surface2 : palette.subtext0,
    },
    bright: {
      black: isLatte ? palette.subtext0 : palette.surface2,
      red: palette.red,
      green: palette.green,
      yellow: palette.yellow,
      blue: palette.blue,
      magenta: palette.pink,
      cyan: palette.teal,
      white: isLatte ? palette.surface1 : palette.subtext1,
    },
  };

  const context = {
    flavor,
    palette,
    paletteAnsi,
    options,
    isLatte,
  };

  const syntaxContext = {
    ...context,
    palette: SYNTAX_PALETTE[flavor],
  };

  return {
    name: `Hakimi Deuteranopia ${isLatte ? 'Light' : 'Dark'}`,
    type: isLatte ? 'light' : 'dark',
    colors: getUiColors(context),
    semanticHighlighting: true,
    semanticTokenColors: getSemanticTokens(syntaxContext),
    tokenColors: getTokenColors(syntaxContext),
  };
};
