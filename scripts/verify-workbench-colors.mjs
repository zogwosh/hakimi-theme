import fs from 'node:fs';

const THEME_FILES = {
  light: 'vscode-themes/hakimi-deuteranopia-light.json',
  dark: 'vscode-themes/hakimi-deuteranopia-dark.json',
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

const ROLE_EXPECTATIONS = {
  dark: {
    keyword: '#7ab2ff',
    string: '#80dcff',
    function: '#f0d68f',
    type: '#ff9536',
    neutral: '#e0e0e0',
  },
  light: {
    keyword: '#4c6698',
    string: '#004b8f',
    function: '#704400',
    type: '#4a250e',
    neutral: '#45494c',
  },
};

function hexToRgb(hex) {
  const raw = hex.replace(/^#/, '');
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16),
    a: raw.length >= 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1,
  };
}

function blend(fg, bg) {
  const f = hexToRgb(fg);
  const b = hexToRgb(bg);
  return {
    r: Math.round(f.r * f.a + b.r * (1 - f.a)),
    g: Math.round(f.g * f.a + b.g * (1 - f.a)),
    b: Math.round(f.b * f.a + b.b * (1 - f.a)),
  };
}

function luminance(rgb) {
  const linear = [rgb.r, rgb.g, rgb.b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(fg, bg) {
  const fgLum = luminance(blend(fg, bg));
  const bgLum = luminance(hexToRgb(bg));
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
}

function colorDistance(fg, bg, fallbackBg) {
  const a = blend(fg, fallbackBg);
  const b = blend(bg, fallbackBg);
  return Math.sqrt(
    (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2,
  );
}

function relativeLightness(hex, fallbackBg) {
  return luminance(blend(hex, fallbackBg));
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

  for (const key of DISTINCT_SURFACE_KEYS) {
    const distance = colorDistance(colors[key], bg, bg);
    if (distance < 8) {
      console.log(
        `  FAIL ${flavor} surface lacks hierarchy: ${key}=${colors[key]} is too close to editor.background ${bg} (distance ${distance.toFixed(1)})`,
      );
      failures++;
    }
  }

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
