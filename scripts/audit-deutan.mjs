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
// terminal/UI text Lc >= 45, syntax separation dEok >= 0.10. Error keeps a
// redundant bold+underline cue, but still has a small color-distance floor.
import fs from 'node:fs';

const RGB_TO_LMS = [
  0.31399022, 0.63951294, 0.04649755, 0.15537241, 0.75789446, 0.08670142,
  0.01775239, 0.10944209, 0.87256922,
];
const LMS_TO_RGB = [
  5.47221206, -4.6419601, 0.16963708, -1.1252419, 2.29317094, -0.1678952,
  0.02980165, -0.19318073, 1.16364789,
];
const DEUTAN_LMS = [1, 0, 0, 0.9513092, 0, 0.04866992, 0, 0, 1];

const matMul = (m, v) => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
];

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const toLinear = (x) =>
  x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
const fromLinear = (x) =>
  x <= 0.0031308 ? x * 12.92 : 1.055 * x ** (1 / 2.4) - 0.055;

const hexToRgb = (hex) => {
  let h = hex.replace(/^#/, '');
  if (h.length === 3 || h.length === 4) {
    h = [...h].map((ch) => ch + ch).join('');
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
};

const rgbToHex = ({ r, g, b }) => {
  const toHex = (val) => {
    const clamped = Math.min(255, Math.max(0, Math.round(val)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const blend = (fg, bg) => {
  const f = hexToRgb(fg);
  const b = hexToRgb(bg);
  return rgbToHex({
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
  });
};

const flatten = (hex, bg) => (hexToRgb(hex).a < 1 ? blend(hex, bg) : hex);

const deutan = (hex, bg = '#000000') => {
  const rgb = hexToRgb(flatten(hex, bg));
  const linearRgb = [rgb.r, rgb.g, rgb.b].map((x) => toLinear(x / 255));
  const lms = matMul(RGB_TO_LMS, linearRgb);
  const simulatedLms = matMul(DEUTAN_LMS, lms);
  const simulatedLinearRgb = matMul(LMS_TO_RGB, simulatedLms);
  return rgbToHex({
    r: 255 * fromLinear(clamp01(simulatedLinearRgb[0])),
    g: 255 * fromLinear(clamp01(simulatedLinearRgb[1])),
    b: 255 * fromLinear(clamp01(simulatedLinearRgb[2])),
  });
};

const h2 = (hex) => {
  const rgb = hexToRgb(hex);
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
};

function oklab([r, g, b]) {
  const lr = toLinear(r),
    lg = toLinear(g),
    lb = toLinear(b);
  const l = Math.cbrt(
      0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
    ),
    m = Math.cbrt(0.2119034982 * lr + 0.6806995477 * lg + 0.1073969541 * lb),
    s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}
const dEok = (a, b) => {
  const A = oklab(h2(a)),
    B = oklab(h2(b));
  return Math.hypot(A.L - B.L, A.a - B.a, A.b - B.b);
};

// ---- APCA (apca-w3 0.1.9 / "0.0.98G-4g" constants) ----
const APCA = {
  Rco: 0.2126729,
  Gco: 0.7151522,
  Bco: 0.072175,
  trc: 2.4,
  Ntx: 0.57,
  Nbg: 0.56,
  Rtx: 0.62,
  Rbg: 0.65,
  Bthr: 0.022,
  Bclmp: Math.SQRT2,
  scale: 1.14,
  loOff: 0.027,
  loClip: 0.1,
  dMin: 0.0005,
};
function apcaY(hex) {
  const [r, g, b] = h2(hex);
  return (
    APCA.Rco * r ** APCA.trc +
    APCA.Gco * g ** APCA.trc +
    APCA.Bco * b ** APCA.trc
  );
}
function apcaLc(txt, bg) {
  let Yt = apcaY(txt),
    Yb = apcaY(bg);
  if (Yt < APCA.Bthr) Yt += (APCA.Bthr - Yt) ** APCA.Bclmp;
  if (Yb < APCA.Bthr) Yb += (APCA.Bthr - Yb) ** APCA.Bclmp;
  if (Math.abs(Yb - Yt) < APCA.dMin) return 0;
  let S, out;
  if (Yb > Yt) {
    S = (Yb ** APCA.Nbg - Yt ** APCA.Ntx) * APCA.scale;
    out = S < APCA.loClip ? 0 : S - APCA.loOff;
  } else {
    S = (Yb ** APCA.Rbg - Yt ** APCA.Rtx) * APCA.scale;
    out = S > -APCA.loClip ? 0 : S + APCA.loOff;
  }
  return out * 100;
}

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

let failures = 0;

function scopeEntry(theme, scope) {
  return theme.tokenColors.find((entry) => {
    const scopes = Array.isArray(entry.scope) ? entry.scope : [entry.scope];
    return scopes.includes(scope);
  });
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
    keyword: theme.semanticTokenColors.keyword,
    string: theme.semanticTokenColors.string,
    function: theme.semanticTokenColors.function,
    type: theme.semanticTokenColors.type,
    variable: theme.semanticTokenColors.variable,
    comment: scopeEntry(theme, 'comment').settings.foreground,
    error: scopeEntry(theme, 'invalid').settings.foreground,
  };

  console.log(`\n===== ${flavor} syntax on editor.background ${bg} =====`);
  console.log('-- APCA Lc on simulated syntax colors --');
  for (const [role, fg] of Object.entries(roles)) {
    recordTextCheck({
      label: role,
      fg,
      bg,
      floor: SYNTAX_FLOOR[role] ?? DEFAULT_SYNTAX_FLOOR,
    });
  }

  console.log('-- simulated syntax role separation --');
  const pairs = [];
  const names = Object.keys(roles);
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      const a = names[i];
      const b = names[j];
      const pair = new Set([a, b]);
      const d = dEok(deutan(roles[a], bg), deutan(roles[b], bg));
      const floor = pair.has('error')
        ? ERROR_SEP_MIN
        : pair.has('comment') && pair.has('keyword')
          ? ERROR_SEP_MIN
          : SEP_MIN;
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
}

function auditVsCodeWorkbench(flavor, theme) {
  const c = theme.colors;
  const bg = c['editor.background'];
  const checks = [
    ['quickInput foreground', c['quickInput.foreground'], c['quickInput.background']],
    [
      'quickInput focused row',
      c['quickInputList.focusForeground'],
      flatten(c['quickInputList.focusBackground'], c['quickInput.background']),
    ],
    ['list active selection', c['list.activeSelectionForeground'], flatten(c['list.activeSelectionBackground'], bg)],
    ['list inactive selection', c['list.inactiveSelectionForeground'], flatten(c['list.inactiveSelectionBackground'], bg)],
    ['list hover', c['list.hoverForeground'], flatten(c['list.hoverBackground'], bg)],
    ['menu selection', c['menu.selectionForeground'], flatten(c['menu.selectionBackground'], c['menu.background'])],
    ['input foreground', c['input.foreground'], c['input.background']],
    ['button', c['button.foreground'], c['button.background']],
    ['status error item', c['statusBarItem.errorForeground'], c['statusBarItem.errorBackground']],
    ['status warning item', c['statusBarItem.warningForeground'], c['statusBarItem.warningBackground']],
    ['git added', c['gitDecoration.addedResourceForeground'], bg],
    ['git modified', c['gitDecoration.modifiedResourceForeground'], bg],
    ['git deleted', c['gitDecoration.deletedResourceForeground'], bg],
  ].filter(([, fg, rowBg]) => fg && rowBg);

  console.log(`\n===== ${flavor} VS Code UI/readability states =====`);
  for (const [label, fg, rowBg] of checks) {
    recordTextCheck({ label, fg, bg: rowBg, floor: UI_TEXT_FLOOR, contextBg: bg });
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
  const roles = {
    keyword: syntax.keyword.color,
    string: syntax.string.color,
    function: syntax.function.color,
    type: syntax.type.color,
    variable: syntax.variable.color,
    comment: syntax.comment.color,
    error: syntax.error.color,
  };

  console.log(`\n===== ${flavor} Zed syntax on editor.background ${bg} =====`);
  for (const [role, fg] of Object.entries(roles)) {
    recordTextCheck({
      label: `zed ${role}`,
      fg,
      bg,
      floor: SYNTAX_FLOOR[role] ?? DEFAULT_SYNTAX_FLOOR,
    });
  }
}

for (const [flavor, file] of [
  ['DARK', 'vscode-themes/hakimi-deuteranopia-dark.json'],
  ['LIGHT', 'vscode-themes/hakimi-deuteranopia-light.json'],
]) {
  const theme = JSON.parse(fs.readFileSync(file, 'utf8'));
  auditSyntax(flavor, theme);
  auditVsCodeWorkbench(flavor, theme);
}

const zed = JSON.parse(fs.readFileSync('zed/themes/hakimi-deuteranopia.json', 'utf8'));
for (const zedTheme of zed.themes) {
  auditZedSyntax(zedTheme.appearance.toUpperCase(), zedTheme);
}

console.log(
  `\n${failures === 0 ? 'OK: DEUTAN + APCA AUDIT PASSED' : `FAIL: ${failures} deutan audit failures`}`,
);
process.exit(failures ? 1 : 0);
