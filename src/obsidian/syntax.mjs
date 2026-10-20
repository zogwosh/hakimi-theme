import { SYNTAX_PALETTE } from '../syntaxPalette.mjs';

/**
 * Compiles Obsidian code syntax variables and CodeMirror/Prism styling rules.
 *
 * @param {Object} [syntaxPalettes=SYNTAX_PALETTE] Deuteranopia syntax palettes
 * @returns {string} Compiled CSS for code syntax
 */
export function compileObsidianSyntaxStyles(syntaxPalettes = SYNTAX_PALETTE) {
  const lightVariables = compileFlavorSyntaxVariables(
    'light',
    syntaxPalettes.light,
  );
  const darkVariables = compileFlavorSyntaxVariables(
    'dark',
    syntaxPalettes.dark,
  );
  const codeSyntaxRules = compileSyntaxHighlightingRules();

  return [lightVariables, darkVariables, codeSyntaxRules].join('\n\n');
}

/**
 * Compiles --code-* CSS variables for a specific theme flavor.
 *
 * @param {'light' | 'dark'} flavor
 * @param {Record<string, string>} syntax Flavor syntax color tokens
 * @returns {string}
 */
function compileFlavorSyntaxVariables(flavor, syntax) {
  const selector = flavor === 'light' ? '.theme-light' : '.theme-dark';

  return `${selector} {
  --code-background: rgb(var(--ctp-mantle));
  --code-normal: ${syntax.text};
  --code-comment: ${syntax.overlay2};
  --code-function: ${syntax.blue};
  --code-important: ${syntax.yellow};
  --code-keyword: ${syntax.mauve};
  --code-operator: ${syntax.mauve};
  --code-property: ${syntax.text};
  --code-punctuation: ${syntax.overlay2};
  --code-string: ${syntax.green};
  --code-tag: ${syntax.mauve};
  --code-value: ${syntax.yellow};
  --code-error: ${syntax.red};
}`;
}

/**
 * Compiles CodeMirror (.cm-s-obsidian) and Prism (.token.*) syntax styling rules
 * adhering to the 6 Base Colors × 4 Font Styles matrix.
 *
 * @returns {string}
 */
function compileSyntaxHighlightingRules() {
  return `/* ------------------Code Syntax Highlighting (6 Base Colors × 4 Font Styles)------------------- */
.cm-s-obsidian .cm-keyword,
.cm-s-obsidian .cm-operator,
.token.keyword,
.token.operator {
  color: var(--code-keyword);
  font-weight: var(--font-bold);
}

.cm-s-obsidian .cm-builtin,
.token.builtin {
  color: var(--code-keyword);
  font-weight: var(--font-bold);
  font-style: italic;
}

.cm-s-obsidian .cm-tag,
.token.tag {
  color: var(--code-tag);
  font-weight: normal;
}

.cm-s-obsidian .cm-string,
.cm-s-obsidian .cm-string-2,
.token.string,
.token.char {
  color: var(--code-string);
}

.token.regex,
.token.important,
.cm-s-obsidian .cm-string.cm-formatting {
  color: var(--code-string);
  font-weight: var(--font-bold);
}

.token.namespace {
  color: var(--code-string);
  font-style: italic;
}

.cm-s-obsidian .cm-def,
.cm-s-obsidian .cm-variable-2,
.token.function {
  color: var(--code-function);
}

.token.class-name,
.token.constant {
  color: var(--code-value);
  font-weight: var(--font-bold);
}

.cm-s-obsidian .cm-type,
.cm-s-obsidian .cm-variable-3 {
  color: var(--code-value);
  font-style: italic;
}

.cm-s-obsidian .cm-number,
.cm-s-obsidian .cm-atom,
.token.number,
.token.boolean {
  color: var(--code-value);
}

.cm-s-obsidian .cm-variable,
.cm-s-obsidian .cm-property,
.token.property,
.token.variable {
  color: var(--code-normal);
}

.cm-s-obsidian .cm-attribute,
.token.attr-name {
  color: var(--code-normal);
  font-style: italic;
}

.cm-s-obsidian .cm-comment,
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: var(--code-comment);
  font-style: italic;
}

.cm-s-obsidian .cm-bracket,
.cm-s-obsidian .cm-punctuation,
.token.punctuation {
  color: var(--code-punctuation);
}

.cm-s-obsidian .cm-error,
.cm-s-obsidian .cm-invalidchar,
.token.error {
  color: var(--code-error);
  font-weight: var(--font-bold);
  text-decoration: underline;
}`;
}
