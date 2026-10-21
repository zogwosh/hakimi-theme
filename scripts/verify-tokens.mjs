import assert from 'node:assert';
import fs from 'node:fs';
import { apcaLc, deutan, dEok } from '../src/colors.mjs';
import { getThemeTokens } from '../src/tokens/index.mjs';

console.log('Verifying Refactored VS Code Theme & Design Tokens...');

for (const flavor of ['dark', 'light']) {
  console.log(`\n--- Validating ${flavor.toUpperCase()} Theme ---`);
  const tokens = getThemeTokens(flavor);
  const themeFile = `vscode/themes/hakimi-deuteranopia-${flavor}.json`;
  const theme = JSON.parse(fs.readFileSync(themeFile, 'utf8'));

  // 1. Verify 4-zone background rules
  const { colors } = theme;
  console.log('1. Background 4-Zone Rule Verification:');
  console.log(`   - TitleBar: ${colors['titleBar.activeBackground']}`);
  console.log(`   - StatusBar: ${colors['statusBar.background']}`);
  console.log(`   - SideBar:  ${colors['sideBar.background']}`);
  console.log(`   - Panel:    ${colors['panel.background']}`);
  console.log(`   - Editor:   ${colors['editor.background']}`);

  assert.strictEqual(
    colors['titleBar.activeBackground'],
    colors['statusBar.background'],
    `TitleBar and StatusBar backgrounds must be identical in ${flavor}!`,
  );
  assert.notStrictEqual(
    colors['sideBar.background'],
    colors['panel.background'],
    `SideBar and Panel backgrounds should be distinct in ${flavor}!`,
  );
  assert.strictEqual(
    colors['editor.background'],
    tokens.bg.editor,
    `Editor background must match tokens.bg.editor!`,
  );
  console.log('   ✓ 4-Zone background rules strictly satisfied.');

  // 2. Verify no legacy Catppuccin color names exist
  console.log('2. Zero Catppuccin Leaks Verification:');
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
  ];
  const themeJsonStr = JSON.stringify(theme);
  for (const term of catppuccinTerms) {
    assert(
      !themeJsonStr.includes(`"${term}"`),
      `Found legacy Catppuccin token "${term}" in ${themeFile}!`,
    );
  }
  console.log('   ✓ Zero Catppuccin keys or scopes detected.');

  // 3. APCA Contrast Verification
  console.log('3. APCA Accessibility Verification (vs Editor Canvas):');
  const bg = tokens.bg.editor;
  const fg = tokens.fg.default;
  const fgScore = Math.abs(apcaLc(fg, bg));
  console.log(`   - Foreground text contrast: Lc ${fgScore.toFixed(1)} (threshold >= 60)`);
  assert(fgScore >= 60, `Foreground text contrast too low: ${fgScore}`);

  for (const [name, color] of Object.entries(tokens.syntax)) {
    if (name === 'comment') continue; // Comments can have lower contrast
    const score = Math.abs(apcaLc(color, bg));
    console.log(`   - Syntax ${name} (${color}): Lc ${score.toFixed(1)}`);
    assert(score >= 45, `Syntax ${name} contrast too low: ${score}`);
  }
  console.log('   ✓ All key foregrounds pass APCA readability criteria.');

  // 4. Deuteranopia Color Difference Verification
  console.log('4. Deuteranopia Simulated Discriminability:');
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
    console.log(`   - ΔE_OK(${a}, ${b}) under deutan simulation: ${diff.toFixed(3)}`);
    assert(diff >= 0.04, `Deutan distinction between ${a} and ${b} too low: ${diff}`);
  }
  console.log('   ✓ Deuteranopia distinctiveness verified.');
}

console.log('\n========================================');
console.log('All tests passed successfully!');
console.log('========================================');
