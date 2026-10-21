/**
 * Compiles window frame, ribbon, status bar, tabs, and navigation variables.
 *
 * @param {import('../tokens/index.mjs').ThemeTokens} tokens
 * @returns {string} CSS variable declarations
 */
export function compileChromeVariables(tokens) {
  return [
    '  /* --- Window Chrome & Frame --- */',
    `  --titlebar-background: ${tokens.bg.chrome};`,
    `  --titlebar-background-focused: ${tokens.bg.chrome};`,
    `  --titlebar-text-color: ${tokens.fg.muted};`,
    `  --titlebar-text-color-focused: ${tokens.fg.default};`,
    `  --status-bar-background: ${tokens.bg.chrome};`,
    `  --status-bar-text-color: ${tokens.fg.muted};`,
    `  --status-bar-border-color: ${tokens.border.subtle};`,
    `  --ribbon-background: ${tokens.bg.chrome};`,
    `  --ribbon-background-collapsed: ${tokens.bg.chrome};`,
    '',
    '  /* --- Connected Tabs System --- */',
    `  --tab-background-active: ${tokens.bg.editor};`,
    `  --tab-text-color: ${tokens.fg.muted};`,
    `  --tab-text-color-active: ${tokens.fg.highContrast};`,
    `  --tab-text-color-focused: ${tokens.fg.default};`,
    '  --tab-outline-color: transparent;',
    `  --tab-divider-color: ${tokens.border.subtle};`,
    '',
    '  /* --- Navigation & File Explorer --- */',
    `  --nav-item-color: ${tokens.fg.muted};`,
    `  --nav-item-color-hover: ${tokens.fg.default};`,
    `  --nav-item-color-active: ${tokens.fg.highContrast};`,
    `  --nav-item-background-hover: ${tokens.bg.surfaceHover};`,
    `  --nav-item-background-active: ${tokens.bg.surfaceSelected};`,
  ].join('\n');
}

/**
 * Compiles structural rules for window chrome, status bar and connected tabs,
 * preventing visual traps (horizontal slashes, double bounding boxes, and muddy strips).
 *
 * @returns {string}
 */
export function compileChromeStructuralRules() {
  return `/* ------------------Window Chrome & Connected Tabs Rules------------------- */
.workspace-tab-header-container {
  background-color: var(--background-secondary-alt);
  border-bottom: 1px solid var(--divider-color);
}

.workspace-tab-header {
  border: none;
  outline: none;
}

.workspace-tab-header.is-active {
  background-color: var(--tab-background-active);
  box-shadow: none;
  border-top-left-radius: var(--radius-s);
  border-top-right-radius: var(--radius-s);
}

.workspace-tab-header.is-active::before,
.workspace-tab-header.is-active::after {
  display: none;
}

.status-bar {
  background-color: var(--status-bar-background);
  border-top: 1px solid var(--status-bar-border-color);
}`;
}
