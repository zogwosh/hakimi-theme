import { opacity } from '../colors.mjs';

/**
 * Creates the complete Semantic Token tree for a specific theme mode.
 * 
 * Organizes tokens into intentional semantic layers:
 * - bg: Background surfaces (including the 4 derived workbench zones)
 * - fg: Foregrounds and typography
 * - border: Outline and demarcation roles
 * - intent: State and feedback signals (info, success, warning, danger)
 * - syntax: Code syntax highlighting tokens
 * - terminal: ANSI terminal colors
 */
export function createSemanticTokens({ mode, backgrounds, neutrals, chromatics }) {
  const isDark = mode === 'dark';

  return {
    mode,
    bg: createBackgroundTokens(backgrounds, chromatics, isDark),
    fg: createForegroundTokens(neutrals, chromatics, isDark),
    border: createBorderTokens(neutrals, chromatics),
    intent: createIntentTokens(chromatics),
    syntax: createSyntaxTokens(chromatics, neutrals),
    terminal: createTerminalTokens(backgrounds, neutrals, chromatics),
  };
}

function createBackgroundTokens(backgrounds, chromatics, isDark) {
  return {
    editor: backgrounds.editor,
    chrome: backgrounds.chrome,       // TitleBar & StatusBar
    sidebar: backgrounds.sidebar,
    panel: backgrounds.panel,
    surfaceHover: opacity(isDark ? '#ffffff' : '#000000', isDark ? 0.05 : 0.04),
    surfaceActive: opacity(isDark ? '#ffffff' : '#000000', isDark ? 0.09 : 0.08),
    surfaceSelected: opacity(isDark ? '#ffffff' : '#000000', isDark ? 0.07 : 0.06),
    surfaceElevated: backgrounds.panel,
    selection: opacity(chromatics.blue, isDark ? 0.35 : 0.25),
    selectionInactive: opacity(chromatics.blue, isDark ? 0.18 : 0.12),
    lineHighlight: opacity(isDark ? '#ffffff' : '#000000', isDark ? 0.04 : 0.03),
    shadow: opacity('#000000', isDark ? 0.3 : 0.12),
  };
}

function createForegroundTokens(neutrals, chromatics, isDark) {
  return {
    default: neutrals.textDefault,
    highContrast: neutrals.textHighContrast,
    muted: neutrals.textMuted,
    subtle: neutrals.textSubtle,
    accent: chromatics.blue,
    onAccent: isDark ? '#141c21' : '#ffffff',
  };
}

function createBorderTokens(neutrals, chromatics) {
  return {
    subtle: neutrals.borderSubtle,
    strong: neutrals.borderStrong,
    muted: neutrals.borderMuted,
    focus: chromatics.blue,
    transparent: '#00000000',
  };
}

function createIntentTokens(chromatics) {
  return {
    info: chromatics.cyan,
    success: chromatics.teal,
    warning: chromatics.amber,
    danger: chromatics.red,
  };
}

function createSyntaxTokens(chromatics, neutrals) {
  return {
    keyword: chromatics.violet,
    function: chromatics.blue,
    type: chromatics.amber,
    string: chromatics.cyan,
    number: chromatics.peach,
    constant: chromatics.peach,
    comment: neutrals.textMuted,
    variable: neutrals.textDefault,
    property: chromatics.teal,
    parameter: chromatics.cyan,
    operator: neutrals.textDefault,
    punctuation: neutrals.textMuted,
    tag: chromatics.violet,
    attribute: chromatics.teal,
    regex: chromatics.peach,
    error: chromatics.red,
  };
}

function createTerminalTokens(backgrounds, neutrals, chromatics) {
  return {
    background: backgrounds.panel,
    foreground: neutrals.textDefault,
    ansiBlack: neutrals.textSubtle,
    ansiRed: chromatics.red,
    ansiGreen: chromatics.teal,
    ansiYellow: chromatics.amber,
    ansiBlue: chromatics.blue,
    ansiMagenta: chromatics.violet,
    ansiCyan: chromatics.cyan,
    ansiWhite: neutrals.textHighContrast,
    ansiBrightBlack: neutrals.textMuted,
    ansiBrightRed: chromatics.red,
    ansiBrightGreen: chromatics.teal,
    ansiBrightYellow: chromatics.amber,
    ansiBrightBlue: chromatics.blue,
    ansiBrightMagenta: chromatics.violet,
    ansiBrightCyan: chromatics.cyan,
    ansiBrightWhite: neutrals.textHighContrast,
  };
}
