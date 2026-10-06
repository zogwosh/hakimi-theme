// Deuteranopia regression gate.
//
// The theme is optimized for actual green-blind reading, not WCAG 2.x contrast
// ratios. Every checked color is first projected through one explicit pipeline:
//   sRGB hex -> alpha blend when needed -> linear RGB -> LMS deutan projection
//   -> linear RGB -> sRGB hex
//
// The simulated colors are then measured with:
//   (1) APCA Lc for text readability.
//   (2) OKLab dE for role separation in the deuteranope's perceived space.
//
// Gates: regular syntax Lc >= 60, bold syntax Lc >= 50, comment Lc >= 45,
// terminal/UI text Lc >= 45. General syntax separation is dEok >= 0.10, while
// high-frequency adjacent token pairs use stricter comfort floors. Error keeps
// a redundant bold+underline cue, but still needs real color separation.
import fs from 'node:fs';

import { apcaLc, deutan, dEok, flatten } from '../src/colors.mjs';

const a1 = apcaLc('#000000', '#ffffff'),
  a2 = apcaLc('#ffffff', '#000000');
if (Math.abs(a1 - 106.04) > 0.5 || Math.abs(a2 + 107.88) > 0.5) {
  console.error(
    `APCA self-test FAILED: blk/wht=${a1.toFixed(2)}, wht/blk=${a2.toFixed(2)}`,
  );
  process.exit(2);
}

const SYNTAX_FLOOR = { keyword: 50, error: 50, comment: 45 };
const DEFAULT_SYNTAX_FLOOR = 60;
const UI_TEXT_FLOOR = 45;
const BODY = 75;
const SEP_MIN = 0.1;
const ERROR_SEP_MIN = 0.04;

const LIGHT_PAIR_SEPARATION_FLOORS = {
  'keyword|string': 0.15,
  'keyword|variable': 0.16,
  'keyword|comment': 0.15,
  'function|variable': 0.14,
  'function|type': 0.14,
  'string|variable': 0.12,
  'type|variable': 0.13,
};

let failures = 0;

function scopeEntry(theme, scope) {
  return theme.tokenColors.find((entry) => {
    const scopes = Array.isArray(entry.scope) ? entry.scope : [entry.scope];
    return scopes.includes(scope);
  });
}

function semanticForeground(value) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value.foreground;
  return undefined;
}

function semanticStyle(value) {
  return value && typeof value === 'object' ? value.fontStyle || '' : '';
}

function pairKey(a, b) {
  return [a, b].sort().join('|');
}

function pairFloor(flavor, a, b) {
  const key = pairKey(a, b);
  if (flavor === 'LIGHT' && LIGHT_PAIR_SEPARATION_FLOORS[key])
    return LIGHT_PAIR_SEPARATION_FLOORS[key];
  const pair = new Set([a, b]);
  return pair.has('error') ? ERROR_SEP_MIN : SEP_MIN;
}

function requireSemanticStyle(theme, key, required) {
  const value = theme.semanticTokenColors[key];
  const style = semanticStyle(value);
  const ok = required.every((part) => style.includes(part));
  if (!ok) {
    console.log(
      `  FAIL semantic ${key} should include fontStyle ${required.join('+')}; got ${JSON.stringify(value)}`,
    );
    failures++;
  }
}

function recordTextCheck({ label, fg, bg, floor, contextBg = bg }) {
  const simFg = deutan(fg, contextBg);
  const simBg = deutan(bg, contextBg);
  const lc = Math.abs(apcaLc(simFg, simBg));
  const ok = lc >= floor;
  if (!ok) failures++;
  const grade =
    lc >= BODY ? 'body' : lc >= DEFAULT_SYNTAX_FLOOR ? 'readable' : 'low';
  console.log(
    `  ${ok ? 'OK' : 'FAIL'} ${label.padEnd(34)} ${fg}->${simFg} on ${bg}->${simBg}  Lc ${lc.toFixed(1).padStart(5)}  ${grade}${ok ? '' : ` < ${floor}`}`,
  );
}

function auditSyntax(flavor, theme) {
  const bg = theme.colors['editor.background'];
  const roles = {
    keyword: semanticForeground(theme.semanticTokenColors.keyword),
    string: semanticForeground(theme.semanticTokenColors.string),
    function: semanticForeground(theme.semanticTokenColors.function),
    type: semanticForeground(theme.semanticTokenColors.type),
    variable: semanticForeground(theme.semanticTokenColors.variable),
    comment: scopeEntry(theme, 'comment').settings.foreground,
    error: scopeEntry(theme, 'invalid').settings.foreground,
  };

  console.log(`\n===== ${flavor} syntax on editor.background ${bg} =====`);
  console.log('-- APCA Lc on simulated syntax colors --');
  const samples = Object.entries(roles).map(([role, fg]) => ({
    role,
    fg,
    style:
      role === 'comment' || role === 'error'
        ? scopeEntry(theme, role === 'comment' ? 'comment' : 'invalid').settings
            .fontStyle || ''
        : semanticStyle(theme.semanticTokenColors[role]),
  }));
  // Include language-specific overrides in the existing syntax readability audit.
  for (const entry of theme.tokenColors) {
    if (entry.settings.foreground === roles.keyword) {
      samples.push({
        role: 'keyword',
        label: entry.name || String(entry.scope),
        fg: entry.settings.foreground,
        style: entry.settings.fontStyle || '',
      });
    }
  }
  for (const sample of samples) {
    recordTextCheck({
      label: sample.label || sample.role,
      fg: sample.fg,
      bg,
      floor:
        sample.role === 'comment'
          ? SYNTAX_FLOOR.comment
          : sample.style.includes('bold')
            ? 50
            : DEFAULT_SYNTAX_FLOOR,
    });
  }

  console.log('-- simulated syntax role separation --');
  const pairs = [];
  const names = Object.keys(roles);
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      const a = names[i];
      const b = names[j];
      const d = dEok(deutan(roles[a], bg), deutan(roles[b], bg));
      const floor = pairFloor(flavor, a, b);
      if (d < floor) {
        console.log(`  FAIL ${a} vs ${b}: dEok ${d.toFixed(3)} < ${floor}`);
        failures++;
      }
      pairs.push([a, b, d, floor]);
    }
  }
  pairs.sort((x, y) => x[2] - y[2]);
  for (const [a, b, d, floor] of pairs.slice(0, 5)) {
    console.log(`  ${d >= floor ? 'OK' : 'FAIL'} ${d.toFixed(3)} ${a} vs ${b}`);
  }

  console.log('-- semantic font-style cues --');
  requireSemanticStyle(theme, 'keyword', ['bold']);
  requireSemanticStyle(theme, 'macro', ['bold']);
}

function auditVsCodeWorkbench(flavor, theme) {
  const c = theme.colors;
  const bg = c['editor.background'];
  const checks = [
    [
      'quickInput foreground',
      c['quickInput.foreground'],
      c['quickInput.background'],
    ],
    [
      'quickInput focused row',
      c['quickInputList.focusForeground'],
      flatten(c['quickInputList.focusBackground'], c['quickInput.background']),
    ],
    [
      'list active selection',
      c['list.activeSelectionForeground'],
      flatten(c['list.activeSelectionBackground'], bg),
    ],
    [
      'list inactive selection',
      c['list.inactiveSelectionForeground'],
      flatten(c['list.inactiveSelectionBackground'], bg),
    ],
    [
      'list hover',
      c['list.hoverForeground'],
      flatten(c['list.hoverBackground'], bg),
    ],
    [
      'menu selection',
      c['menu.selectionForeground'],
      flatten(c['menu.selectionBackground'], c['menu.background']),
    ],
    ['input foreground', c['input.foreground'], c['input.background']],
    ['button', c['button.foreground'], c['button.background']],
    ['button hover', c['button.foreground'], c['button.hoverBackground']],
    [
      'inlay hint',
      c['editorInlayHint.foreground'],
      flatten(c['editorInlayHint.background'], bg),
    ],
    [
      'inlay type',
      c['editorInlayHint.typeForeground'],
      flatten(c['editorInlayHint.typeBackground'], bg),
    ],
    [
      'inlay parameter',
      c['editorInlayHint.parameterForeground'],
      flatten(c['editorInlayHint.parameterBackground'], bg),
    ],
    [
      'status error item',
      c['statusBarItem.errorForeground'],
      c['statusBarItem.errorBackground'],
    ],
    [
      'status warning item',
      c['statusBarItem.warningForeground'],
      c['statusBarItem.warningBackground'],
    ],
    ['git added', c['gitDecoration.addedResourceForeground'], bg],
    ['git modified', c['gitDecoration.modifiedResourceForeground'], bg],
    ['git deleted', c['gitDecoration.deletedResourceForeground'], bg],
  ].filter(([, fg, rowBg]) => fg && rowBg);

  console.log(`\n===== ${flavor} VS Code UI/readability states =====`);
  for (const [label, fg, rowBg] of checks) {
    recordTextCheck({
      label,
      fg,
      bg: rowBg,
      floor: UI_TEXT_FLOOR,
      contextBg: bg,
    });
  }

  console.log('-- terminal ANSI readability --');
  for (const key of [
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
  ]) {
    recordTextCheck({
      label: key,
      fg: c[key],
      bg: c['terminal.background'],
      floor: UI_TEXT_FLOOR,
    });
  }
}

function auditZedSyntax(flavor, zedTheme) {
  const style = zedTheme.style;
  const syntax = style.syntax;
  const bg = style['editor.background'];

  console.log(`\n===== ${flavor} Zed syntax on editor.background ${bg} =====`);
  // Zed resolves the longest matching capture name. Each override must be readable
  // with its own weight; a dotted name does not inherit its parent's bold style.
  for (const [name, highlight] of Object.entries(syntax)) {
    recordTextCheck({
      label: `zed ${name}`,
      fg: highlight.color ?? style['editor.foreground'],
      bg: flatten(highlight.background_color ?? bg, bg),
      floor:
        name.startsWith('comment') || ['hint', 'predictive'].includes(name)
          ? SYNTAX_FLOOR.comment
          : highlight.font_weight >= 700
            ? 50
            : DEFAULT_SYNTAX_FLOOR,
    });
  }

  console.log(`\n===== ${flavor} Zed UI and terminal readability =====`);
  for (const foreground of [
    'text',
    'text.muted',
    'text.placeholder',
    'text.accent',
  ]) {
    for (const background of [
      'background',
      'surface.background',
      'elevated_surface.background',
      'element.background',
      'element.hover',
      'element.active',
      'element.selected',
      'ghost_element.background',
      'ghost_element.hover',
      'ghost_element.active',
      'ghost_element.selected',
    ]) {
      recordTextCheck({
        label: `zed ${foreground} on ${background}`,
        fg: style[foreground],
        bg: flatten(style[background], style.background),
        floor: UI_TEXT_FLOOR,
      });
    }
  }
  for (const [key, value] of Object.entries(style)) {
    if (key.startsWith('terminal.ansi.') && !key.endsWith('background')) {
      recordTextCheck({
        label: `zed ${key}`,
        fg: value,
        bg: style['terminal.background'],
        floor: UI_TEXT_FLOOR,
      });
    }
    if (key.startsWith('vim.') && key.endsWith('.foreground')) {
      recordTextCheck({
        label: `zed ${key}`,
        fg: value,
        bg: style[key.replace('foreground', 'background')],
        floor: UI_TEXT_FLOOR,
      });
    }
  }
  for (const key of ['editor.line_number', 'editor.active_line_number']) {
    recordTextCheck({
      label: `zed ${key}`,
      fg: style[key],
      bg: style['editor.gutter.background'],
      floor: UI_TEXT_FLOOR,
    });
  }
}

for (const [flavor, file] of [
  ['DARK', 'vscode/themes/hakimi-deuteranopia-dark.json'],
  ['LIGHT', 'vscode/themes/hakimi-deuteranopia-light.json'],
]) {
  const theme = JSON.parse(fs.readFileSync(file, 'utf8'));
  auditSyntax(flavor, theme);
  auditVsCodeWorkbench(flavor, theme);
}

const zed = JSON.parse(
  fs.readFileSync('zed/themes/hakimi-deuteranopia.json', 'utf8'),
);
for (const zedTheme of zed.themes) {
  auditZedSyntax(zedTheme.appearance.toUpperCase(), zedTheme);
}

console.log(
  `\n${failures === 0 ? 'OK: DEUTAN + APCA AUDIT PASSED' : `FAIL: ${failures} deutan audit failures`}`,
);
process.exit(failures ? 1 : 0);
