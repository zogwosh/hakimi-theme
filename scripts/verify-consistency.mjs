// Proves: (1) semantic token color == TextMate color for every shared role,
// (2) required font-style cues exist, (3) no pre-redesign colors remain in syntax,
// (4) generated editor canvas & syntax JSON is 100% byte-for-byte identical to baseline.
import assert from 'node:assert';
import fs from 'node:fs';
import { SYNTAX_PALETTE } from '../src/syntaxPalette.mjs';

const themes = {
  dark: JSON.parse(
    fs.readFileSync('vscode/themes/hakimi-deuteranopia-dark.json', 'utf8'),
  ),
  light: JSON.parse(
    fs.readFileSync('vscode/themes/hakimi-deuteranopia-light.json', 'utf8'),
  ),
};

const ROLE = Object.fromEntries(
  Object.entries(SYNTAX_PALETTE).map(([flavor, colors]) => [
    flavor,
    {
      keyword: colors.mauve,
      string: colors.green,
      function: colors.blue,
      type: colors.yellow,
      neutral: colors.text,
      comment: colors.overlay2,
      error: colors.red,
    },
  ]),
);

const BANNED = [
  '#fe6100',
  '#ff8c42',
  '#d35fb7',
  '#ffb000',
  '#648fff',
  '#0c7bdc',
  '#ffc20a',
  '#e66100',
  '#5d3a9b',
  '#ee6677',
  '#dc3220',
  '#fefe62',
  '#1aff1a',
];

// map a TextMate tokenColors entry (by a scope it must contain) to its foreground
const tmFg = (theme, scope) => {
  const e = theme.tokenColors.find((t) => t.scope.includes(scope));
  return e
    ? { fg: e.settings.foreground, style: e.settings.fontStyle || '' }
    : null;
};

let fail = 0;
const eq = (label, got, want) => {
  const ok = (got || '').toLowerCase() === want.toLowerCase();
  if (!ok) {
    console.log(`  ✗ ${label}: got ${got} want ${want}`);
    fail++;
  } else console.log(`  ✓ ${label} = ${got}`);
};

const semFg = (value) =>
  typeof value === 'string' ? value : value?.foreground;
const semStyle = (value) =>
  value && typeof value === 'object' ? value.fontStyle || '' : '';

const requireSemStyle = (label, value, required) => {
  const style = semStyle(value);
  const ok = required.every((part) => style.includes(part));
  console.log(
    `  ${ok ? '✓' : '✗'} ${label} semantic style ${required.join('+')} (${style || 'none'})`,
  );
  if (!ok) fail++;
};

for (const flavor of ['dark', 'light']) {
  const t = themes[flavor],
    R = ROLE[flavor],
    S = t.semanticTokenColors;
  console.log(
    `\n===== ${flavor.toUpperCase()} : semantic == TextMate per role =====`,
  );
  // keyword
  eq('keyword (sem)', semFg(S.keyword), R.keyword);
  eq('keyword (tm)', tmFg(t, 'keyword.control').fg, R.keyword);
  eq('storage.type (tm)', tmFg(t, 'storage.type').fg, R.keyword);
  eq('storage.modifier (tm)', tmFg(t, 'storage.modifier').fg, R.keyword);
  // string
  eq('string (sem)', semFg(S.string), R.string);
  eq('string (tm)', tmFg(t, 'string.template').fg, R.string);
  // function
  eq('function (sem)', semFg(S.function), R.function);
  eq('function (tm)', tmFg(t, 'entity.name.function').fg, R.function);
  // type / class / number / enumMember
  eq('type (sem)', semFg(S.type), R.type);
  eq('enumMember(sem)', semFg(S.enumMember), R.type);
  eq('number (sem)', semFg(S.number), R.type);
  eq('type (tm)', tmFg(t, 'entity.name.type').fg, R.type);
  eq('number (tm)', tmFg(t, 'constant.numeric').fg, R.type);
  // variable / property
  eq('property (sem)', semFg(S.property), R.neutral);
  eq('variable (sem)', semFg(S.variable), R.neutral);
  eq('property (tm)', tmFg(t, 'variable.other.property').fg, R.neutral);
  eq('variable (tm)', tmFg(t, 'variable.parameter').fg, R.neutral);
  // built-in class = keyword-blue both layers
  eq('class.defaultLibrary (sem)', semFg(S['class.defaultLibrary']), R.keyword);
  eq(
    'support.class.builtin (tm)',
    tmFg(t, 'support.class.builtin').fg,
    R.keyword,
  );

  console.log(`  --- font-style cues ---`);
  const kw = tmFg(t, 'keyword.control'),
    st = tmFg(t, 'storage.type'),
    sm = tmFg(t, 'storage.modifier'),
    cm = tmFg(t, 'comment'),
    er = tmFg(t, 'invalid'),
    tp = tmFg(t, 'entity.name.type'),
    cl = tmFg(t, 'entity.name.type.class'),
    mc = tmFg(t, 'entity.name.function.macro'),
    pm = tmFg(t, 'variable.parameter'),
    ns = tmFg(t, 'entity.name.namespace'),
    sc = tmFg(t, 'support.class.builtin'),
    cp = tmFg(t, 'support.class.component'),
    tg = tmFg(t, 'entity.name.tag');

  // Semantic checks
  requireSemStyle('keyword', S.keyword, ['bold']);
  requireSemStyle('type', S.type, ['italic']);
  requireSemStyle('class', S.class, ['bold']);
  requireSemStyle('macro', S.macro, ['bold', 'italic']);
  requireSemStyle('parameter', S.parameter, ['italic']);
  requireSemStyle('namespace', S.namespace, ['italic']);
  requireSemStyle('class.defaultLibrary', S['class.defaultLibrary'], [
    'bold',
    'italic',
  ]);

  // TextMate checks
  console.log(
    `  ${kw.style.includes('bold') ? '✓' : '✗'} keyword bold (${kw.style})`,
  );
  if (!kw.style.includes('bold')) fail++;
  console.log(
    `  ${st.style.includes('bold') ? '✓' : '✗'} storage.type bold (${st.style})`,
  );
  if (!st.style.includes('bold')) fail++;
  console.log(
    `  ${sm.style.includes('bold') ? '✓' : '✗'} storage.modifier bold (${sm.style})`,
  );
  if (!sm.style.includes('bold')) fail++;
  console.log(
    `  ${tp.style.includes('italic') ? '✓' : '✗'} type italic (${tp.style})`,
  );
  if (!tp.style.includes('italic')) fail++;
  console.log(
    `  ${cl.style.includes('bold') ? '✓' : '✗'} class bold (${cl.style})`,
  );
  if (!cl.style.includes('bold')) fail++;
  console.log(
    `  ${mc.style.includes('bold') && mc.style.includes('italic') ? '✓' : '✗'} macro bold italic (${mc.style})`,
  );
  if (!(mc.style.includes('bold') && mc.style.includes('italic'))) fail++;
  console.log(
    `  ${pm.style.includes('italic') ? '✓' : '✗'} parameter italic (${pm.style})`,
  );
  if (!pm.style.includes('italic')) fail++;
  console.log(
    `  ${ns.style.includes('italic') ? '✓' : '✗'} namespace italic (${ns.style})`,
  );
  if (!ns.style.includes('italic')) fail++;
  console.log(
    `  ${sc.style.includes('bold') && sc.style.includes('italic') ? '✓' : '✗'} support.class.builtin bold italic (${sc.style})`,
  );
  if (!(sc.style.includes('bold') && sc.style.includes('italic'))) fail++;
  console.log(
    `  ${cp.style.includes('bold') ? '✓' : '✗'} support.class.component bold (${cp.style})`,
  );
  if (!cp.style.includes('bold')) fail++;
  eq('support.class.component fg', cp.fg, R.function);
  console.log(
    `  ${tg.style === '' ? '✓' : '✗'} entity.name.tag normal (${tg.style || 'normal'})`,
  );
  if (tg.style !== '') fail++;
  eq('entity.name.tag fg', tg.fg, R.keyword);

  console.log(
    `  ${cm.style.includes('italic') ? '✓' : '✗'} comment italic (${cm.style})`,
  );
  if (!cm.style.includes('italic')) fail++;
  console.log(
    `  ${er.style.includes('bold') && er.style.includes('underline') ? '✓' : '✗'} error bold+underline (${er.style})`,
  );
  if (!(er.style.includes('bold') && er.style.includes('underline'))) fail++;
  eq('error fg', er.fg, R.error);

  console.log(`  --- no pre-redesign colors in syntax ---`);
  const syntaxBlob =
    JSON.stringify(t.semanticTokenColors) + JSON.stringify(t.tokenColors);
  const leaked = BANNED.filter((c) => syntaxBlob.toLowerCase().includes(c));
  console.log(
    `  ${leaked.length ? `✗ leaked: ${leaked.join(', ')}` : `✓ none of ${BANNED.length} banned colors present`}`,
  );
  if (leaked.length) fail += leaked.length;
}

// -------------------------------------------------------------
// Baseline JSON Verification (100% byte-for-byte fidelity)
// -------------------------------------------------------------
console.log('\n===== Baseline JSON Strict Equality Verification =====');
const baseline = JSON.parse(
  fs.readFileSync('scripts/editor-baseline.json', 'utf8'),
);
const zed = JSON.parse(
  fs.readFileSync('zed/themes/hakimi-deuteranopia.json', 'utf8'),
);
const zedLight = zed.themes.find((t) => t.appearance === 'light');
const zedDark = zed.themes.find((t) => t.appearance === 'dark');

try {
  // VS Code Light
  assert.strictEqual(
    themes.light.colors['editor.background'],
    baseline.vscode.light['editor.background'],
    'VS Code Light editor.background mismatch',
  );
  assert.strictEqual(
    themes.light.colors['editor.foreground'],
    baseline.vscode.light['editor.foreground'],
    'VS Code Light editor.foreground mismatch',
  );
  assert.strictEqual(
    themes.light.semanticHighlighting,
    baseline.vscode.light.semanticHighlighting,
    'VS Code Light semanticHighlighting mismatch',
  );
  assert.deepStrictEqual(
    themes.light.semanticTokenColors,
    baseline.vscode.light.semanticTokenColors,
    'VS Code Light semanticTokenColors mismatch',
  );
  assert.deepStrictEqual(
    themes.light.tokenColors,
    baseline.vscode.light.tokenColors,
    'VS Code Light tokenColors mismatch',
  );
  console.log('  ✓ VS Code Light baseline: 100% byte-for-byte identical');

  // VS Code Dark
  assert.strictEqual(
    themes.dark.colors['editor.background'],
    baseline.vscode.dark['editor.background'],
    'VS Code Dark editor.background mismatch',
  );
  assert.strictEqual(
    themes.dark.colors['editor.foreground'],
    baseline.vscode.dark['editor.foreground'],
    'VS Code Dark editor.foreground mismatch',
  );
  assert.strictEqual(
    themes.dark.semanticHighlighting,
    baseline.vscode.dark.semanticHighlighting,
    'VS Code Dark semanticHighlighting mismatch',
  );
  assert.deepStrictEqual(
    themes.dark.semanticTokenColors,
    baseline.vscode.dark.semanticTokenColors,
    'VS Code Dark semanticTokenColors mismatch',
  );
  assert.deepStrictEqual(
    themes.dark.tokenColors,
    baseline.vscode.dark.tokenColors,
    'VS Code Dark tokenColors mismatch',
  );
  console.log('  ✓ VS Code Dark baseline: 100% byte-for-byte identical');

  // Zed Light
  assert.strictEqual(
    zedLight.style['editor.background'],
    baseline.zed.light['editor.background'],
    'Zed Light editor.background mismatch',
  );
  assert.strictEqual(
    zedLight.style['editor.foreground'],
    baseline.zed.light['editor.foreground'],
    'Zed Light editor.foreground mismatch',
  );
  assert.deepStrictEqual(
    zedLight.style.syntax,
    baseline.zed.light.syntax,
    'Zed Light style.syntax mismatch',
  );
  console.log('  ✓ Zed Light baseline: 100% byte-for-byte identical');

  // Zed Dark
  assert.strictEqual(
    zedDark.style['editor.background'],
    baseline.zed.dark['editor.background'],
    'Zed Dark editor.background mismatch',
  );
  assert.strictEqual(
    zedDark.style['editor.foreground'],
    baseline.zed.dark['editor.foreground'],
    'Zed Dark editor.foreground mismatch',
  );
  assert.deepStrictEqual(
    zedDark.style.syntax,
    baseline.zed.dark.syntax,
    'Zed Dark style.syntax mismatch',
  );
  console.log('  ✓ Zed Dark baseline: 100% byte-for-byte identical');
} catch (err) {
  console.error(`  ✗ Baseline comparison failure:`, err.message);
  fail++;
}

console.log(
  `\n${fail === 0 ? '✅ ALL CONSISTENCY CHECKS PASSED' : `❌ ${fail} FAILURES`}`,
);
process.exit(fail ? 1 : 0);
