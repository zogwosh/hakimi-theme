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
    /* --- Built-in Callout Type Colors (RGB triplets for rgba mixing) --- */
    '  --callout-default: var(--color-blue-rgb);',
    '  --callout-summary: var(--color-blue-rgb);',
    '  --callout-info: var(--color-cyan-rgb);',
    '  --callout-todo: var(--color-cyan-rgb);',
    '  --callout-tip: var(--color-green-rgb);',
    '  --callout-success: var(--color-green-rgb);',
    '  --callout-question: var(--color-yellow-rgb);',
    '  --callout-warning: var(--color-yellow-rgb);',
    '  --callout-fail: var(--color-red-rgb);',
    '  --callout-error: var(--color-red-rgb);',
    '  --callout-bug: var(--color-red-rgb);',
    '  --callout-example: var(--color-purple-rgb);',
    '  --callout-quote: var(--text-muted-rgb);',
    '',
    '  /* --- Tables & Lists --- */',
    `  --table-border-color: ${tokens.border.subtle};`,
    '  --table-border-width: 1px;',
    `  --table-header-background: ${tokens.bg.panel};`,
    `  --table-header-background-hover: ${tokens.bg.surfaceHover};`,
    `  --table-header-border-color: ${tokens.border.subtle};`,
    '  --table-header-border-width: 1px;',
    `  --table-header-color: ${tokens.fg.highContrast};`,
    `  --table-text-color: ${tokens.fg.default};`,
    '  --table-background: transparent;',
    `  --table-column-alt-background: ${tokens.bg.surfaceHover};`,
    `  --list-marker-color: ${tokens.fg.muted};`,
    '',
    '  /* --- Tags, Checkboxes & Blockquotes --- */',
    `  --tag-color: ${tokens.fg.accent};`,
    `  --tag-color-hover: ${tokens.fg.accent};`,
    `  --tag-background: ${tokens.bg.surfaceSelected};`,
    `  --tag-background-hover: ${tokens.bg.surfaceActive};`,
    `  --tag-border-color: ${tokens.border.subtle};`,
    `  --tag-border-color-hover: ${tokens.border.strong};`,
    '  --tag-border-width: 1px;',
    '  --tag-radius: var(--radius-s);',
    '  --tag-padding-x: 0.5em;',
    '  --tag-padding-y: 0.15em;',
    `  --checkbox-color: ${tokens.fg.accent};`,
    `  --checkbox-color-hover: ${linkHover};`,
    `  --checkbox-marker-color: ${tokens.fg.onAccent};`,
    `  --checkbox-border-color: ${tokens.border.strong};`,
    `  --checkbox-border-color-hover: ${tokens.border.focus};`,
    `  --checklist-done-color: ${tokens.fg.subtle};`,
    '  --checklist-done-decoration: line-through;',
    `  --blockquote-border-color: ${tokens.fg.accent};`,
    '  --blockquote-border-thickness: 2px;',
    `  --blockquote-color: ${tokens.fg.muted};`,
    '  --blockquote-background-color: transparent;',
    '',
    '  /* --- Properties (Metadata) --- */',
    '  --metadata-background: transparent;',
    `  --metadata-border-color: ${tokens.border.subtle};`,
    `  --metadata-divider-color: ${tokens.border.subtle};`,
    `  --metadata-divider-color-hover: ${tokens.border.strong};`,
    `  --metadata-divider-color-focus: ${tokens.border.focus};`,
    `  --metadata-property-background-hover: ${tokens.bg.surfaceHover};`,
    `  --metadata-property-background-active: ${tokens.bg.surfaceActive};`,
    `  --metadata-label-text-color: ${tokens.fg.muted};`,
    `  --metadata-label-text-color-hover: ${tokens.fg.default};`,
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
  border-left: 3px solid rgb(var(--callout-color));
  border-radius: var(--radius-s);
  background-color: rgba(var(--callout-color), 0.08);
}

.callout-title {
  color: rgb(var(--callout-color));
  font-weight: 600;
}

/* Tags: Clean pill layout */
.tag {
  color: var(--tag-color);
  background-color: var(--tag-background);
  border: var(--tag-border-width, 1px) solid var(--tag-border-color);
  border-radius: var(--tag-radius, var(--radius-s));
  padding: 0.1em 0.4em;
  transition: background-color 0.15s ease;
}

.tag:hover {
  background-color: var(--tag-background-hover);
  border-color: var(--tag-border-color-hover);
}`;
}
