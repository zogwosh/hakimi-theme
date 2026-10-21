/**
 * Compiles component variables for Obsidian (Links, Callouts, Tables, Tags, Form Controls).
 *
 * @param {import('../tokens/index.mjs').ThemeTokens} tokens
 * @returns {string} CSS variable declarations
 */
export function compileComponentVariables(tokens) {
  const isDark = tokens.mode === 'dark';
  const linkHover = isDark ? '#79b8ff' : '#0842a0';
  const externalHover = isDark ? '#56d4dd' : '#005b6a';

  return [
    '  /* --- Link Variables --- */',
    `  --link-color: ${tokens.fg.accent};`,
    `  --link-color-hover: ${linkHover};`,
    `  --link-decoration: none;`,
    `  --link-decoration-hover: underline;`,
    `  --link-external-color: ${tokens.intent.info};`,
    `  --link-external-color-hover: ${externalHover};`,
    `  --link-unresolved-color: ${tokens.fg.subtle};`,
    '  --link-unresolved-opacity: 0.7;',
    '  --link-unresolved-decoration-style: dashed;',
    `  --link-unresolved-decoration-color: ${tokens.border.subtle};`,
    '',
    '  /* --- Built-in Callout Type Colors --- */',
    '  --callout-default: var(--color-blue);',
    '  --callout-note: var(--color-blue);',
    '  --callout-summary: var(--color-blue);',
    '  --callout-info: var(--color-cyan);',
    '  --callout-todo: var(--color-cyan);',
    '  --callout-tip: var(--color-green);',
    '  --callout-check: var(--color-green);',
    '  --callout-done: var(--color-green);',
    '  --callout-question: var(--color-yellow);',
    '  --callout-help: var(--color-yellow);',
    '  --callout-faq: var(--color-yellow);',
    '  --callout-warning: var(--color-yellow);',
    '  --callout-caution: var(--color-yellow);',
    '  --callout-attention: var(--color-yellow);',
    '  --callout-failure: var(--color-red);',
    '  --callout-fail: var(--color-red);',
    '  --callout-missing: var(--color-red);',
    '  --callout-danger: var(--color-red);',
    '  --callout-error: var(--color-red);',
    '  --callout-bug: var(--color-red);',
    '  --callout-example: var(--color-purple);',
    '  --callout-quote: var(--text-muted);',
    '',
    '  /* --- Tables & Lists --- */',
    `  --table-border-color: ${tokens.border.subtle};`,
    `  --table-header-background: ${tokens.bg.panel};`,
    '  --table-row-even-background: transparent;',
    `  --table-row-odd-background: ${tokens.bg.surfaceHover};`,
    `  --list-marker-color: ${tokens.fg.muted};`,
    '',
    '  /* --- Tags, Checkboxes & Blockquotes --- */',
    `  --tag-color: ${tokens.fg.accent};`,
    `  --tag-background: ${tokens.bg.surfaceSelected};`,
    `  --tag-background-hover: ${tokens.bg.surfaceActive};`,
    `  --tag-border-color: ${tokens.border.subtle};`,
    `  --checkbox-color: ${tokens.fg.accent};`,
    `  --checkbox-marker-color: ${tokens.fg.onAccent};`,
    `  --checkbox-border-color: ${tokens.border.strong};`,
    `  --blockquote-border-color: ${tokens.fg.accent};`,
    '  --blockquote-border-thickness: 2px;',
  ].join('\n');
}

/**
 * Compiles low-specificity component rules adhering to official Obsidian theme guidelines.
 *
 * @returns {string}
 */
export function compileComponentRules() {
  return `/* ------------------Obsidian Native Components Rules------------------- */
/* Links: Unresolved notes use dashed underline for dual-coding identification */
.markdown-rendered .internal-link.is-unresolved {
  color: var(--link-unresolved-color);
  opacity: var(--link-unresolved-opacity);
  text-decoration: underline dashed var(--link-unresolved-decoration-color);
}

/* Callouts: Clean borders and accessible typography */
.callout {
  border-left: 3px solid var(--callout-color);
  border-radius: var(--radius-s);
  background-color: rgba(var(--callout-color-rgb, var(--interactive-accent-rgb)), 0.08);
}

.callout-title {
  color: var(--callout-color);
  font-weight: 600;
}

/* Tags: Clean pill layout */
.tag {
  color: var(--tag-color);
  background-color: var(--tag-background);
  border: 1px solid var(--tag-border-color);
  border-radius: var(--radius-s);
  padding: 0.1em 0.4em;
  transition: background-color 0.15s ease;
}

.tag:hover {
  background-color: var(--tag-background-hover);
}`;
}
