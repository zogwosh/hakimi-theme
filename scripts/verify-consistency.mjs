// Proves: (1) semantic token color == TextMate color for every shared role,
// (2) required font-style cues exist, (3) no pre-redesign colors remain in syntax.
import fs from 'node:fs';

const themes = {
  dark: JSON.parse(
    fs.readFileSync('vscode-themes/hakimi-deuteranopia-dark.json', 'utf8'),
  ),
  light: JSON.parse(
    fs.readFileSync('vscode-themes/hakimi-deuteranopia-light.json', 'utf8'),
  ),
};

// expected role -> color per flavor
const ROLE = {
  dark: {
    keyword: '#7ab2ff',
    string: '#80dcff',
    function: '#f0d68f',
    type: '#ff9536',
    neutral: '#e0e0e0',
    comment: '#99a0a8',
    error: '#ff8585',
  },
  light: {
    keyword: '#4c6698',
    string: '#004b8f',
    function: '#704400',
    type: '#4a250e',
    neutral: '#45494c',
    comment: '#6f706f',
    error: '#6f1f65',
  },
};
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

for (const flavor of ['dark', 'light']) {
  const t = themes[flavor],
    R = ROLE[flavor],
    S = t.semanticTokenColors;
  console.log(
    `\n===== ${flavor.toUpperCase()} : semantic == TextMate per role =====`,
  );
  // keyword
  eq('keyword (sem)', S.keyword, R.keyword);
  eq('keyword (tm)', tmFg(t, 'keyword.control').fg, R.keyword);
  // string
  eq('string (sem)', S.string, R.string);
  eq('string (tm)', tmFg(t, 'string.template').fg, R.string);
  // function
  eq('function (sem)', S.function, R.function);
  eq('function (tm)', tmFg(t, 'entity.name.function').fg, R.function);
  // type / class / number / enumMember
  eq('type (sem)', S.type, R.type);
  eq('enumMember(sem)', S.enumMember, R.type);
  eq('number (sem)', S.number, R.type);
  eq('type (tm)', tmFg(t, 'entity.name.type').fg, R.type);
  eq('number (tm)', tmFg(t, 'constant.numeric').fg, R.type);
  // variable / property (the consistency bug we fixed)
  eq('property (sem)', S.property, R.neutral);
  eq('variable (sem)', S.variable, R.neutral);
  eq('property (tm)', tmFg(t, 'variable.other.property').fg, R.neutral);
  eq('variable (tm)', tmFg(t, 'variable.parameter').fg, R.neutral);
  // built-in class = keyword-blue both layers
  eq('class:defaultLibrary (sem)', S['class:defaultLibrary'], R.keyword);
  eq(
    'support.class.builtin (tm)',
    tmFg(t, 'support.class.builtin').fg,
    R.keyword,
  );

  console.log(`  --- font-style cues ---`);
  const kw = tmFg(t, 'keyword.control'),
    cm = tmFg(t, 'comment'),
    er = tmFg(t, 'invalid');
  console.log(
    `  ${kw.style.includes('bold') ? '✓' : '✗'} keyword bold (${kw.style})`,
  );
  if (!kw.style.includes('bold')) fail++;
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
