import { opacity } from '../colors.mjs';

/**
 * Builds the complete VS Code Workbench UI Colors map from Semantic Tokens.
 *
 * Directly conforms to the official VS Code Theme Color specification:
 * https://code.visualstudio.com/api/references/theme-color
 *
 * Strictly implements the 4 background zones requested:
 * 1. TitleBar & Footer (StatusBar) & Tab Bar Header: identical background (tokens.bg.chrome)
 * 2. Primary SideBar: dedicated background (tokens.bg.sidebar)
 * 3. Left/Right Panels (Bottom Panel & Secondary SideBar/AuxiliaryBar): dedicated background (tokens.bg.panel)
 * 4. Editor Area (Canvas, Active Tab, Breadcrumbs, Sticky Scroll, Gutters): seamless base background (tokens.bg.editor)
 */
export function getWorkbenchColors(tokens) {
  return {
    ...getBaseColors(tokens),
    ...getTextColors(tokens),
    ...getTitleBarAndStatusBarColors(tokens),
    ...getCommandCenterColors(tokens),
    ...getSideBarColors(tokens),
    ...getActivityBarColors(tokens),
    ...getPanelAndAuxiliaryColors(tokens),
    ...getEditorColors(tokens),
    ...getBreadcrumbColors(tokens),
    ...getTabAndGroupColors(tokens),
    ...getListAndTreeColors(tokens),
    ...getControlColors(tokens),
    ...getWidgetColors(tokens),
    ...getNotificationAndMenuColors(tokens),
    ...getPeekViewColors(tokens),
    ...getScrollbarColors(tokens),
    ...getDiffColors(tokens),
    ...getTerminalColors(tokens),
  };
}

function getBaseColors(tokens) {
  return {
    focusBorder: tokens.border.focus,
    foreground: tokens.fg.default,
    disabledForeground: tokens.fg.subtle,
    'widget.shadow': tokens.bg.shadow,
    'widget.border': tokens.border.subtle,
    'surface.border': tokens.border.subtle,
    'selection.background': tokens.bg.selection,
    descriptionForeground: tokens.fg.muted,
    errorForeground: tokens.intent.danger,
    'icon.foreground': tokens.fg.accent,
    'sash.hoverBorder': tokens.border.focus,
    'keybindingLabel.background': tokens.bg.surfaceActive,
    'keybindingLabel.foreground': tokens.fg.default,
    'keybindingLabel.border': tokens.border.subtle,
    'keybindingLabel.bottomBorder': tokens.border.strong,
  };
}

function getTextColors(tokens) {
  return {
    'textBlockQuote.background': tokens.bg.sidebar,
    'textBlockQuote.border': tokens.border.strong,
    'textCodeBlock.background': tokens.bg.panel,
    'textLink.activeForeground': tokens.fg.accent,
    'textLink.foreground': tokens.fg.accent,
    'textPreformat.foreground': tokens.syntax.keyword,
    'textPreformat.background': opacity(tokens.fg.default, 0.1),
    'textSeparator.foreground': tokens.border.subtle,
  };
}

function getTitleBarAndStatusBarColors(tokens) {
  return {
    // TitleBar (Zone 1: Chrome)
    'titleBar.activeBackground': tokens.bg.chrome,
    'titleBar.inactiveBackground': tokens.bg.chrome,
    'titleBar.activeForeground': tokens.fg.default,
    'titleBar.inactiveForeground': tokens.fg.muted,
    'titleBar.border': tokens.border.subtle,

    // Modern UI Shell (Zone 1: Chrome backdrop for floating workbench surfaces)
    'modernUI.shellBackground': tokens.bg.chrome,
    'modernUI.inactiveShellBackground': tokens.bg.chrome,

    // StatusBar (Footer — strictly identical to TitleBar)
    'statusBar.background': tokens.bg.chrome,
    'statusBar.inactiveBackground': tokens.bg.chrome,
    'statusBar.foreground': tokens.fg.default,
    'statusBar.border': tokens.border.subtle,
    'statusBar.focusBorder': tokens.border.focus,
    'statusBar.noFolderBackground': tokens.bg.chrome,
    'statusBar.debuggingBackground': tokens.intent.warning,
    'statusBar.debuggingForeground': tokens.fg.onAccent,
    'statusBarItem.hoverBackground': tokens.bg.surfaceHover,
    'statusBarItem.hoverForeground': tokens.fg.default,
    'statusBarItem.activeBackground': tokens.bg.surfaceActive,
    'statusBarItem.compactHoverBackground': tokens.bg.surfaceHover,
    'statusBarItem.prominentBackground': tokens.bg.surfaceActive,
    'statusBarItem.prominentHoverBackground': tokens.bg.surfaceHover,
    'statusBarItem.remoteBackground': tokens.fg.accent,
    'statusBarItem.remoteForeground': tokens.fg.onAccent,
    'statusBarItem.errorBackground': tokens.intent.danger,
    'statusBarItem.errorForeground': tokens.fg.onAccent,
    'statusBarItem.warningBackground': tokens.intent.warning,
    'statusBarItem.warningForeground': tokens.fg.onAccent,
    'statusBarItem.focusBorder': tokens.border.focus,
  };
}

function getCommandCenterColors(tokens) {
  return {
    'commandCenter.background': opacity(tokens.bg.editor, 0.6),
    'commandCenter.activeBackground': tokens.bg.editor,
    'commandCenter.border': tokens.border.subtle,
    'commandCenter.foreground': tokens.fg.default,
    'commandCenter.activeForeground': tokens.fg.default,
    'commandCenter.inactiveForeground': tokens.fg.muted,
    'commandCenter.inactiveBorder': tokens.border.subtle,
  };
}

function getSideBarColors(tokens) {
  return {
    // Primary SideBar (Zone 2)
    'sideBar.background': tokens.bg.sidebar,
    'sideBar.foreground': tokens.fg.default,
    'sideBar.border': tokens.border.subtle,
    'sideBar.dropBackground': tokens.bg.surfaceActive,
    'sideBarTitle.foreground': tokens.fg.default,
    'sideBarSectionHeader.background': tokens.bg.sidebar,
    'sideBarSectionHeader.foreground': tokens.fg.default,
    'sideBarSectionHeader.border': tokens.border.subtle,
    'sideBarStickyScroll.background': tokens.bg.sidebar,
  };
}

function getActivityBarColors(tokens) {
  return {
    'activityBar.background': tokens.bg.sidebar,
    'activityBar.foreground': tokens.fg.accent,
    'activityBar.inactiveForeground': tokens.fg.muted,
    'activityBar.border': tokens.border.subtle,
    'activityBarBadge.background': tokens.fg.accent,
    'activityBarBadge.foreground': tokens.fg.onAccent,
    'activityBar.activeBorder': tokens.border.focus,
    'activityBar.activeBackground': tokens.bg.surfaceHover,
    'activityBarTop.foreground': tokens.fg.accent,
    'activityBarTop.inactiveForeground': tokens.fg.muted,
    'activityBarTop.activeBorder': tokens.border.focus,
    'modernActivityBarItem.activeBackground': tokens.bg.surfaceActive,
    'modernActivityBarItem.hoverBackground': tokens.bg.surfaceHover,
    'modernActivityBarItem.activeForeground': tokens.fg.default,
    'modernActivityBarItem.hoverForeground': tokens.fg.default,
    'modernActivityBar.border': tokens.border.subtle,
  };
}

function getPanelAndAuxiliaryColors(tokens) {
  return {
    // Bottom Panel & Terminals (Zone 3: Panels)
    'panel.background': tokens.bg.panel,
    'panel.border': tokens.border.subtle,
    'panel.dropBorder': tokens.border.focus,
    'panelInput.border': tokens.border.subtle,
    'panelTitle.activeBorder': tokens.border.focus,
    'panelTitle.activeForeground': tokens.fg.default,
    'panelTitle.inactiveForeground': tokens.fg.muted,
    'panelSection.border': tokens.border.subtle,
    'panelSectionHeader.background': tokens.bg.panel,
    'panelSectionHeader.foreground': tokens.fg.default,
    'panelSectionHeader.border': tokens.border.subtle,

    // Secondary SideBar (Auxiliary Bar / Right Panel) — strictly identical to Panel
    'auxiliaryBar.background': tokens.bg.panel,
    'auxiliaryBar.foreground': tokens.fg.default,
    'auxiliaryBar.border': tokens.border.subtle,
    'auxiliaryBarTitle.foreground': tokens.fg.default,
    'auxiliaryBarSectionHeader.background': tokens.bg.panel,
    'auxiliaryBarSectionHeader.foreground': tokens.fg.default,
    'auxiliaryBarSectionHeader.border': tokens.border.subtle,
  };
}

function getEditorColors(tokens) {
  return {
    // Editor Area (Zone 4)
    'editor.background': tokens.bg.editor,
    'editor.foreground': tokens.fg.default,
    'editorLineNumber.foreground': tokens.fg.subtle,
    'editorLineNumber.activeForeground': tokens.fg.default,
    'editorCursor.foreground': tokens.fg.accent,
    'editor.selectionBackground': tokens.bg.selection,
    'editor.inactiveSelectionBackground': tokens.bg.selectionInactive,
    'editor.selectionHighlightBackground': tokens.bg.selectionInactive,
    'editor.wordHighlightBackground': tokens.bg.selectionInactive,
    'editor.wordHighlightStrongBackground': tokens.bg.selection,
    'editor.findMatchBackground': opacity(tokens.intent.warning, 0.4),
    'editor.findMatchHighlightBackground': opacity(tokens.intent.warning, 0.2),
    'editor.lineHighlightBackground': tokens.bg.lineHighlight,
    'editor.lineHighlightBorder': tokens.border.transparent,
    'editorRuler.foreground': tokens.border.muted,
    'editorOverviewRuler.border': tokens.border.subtle,
    'editorWhitespace.foreground': tokens.border.subtle,
    'editorIndentGuide.background1': tokens.border.muted,
    'editorIndentGuide.activeBackground1': tokens.fg.muted,
    'editorBracketMatch.background': tokens.bg.surfaceActive,
    'editorBracketMatch.border': tokens.border.focus,
    'editorError.foreground': tokens.intent.danger,
    'editorWarning.foreground': tokens.intent.warning,
    'editorInfo.foreground': tokens.intent.info,
    'editorGutter.background': tokens.bg.editor,
    'editorGutter.modifiedBackground': tokens.intent.warning,
    'editorGutter.addedBackground': tokens.intent.success,
    'editorGutter.deletedBackground': tokens.intent.danger,
    'editorStickyScroll.background': tokens.bg.editor,
    'editorStickyScrollHover.background': tokens.bg.surfaceHover,
  };
}

function getBreadcrumbColors(tokens) {
  return {
    'breadcrumb.background': tokens.bg.editor,
    'breadcrumb.foreground': tokens.fg.muted,
    'breadcrumb.focusForeground': tokens.fg.default,
    'breadcrumb.activeSelectionForeground': tokens.fg.accent,
    'breadcrumbPicker.background': tokens.bg.panel,
  };
}

function getTabAndGroupColors(tokens) {
  return {
    // Editor Group Containers (Tab strip seamlessly merges with TitleBar chrome)
    'editorGroup.border': tokens.border.subtle,
    'editorGroup.emptyBackground': tokens.bg.editor,
    'editorGroupHeader.tabsBackground': tokens.bg.chrome,
    'editorGroupHeader.connectedTabsBackground': tokens.bg.chrome,
    'editorGroupHeader.noTabsBackground': tokens.bg.editor,
    'editorGroupHeader.tabsBorder': tokens.border.transparent,

    // Active Tab: seamlessly part of the editor canvas, distinct from the chrome strip
    'tab.activeBackground': tokens.bg.editor,
    'tab.activeForeground': tokens.fg.default,
    'tab.activeBorder': tokens.border.transparent,
    'tab.activeBorderTop': tokens.border.focus,
    'tab.selectedBorderTop': opacity(tokens.fg.accent, 0.7),

    // Inactive Tabs: clean unbordered items on the chrome strip
    'tab.inactiveBackground': tokens.bg.chrome,
    'tab.inactiveForeground': tokens.fg.muted,

    // Unfocused Active Tab
    'tab.unfocusedActiveBackground': tokens.bg.editor,
    'tab.unfocusedActiveForeground': tokens.fg.muted,
    'tab.unfocusedActiveBorder': tokens.border.transparent,
    'tab.unfocusedActiveBorderTop': tokens.border.transparent,
    'tab.unfocusedHoverBackground': tokens.bg.surfaceHover,

    // Tab Borders & Hovers
    'tab.border': tokens.border.transparent,
    'tab.lastPinnedBorder': tokens.border.subtle,
    'tab.hoverBackground': tokens.bg.surfaceHover,
    'tab.hoverForeground': tokens.fg.default,
  };
}

function getListAndTreeColors(tokens) {
  return {
    'list.activeSelectionBackground': tokens.bg.surfaceActive,
    'list.activeSelectionForeground': tokens.fg.default,
    'list.activeSelectionIconForeground': tokens.fg.default,
    'list.inactiveSelectionBackground': tokens.bg.surfaceSelected,
    'list.inactiveSelectionForeground': tokens.fg.default,
    'list.hoverBackground': tokens.bg.surfaceHover,
    'list.hoverForeground': tokens.fg.default,
    'list.focusBackground': tokens.bg.surfaceHover,
    'list.focusOutline': tokens.border.focus,
    'list.focusAndSelectionOutline': tokens.border.focus,
    'list.highlightForeground': tokens.fg.accent,
    'list.dropBackground': tokens.bg.surfaceActive,
    'tree.indentGuidesStroke': tokens.border.muted,
  };
}

function getControlColors(tokens) {
  return {
    'button.background': tokens.fg.accent,
    'button.foreground': tokens.fg.onAccent,
    'button.border': tokens.border.transparent,
    'button.hoverBackground': opacity(tokens.fg.accent, 0.85),
    'button.secondaryBackground': tokens.bg.surfaceActive,
    'button.secondaryForeground': tokens.fg.default,
    'button.secondaryHoverBackground': tokens.bg.surfaceSelected,
    'checkbox.background': tokens.bg.editor,
    'checkbox.foreground': tokens.fg.accent,
    'checkbox.border': tokens.border.subtle,
    'dropdown.background': tokens.bg.panel,
    'dropdown.foreground': tokens.fg.default,
    'dropdown.border': tokens.border.subtle,
    'dropdown.listBackground': tokens.bg.panel,
    'input.background': tokens.bg.editor,
    'input.foreground': tokens.fg.default,
    'input.border': tokens.border.subtle,
    'input.placeholderForeground': tokens.fg.subtle,
    'inputOption.activeBackground': tokens.bg.surfaceActive,
    'inputOption.activeBorder': tokens.border.focus,
    'inputOption.activeForeground': tokens.fg.default,
    'badge.background': tokens.bg.surfaceActive,
    'badge.foreground': tokens.fg.default,
    'progressBar.background': tokens.fg.accent,
  };
}

function getWidgetColors(tokens) {
  return {
    'editorWidget.background': tokens.bg.panel,
    'editorWidget.border': tokens.border.subtle,
    'editorSuggestWidget.background': tokens.bg.panel,
    'editorSuggestWidget.border': tokens.border.subtle,
    'editorSuggestWidget.foreground': tokens.fg.default,
    'editorSuggestWidget.selectedBackground': tokens.bg.surfaceActive,
    'editorSuggestWidget.highlightForeground': tokens.fg.accent,
    'editorHoverWidget.background': tokens.bg.panel,
    'editorHoverWidget.border': tokens.border.subtle,
    'quickInput.background': tokens.bg.panel,
    'quickInput.foreground': tokens.fg.default,
    'quickInputList.focusBackground': tokens.bg.surfaceActive,
    'quickInputList.focusForeground': tokens.fg.default,
    'pickerGroup.border': tokens.border.subtle,
    'pickerGroup.foreground': tokens.fg.muted,
  };
}

function getNotificationAndMenuColors(tokens) {
  return {
    'notifications.background': tokens.bg.panel,
    'notifications.border': tokens.border.subtle,
    'notifications.foreground': tokens.fg.default,
    'notificationCenterHeader.background': tokens.bg.panel,
    'notificationCenterHeader.foreground': tokens.fg.default,
    'menu.background': tokens.bg.panel,
    'menu.border': tokens.border.subtle,
    'menu.selectionBackground': tokens.bg.surfaceActive,
    'menu.selectionForeground': tokens.fg.default,
  };
}

function getPeekViewColors(tokens) {
  return {
    'peekView.border': tokens.border.focus,
    'peekViewEditor.background': tokens.bg.panel,
    'peekViewEditorGutter.background': tokens.bg.panel,
    'peekViewEditor.matchHighlightBackground': opacity(
      tokens.intent.warning,
      0.3,
    ),
    'peekViewResult.background': tokens.bg.panel,
    'peekViewResult.fileForeground': tokens.fg.default,
    'peekViewResult.lineForeground': tokens.fg.muted,
    'peekViewResult.matchHighlightBackground': opacity(
      tokens.intent.warning,
      0.3,
    ),
    'peekViewResult.selectionBackground': tokens.bg.surfaceActive,
    'peekViewResult.selectionForeground': tokens.fg.default,
    'peekViewTitle.background': tokens.bg.chrome,
    'peekViewTitleDescription.foreground': tokens.fg.muted,
    'peekViewTitleLabel.foreground': tokens.fg.default,
  };
}

function getScrollbarColors(tokens) {
  return {
    'scrollbar.shadow': tokens.bg.shadow,
    'scrollbarSlider.background': opacity(tokens.fg.muted, 0.2),
    'scrollbarSlider.hoverBackground': opacity(tokens.fg.muted, 0.35),
    'scrollbarSlider.activeBackground': opacity(tokens.fg.muted, 0.5),
  };
}

function getDiffColors(tokens) {
  return {
    'diffEditor.insertedTextBackground': opacity(tokens.intent.success, 0.18),
    'diffEditor.removedTextBackground': opacity(tokens.intent.danger, 0.18),
    'diffEditor.insertedLineBackground': opacity(tokens.intent.success, 0.1),
    'diffEditor.removedLineBackground': opacity(tokens.intent.danger, 0.1),
  };
}

function getTerminalColors(tokens) {
  return {
    'terminal.background': tokens.terminal.background,
    'terminal.foreground': tokens.terminal.foreground,
    'terminalCursor.foreground': tokens.fg.accent,
    'terminal.tab.activeBorder': tokens.border.focus,
    'terminal.inactiveSelectionBackground': opacity(tokens.fg.accent, 0.15),
    'terminal.ansiBlack': tokens.terminal.ansiBlack,
    'terminal.ansiRed': tokens.terminal.ansiRed,
    'terminal.ansiGreen': tokens.terminal.ansiGreen,
    'terminal.ansiYellow': tokens.terminal.ansiYellow,
    'terminal.ansiBlue': tokens.terminal.ansiBlue,
    'terminal.ansiMagenta': tokens.terminal.ansiMagenta,
    'terminal.ansiCyan': tokens.terminal.ansiCyan,
    'terminal.ansiWhite': tokens.terminal.ansiWhite,
    'terminal.ansiBrightBlack': tokens.terminal.ansiBrightBlack,
    'terminal.ansiBrightRed': tokens.terminal.ansiBrightRed,
    'terminal.ansiBrightGreen': tokens.terminal.ansiBrightGreen,
    'terminal.ansiBrightYellow': tokens.terminal.ansiBrightYellow,
    'terminal.ansiBrightBlue': tokens.terminal.ansiBrightBlue,
    'terminal.ansiBrightMagenta': tokens.terminal.ansiBrightMagenta,
    'terminal.ansiBrightCyan': tokens.terminal.ansiBrightCyan,
    'terminal.ansiBrightWhite': tokens.terminal.ansiBrightWhite,
  };
}
