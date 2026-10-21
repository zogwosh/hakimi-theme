import { opacity } from '../colors.mjs';

/**
 * Builds the complete Zed Workbench UI Colors map from Semantic Tokens.
 * 
 * Conforms to the official Zed Theme Schema:
 * https://zed.dev/schema/themes/v0.2.0.json
 * 
 * Strictly implements the 4-zone spatial background model:
 * 1. TitleBar & StatusBar & TabBar Header: tokens.bg.chrome (Zone 1: Chrome Frame)
 * 2. Primary SideBar / Project Panel: tokens.bg.sidebar (Zone 2: Primary Navigation)
 * 3. Bottom Panel / Auxiliary & Terminal: tokens.bg.panel (Zone 3: Output & Auxiliary)
 * 4. Editor Area & Active Connected Tab: tokens.bg.editor (Zone 4: Editor Canvas)
 */
export function getZedWorkbenchColors(tokens) {
  return {
    ...getFrameAndChromeColors(tokens),
    ...getEditorColors(tokens),
    ...getPanelColors(tokens),
    ...getElementColors(tokens),
    ...getTextAndIconColors(tokens),
    ...getBorderColors(tokens),
    ...getSearchAndHighlightColors(tokens),
    ...getDiagnosticsAndGitColors(tokens),
    ...getTerminalColors(tokens),
    ...getVimColors(tokens),
    ...getPlayerColors(tokens),
  };
}

/**
 * Zone 1: External Frame, TitleBar, StatusBar, TabBar Header.
 */
function getFrameAndChromeColors(tokens) {
  return {
    'status_bar.background': tokens.bg.chrome,
    'title_bar.background': tokens.bg.chrome,
    'title_bar.inactive_background': tokens.bg.chrome,
    'tab_bar.background': tokens.bg.chrome,
    'tab.inactive_background': tokens.bg.chrome,
    'tab.active_background': tokens.bg.editor, // Connected seamless tab
    'toolbar.background': tokens.bg.editor,
    'scrollbar.track.background': tokens.bg.chrome,
    'scrollbar.track.border': tokens.border.subtle,
    'scrollbar.thumb.background': tokens.bg.surfaceActive,
    'scrollbar.thumb.hover_background': tokens.bg.surfaceSelected,
    'scrollbar.thumb.active_background': null,
    'scrollbar.thumb.border': null,
  };
}

/**
 * Zone 4: Main Editor Canvas and gutter surfaces.
 */
function getEditorColors(tokens) {
  return {
    'editor.background': tokens.bg.editor,
    'editor.gutter.background': tokens.bg.editor,
    'editor.subheader.background': tokens.bg.panel,
    'editor.foreground': tokens.fg.default,
    'editor.active_line.background': tokens.bg.lineHighlight,
    'editor.highlighted_line.background': null,
    'editor.line_number': tokens.fg.muted,
    'editor.active_line_number': tokens.fg.accent,
    'editor.invisible': opacity(tokens.fg.muted, 0.35),
    'editor.wrap_guide': tokens.border.subtle,
    'editor.active_wrap_guide': tokens.border.strong,
    'editor.indent_guide': tokens.border.subtle,
    'editor.indent_guide_active': tokens.border.strong,
    'editor.document_highlight.bracket_background': opacity(tokens.fg.accent, 0.15),
    'editor.document_highlight.read_background': opacity(tokens.syntax.string, 0.18),
    'editor.document_highlight.write_background': opacity(tokens.syntax.type, 0.18),
    'editor.debugger_active_line.background': opacity(tokens.syntax.number, 0.1),
    'minimap.thumb.background': opacity(tokens.fg.accent, 0.2),
    'minimap.thumb.hover_background': opacity(tokens.fg.accent, 0.35),
    'minimap.thumb.active_background': opacity(tokens.fg.accent, 0.5),
    'minimap.thumb.border': null,
  };
}

/**
 * Zones 2 & 3: Primary SideBar (Project panel) and Bottom/Auxiliary panels.
 */
function getPanelColors(tokens) {
  return {
    background: tokens.bg.sidebar,
    'surface.background': tokens.bg.sidebar,
    'panel.background': tokens.bg.sidebar,
    'panel.overlay_background': tokens.bg.sidebar,
    'elevated_surface.background': tokens.bg.panel,
    'panel.focused_border': tokens.border.focus,
    'panel.indent_guide': tokens.border.subtle,
    'panel.indent_guide_active': tokens.border.strong,
    'panel.indent_guide_hover': tokens.border.focus,
  };
}

/**
 * Interactive elements, hover states, and selections.
 */
function getElementColors(tokens) {
  return {
    'background.appearance': 'opaque',
    'element.background': tokens.bg.chrome,
    'element.hover': tokens.bg.surfaceHover,
    'element.active': tokens.bg.surfaceActive,
    'element.selected': tokens.bg.surfaceSelected,
    'element.disabled': opacity(tokens.fg.subtle, 0.2),
    'ghost_element.background': tokens.border.transparent,
    'ghost_element.hover': tokens.bg.surfaceHover,
    'ghost_element.active': tokens.bg.surfaceActive,
    'ghost_element.selected': tokens.bg.surfaceSelected,
    'ghost_element.disabled': tokens.border.transparent,
    'drop_target.background': opacity(tokens.fg.accent, 0.2),
  };
}

/**
 * Typography and Icon foreground roles.
 */
function getTextAndIconColors(tokens) {
  return {
    text: tokens.fg.default,
    'text.muted': tokens.fg.muted,
    'text.placeholder': tokens.fg.subtle,
    'text.disabled': tokens.fg.subtle,
    'text.accent': tokens.fg.accent,
    icon: tokens.fg.default,
    'icon.muted': tokens.fg.muted,
    'icon.placeholder': tokens.fg.subtle,
    'icon.disabled': tokens.fg.subtle,
    'icon.accent': tokens.fg.accent,
    'link_text.hover': tokens.fg.accent,
  };
}

/**
 * Pane and widget demarcation borders.
 */
function getBorderColors(tokens) {
  return {
    border: tokens.border.subtle,
    'border.variant': tokens.border.muted,
    'border.focused': tokens.border.focus,
    'border.selected': tokens.border.focus,
    'border.transparent': tokens.border.transparent,
    'border.disabled': tokens.border.subtle,
    'pane.focused_border': tokens.border.focus,
    'pane_group.border': tokens.border.subtle,
  };
}

/**
 * Search matches and in-editor highlights.
 */
function getSearchAndHighlightColors(tokens) {
  return {
    'search.match_background': opacity(tokens.syntax.property, 0.3),
    'search.active_match_background': opacity(tokens.intent.warning, 0.35),
  };
}

/**
 * Intent states, diagnostics, and version control status indicators.
 */
function getDiagnosticsAndGitColors(tokens) {
  return {
    // Intent & Diagnostics
    info: tokens.intent.info,
    'info.border': tokens.intent.info,
    'info.background': opacity(tokens.intent.info, 0.15),
    warning: tokens.intent.warning,
    'warning.border': tokens.intent.warning,
    'warning.background': opacity(tokens.intent.warning, 0.15),
    error: tokens.intent.danger,
    'error.border': tokens.intent.danger,
    'error.background': opacity(tokens.intent.danger, 0.15),
    success: tokens.intent.success,
    'success.border': tokens.intent.success,
    'success.background': opacity(tokens.intent.success, 0.15),
    unreachable: tokens.intent.danger,
    'unreachable.border': tokens.intent.danger,
    'unreachable.background': opacity(tokens.intent.danger, 0.15),
    hint: tokens.fg.muted,
    'hint.border': tokens.border.subtle,
    'hint.background': tokens.bg.panel,
    predictive: tokens.fg.subtle,
    'predictive.border': tokens.border.subtle,
    'predictive.background': tokens.bg.panel,

    // File statuses
    created: tokens.intent.success,
    'created.border': tokens.intent.success,
    'created.background': opacity(tokens.intent.success, 0.15),
    deleted: tokens.intent.danger,
    'deleted.border': tokens.intent.danger,
    'deleted.background': opacity(tokens.intent.danger, 0.15),
    modified: tokens.intent.warning,
    'modified.border': tokens.intent.warning,
    'modified.background': opacity(tokens.intent.warning, 0.15),
    conflict: tokens.syntax.number,
    'conflict.border': tokens.syntax.number,
    'conflict.background': opacity(tokens.syntax.number, 0.15),
    renamed: tokens.fg.accent,
    'renamed.border': tokens.fg.accent,
    'renamed.background': opacity(tokens.fg.accent, 0.15),
    hidden: tokens.fg.subtle,
    'hidden.border': tokens.border.subtle,
    'hidden.background': tokens.bg.panel,
    ignored: tokens.fg.subtle,
    'ignored.border': tokens.border.subtle,
    'ignored.background': opacity(tokens.fg.subtle, 0.15),

    // Version control markers
    'version_control.added': tokens.intent.success,
    'version_control.deleted': tokens.intent.danger,
    'version_control.modified': tokens.intent.warning,
    'version_control.renamed': tokens.fg.accent,
    'version_control.conflict': tokens.syntax.number,
    'version_control.conflict_marker.ours': opacity(tokens.intent.success, 0.2),
    'version_control.conflict_marker.theirs': opacity(tokens.fg.accent, 0.2),
    'version_control.ignored': tokens.fg.subtle,
    'debugger.accent': tokens.intent.danger,
  };
}

/**
 * ANSI 16-color Terminal Palette unified with VS Code.
 */
function getTerminalColors(tokens) {
  const { terminal } = tokens;

  return {
    'terminal.background': terminal.background,
    'terminal.ansi.background': terminal.background,
    'terminal.foreground': terminal.foreground,
    'terminal.dim_foreground': tokens.fg.subtle,
    'terminal.bright_foreground': tokens.fg.highContrast,
    'terminal.ansi.black': terminal.ansiBlack,
    'terminal.ansi.white': terminal.ansiWhite,
    'terminal.ansi.red': terminal.ansiRed,
    'terminal.ansi.green': terminal.ansiGreen,
    'terminal.ansi.yellow': terminal.ansiYellow,
    'terminal.ansi.blue': terminal.ansiBlue,
    'terminal.ansi.magenta': terminal.ansiMagenta,
    'terminal.ansi.cyan': terminal.ansiCyan,
    'terminal.ansi.bright_black': terminal.ansiBrightBlack,
    'terminal.ansi.bright_white': terminal.ansiBrightWhite,
    'terminal.ansi.bright_red': terminal.ansiBrightRed,
    'terminal.ansi.bright_green': terminal.ansiBrightGreen,
    'terminal.ansi.bright_yellow': terminal.ansiBrightYellow,
    'terminal.ansi.bright_blue': terminal.ansiBrightBlue,
    'terminal.ansi.bright_magenta': terminal.ansiBrightMagenta,
    'terminal.ansi.bright_cyan': terminal.ansiBrightCyan,
    'terminal.ansi.dim_black': terminal.ansiBlack,
    'terminal.ansi.dim_white': terminal.ansiBrightBlack,
    'terminal.ansi.dim_red': terminal.ansiRed,
    'terminal.ansi.dim_green': terminal.ansiGreen,
    'terminal.ansi.dim_yellow': terminal.ansiYellow,
    'terminal.ansi.dim_blue': terminal.ansiBlue,
    'terminal.ansi.dim_magenta': terminal.ansiMagenta,
    'terminal.ansi.dim_cyan': terminal.ansiCyan,
  };
}

/**
 * Vim and Helix modal editing status indicators.
 */
function getVimColors(tokens) {
  return {
    'vim.mode.text': tokens.fg.onAccent,
    'vim.normal.foreground': tokens.fg.onAccent,
    'vim.normal.background': tokens.fg.accent,
    'vim.helix_normal.foreground': tokens.fg.onAccent,
    'vim.helix_normal.background': tokens.fg.accent,
    'vim.visual.foreground': tokens.fg.onAccent,
    'vim.visual.background': tokens.syntax.keyword,
    'vim.visual_line.foreground': tokens.fg.onAccent,
    'vim.visual_line.background': tokens.syntax.keyword,
    'vim.visual_block.foreground': tokens.fg.onAccent,
    'vim.visual_block.background': tokens.syntax.keyword,
    'vim.helix_select.foreground': tokens.fg.onAccent,
    'vim.helix_select.background': tokens.syntax.keyword,
    'vim.insert.foreground': tokens.fg.onAccent,
    'vim.insert.background': tokens.intent.success,
    'vim.replace.foreground': tokens.fg.onAccent,
    'vim.replace.background': tokens.intent.danger,
  };
}

/**
 * Multi-user collaboration player colors and palette accents.
 * Calibrated specifically for deuteranopia discrimination.
 */
function getPlayerColors(tokens) {
  const isDark = tokens.mode === 'dark';
  const deutanRainbow = [
    tokens.intent.danger,
    tokens.syntax.number,
    tokens.syntax.type,
    tokens.syntax.property,
    tokens.fg.accent,
    tokens.syntax.keyword,
    tokens.syntax.string,
  ];

  return {
    accents: deutanRainbow,
    players: deutanRainbow.map((color) => ({
      cursor: color,
      selection: opacity(color, isDark ? 0.28 : 0.22),
      background: color,
    })),
  };
}
