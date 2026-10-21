/**
 * Compiles official Obsidian --code-* CSS variables for a given theme mode.
 *
 * @param {import('../tokens/index.mjs').ThemeTokens} tokens
 * @returns {string} CSS declarations for code variables
 */
export function compileCodeSyntaxVariables(tokens) {
  return [
    '  /* --- Code Blocks & Syntax Variables --- */',
    `  --code-background: ${tokens.bg.panel};`,
    `  --code-normal: ${tokens.fg.default};`,
    `  --code-comment: ${tokens.syntax.comment};`,
    `  --code-keyword: ${tokens.syntax.keyword};`,
    `  --code-function: ${tokens.syntax.function};`,
    `  --code-string: ${tokens.syntax.string};`,
    `  --code-value: ${tokens.syntax.number};`,
    `  --code-property: ${tokens.syntax.property};`,
    `  --code-operator: ${tokens.syntax.operator};`,
    `  --code-punctuation: ${tokens.syntax.punctuation};`,
    `  --code-tag: ${tokens.syntax.tag};`,
    `  --code-important: ${tokens.syntax.regex};`,
    `  --code-error: ${tokens.syntax.error};`,
  ].join('\n');
}

/**
 * Compiles CodeMirror 6 and Prism syntax highlighting rules.
 * Implements the Color x Font Style Dual-Coding Matrix for Deuteranopia accessibility.
 *
 * @returns {string}
 */
export function compileCodeSyntaxRules() {
  return `/* ------------------Code Syntax Highlighting (Dual-Coding Matrix)------------------- */
/* Inline Code & Code Blocks */
code,
pre > code {
  color: var(--code-normal);
  background-color: var(--code-background);
  font-family: var(--font-monospace);
}

/* Keywords (Color: Violet, Style: Bold) */
.cm-s-obsidian .cm-keyword,
.token.keyword {
  color: var(--code-keyword);
  font-weight: 700;
}

/* Comments (Color: Muted Slate, Style: Italic) */
.cm-s-obsidian .cm-comment,
.token.comment {
  color: var(--code-comment);
  font-style: italic;
}

/* Functions & Methods (Color: Blue) */
.cm-s-obsidian .cm-def,
.cm-s-obsidian .cm-function,
.token.function {
  color: var(--code-function);
}

/* Strings (Color: Cyan) */
.cm-s-obsidian .cm-string,
.token.string {
  color: var(--code-string);
}

/* Numbers & Values (Color: Peach) */
.cm-s-obsidian .cm-number,
.token.number,
.token.boolean {
  color: var(--code-value);
}

/* Properties & Fields (Color: Teal - Decoupled from Variables) */
.cm-s-obsidian .cm-property,
.token.property {
  color: var(--code-property);
}

/* Operators (Color: Default Foreground) */
.cm-s-obsidian .cm-operator,
.token.operator {
  color: var(--code-operator);
}

/* Punctuation & Brackets (Color: Muted Slate) */
.cm-s-obsidian .cm-punctuation,
.token.punctuation {
  color: var(--code-punctuation);
}

/* Tags & Built-ins (Color: Violet) */
.cm-s-obsidian .cm-tag,
.token.tag,
.token.builtin {
  color: var(--code-tag);
}

/* Regular Expressions & Special (Color: Peach) */
.token.regex,
.token.important {
  color: var(--code-important);
}

/* Syntax Errors */
.token.error,
.cm-s-obsidian .cm-error {
  color: var(--code-error);
  text-decoration: underline wavy var(--code-error);
}`;
}
