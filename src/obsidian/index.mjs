import { getThemeTokens } from '../tokens/index.mjs';
import {
  compileChromeStructuralRules,
  compileChromeVariables,
} from './chrome.mjs';
import {
  compileComponentRules,
  compileComponentVariables,
} from './components.mjs';
import { compileFoundationsVariables } from './foundations.mjs';
import {
  compileCodeSyntaxRules,
  compileCodeSyntaxVariables,
} from './syntax.mjs';

export const manifest = {
  name: 'Hakimi Deuteranopia Safe',
  minAppVersion: '1.13.0',
  author: 'hakimi',
  authorUrl: 'https://github.com/zogwosh/hakimi-theme',
};

/**
 * Compiles the complete Obsidian theme.css string in a clean, top-down structure.
 * Purely driven by the unified 3-Tier Semantic Tokens and conforms to Obsidian standards.
 *
 * @param {Object} [_palettes=null] Optional parameter for backwards compatibility
 * @returns {string} Complete compiled theme.css content
 */
export function compileObsidianTheme(_palettes = null) {
  const banner = compileThemeBanner();
  const darkThemeVariables = compileFlavorThemeVariables('dark');
  const lightThemeVariables = compileFlavorThemeVariables('light');
  const chromeRules = compileChromeStructuralRules();
  const syntaxRules = compileCodeSyntaxRules();
  const componentRules = compileComponentRules();

  return `${[
    banner,
    darkThemeVariables,
    lightThemeVariables,
    chromeRules,
    syntaxRules,
    componentRules,
  ].join('\n\n')}\n`;
}

/**
 * Compiles the top-level theme banner and copyright comment.
 *
 * @returns {string}
 */
function compileThemeBanner() {
  return `/* -----------------------------------------------------------------------------
 * Hakimi Deuteranopia Safe Theme for Obsidian
 * Version: 2.0.0
 * Pure Semantic Design Tokens & Deuteranopia Color Calibration
 * Conforms to Obsidian Developer Documentation (https://docs.obsidian.md/Themes)
 * ----------------------------------------------------------------------------- */`;
}

/**
 * Compiles all CSS variables for a specific theme flavor ('dark' | 'light').
 *
 * @param {'dark' | 'light'} flavor
 * @returns {string}
 */
export function compileFlavorThemeVariables(flavor) {
  const tokens = getThemeTokens(flavor);
  const selector = flavor === 'light' ? '.theme-light' : '.theme-dark';

  const declarations = [
    compileFoundationsVariables(tokens),
    compileChromeVariables(tokens),
    compileCodeSyntaxVariables(tokens),
    compileComponentVariables(tokens),
  ].join('\n\n');

  return `${selector} {\n${declarations}\n}`;
}
