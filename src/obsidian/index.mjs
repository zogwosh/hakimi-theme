import { SYNTAX_PALETTE } from '../syntaxPalette.mjs';
import { compileAppVariables } from './appVariables.mjs';
import { compileComponentStyles } from './components.mjs';
import { compileLayoutStyles } from './layout.mjs';
import { compileObsidianPaletteVariables } from './paletteVars.mjs';
import { compileStyleSettings } from './styleSettings.mjs';
import { compileObsidianSyntaxStyles } from './syntax.mjs';
import { compileTypographyStyles } from './typography.mjs';
import { compileVendorStyles } from './vendors.mjs';

export const manifest = {
  name: 'Hakimi Deuteranopia Safe',
  minAppVersion: '1.13.0',
  author: 'hakimi',
  authorUrl: 'https://github.com/zogwosh/hakimi-theme',
};

/**
 * Assembles the complete Obsidian theme.css string in a clean, top-down structure.
 *
 * @param {Object} palettes Deuteranopia-safe palettes with light and dark flavors
 * @param {Object} [syntaxPalettes=SYNTAX_PALETTE] Deuteranopia-safe syntax palettes
 * @returns {string} Complete compiled theme.css content
 */
export function compileObsidianTheme(
  palettes,
  syntaxPalettes = SYNTAX_PALETTE,
) {
  return `${[
    '/* Hakimi Deuteranopia Safe Theme for Obsidian */',
    compileAppVariables(),
    compileStyleSettings(),
    compileObsidianPaletteVariables(palettes),
    compileObsidianSyntaxStyles(syntaxPalettes),
    compileTypographyStyles(),
    compileComponentStyles(),
    compileLayoutStyles(),
    compileVendorStyles(),
  ].join('\n\n')}\n`;
}
