import {
  ANCHOR_EDITOR_BACKGROUND,
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  TERMINAL_ANSI_PALETTES,
} from './primitives.mjs';
import { deriveWorkbenchBackgrounds } from './derivation.mjs';
import { createSemanticTokens } from './semanticTokens.mjs';

/**
 * Gets the complete Semantic Token object for the given mode ('dark' | 'light').
 */
export function getThemeTokens(mode = 'dark') {
  const normalizedMode = mode === 'light' ? 'light' : 'dark';
  const editorBaseHex = ANCHOR_EDITOR_BACKGROUND[normalizedMode];
  const backgrounds = deriveWorkbenchBackgrounds(editorBaseHex, normalizedMode);
  const neutrals = NEUTRAL_PALETTES[normalizedMode];
  const chromatics = CHROMATIC_PALETTES[normalizedMode];
  const terminalAnsi = TERMINAL_ANSI_PALETTES[normalizedMode];

  return createSemanticTokens({
    mode: normalizedMode,
    backgrounds,
    neutrals,
    chromatics,
    terminalAnsi,
  });
}
