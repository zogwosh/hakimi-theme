import { getThemeTokens } from '../tokens/index.mjs';
import { getWorkbenchColors } from './workbenchColors.mjs';
import { getSyntaxHighlighting } from './syntaxHighlighting.mjs';

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

/**
 * Compiles a VS Code theme JSON object for the given flavor ('light' | 'dark').
 * Uses pure Semantic Tokens and Workbench/Syntax mappings conforming to VS Code specifications.
 */
export function compileTheme(flavor) {
  const isLight = flavor === 'light';
  const tokens = getThemeTokens(flavor);
  const colors = getWorkbenchColors(tokens);
  const { tokenColors, semanticTokenColors } = getSyntaxHighlighting(tokens);

  return {
    name: `Hakimi Deuteranopia ${isLight ? 'Light' : 'Dark'}`,
    type: isLight ? 'light' : 'dark',
    colors,
    semanticHighlighting: true,
    semanticTokenColors,
    tokenColors,
  };
}
