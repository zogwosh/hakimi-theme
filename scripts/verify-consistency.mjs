// Proves: (1) semantic token color == TextMate color for every shared role,
// (2) required font-style cues exist, (3) no pre-redesign colors remain in syntax.
import fs from 'node:fs';

const themes = {
  dark: JSON.parse(
    fs.readFileSync('vscode/themes/hakimi-deuteranopia-dark.json', 'utf8'),
  ),
  light: JSON.parse(
    fs.readFileSync('vscode/themes/hakimi-deuteranopia-light.json', 'utf8'),
  ),
};

// expected role -> color per flavor
const palette = JSON.parse(fs.readFileSync('src/palette.json', 'utf8'));
const ROLE = Object.fromEntries(
  Object.entries(palette).map(([flavor, colors]) => [
    flavor,
    {
      keyword: colors.syn_keyword,
      string: colors.syn_string,
      function: colors.syn_function,
      type: colors.syn_type,
      neutral: colors.foreground,
      comment: colors.syn_comment,
      error: colors.error,
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
  // variable / property (the consistency bug we fixed)
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
    er = tmFg(t, 'invalid');
  requireSemStyle('keyword', S.keyword, ['bold']);
  requireSemStyle('macro', S.macro, ['bold']);
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

console.log(
  `\n${fail === 0 ? '✅ ALL CONSISTENCY CHECKS PASSED' : `❌ ${fail} FAILURES`}`,
);
process.exit(fail ? 1 : 0);
