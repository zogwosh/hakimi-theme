import fs from 'node:fs';
import { hexToRgb, flatten, luminance, contrast } from '../src/colors.mjs';
const palette = JSON.parse(fs.readFileSync('src/palette.json', 'utf8'));

const THEME_FILES = {
  light: 'vscode/themes/hakimi-deuteranopia-light.json',
  dark: 'vscode/themes/hakimi-deuteranopia-dark.json',
};

const REQUIRED_COLORS = [
  'focusBorder',
  'foreground',
  'disabledForeground',
  'descriptionForeground',
  'errorForeground',
  'icon.foreground',
  'window.activeBorder',
  'window.inactiveBorder',
  'widget.border',
  'widget.shadow',
  'textCodeBlock.background',
  'toolbar.hoverBackground',
  'editorActionList.background',
  'selection.background',
  'editor.background',
  'editor.foreground',
  'editorCursor.foreground',
  'editor.lineHighlightBackground',
  'editor.selectionBackground',
  'editorGroup.emptyBackground',
  'editorGroupHeader.noTabsBackground',
  'sideBar.background',
  'sideBar.foreground',
  'sideBarTitle.foreground',
  'sideBarSectionHeader.background',
  'sideBarStickyScroll.background',
  'activityBar.background',
  'activityBar.foreground',
  'activityBarBadge.background',
  'activityBarBadge.foreground',
  'activityBarTop.background',
  'statusBar.background',
  'statusBar.foreground',
  'statusBarItem.errorBackground',
  'statusBarItem.warningBackground',
  'terminal.background',
  'terminal.foreground',
  'terminal.tab.activeBorder',
  'list.activeSelectionBackground',
  'list.activeSelectionForeground',
  'list.inactiveSelectionBackground',
  'list.hoverBackground',
  'list.focusBackground',
  'tree.indentGuidesStroke',
  'scrollbar.shadow',
  'quickInput.background',
  'quickInput.foreground',
  'quickInputTitle.background',
  'quickInputList.focusBackground',
  'quickInputList.focusForeground',
  'keybindingLabel.foreground',
  'dropdown.background',
  'dropdown.foreground',
  'input.background',
  'input.foreground',
  'checkbox.background',
  'inputOption.activeBackground',
  'panel.background',
  'panel.border',
  'panelStickyScroll.background',
  'outputView.background',
  'editorWidget.background',
  'editorHoverWidget.background',
  'editorSuggestWidget.background',
  'editorStickyScroll.background',
  'peekViewEditor.background',
  'peekViewResult.background',
  'debugToolBar.background',
  'menu.background',
  'commandCenter.background',
  'notifications.background',
  'notificationCenterHeader.background',
  'settings.dropdownBackground',
  'settings.textInputBackground',
  'settings.numberInputBackground',
  'settings.checkboxBackground',
  'breadcrumb.background',
  'breadcrumbPicker.background',
  'welcomePage.background',
  'welcomePage.tileBackground',
  'walkThrough.embeddedEditorBackground',
  'inlineChat.background',
  'inlineChatInput.background',
];

const REQUIRED_SEMANTIC = [
  'namespace',
  'class',
  'type',
  'interface',
  'struct',
  'enum',
  'enumMember',
  'typeParameter',
  'function',
  'method',
  'macro',
  'property',
  'property.readonly',
  'variable',
  'variable.readonly',
  'variable.defaultLibrary',
  'parameter',
  'keyword',
  'number',
  'string',
];

const REQUIRED_TOKEN_SCOPES = [
  'comment',
  'string',
  'constant.numeric',
  'constant.character.escape',
  'keyword.control',
  'storage.type',
  'entity.name.namespace',
  'entity.name.function',
  'entity.name.function.member',
  'entity.name.other.preprocessor.macro',
  'variable.other.constant',
  'entity.name.type',
  'entity.name.type.interface',
  'support.class.builtin',
  'variable.parameter',
  'variable.other.property',
  'source variable.other.readwrite',
  'entity.name.tag',
  'entity.other.attribute-name',
  'invalid',
  'support.type.property-name.json',
];

const ANSI_KEYS = [
  'terminal.ansiBlack',
  'terminal.ansiRed',
  'terminal.ansiGreen',
  'terminal.ansiYellow',
  'terminal.ansiBlue',
  'terminal.ansiMagenta',
  'terminal.ansiCyan',
  'terminal.ansiWhite',
  'terminal.ansiBrightBlack',
  'terminal.ansiBrightRed',
  'terminal.ansiBrightGreen',
  'terminal.ansiBrightYellow',
  'terminal.ansiBrightBlue',
  'terminal.ansiBrightMagenta',
  'terminal.ansiBrightCyan',
  'terminal.ansiBrightWhite',
];

const DARK_INTERACTIVE_KEYS = [
  'list.hoverBackground',
  'list.focusBackground',
  'list.activeSelectionBackground',
  'list.inactiveSelectionBackground',
  'quickInputList.focusBackground',
  'inputOption.activeBackground',
  'dropdown.background',
  'input.background',
  'quickInput.background',
];

const DISTINCT_SURFACE_KEYS = [
  'activityBar.background',
  'sideBar.background',
  'panel.background',
  'editorGroupHeader.tabsBackground',
  'quickInput.background',
  'menu.background',
  'notifications.background',
  'editorWidget.background',
  'editorHoverWidget.background',
  'editorSuggestWidget.background',
  'dropdown.background',
  'input.background',
];

const LIGHT_EDITOR_LAYER = palette.light.surface_editor;
const LIGHT_UI_LAYER = palette.light.surface_base;
const LIGHT_EDITOR_LAYER_KEYS = [
  'editor.background',
  'editorGroup.emptyBackground',
  'outputView.background',
  'peekViewEditor.background',
  'terminal.background',
  'welcomePage.background',
  'walkThrough.embeddedEditorBackground',
];
const LIGHT_UI_LAYER_KEYS = [
  'activityBar.background',
  'activityBarTop.background',
  'sideBar.background',
  'sideBarTitle.background',
  'sideBarSectionHeader.background',
  'sideBarStickyScroll.background',
  'statusBar.background',
  'titleBar.activeBackground',
  'titleBar.inactiveBackground',
  'tab.activeBackground',
  'tab.inactiveBackground',
  'tab.unfocusedActiveBackground',
  'tab.unfocusedInactiveBackground',
  'tab.hoverBackground',
  'editorGroupHeader.tabsBackground',
  'editorGroupHeader.noTabsBackground',
  'button.secondaryBackground',
  'button.secondaryHoverBackground',
  'checkbox.background',
  'checkbox.selectBackground',
  'checkbox.disabled.background',
  'radio.activeBackground',
  'radio.inactiveBackground',
  'dropdown.background',
  'dropdown.listBackground',
  'input.background',
  'quickInput.background',
  'quickInputTitle.background',
  'keybindingTable.headerBackground',
  'listFilterWidget.background',
  'panel.background',
  'panelSectionHeader.background',
  'panelStickyScroll.background',
  'outputViewStickyScroll.background',
  'editorWidget.background',
  'editorSuggestWidget.background',
  'editorHoverWidget.background',
  'editorHoverWidget.statusBarBackground',
  'editorStickyScroll.background',
  'editorStickyScrollHover.background',
  'debugExceptionWidget.background',
  'editorMarkerNavigation.background',
  'peekViewEditorGutter.background',
  'peekViewResult.background',
  'peekViewTitle.background',
  'debugToolBar.background',
  'menu.background',
  'commandCenter.background',
  'notificationCenterHeader.background',
  'notifications.background',
  'banner.background',
  'settings.dropdownBackground',
  'settings.checkboxBackground',
  'settings.textInputBackground',
  'settings.numberInputBackground',
  'breadcrumb.background',
  'breadcrumbPicker.background',
  'welcomePage.tileBackground',
  'welcomePage.progress.background',
  'inlineChat.background',
  'inlineChatInput.background',
];

const BORDER_CONTRAST_CHECKS = [
  ['editorGroup.border', 'editor.background'],
  ['editorGroupHeader.tabsBorder', 'editorGroupHeader.tabsBackground'],
  ['editorGroupHeader.border', 'editorGroupHeader.tabsBackground'],
  ['tab.border', 'tab.activeBackground'],
  ['tab.border', 'tab.inactiveBackground'],
  ['sideBar.border', 'sideBar.background'],
  ['panel.border', 'panel.background'],
  ['activityBar.border', 'activityBar.background'],
  ['titleBar.border', 'titleBar.activeBackground'],
  ['statusBar.border', 'statusBar.background'],
  ['widget.border', 'editorWidget.background'],
  ['dropdown.border', 'dropdown.background'],
  ['input.border', 'input.background'],
];

const INVISIBLE_BORDER_CHECKS = [
  ...BORDER_CONTRAST_CHECKS,
  ['activityBar.activeBorder', 'activityBar.background'],
  ['activityBar.activeFocusBorder', 'activityBar.background'],
  ['button.border', 'button.background'],
  ['checkbox.selectBorder', 'checkbox.selectBackground'],
  ['radio.activeBorder', 'radio.activeBackground'],
  ['keybindingLabel.border', 'keybindingLabel.background'],
  ['keybindingLabel.bottomBorder', 'keybindingLabel.background'],
  ['list.focusOutline', 'list.focusBackground'],
  ['list.focusAndSelectionOutline', 'list.focusAndSelectionBackground'],
  ['list.inactiveFocusOutline', 'list.inactiveFocusBackground'],
  ['listFilterWidget.outline', 'listFilterWidget.background'],
  ['list.filterMatchBorder', 'list.filterMatchBackground'],
  ['menubar.selectionBorder', 'menubar.selectionBackground'],
  ['menu.selectionBorder', 'menu.selectionBackground'],
  ['settings.focusedRowBorder', 'settings.focusedRowBackground'],
  ['tab.activeBorder', 'tab.activeBackground'],
  ['tab.activeModifiedBorder', 'tab.activeBackground'],
  ['tab.inactiveModifiedBorder', 'tab.inactiveBackground'],
  ['window.activeBorder', 'editor.background'],
  ['window.inactiveBorder', 'editor.background'],
  ['sideBarSectionHeader.border', 'sideBarSectionHeader.background'],
  ['sideBarTitle.border', 'sideBarTitle.background'],
  ['sideBarStickyScroll.border', 'sideBarStickyScroll.background'],
  ['panelTitle.border', 'panel.background'],
  ['panelInput.border', 'panel.background'],
  ['panelSection.border', 'panel.background'],
  ['panelSectionHeader.border', 'panelSectionHeader.background'],
  ['panelStickyScroll.border', 'panelStickyScroll.background'],
  ['editorHoverWidget.border', 'editorHoverWidget.background'],
  ['editorSuggestWidget.border', 'editorSuggestWidget.background'],
  ['editorStickyScroll.border', 'editorStickyScroll.background'],
  ['debugToolBar.border', 'debugToolBar.background'],
  ['menu.border', 'menu.background'],
  ['commandCenter.border', 'commandCenter.background'],
  ['commandCenter.inactiveBorder', 'commandCenter.background'],
  ['notificationCenter.border', 'notifications.background'],
  ['notificationToast.border', 'notifications.background'],
  ['notifications.border', 'notifications.background'],
  ['settings.dropdownBorder', 'settings.dropdownBackground'],
  ['settings.dropdownListBorder', 'settings.dropdownBackground'],
  ['settings.checkboxBorder', 'settings.checkboxBackground'],
  ['settings.textInputBorder', 'settings.textInputBackground'],
  ['settings.numberInputBorder', 'settings.numberInputBackground'],
  ['settings.headerBorder', 'editor.background'],
  ['settings.sashBorder', 'editor.background'],
  ['inlineChat.border', 'inlineChat.background'],
  ['inlineChatInput.border', 'inlineChatInput.background'],
  ['textBlockQuote.border', 'textBlockQuote.background'],
  ['toolbar.hoverOutline', 'editor.background'],
  ['button.secondaryBorder', 'button.secondaryBackground'],
  ['checkbox.border', 'checkbox.background'],
  ['radio.inactiveBorder', 'radio.inactiveBackground'],
  ['pickerGroup.border', 'quickInput.background'],
];

const ROLE_EXPECTATIONS = Object.fromEntries(
  Object.entries(palette).map(([flavor, colors]) => [
    flavor,
    {
      keyword: colors.syn_keyword,
      string: colors.syn_string,
      function: colors.syn_function,
      type: colors.syn_type,
      neutral: colors.foreground,
    },
  ]),
);

function colorDistance(fg, bg, fallbackBg) {
  const a = hexToRgb(flatten(fg, fallbackBg));
  const b = hexToRgb(flatten(bg, fallbackBg));
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function relativeLightness(hex, fallbackBg) {
  return luminance(hexToRgb(flatten(hex, fallbackBg)));
}

function scopeEntry(theme, scope) {
  return theme.tokenColors.find((entry) => {
    const scopes = Array.isArray(entry.scope) ? entry.scope : [entry.scope];
    return scopes.includes(scope);
  });
}

function valueOfSemantic(value) {
  if (typeof value === 'string') return value.toLowerCase();
  if (value && typeof value === 'object' && value.foreground)
    return value.foreground.toLowerCase();
  return undefined;
}

let failures = 0;
const loadedThemes = Object.fromEntries(
  Object.entries(THEME_FILES).map(([flavor, file]) => [
    flavor,
    JSON.parse(fs.readFileSync(file, 'utf8')),
  ]),
);

for (const [flavor, file] of Object.entries(THEME_FILES)) {
  const theme = loadedThemes[flavor];
  const colors = theme.colors;
  const expected = ROLE_EXPECTATIONS[flavor];
  const bg = colors['editor.background'];

  console.log(
    `\n===== ${flavor.toUpperCase()} workbench and token mapping =====`,
  );

  for (const key of REQUIRED_COLORS) {
    if (!colors[key]) {
      console.log(`  FAIL missing workbench color: ${key}`);
      failures++;
    }
  }

  if (theme.semanticHighlighting !== true) {
    console.log('  FAIL semanticHighlighting must be true');
    failures++;
  }

  for (const key of REQUIRED_SEMANTIC) {
    if (!theme.semanticTokenColors?.[key]) {
      console.log(`  FAIL missing semantic token: ${key}`);
      failures++;
    }
  }

  for (const scope of REQUIRED_TOKEN_SCOPES) {
    if (!scopeEntry(theme, scope)) {
      console.log(`  FAIL missing TextMate fallback scope: ${scope}`);
      failures++;
    }
  }

  const semanticChecks = {
    keyword: expected.keyword,
    string: expected.string,
    function: expected.function,
    method: expected.function,
    macro: expected.type,
    type: expected.type,
    enumMember: expected.type,
    'variable.readonly': expected.type,
    'property.readonly': expected.type,
    variable: expected.neutral,
    property: expected.neutral,
    parameter: expected.neutral,
  };

  for (const [key, expectedColor] of Object.entries(semanticChecks)) {
    const actual = valueOfSemantic(theme.semanticTokenColors[key]);
    if (actual !== expectedColor) {
      console.log(
        `  FAIL semantic ${key}: got ${actual}, expected ${expectedColor}`,
      );
      failures++;
    }
  }

  const parameter = scopeEntry(theme, 'variable.parameter');
  if (!parameter?.settings?.fontStyle?.includes('italic')) {
    console.log(
      '  FAIL variable.parameter should retain an italic TextMate cue',
    );
    failures++;
  }

  const macro = scopeEntry(theme, 'entity.name.other.preprocessor.macro');
  if (!macro?.settings?.fontStyle?.includes('bold')) {
    console.log('  FAIL macro TextMate fallback should retain a bold cue');
    failures++;
  }

  if (flavor === 'dark') {
    for (const key of DARK_INTERACTIVE_KEYS) {
      const luma = relativeLightness(colors[key], bg);
      if (luma > 0.35) {
        console.log(
          `  FAIL dark interactive color is too light: ${key}=${colors[key]} luma=${luma.toFixed(3)}`,
        );
        failures++;
      }
    }
  }

  if (flavor === 'light') {
    for (const key of LIGHT_EDITOR_LAYER_KEYS) {
      if (colors[key] !== LIGHT_EDITOR_LAYER) {
        console.log(
          `  FAIL light editor layer ${key}: got ${colors[key]}, expected ${LIGHT_EDITOR_LAYER}`,
        );
        failures++;
      }
    }

    for (const key of LIGHT_UI_LAYER_KEYS) {
      if (colors[key] !== LIGHT_UI_LAYER) {
        console.log(
          `  FAIL light UI layer ${key}: got ${colors[key]}, expected ${LIGHT_UI_LAYER}`,
        );
        failures++;
      }
    }
  }

  for (const key of DISTINCT_SURFACE_KEYS) {
    const distance = colorDistance(colors[key], bg, bg);
    if (distance < 8) {
      console.log(
        `  FAIL ${flavor} surface lacks hierarchy: ${key}=${colors[key]} is too close to editor.background ${bg} (distance ${distance.toFixed(1)})`,
      );
      failures++;
    }
  }

  if (flavor === 'dark') {
    const tabDistance = colorDistance(
      colors['tab.activeBackground'],
      colors['tab.inactiveBackground'],
      bg,
    );
    if (tabDistance < 12) {
      console.log(
        `  FAIL ${flavor} tabs lack active/inactive separation: distance ${tabDistance.toFixed(1)}`,
      );
      failures++;
    }
  }

  const lineDistance = colorDistance(
    colors['editor.lineHighlightBackground'],
    bg,
    bg,
  );
  if (lineDistance < 8) {
    console.log(
      `  FAIL ${flavor} editor.lineHighlightBackground is too close to editor.background: distance ${lineDistance.toFixed(1)}`,
    );
    failures++;
  }

  for (const [borderKey, surfaceKey] of INVISIBLE_BORDER_CHECKS) {
    const distance = colorDistance(
      colors[borderKey],
      colors[surfaceKey],
      colors[surfaceKey],
    );
    if (distance > 1) {
      console.log(
        `  FAIL ${flavor} border should be invisible: ${borderKey}=${colors[borderKey]} against ${surfaceKey}=${colors[surfaceKey]} distance ${distance.toFixed(1)}`,
      );
      failures++;
    }
  }

  for (const key of ANSI_KEYS) {
    const ratio = contrast(colors[key], colors['terminal.background']);
    if (ratio < 4.5) {
      console.log(
        `  FAIL ${key} contrast ${ratio.toFixed(2)} < 4.5 against terminal.background`,
      );
      failures++;
    }
  }

  console.log(`  ${failures === 0 ? 'OK' : 'checked'} ${file}`);
}

if (failures > 0) {
  console.log(`\nFAIL: ${failures} workbench/token mapping checks failed`);
  process.exit(1);
}

console.log(
  '\nOK: Workbench golden-set colors, semantic tokens, TextMate fallbacks, and ANSI contrast checks passed.',
);
