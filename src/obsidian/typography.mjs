// Obsidian typography rules ported from catppuccin/obsidian _typography.scss
export function compileTypographyStyles() {
  return `/* ------------------CSS Snippets------------------ */
.ctp-bold-folder-title .nav-folder-title-content {
  font-weight: var(--font-bold);
}

body {
  --font-text-theme:
    "Vollkorn",
    -apple-system,
    blinkmacsystemfont,
    "Segoe UI",
    "Microsoft YaHei Light",
    roboto,
    inter,
    sans-serif;
  --font-interface-theme:
    "Nunito Sans",
    -apple-system,
    blinkmacsystemfont,
    "Segoe UI",
    "Microsoft YaHei Light",
    roboto,
    inter,
    sans-serif;
}

strong,
.cm-strong,
.cm-s-obsidian span.cm-formatting-strong,
.cm-s-obsidian span.cm-strong {
  --bold-color: rgb(var(--ctp-bold, var(--ctp-sapphire)));
  color: rgb(var(--ctp-bold, var(--ctp-sapphire)));
}

em,
.cm-em {
  --italic-color: rgb(var(--ctp-italic, var(--ctp-green)));
}

del,
.cm-strikethrough {
  color: rgb(var(--ctp-strikethrough, var(--ctp-maroon)));
}

.cm-s-obsidian .cm-link.cm-strikethrough {
  text-decoration: line-through;
}

.markdown-rendered blockquote,
.cm-s-obsidian span.cm-quote {
  --blockquote-border-color: rgb(var(--ctp-blockquote, var(--ctp-accent)));
  --blockquote-color: rgb(var(--ctp-blockquote, var(--ctp-rosewater)));
}

.cm-em.cm-strong,
strong > em,
em > strong {
  color: rgb(var(--ctp-teal));
}

.markdown-source-view ol > li,
.markdown-source-view ul > li,
.markdown-preview-view ol > li,
.markdown-preview-view ul > li,
.markdown-rendered ul > li,
.mod-cm6 .HyperMD-list-line.cm-line {
  padding-top: 0;
  padding-bottom: 0;
}

.inline-title {
  --inline-title-color: rgb(var(--ctp-page-title, var(--ctp-text)));
}

h1,
.markdown-rendered h1,
.HyperMD-header-1,
.HyperMD-list-line .cm-header-1 {
  --h1-color: rgb(var(--ctp-h1, var(--ctp-accent)));
  line-height: var(--h1-line-height);
}

h2,
.markdown-rendered h2,
.HyperMD-header-2,
.HyperMD-list-line .cm-header-2 {
  --h2-color: rgb(var(--ctp-h2, var(--ctp-accent)));
  line-height: var(--h2-line-height);
}

h3,
.markdown-rendered h3,
.HyperMD-header-3,
.HyperMD-list-line .cm-header-3 {
  --h3-color: rgb(var(--ctp-h3, var(--ctp-accent)));
  line-height: var(--h3-line-height);
}

h4,
.markdown-rendered h4,
.HyperMD-header-4,
.HyperMD-list-line .cm-header-4 {
  --h4-color: rgb(var(--ctp-h4, var(--ctp-accent)));
  line-height: var(--h4-line-height);
}

h5,
.markdown-rendered h5,
.HyperMD-header-5,
.HyperMD-list-line .cm-header-5 {
  --h5-color: rgb(var(--ctp-h5, var(--ctp-accent)));
  line-height: var(--line-height-normal);
}

h6,
.markdown-rendered h6,
.HyperMD-header-6,
.HyperMD-list-line .cm-header-6 {
  --h6-color: rgb(var(--ctp-h6, var(--ctp-accent)));
  line-height: var(--line-height-normal);
}

.markdown-source-view.mod-cm6 .cm-indent::before {
  width: 0;
}

.markdown-rendered.show-indentation-guide li > ul::before,
.markdown-rendered.show-indentation-guide li > ol::before {
  left: -13px;
}

/* markdown ==highlight== colors */
.markdown-rendered mark,
.cm-s-obsidian span.cm-formatting-highlight,
.cm-s-obsidian span.cm-highlight {
  background-color: var(--highlight-background);
  color: var(--text-on-accent);
}
.markdown-rendered mark.cm-em,
.markdown-rendered mark em,
.cm-s-obsidian span.cm-formatting-highlight.cm-em,
.cm-s-obsidian span.cm-formatting-highlight em,
.cm-s-obsidian span.cm-highlight.cm-em,
.cm-s-obsidian span.cm-highlight em {
  background-image: linear-gradient(rgb(var(--ctp-green), 80%), rgb(var(--ctp-green), 80%), rgb(var(--ctp-green), 80%));
  color: var(--text-on-accent);
  text-align: left;
}
.markdown-rendered mark.cm-strong,
.markdown-rendered mark strong,
.cm-s-obsidian span.cm-formatting-highlight.cm-strong,
.cm-s-obsidian span.cm-formatting-highlight strong,
.cm-s-obsidian span.cm-highlight.cm-strong,
.cm-s-obsidian span.cm-highlight strong {
  background-image: linear-gradient(rgb(var(--ctp-sapphire), 80%), rgb(var(--ctp-sapphire), 80%), rgb(var(--ctp-sapphire), 80%));
  color: var(--text-on-accent);
}
.markdown-rendered mark.cm-strikethrough,
.markdown-rendered mark del,
.cm-s-obsidian span.cm-formatting-highlight.cm-strikethrough,
.cm-s-obsidian span.cm-formatting-highlight del,
.cm-s-obsidian span.cm-highlight.cm-strikethrough,
.cm-s-obsidian span.cm-highlight del {
  background-image: linear-gradient(rgb(var(--ctp-red), 80%), rgb(var(--ctp-red), 80%), rgb(var(--ctp-red), 80%));
  color: var(--text-on-accent);
}

.cm-s-obsidian span.cm-highlight-red {
  --highlight-background: var(--highlight-background-red);
}

.cm-s-obsidian span.cm-highlight-orange {
  --highlight-background: var(--highlight-background-orange);
}

.cm-s-obsidian span.cm-highlight-yellow {
  --highlight-background: var(--highlight-background-yellow);
}

.cm-s-obsidian span.cm-highlight-green {
  --highlight-background: var(--highlight-background-green);
}

.cm-s-obsidian span.cm-highlight-blue {
  --highlight-background: var(--highlight-background-blue);
}

.cm-s-obsidian span.cm-highlight-purple {
  --highlight-background: var(--highlight-background-purple);
}

/**
* 1. Adjust cursor color in highlighted text, so that it is more visible
*/
.cm-s-obsidian span.cm-formatting-highlight,
.cm-s-obsidian span.cm-highlight {
  --caret-color: var(--text-on-accent);
  caret-color: var(--caret-color);
}

.cm-s-obsidian span.cm-error {
  color: rgb(var(--ctp-red));
}

.tooltip {
  border: 1px solid rgb(var(--ctp-rosewater), 60%);
  background-color: var(--background-secondary);
  box-shadow: 0 0 4px rgb(var(--ctp-mantle));
  color: rgb(var(--ctp-rosewater), 80%);
}

.drag-ghost {
  --drag-ghost-background: var(--background-secondary);
  --drag-ghost-text-color: rgb(var(--ctp-rosewater), 80%);
  border: 1px solid rgb(var(--ctp-rosewater), 60%);
}

/**
* 1. Not sure when or why I added this, but it became an issue in
https://github.com/catppuccin/obsidian/issues/60. I have set it to the value it
should have. Hopefully it doesn't break anything!
*/
.tree-item-self.is-clickable.nav-file-title.has-focus[style] {
  --background-modifier-border-focus: var(--color-base-40);
}

/*
* From app.css
*/
/*
* TODO: Add border to popups that appear during plugin, theme, etc.
* updates.
*/
/* Triangle hack to make tooltip look like a speech bubble */
.tooltip .tooltip-arrow {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 0;
  border-right: 5px solid transparent;
  border-bottom: 5px solid rgb(var(--ctp-rosewater), 60%);
  border-left: 5px solid transparent;
  margin-left: -5px;
  content: " ";
  font-size: 0;
  line-height: 0;
}

.tooltip.mod-right .tooltip-arrow {
  top: calc(50% - 5px);
  left: -5px;
  border-top: 5px solid transparent;
  border-right: 5px solid rgb(var(--ctp-rosewater), 60%);
  border-bottom: 5px solid transparent;
}

.tooltip.mod-left .tooltip-arrow {
  top: calc(50% - 5px);
  left: calc(100% + 5px);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid rgb(var(--ctp-rosewater), 60%);
}

.tooltip.mod-top .tooltip-arrow {
  top: 100%;
  border-top: 5px solid rgb(var(--ctp-rosewater), 60%);
  border-bottom: 5px solid transparent;
}

.tooltip.mod-error .tooltip-arrow {
  border-bottom-color: rgb(var(--ctp-red), 60%);
}

.tooltip.mod-error.mod-right .tooltip-arrow {
  border-right-color: rgb(var(--ctp-red), 60%);
  border-bottom: 5px solid transparent;
}

.tooltip.mod-error.mod-left .tooltip-arrow {
  border-bottom: 5px solid transparent;
  border-left-color: rgb(var(--ctp-red), 60%);
}

/* bezier from Josh Comeau's blog */
body {
  --transition-hover-bg: background-color 0.3s cubic-bezier(0.44, 0.21, 0, 1);
  --transition-hover-color: color 0.3s cubic-bezier(0.44, 0.21, 0, 1);
  --transition-hover-color-fast: color 0.2s cubic-bezier(0.44, 0.21, 0, 1);
  --transition-hover-box-shadow: box-shadow 0.3s cubic-bezier(0.44, 0.21, 0, 1);
  --transition-text-decoration-color: text-decoration-color 0.3s cubic-bezier(0.44, 0.21, 0, 1);
}

.callout {
  --callout-icon: lucide-pencil;
  border-color: color-mix(in srgb, var(--callout-color) 60%, transparent);
  background-color: color-mix(in srgb, var(--callout-color) 10%, transparent);
}

.cm-s-obsidian span.cm-formatting-quote {
  color: rgb(var(--ctp-accent));
}

.callout[data-callout=abstract],
.callout[data-callout=summary],
.callout[data-callout=tldr] {
  --callout-icon: lucide-clipboard-list;
}

.callout[data-callout=info] {
  --callout-icon: lucide-info;
}

.callout[data-callout=todo] {
  --callout-icon: lucide-check-circle-2;
}

.callout[data-callout=tip],
.callout[data-callout=hint],
.callout[data-callout=important] {
  --callout-icon: lucide-flame;
}

.callout[data-callout=success],
.callout[data-callout=check],
.callout[data-callout=done] {
  --callout-icon: lucide-check;
}

.callout[data-callout=question],
.callout[data-callout=help],
.callout[data-callout=faq] {
  --callout-icon: help-circle;
}

.callout[data-callout=warning],
.callout[data-callout=caution],
.callout[data-callout=attention] {
  --callout-icon: lucide-alert-triangle;
}

.callout[data-callout=failure],
.callout[data-callout=fail],
.callout[data-callout=missing] {
  --callout-icon: lucide-x;
}

.callout[data-callout=danger],
.callout[data-callout=error] {
  --callout-icon: lucide-zap;
}

.callout[data-callout=bug] {
  --callout-icon: lucide-bug;
}

.callout[data-callout=example] {
  --callout-icon: lucide-list;
}

.callout[data-callout=quote],
.callout[data-callout=cite] {
  --callout-icon: quote-glyph;
}

.prompt {
  --prompt-border-color: rgb(var(--ctp-surface1));
}
.prompt .prompt-input[type=text] {
  border: 0;
}
.prompt .prompt-results {
  background-color: var(--background-secondary);
  box-shadow: inset 0 0 10px rgb(var(--ctp-crust)), inset 0 0 12px rgb(var(--ctp-base));
}
.prompt:hover .suggestion-hotkey {
  box-shadow: inset 0 0 2px rgb(var(--ctp-crust)), inset 0 0 4px rgb(var(--ctp-base));
}

.suggestion-item.is-selected {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.suggestion-item.is-selected .suggestion-flair {
  color: var(--text-on-accent);
}

.suggestion-item.mod-complex .suggestion-hotkey {
  background-color: rgb(var(--ctp-surface0));
  color: var(--text-normal);
}

.suggestion-item.mod-complex.is-selected .suggestion-note {
  color: var(--text-on-accent);
}

.clickable-icon,
.mod-left-split .workspace-tab-header,
.mod-right-split .workspace-tab-header {
  margin: 0 2px;
}
.clickable-icon:hover,
.mod-left-split .workspace-tab-header:hover,
.mod-right-split .workspace-tab-header:hover {
  --background-modifier-hover: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.clickable-icon:hover svg,
.mod-left-split .workspace-tab-header:hover svg,
.mod-right-split .workspace-tab-header:hover svg {
  color: var(--text-on-accent);
}

.clickable-icon[aria-disabled=true]:hover {
  background-color: rgb(var(--ctp-accent));
}

.clickable-icon.is-active,
.mod-left-split .workspace-tab-header.has-active-menu,
.mod-right-split .workspace-tab-header.has-active-menu,
.mod-left-split .workspace-tab-header.is-active,
.mod-right-split .workspace-tab-header.is-active {
  box-shadow: inset 0 0 4px rgb(var(--ctp-crust)), inset 0 0 6px rgb(var(--ctp-base));
  outline: 1px solid rgb(var(--ctp-surface1));
}
.clickable-icon.is-active svg,
.mod-left-split .workspace-tab-header.has-active-menu svg,
.mod-right-split .workspace-tab-header.has-active-menu svg,
.mod-left-split .workspace-tab-header.is-active svg,
.mod-right-split .workspace-tab-header.is-active svg {
  color: rgb(var(--ctp-accent));
}
.clickable-icon.is-active:hover, .clickable-icon.is-active:hover svg,
.mod-left-split .workspace-tab-header.has-active-menu:hover,
.mod-left-split .workspace-tab-header.has-active-menu:hover svg,
.mod-right-split .workspace-tab-header.has-active-menu:hover,
.mod-right-split .workspace-tab-header.has-active-menu:hover svg,
.mod-left-split .workspace-tab-header.is-active:hover,
.mod-left-split .workspace-tab-header.is-active:hover svg,
.mod-right-split .workspace-tab-header.is-active:hover,
.mod-right-split .workspace-tab-header.is-active:hover svg {
  background-color: rgb(var(--ctp-accent));
  box-shadow: none;
  color: var(--text-on-accent);
}

.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner-close-button:hover,
.workspace-tab-header.is-active .workspace-tab-header-inner-close-button:hover,
.suggestion :hover.list-item-part.clickable-icon[aria-label="Clear search history"],
.modal-close-button:hover {
  background-color: rgb(var(--ctp-red));
  box-shadow: 0 0 2px 1px rgb(var(--ctp-surface1));
  color: rgb(var(--ctp-base));
}

.workspace-tab-header-inner-close-button:hover {
  background-color: rgb(var(--ctp-red), 50%);
}

.workspace-tab-header-inner:hover .workspace-tab-header-inner-icon {
  --icon-color-hover: var(--text-faint);
  --opacity-icon-hover: 1;
}

.search-input-clear-button:hover,
.search-input-clear-button:active {
  color: rgb(var(--ctp-red));
}

/*
* Windows and Linux min, max, and close buttons
*/
.mod-linux .titlebar-button:hover,
.mod-windows .titlebar-button:hover {
  background-color: rgb(var(--ctp-pink));
  color: var(--text-on-accent);
}

.mod-linux .titlebar-button.mod-close:hover,
.mod-windows .titlebar-button.mod-close:hover {
  background-color: rgb(var(--ctp-red));
  color: var(--text-on-accent);
}

/*
* Folder icons
*/
.nav-folder-collapse-indicator,
.nav-folder.mod-root > .nav-folder-title .nav-folder-title-content::before {
  display: none;
}

/*
* Closed folder
*/
.nav-folder.is-collapsed .nav-folder-title .nav-folder-title-content::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z'%3E%3C/path%3E%3Cpath d='M2 10h20'%3E%3C/path%3E%3C/svg%3E");
}

.nav-folder.is-collapsed .nav-folder-title .nav-folder-title-content::before,
.nav-folder .nav-folder-title .nav-folder-title-content::before {
  width: var(--icon-xs);
  height: var(--icon-xs);
  margin-right: 8px;
  background-color: currentcolor;
  background-repeat: no-repeat;
  vertical-align: -2px;
}
.nav-folder.is-collapsed .nav-folder-title .nav-folder-title-content::before:hover,
.nav-folder .nav-folder-title .nav-folder-title-content::before:hover {
  color: var(--text-on-accent);
}

.tree-item-self.is-being-renamed:focus-within {
  color: currentcolor;
}

/*
* Open folder
*/
.nav-folder .nav-folder-title .nav-folder-title-content::before {
  display: inline-block;
  width: var(--icon-xs);
  height: var(--icon-xs);
  background-size: 16px 16px;
  content: "";
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2'%3E%3C/path%3E%3C/svg%3E");
}

/*
* Hide icons with Style Settings
*/
.ctp-icon-hide .nav-folder .nav-folder-title .nav-folder-title-content::before,
.ctp-icon-hide .nav-folder.is-collapsed .nav-folder-title .nav-folder-title-content::before,
.ctp-icon-hide .nav-folder .nav-folder-title .nav-folder-title-content::before,
.ctp-icon-hide .nav-folder.is-collapsed .nav-folder-title .nav-folder-title-content::before {
  display: none;
}

/*
* Bring block edit button in line with rest of button hovers
*/
.markdown-source-view.mod-cm6 .pdf-embed .edit-block-button:hover {
  background-color: rgb(var(--ctp-pink));
  color: var(--text-on-accent);
}

/* Fix for #141 */
.mod-left-split .workspace-tab-header-container .workspace-tab-header-container-inner,
.mod-right-split .workspace-tab-header-container .workspace-tab-header-container-inner {
  overflow: visible;
}

select:focus,
.dropdown:focus {
  box-shadow: 0 0 0 2px rgb(var(--ctp-accent), 70%);
}

textarea:active,
input[type=text]:active,
input[type=search]:active,
input[type=email]:active,
input[type=password]:active,
input[type=number]:active,
textarea:focus,
input[type=text]:focus,
input[type=search]:focus,
input[type=email]:focus,
input[type=password]:focus,
input[type=number]:focus,
textarea:focus-visible,
input[type=text]:focus-visible,
input[type=search]:focus-visible,
input[type=email]:focus-visible,
input[type=password]:focus-visible,
input[type=number]:focus-visible {
  box-shadow: 0 0 0 2px rgb(var(--ctp-accent), 70%);
}

.checkbox-container {
  --background-modifier-border-hover: rgb(var(--ctp-red));
  box-shadow: 0 0 2px inset rgb(var(--ctp-base));
}
.checkbox-container::after {
  --toggle-thumb-color: var(--text-on-accent);
  box-shadow: 0 0 4px rgb(var(--ctp-base));
}
.checkbox-container:hover {
  box-shadow: none;
}

.markdown-rendered button.copy-code-button {
  background-color: rgb(var(--ctp-crust));
}

input[type=date]::-webkit-datetime-edit-month-field:active,
input[type=datetime-local]::-webkit-datetime-edit-month-field:active,
input[type=date]::-webkit-datetime-edit-month-field:focus,
input[type=datetime-local]::-webkit-datetime-edit-month-field:focus,
input[type=date]::-webkit-datetime-edit-day-field:active,
input[type=datetime-local]::-webkit-datetime-edit-day-field:active,
input[type=date]::-webkit-datetime-edit-day-field:focus,
input[type=datetime-local]::-webkit-datetime-edit-day-field:focus,
input[type=date]::-webkit-datetime-edit-year-field:active,
input[type=datetime-local]::-webkit-datetime-edit-year-field:active,
input[type=date]::-webkit-datetime-edit-year-field:focus,
input[type=datetime-local]::-webkit-datetime-edit-year-field:focus {
  color: var(--text-on-accent);
}

input[type=datetime-local]::-webkit-datetime-edit-minute-field:active,
input[type=datetime-local]::-webkit-datetime-edit-minute-field:focus,
input[type=datetime-local]::-webkit-datetime-edit-hour-field:active,
input[type=datetime-local]::-webkit-datetime-edit-hour-field:focus,
input[type=datetime-local]::-webkit-datetime-edit-second-field:active,
input[type=datetime-local]::-webkit-datetime-edit-second-field:focus {
  background-color: var(--text-selection);
  color: var(--text-on-accent);
}
`;
}
