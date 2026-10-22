import assert from 'node:assert';
import fs from 'node:fs';
import { apcaLc, deutan, dEok } from '../src/colors.mjs';
import { getThemeTokens } from '../src/tokens/index.mjs';

console.log('Verifying Refactored VS Code, Zed Editor & Obsidian Themes...');

const catppuccinTerms = [
  'crust',
  'mantle',
  'surface0',
  'surface1',
  'surface2',
  'rosewater',
  'flamingo',
  'mauve',
  'sapphire',
  'maroon',
  'ctp-',
];

// 43 Official captures required by Zed documentation (https://zed.dev/docs/extensions/languages)
const requiredZedCaptures = [
  'attribute',
  'boolean',
  'comment',
  'comment.doc',
  'constant',
  'constant.builtin',
  'constructor',
  'embedded',
  'emphasis',
  'emphasis.strong',
  'enum',
  'function',
  'hint',
  'keyword',
  'label',
  'link_text',
  'link_uri',
  'number',
  'operator',
  'predictive',
  'preproc',
  'primary',
  'property',
  'punctuation',
  'punctuation.bracket',
  'punctuation.delimiter',
  'punctuation.list_marker',
  'punctuation.special',
  'string',
  'string.escape',
  'string.regex',
  'string.special',
  'string.special.symbol',
  'tag',
  'tag.doctype',
  'text.literal',
  'title',
  'type',
  'type.builtin',
  'variable',
  'variable.special',
  'variable.parameter',
  'variant',
];

const zedThemeFamilyFile = 'zed/themes/hakimi-deuteranopia.json';
const zedThemeFamily = JSON.parse(fs.readFileSync(zedThemeFamilyFile, 'utf8'));

for (const flavor of ['dark', 'light']) {
  console.log(`\n========================================`);
  console.log(`  Validating ${flavor.toUpperCase()} Theme`);
  console.log(`========================================`);

  const tokens = getThemeTokens(flavor);
  const vsCodeThemeFile = `vscode/themes/hakimi-deuteranopia-${flavor}.json`;
  const vsCodeTheme = JSON.parse(fs.readFileSync(vsCodeThemeFile, 'utf8'));
  const zedTheme = zedThemeFamily.themes.find((t) => t.appearance === flavor);
  assert(zedTheme, `Zed theme for appearance ${flavor} not found!`);

  // ---------------------------------------------------------------------------
  // 1. VS Code 4-Zone Background Rules
  // ---------------------------------------------------------------------------
  console.log('1. VS Code 4-Zone Background Rule Verification:');
  const vsColors = vsCodeTheme.colors;
  assert.strictEqual(
    vsColors['titleBar.activeBackground'],
    vsColors['statusBar.background'],
    `VS Code: TitleBar and StatusBar backgrounds must be identical in ${flavor}!`,
  );
  assert.notStrictEqual(
    vsColors['sideBar.background'],
    vsColors['panel.background'],
    `VS Code: SideBar and Panel backgrounds should be distinct in ${flavor}!`,
  );
  assert.strictEqual(
    vsColors['editor.background'],
    tokens.bg.editor,
    `VS Code: Editor background must match tokens.bg.editor!`,
  );
  console.log('   ✓ VS Code 4-Zone background rules strictly satisfied.');

  // ---------------------------------------------------------------------------
  // 2. Zed 4-Zone Background Rules & Connected Tabs
  // ---------------------------------------------------------------------------
  console.log('2. Zed 4-Zone Background & Connected Tab Rule Verification:');
  const zedStyle = zedTheme.style;
  assert.strictEqual(
    zedStyle['title_bar.background'],
    zedStyle['status_bar.background'],
    `Zed: TitleBar and StatusBar backgrounds must be identical in ${flavor}!`,
  );
  assert.strictEqual(
    zedStyle['tab_bar.background'],
    zedStyle['title_bar.background'],
    `Zed: TabBar background must match TitleBar (Zone 1 Chrome) in ${flavor}!`,
  );
  assert.strictEqual(
    zedStyle['tab.active_background'],
    zedStyle['editor.background'],
    `Zed: Active Tab must seamlessly match Editor background in ${flavor}!`,
  );
  assert.strictEqual(
    zedStyle['editor.background'],
    tokens.bg.editor,
    `Zed: Editor background must match tokens.bg.editor!`,
  );
  assert.strictEqual(
    zedStyle['panel.background'],
    tokens.bg.sidebar,
    `Zed: Project panel background must match tokens.bg.sidebar!`,
  );
  console.log('   ✓ Zed 4-Zone background rules strictly satisfied.');

  // ---------------------------------------------------------------------------
  // 3. Obsidian 4-Zone Background & Connected Tab Rules
  // ---------------------------------------------------------------------------
  console.log(
    '3. Obsidian 4-Zone Background & Connected Tab Rule Verification:',
  );
  const obsidianCss = fs.readFileSync('obsidian/theme.css', 'utf8');
  const flavorSelector = flavor === 'light' ? '.theme-light' : '.theme-dark';
  const flavorBlockMatch = obsidianCss.match(
    new RegExp(`${flavorSelector} \\{([\\s\\S]*?)\\n\\}`),
  );
  assert(
    flavorBlockMatch,
    `Obsidian theme.css is missing selector block for ${flavorSelector}!`,
  );
  const flavorDeclarations = flavorBlockMatch[1];

  const extractVar = (name) => {
    const match = flavorDeclarations.match(new RegExp(`${name}:\\s*([^;]+);`));
    return match ? match[1].trim() : null;
  };

  assert.strictEqual(
    extractVar('--titlebar-background'),
    extractVar('--status-bar-background'),
    `Obsidian: TitleBar and StatusBar backgrounds must be identical in ${flavor}!`,
  );
  assert.strictEqual(
    extractVar('--status-bar-background'),
    tokens.bg.chrome,
    `Obsidian: StatusBar background must match tokens.bg.chrome in ${flavor}!`,
  );
  assert.strictEqual(
    extractVar('--tab-background-active'),
    tokens.bg.editor,
    `Obsidian: Active Tab must seamlessly match tokens.bg.editor in ${flavor}!`,
  );
  assert.strictEqual(
    extractVar('--background-primary'),
    tokens.bg.editor,
    `Obsidian: Primary background must match tokens.bg.editor in ${flavor}!`,
  );
  assert.strictEqual(
    extractVar('--background-secondary'),
    tokens.bg.sidebar,
    `Obsidian: Secondary background must match tokens.bg.sidebar in ${flavor}!`,
  );
  assert.strictEqual(
    extractVar('--tab-outline-color'),
    'transparent',
    `Obsidian: Tab outline color must be transparent to eliminate double bounding boxes!`,
  );
  assert.strictEqual(
    extractVar('--text-selection'),
    tokens.bg.selection,
    `Obsidian: Text selection background must match tokens.bg.selection in ${flavor}!`,
  );
  assert.strictEqual(
    extractVar('--inline-title-color'),
    tokens.fg.default,
    `Obsidian: Inline title color must match tokens.fg.default in ${flavor}!`,
  );
  assert.strictEqual(
    extractVar('--callout-default'),
    'var(--color-blue-rgb)',
    `Obsidian: Callout default must reference RGB triplet in ${flavor}!`,
  );
  console.log('   ✓ Obsidian 4-Zone background rules strictly satisfied.');

  // ---------------------------------------------------------------------------
  // 4. Zero Catppuccin Leaks Verification
  // ---------------------------------------------------------------------------
  console.log('4. Zero Catppuccin Leaks Verification:');
  const vsCodeStr = JSON.stringify(vsCodeTheme);
  const zedStr = JSON.stringify(zedTheme);

  for (const term of catppuccinTerms) {
    assert(
      !vsCodeStr.includes(`"${term}"`),
      `Found legacy Catppuccin token "${term}" in ${vsCodeThemeFile}!`,
    );
    assert(
      !zedStr.includes(`"${term}"`),
      `Found legacy Catppuccin token "${term}" in ${zedThemeFamilyFile}!`,
    );
    assert(
      !obsidianCss.includes(term),
      `Found legacy Catppuccin token "${term}" in obsidian/theme.css!`,
    );
  }
  console.log(
    '   ✓ Zero Catppuccin keys or scopes detected across VS Code, Zed, and Obsidian.',
  );

  // ---------------------------------------------------------------------------
  // 5. Zed Official Tree-sitter Captures Coverage
  // ---------------------------------------------------------------------------
  console.log('5. Zed Official Tree-sitter Captures Coverage Verification:');
  const zedSyntax = zedStyle.syntax;
  for (const capture of requiredZedCaptures) {
    assert(
      zedSyntax[capture] !== undefined,
      `Missing required Tree-sitter capture "${capture}" in Zed ${flavor} theme!`,
    );
    assert(
      typeof zedSyntax[capture].color === 'string' &&
        zedSyntax[capture].color.startsWith('#'),
      `Capture "${capture}" does not have a valid hex color in Zed ${flavor} theme!`,
    );
  }
  console.log(
    `   ✓ All ${requiredZedCaptures.length} official Zed captures strictly covered.`,
  );

  // ---------------------------------------------------------------------------
  // 6. APCA Contrast Verification
  // ---------------------------------------------------------------------------
  console.log('6. APCA Accessibility Verification (vs Editor Canvas):');
  const bg = tokens.bg.editor;
  const fg = tokens.fg.default;
  const fgScore = Math.abs(apcaLc(fg, bg));
  console.log(
    `   - Foreground text contrast: Lc ${fgScore.toFixed(1)} (threshold >= 60)`,
  );
  assert(fgScore >= 60, `Foreground text contrast too low: ${fgScore}`);

  for (const [name, color] of Object.entries(tokens.syntax)) {
    if (name === 'comment') continue;
    const score = Math.abs(apcaLc(color, bg));
    console.log(`   - Syntax ${name} (${color}): Lc ${score.toFixed(1)}`);
    assert(score >= 45, `Syntax ${name} contrast too low: ${score}`);
  }
  console.log('   ✓ All key foregrounds pass APCA readability criteria.');

  // ---------------------------------------------------------------------------
  // 7. Deuteranopia Color Difference Verification
  // ---------------------------------------------------------------------------
  console.log('7. Deuteranopia Simulated Discriminability:');
  const syntaxPairs = [
    ['keyword', 'function'],
    ['function', 'type'],
    ['type', 'string'],
    ['string', 'number'],
    ['keyword', 'string'],
    ['property', 'variable'],
    ['property', 'string'],
    ['property', 'function'],
  ];

  for (const [a, b] of syntaxPairs) {
    const colA = tokens.syntax[a];
    const colB = tokens.syntax[b];
    const simA = deutan(colA, bg);
    const simB = deutan(colB, bg);
    const diff = dEok(simA, simB);
    console.log(
      `   - ΔE_OK(${a}, ${b}) under deutan simulation: ${diff.toFixed(3)}`,
    );
    assert(
      diff >= 0.04,
      `Deutan distinction between ${a} and ${b} too low: ${diff}`,
    );
  }
  console.log('   ✓ Deuteranopia distinctiveness verified.');

  // ---------------------------------------------------------------------------
  // 8. Terminal ANSI 16-Color Palette Verification
  // ---------------------------------------------------------------------------
  console.log('8. Terminal ANSI 16-Color Palette Verification:');
  const term = tokens.terminal;
  const termBg = term.background;

  const normalColors = [
    ['Black', term.ansiBlack],
    ['Red', term.ansiRed],
    ['Green', term.ansiGreen],
    ['Yellow', term.ansiYellow],
    ['Blue', term.ansiBlue],
    ['Magenta', term.ansiMagenta],
    ['Cyan', term.ansiCyan],
    ['White', term.ansiWhite],
  ];

  const brightColors = [
    ['BrightBlack', term.ansiBrightBlack],
    ['BrightRed', term.ansiBrightRed],
    ['BrightGreen', term.ansiBrightGreen],
    ['BrightYellow', term.ansiBrightYellow],
    ['BrightBlue', term.ansiBrightBlue],
    ['BrightMagenta', term.ansiBrightMagenta],
    ['BrightCyan', term.ansiBrightCyan],
    ['BrightWhite', term.ansiBrightWhite],
  ];

  for (let i = 0; i < 8; i++) {
    const [normName, normCol] = normalColors[i];
    const [brName, brCol] = brightColors[i];

    // Guarantee Normal and Bright are never identical duplicates
    assert.notStrictEqual(
      normCol,
      brCol,
      `Terminal ${flavor}: ${normName} and ${brName} must have distinct colors!`,
    );

    const pairDiff = dEok(normCol, brCol);
    console.log(`   - ΔE_OK(${normName}, ${brName}): ${pairDiff.toFixed(3)}`);
    assert(
      pairDiff >= 0.04,
      `Terminal ${flavor}: Distinction between ${normName} and ${brName} too low (${pairDiff.toFixed(3)})!`,
    );
  }

  // Yellow pair specific distinction under Deuteranopia simulation
  const simYellow = deutan(term.ansiYellow, termBg);
  const simBrightYellow = deutan(term.ansiBrightYellow, termBg);
  const yellowDeutanDiff = dEok(simYellow, simBrightYellow);
  console.log(
    `   - ΔE_OK(Yellow, BrightYellow) under deutan: ${yellowDeutanDiff.toFixed(3)}`,
  );
  assert(
    yellowDeutanDiff >= 0.05,
    `Terminal ${flavor}: Yellow vs BrightYellow deutan distinction too low (${yellowDeutanDiff.toFixed(3)})!`,
  );
  console.log('   ✓ Terminal ANSI 16-color palette verified.');
}

console.log('\n========================================');
console.log('All VS Code, Zed & Obsidian verifications passed successfully!');
console.log('========================================');
