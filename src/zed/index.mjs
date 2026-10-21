import { getThemeTokens } from '../tokens/index.mjs';
import { getZedWorkbenchColors } from './workbenchColors.mjs';
import { getZedSyntax } from './syntax.mjs';

export const manifest = {
  id: 'hakimi-deuteranopia-theme',
  name: 'Hakimi Deuteranopia Safe',
  schema_version: 1,
  authors: ['hakimi'],
  description:
    'A deuteranopia-safe theme extension built entirely using accessible colors',
  repository: 'https://github.com/zogwosh/hakimi-theme',
};

/**
 * Compiles a single Zed theme object for the specified mode ('light' | 'dark').
 * 
 * Uses pure Semantic Tokens and Workbench/Tree-sitter captures conforming to Zed's schema:
 * https://zed.dev/schema/themes/v0.2.0.json
 */
export function compileZedTheme(mode = 'dark') {
  const isDark = mode === 'dark';
  const tokens = getThemeTokens(mode);
  const workbenchColors = getZedWorkbenchColors(tokens);
  const syntax = getZedSyntax(tokens);

  return {
    name: `Hakimi Deuteranopia ${isDark ? 'Dark' : 'Light'}`,
    appearance: isDark ? 'dark' : 'light',
    style: {
      ...workbenchColors,
      syntax,
    },
  };
}

/**
 * Compiles the complete Zed theme family containing Light and Dark themes.
 * Accepts optional palettes argument for backwards compatibility with build scripts.
 */
export function compileZedThemeFamily(_palettes = null) {
  return {
    $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
    name: 'Hakimi Deuteranopia Safe',
    author: 'hakimi',
    themes: [
      compileZedTheme('light'),
      compileZedTheme('dark'),
    ],
  };
}
