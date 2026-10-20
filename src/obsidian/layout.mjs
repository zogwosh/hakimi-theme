// Obsidian layout rules ported from catppuccin/obsidian layout/* and pages/*
export function compileLayoutStyles() {
  return `* Some tweaks for the light/Catppuccin Latte theme.
*/
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  --blockquote-border-color: rgb(var(--ctp-sapphire));
  --ctp-accent: var(--ctp-sapphire);
  --divider-color-hover: rgb(var(--ctp-blue));
  --hr-color: rgb(var(--ctp-blue));
  --indentation-guide-color: rgb(var(--ctp-surface1));
  --indentation-guide-color-active: rgb(var(--ctp-sapphire), 70%);
  --indentation-guide-width: 2px;
  --list-marker-color: rgb(var(--ctp-sapphire));
  --checklist-done-color: rgb(var(--ctp-green));
}
.theme-dark:not(.css-settings-manager) .workspace-tab-header-inner-close-button:hover,
.theme-light:not(.css-settings-manager) .workspace-tab-header-inner-close-button:hover,
.ctp-full-palette .workspace-tab-header-inner-close-button:hover {
  box-shadow: none;
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Nav bar
  */
}
.theme-dark:not(.css-settings-manager) .nav-file-title.is-active,
.theme-dark:not(.css-settings-manager) .nav-folder-title.is-active,
.theme-light:not(.css-settings-manager) .nav-file-title.is-active,
.theme-light:not(.css-settings-manager) .nav-folder-title.is-active,
.ctp-full-palette .nav-file-title.is-active,
.ctp-full-palette .nav-folder-title.is-active {
  --nav-item-background-active: rgb(var(--ctp-mauve));
}
.theme-dark:not(.css-settings-manager) :not(.is-grabbing) .nav-file-title:hover,
.theme-dark:not(.css-settings-manager) :not(.is-grabbing) .nav-folder-title:hover,
.theme-dark:not(.css-settings-manager) .tree-item-self.is-clickable:hover,
.theme-light:not(.css-settings-manager) :not(.is-grabbing) .nav-file-title:hover,
.theme-light:not(.css-settings-manager) :not(.is-grabbing) .nav-folder-title:hover,
.theme-light:not(.css-settings-manager) .tree-item-self.is-clickable:hover,
.ctp-full-palette :not(.is-grabbing) .nav-file-title:hover,
.ctp-full-palette :not(.is-grabbing) .nav-folder-title:hover,
.ctp-full-palette .tree-item-self.is-clickable:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .nav-folder.mod-root > .nav-folder-title:hover,
.theme-light:not(.css-settings-manager) .nav-folder.mod-root > .nav-folder-title:hover,
.ctp-full-palette .nav-folder.mod-root > .nav-folder-title:hover {
  background-color: transparent;
  color: rgb(var(--text-normal));
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Icons
  */
}
.theme-dark:not(.css-settings-manager) .clickable-icon.is-active,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active,
.theme-light:not(.css-settings-manager) .clickable-icon.is-active,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active,
.ctp-full-palette .clickable-icon.is-active,
.ctp-full-palette .mod-left-split .workspace-tab-header.has-active-menu,
.ctp-full-palette .mod-right-split .workspace-tab-header.has-active-menu,
.ctp-full-palette .mod-left-split .workspace-tab-header.is-active,
.ctp-full-palette .mod-right-split .workspace-tab-header.is-active {
  box-shadow: inset 0 0 4px rgb(var(--ctp-crust)), inset 0 0 6px rgb(var(--ctp-base));
  outline: 1px solid rgb(var(--ctp-surface1));
}
.theme-dark:not(.css-settings-manager) .clickable-icon.is-active svg,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu svg,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu svg,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active svg,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active svg,
.theme-light:not(.css-settings-manager) .clickable-icon.is-active svg,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu svg,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu svg,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active svg,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active svg,
.ctp-full-palette .clickable-icon.is-active svg,
.ctp-full-palette .mod-left-split .workspace-tab-header.has-active-menu svg,
.ctp-full-palette .mod-right-split .workspace-tab-header.has-active-menu svg,
.ctp-full-palette .mod-left-split .workspace-tab-header.is-active svg,
.ctp-full-palette .mod-right-split .workspace-tab-header.is-active svg {
  color: rgb(var(--ctp-pink));
}
.theme-dark:not(.css-settings-manager) .clickable-icon.is-active:hover, .theme-dark:not(.css-settings-manager) .clickable-icon.is-active:hover svg,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu:hover,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu:hover svg,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu:hover,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu:hover svg,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active:hover,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active:hover svg,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active:hover,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active:hover svg,
.theme-light:not(.css-settings-manager) .clickable-icon.is-active:hover,
.theme-light:not(.css-settings-manager) .clickable-icon.is-active:hover svg,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu:hover,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.has-active-menu:hover svg,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu:hover,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.has-active-menu:hover svg,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active:hover,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header.is-active:hover svg,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active:hover,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header.is-active:hover svg,
.ctp-full-palette .clickable-icon.is-active:hover,
.ctp-full-palette .clickable-icon.is-active:hover svg,
.ctp-full-palette .mod-left-split .workspace-tab-header.has-active-menu:hover,
.ctp-full-palette .mod-left-split .workspace-tab-header.has-active-menu:hover svg,
.ctp-full-palette .mod-right-split .workspace-tab-header.has-active-menu:hover,
.ctp-full-palette .mod-right-split .workspace-tab-header.has-active-menu:hover svg,
.ctp-full-palette .mod-left-split .workspace-tab-header.is-active:hover,
.ctp-full-palette .mod-left-split .workspace-tab-header.is-active:hover svg,
.ctp-full-palette .mod-right-split .workspace-tab-header.is-active:hover,
.ctp-full-palette .mod-right-split .workspace-tab-header.is-active:hover svg {
  background-color: rgb(var(--ctp-pink));
  box-shadow: none;
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .clickable-icon:hover,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header:hover,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header:hover,
.theme-light:not(.css-settings-manager) .clickable-icon:hover,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header:hover,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header:hover,
.ctp-full-palette .clickable-icon:hover,
.ctp-full-palette .mod-left-split .workspace-tab-header:hover,
.ctp-full-palette .mod-right-split .workspace-tab-header:hover {
  background-color: rgb(var(--ctp-pink));
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .clickable-icon:hover svg,
.theme-dark:not(.css-settings-manager) .mod-left-split .workspace-tab-header:hover svg,
.theme-dark:not(.css-settings-manager) .mod-right-split .workspace-tab-header:hover svg,
.theme-light:not(.css-settings-manager) .clickable-icon:hover svg,
.theme-light:not(.css-settings-manager) .mod-left-split .workspace-tab-header:hover svg,
.theme-light:not(.css-settings-manager) .mod-right-split .workspace-tab-header:hover svg,
.ctp-full-palette .clickable-icon:hover svg,
.ctp-full-palette .mod-left-split .workspace-tab-header:hover svg,
.ctp-full-palette .mod-right-split .workspace-tab-header:hover svg {
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner,
.theme-light:not(.css-settings-manager) .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner,
.ctp-full-palette .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner {
  --background-modifier-hover: rgb(var(--ctp-pink));
}
.theme-dark:not(.css-settings-manager) .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner-icon:hover,
.theme-light:not(.css-settings-manager) .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner-icon:hover,
.ctp-full-palette .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner-icon:hover {
  background-color: transparent;
}
.theme-dark:not(.css-settings-manager) .mod-vertical .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner svg,
.theme-light:not(.css-settings-manager) .mod-vertical .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner svg,
.ctp-full-palette .mod-vertical .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner svg {
  color: var(--text-normal);
}
.theme-dark:not(.css-settings-manager) .mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active) .workspace-tab-header-inner-close-button:hover svg,
.theme-light:not(.css-settings-manager) .mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active) .workspace-tab-header-inner-close-button:hover svg,
.ctp-full-palette .mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active) .workspace-tab-header-inner-close-button:hover svg {
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Tabs
  */
}
.theme-dark:not(.css-settings-manager) .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-header-inner:hover .workspace-tab-header-inner-title,
.theme-light:not(.css-settings-manager) .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-header-inner:hover .workspace-tab-header-inner-title,
.ctp-full-palette .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-header-inner:hover .workspace-tab-header-inner-title {
  color: rgb(var(--ctp-pink));
}
.theme-dark:not(.css-settings-manager) .mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner .workspace-tab-header-inner-title,
.theme-light:not(.css-settings-manager) .mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner .workspace-tab-header-inner-title,
.ctp-full-palette .mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner .workspace-tab-header-inner-title {
  color: rgb(var(--ctp-pink));
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Prompts
  */
}
.theme-dark:not(.css-settings-manager) .suggestion-item.is-selected,
.theme-light:not(.css-settings-manager) .suggestion-item.is-selected,
.ctp-full-palette .suggestion-item.is-selected {
  --background-modifier-hover: rgb(var(--ctp-lavender));
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .suggestion-item.is-selected:hover .suggestion-flair,
.theme-light:not(.css-settings-manager) .suggestion-item.is-selected:hover .suggestion-flair,
.ctp-full-palette .suggestion-item.is-selected:hover .suggestion-flair {
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Search
  */
}
.theme-dark:not(.css-settings-manager) .suggestion .suggestion-item.mod-group,
.theme-light:not(.css-settings-manager) .suggestion .suggestion-item.mod-group,
.ctp-full-palette .suggestion .suggestion-item.mod-group {
  background-color: inherit;
  color: var(--text-muted);
  font-size: var(--font-ui-medium);
  font-variant: all-small-caps;
}
.theme-dark:not(.css-settings-manager) .search-suggest-item.is-selected,
.theme-light:not(.css-settings-manager) .search-suggest-item.is-selected,
.ctp-full-palette .search-suggest-item.is-selected {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .search-suggest-item.is-selected .list-item-part.clickable-icon,
.theme-light:not(.css-settings-manager) .search-suggest-item.is-selected .list-item-part.clickable-icon,
.ctp-full-palette .search-suggest-item.is-selected .list-item-part.clickable-icon {
  color: var(--text-muted);
}
.theme-dark:not(.css-settings-manager) .search-suggest-item.is-selected .search-suggest-info-text,
.theme-light:not(.css-settings-manager) .search-suggest-item.is-selected .search-suggest-info-text,
.ctp-full-palette .search-suggest-item.is-selected .search-suggest-info-text {
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Dropdowns
  */
}
.theme-dark:not(.css-settings-manager) select:focus,
.theme-dark:not(.css-settings-manager) .dropdown:focus,
.theme-light:not(.css-settings-manager) select:focus,
.theme-light:not(.css-settings-manager) .dropdown:focus,
.ctp-full-palette select:focus,
.ctp-full-palette .dropdown:focus {
  box-shadow: 0 0 0 2px rgb(var(--ctp-blue), 70%);
}
.theme-dark:not(.css-settings-manager) textarea:active,
.theme-dark:not(.css-settings-manager) input[type=text]:active,
.theme-dark:not(.css-settings-manager) input[type=search]:active,
.theme-dark:not(.css-settings-manager) input[type=email]:active,
.theme-dark:not(.css-settings-manager) input[type=password]:active,
.theme-dark:not(.css-settings-manager) input[type=number]:active,
.theme-dark:not(.css-settings-manager) textarea:focus,
.theme-dark:not(.css-settings-manager) input[type=text]:focus,
.theme-dark:not(.css-settings-manager) input[type=search]:focus,
.theme-dark:not(.css-settings-manager) input[type=email]:focus,
.theme-dark:not(.css-settings-manager) input[type=password]:focus,
.theme-dark:not(.css-settings-manager) input[type=number]:focus,
.theme-dark:not(.css-settings-manager) textarea:focus-visible,
.theme-dark:not(.css-settings-manager) input[type=text]:focus-visible,
.theme-dark:not(.css-settings-manager) input[type=search]:focus-visible,
.theme-dark:not(.css-settings-manager) input[type=email]:focus-visible,
.theme-dark:not(.css-settings-manager) input[type=password]:focus-visible,
.theme-dark:not(.css-settings-manager) input[type=number]:focus-visible,
.theme-light:not(.css-settings-manager) textarea:active,
.theme-light:not(.css-settings-manager) input[type=text]:active,
.theme-light:not(.css-settings-manager) input[type=search]:active,
.theme-light:not(.css-settings-manager) input[type=email]:active,
.theme-light:not(.css-settings-manager) input[type=password]:active,
.theme-light:not(.css-settings-manager) input[type=number]:active,
.theme-light:not(.css-settings-manager) textarea:focus,
.theme-light:not(.css-settings-manager) input[type=text]:focus,
.theme-light:not(.css-settings-manager) input[type=search]:focus,
.theme-light:not(.css-settings-manager) input[type=email]:focus,
.theme-light:not(.css-settings-manager) input[type=password]:focus,
.theme-light:not(.css-settings-manager) input[type=number]:focus,
.theme-light:not(.css-settings-manager) textarea:focus-visible,
.theme-light:not(.css-settings-manager) input[type=text]:focus-visible,
.theme-light:not(.css-settings-manager) input[type=search]:focus-visible,
.theme-light:not(.css-settings-manager) input[type=email]:focus-visible,
.theme-light:not(.css-settings-manager) input[type=password]:focus-visible,
.theme-light:not(.css-settings-manager) input[type=number]:focus-visible,
.ctp-full-palette textarea:active,
.ctp-full-palette input[type=text]:active,
.ctp-full-palette input[type=search]:active,
.ctp-full-palette input[type=email]:active,
.ctp-full-palette input[type=password]:active,
.ctp-full-palette input[type=number]:active,
.ctp-full-palette textarea:focus,
.ctp-full-palette input[type=text]:focus,
.ctp-full-palette input[type=search]:focus,
.ctp-full-palette input[type=email]:focus,
.ctp-full-palette input[type=password]:focus,
.ctp-full-palette input[type=number]:focus,
.ctp-full-palette textarea:focus-visible,
.ctp-full-palette input[type=text]:focus-visible,
.ctp-full-palette input[type=search]:focus-visible,
.ctp-full-palette input[type=email]:focus-visible,
.ctp-full-palette input[type=password]:focus-visible,
.ctp-full-palette input[type=number]:focus-visible {
  box-shadow: 0 0 0 2px rgb(var(--ctp-blue), 70%);
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Checkboxes
  */
}
.theme-dark:not(.css-settings-manager) input[type=checkbox]:not(:checked),
.theme-light:not(.css-settings-manager) input[type=checkbox]:not(:checked),
.ctp-full-palette input[type=checkbox]:not(:checked) {
  border-color: rgb(var(--ctp-maroon));
  background-color: rgb(var(--ctp-red));
  box-shadow: inset 2px 2px 24px rgb(var(--ctp-mantle)), inset -2px -2px 24px rgb(var(--ctp-mantle));
}
.theme-dark:not(.css-settings-manager) input[type=checkbox]:not(:checked):hover,
.theme-light:not(.css-settings-manager) input[type=checkbox]:not(:checked):hover,
.ctp-full-palette input[type=checkbox]:not(:checked):hover {
  border-width: 2px;
}
.theme-dark:not(.css-settings-manager) input[type=checkbox]:not([data-task=">"],
[data-task="!"],
[data-task="-"],
[data-task="<"],
[data-task=l],
[data-task="*"],
[data-task=I],
[data-task=p],
[data-task=f],
[data-task=k],
[data-task=u],
[data-task=w],
[data-task=c],
[data-task=d],
[data-task=b]):checked,
.theme-light:not(.css-settings-manager) input[type=checkbox]:not([data-task=">"],
[data-task="!"],
[data-task="-"],
[data-task="<"],
[data-task=l],
[data-task="*"],
[data-task=I],
[data-task=p],
[data-task=f],
[data-task=k],
[data-task=u],
[data-task=w],
[data-task=c],
[data-task=d],
[data-task=b]):checked,
.ctp-full-palette input[type=checkbox]:not([data-task=">"],
[data-task="!"],
[data-task="-"],
[data-task="<"],
[data-task=l],
[data-task="*"],
[data-task=I],
[data-task=p],
[data-task=f],
[data-task=k],
[data-task=u],
[data-task=w],
[data-task=c],
[data-task=d],
[data-task=b]):checked {
  border-color: transparent;
  background-color: rgb(var(--ctp-green));
  box-shadow: 0 0 0 1px rgb(var(--ctp-green), 40%);
}
.theme-dark:not(.css-settings-manager) input[type=checkbox]:not([data-task=">"],
[data-task="!"],
[data-task="-"],
[data-task="<"],
[data-task=l],
[data-task="*"],
[data-task=I],
[data-task=p],
[data-task=f],
[data-task=k],
[data-task=u],
[data-task=w],
[data-task=c],
[data-task=d],
[data-task=b]):checked:hover,
.theme-light:not(.css-settings-manager) input[type=checkbox]:not([data-task=">"],
[data-task="!"],
[data-task="-"],
[data-task="<"],
[data-task=l],
[data-task="*"],
[data-task=I],
[data-task=p],
[data-task=f],
[data-task=k],
[data-task=u],
[data-task=w],
[data-task=c],
[data-task=d],
[data-task=b]):checked:hover,
.ctp-full-palette input[type=checkbox]:not([data-task=">"],
[data-task="!"],
[data-task="-"],
[data-task="<"],
[data-task=l],
[data-task="*"],
[data-task=I],
[data-task=p],
[data-task=f],
[data-task=k],
[data-task=u],
[data-task=w],
[data-task=c],
[data-task=d],
[data-task=b]):checked:hover {
  background-color: rgb(var(--ctp-accent));
  box-shadow: 0 0 0 1px rgb(var(--ctp-accent), 40%);
}
.theme-dark:not(.css-settings-manager) .horizontal-tab-nav-item:hover,
.theme-dark:not(.css-settings-manager) .vertical-tab-nav-item:hover,
.theme-light:not(.css-settings-manager) .horizontal-tab-nav-item:hover,
.theme-light:not(.css-settings-manager) .vertical-tab-nav-item:hover,
.ctp-full-palette .horizontal-tab-nav-item:hover,
.ctp-full-palette .vertical-tab-nav-item:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .horizontal-tab-nav-item.is-active,
.theme-dark:not(.css-settings-manager) .vertical-tab-nav-item.is-active,
.theme-light:not(.css-settings-manager) .horizontal-tab-nav-item.is-active,
.theme-light:not(.css-settings-manager) .vertical-tab-nav-item.is-active,
.ctp-full-palette .horizontal-tab-nav-item.is-active,
.ctp-full-palette .vertical-tab-nav-item.is-active {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.theme-dark:not(.css-settings-manager) .horizontal-tab-nav-item.is-active:hover,
.theme-dark:not(.css-settings-manager) .vertical-tab-nav-item.is-active:hover,
.theme-light:not(.css-settings-manager) .horizontal-tab-nav-item.is-active:hover,
.theme-light:not(.css-settings-manager) .vertical-tab-nav-item.is-active:hover,
.ctp-full-palette .horizontal-tab-nav-item.is-active:hover,
.ctp-full-palette .vertical-tab-nav-item.is-active:hover {
  background-color: rgb(var(--ctp-accent));
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  ? I think !important is necessary to overwrite app.css
  */
}
.theme-dark:not(.css-settings-manager) .HyperMD-header .cm-formatting-header,
.theme-light:not(.css-settings-manager) .HyperMD-header .cm-formatting-header,
.ctp-full-palette .HyperMD-header .cm-formatting-header {
  color: rgb(var(--ctp-sapphire));
  font-size: 75% !important;
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  *  settings slider
  */
}
.theme-dark:not(.css-settings-manager) .mod-settings input.slider,
.theme-light:not(.css-settings-manager) .mod-settings input.slider,
.ctp-full-palette .mod-settings input.slider {
  --slider-track-background: rgb(var(--ctp-green));
}
.theme-dark:not(.css-settings-manager) .mod-settings input[type=color]::-webkit-color-swatch:hover,
.theme-light:not(.css-settings-manager) .mod-settings input[type=color]::-webkit-color-swatch:hover,
.ctp-full-palette .mod-settings input[type=color]::-webkit-color-swatch:hover {
  box-shadow: inset 0 0 0 1px rgb(var(--mono-rgb-100), 25%), 0 0 0 2px rgb(var(--ctp-surface1));
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Canvas
  */
}
.theme-dark:not(.css-settings-manager) .canvas-controls button:hover,
.theme-light:not(.css-settings-manager) .canvas-controls button:hover,
.ctp-full-palette .canvas-controls button:hover {
  background-color: rgb(var(--ctp-pink));
}
.theme-dark:not(.css-settings-manager),
.theme-light:not(.css-settings-manager),
.ctp-full-palette {
  /*
  * Bookmarks
  */
}
.theme-dark:not(.css-settings-manager) body:not(.is-grabbing) .tree-item-self.is-active:hover,
.theme-dark:not(.css-settings-manager) .tree-item-self.is-active,
.theme-light:not(.css-settings-manager) body:not(.is-grabbing) .tree-item-self.is-active:hover,
.theme-light:not(.css-settings-manager) .tree-item-self.is-active,
.ctp-full-palette body:not(.is-grabbing) .tree-item-self.is-active:hover,
.ctp-full-palette .tree-item-self.is-active {
  --nav-item-color-active: var(--text-on-accent);
  --nav-item-background-active: rgb(var(--ctp-mauve));
}
.theme-dark:not(.css-settings-manager) body:not(.is-grabbing) .tree-item-self.is-active:hover .tree-item-icon,
.theme-dark:not(.css-settings-manager) .tree-item-self.is-active .tree-item-icon,
.theme-light:not(.css-settings-manager) body:not(.is-grabbing) .tree-item-self.is-active:hover .tree-item-icon,
.theme-light:not(.css-settings-manager) .tree-item-self.is-active .tree-item-icon,
.ctp-full-palette body:not(.is-grabbing) .tree-item-self.is-active:hover .tree-item-icon,
.ctp-full-palette .tree-item-self.is-active .tree-item-icon {
  --icon-color: var(--text-on-accent);
}

.better-command-palette .suggestion-item.mod-complex.is-selected .suggestion-note {
  color: var(--text-on-accent);
}

.better-command-palette .better-command-palette-title {
  padding-left: var(--size-4-3);
  margin: var(--size-4-3);
}

.better-command-palette .suggestion-item .suggestion-flair {
  border-radius: var(--radius-s);
  margin-bottom: 1px;
  background-color: rgb(var(--ctp-surface0));
  color: var(--text-muted);
}

.better-command-palette.better-command-palette .suggestion-item.is-selected:hover .suggestion-flair {
  color: var(--text-muted);
}

/*
* Improves spacing around hidden palette items box
*/
.better-command-palette.better-command-palette .suggestion-hotkey {
  padding: var(--size-2-1) var(--size-4-3);
  margin-right: var(--size-2-3);
}

.better-command-palette .hidden-items-header {
  padding-left: 12px;
  margin-bottom: 6px;
}

.better-command-palette .hidden-items-header:empty {
  margin: 1px;
}

/* Obsidian Git */
.git-commit-msg .git-commit-msg-clear-button:hover {
  --search-clear-button-color: rgb(var(--ctp-red));
}

/* Another Quick Switcher */
.suggestion-item.is-selected .another-quick-switcher__item__directory,
.suggestion-item.is-selected .another-quick-switcher__item__description {
  color: var(--text-on-accent);
}

.another-quick-switcher__hit_word {
  background-color: rgb(var(--ctp-rosewater), 60%);
  color: var(--text-on-accent);
}

/*
* Adds some padding for larger Catppuccin separator
*/
.another-quick-switcher__status__search-command {
  padding-bottom: 0.5rem;
}

.another-quick-switcher__grep__path-input__wrapper {
  margin: var(--size-4-1);
}

/* Omnisearch */
.suggestion-item.is-selected .omnisearch-result__body {
  color: var(--text-on-accent);
}

.omnisearch-default-highlight {
  color: var(--text-on-accent);
}

.omnisearch-result.is-selected .omnisearch-default-highlight {
  background-color: rgb(var(--ctp-rosewater), 60%);
}

.omnisearch-result:not(.is-selected) .omnisearch-highlight.omnisearch-default-highlight {
  background-color: rgb(var(--ctp-rosewater), 100%);
}

.omnisearch-result.is-selected .omnisearch-result__folder-path > span,
.omnisearch-result.is-selected .omnisearch-result__extension,
.omnisearch-result.is-selected .omnisearch-result__counter {
  color: var(--text-faint);
}

/*
* MAKE.md
*/
body:not(.is-mobile) .mk-main-menu-button:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.ctp-full-palette .mk-sidebar-item:hover {
  background-color: rgb(var(--ctp-pink));
  color: var(--text-on-accent);
}
.ctp-full-palette .mk-sidebar-item:hover svg {
  color: var(--text-on-accent);
}

.ctp-full-palette .mk-sidebar-item-active {
  box-shadow: inset 0 0 4px rgb(var(--ctp-crust)), inset 0 0 6px rgb(var(--ctp-base));
  outline: 1px solid rgb(var(--ctp-surface1));
}
.ctp-full-palette .mk-sidebar-item-active svg {
  color: rgb(var(--ctp-pink)) !important;
}
.ctp-full-palette .mk-sidebar-item-active:hover svg, .ctp-full-palette .mk-sidebar-item-active:hover {
  background-color: rgb(var(--ctp-pink));
  box-shadow: none;
  color: var(--text-on-accent) !important;
}

.mk-sidebar-item:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.mk-sidebar-item:hover svg {
  color: var(--text-on-accent);
}

.mk-sidebar-item-active {
  box-shadow: inset 0 0 4px rgb(var(--ctp-crust)), inset 0 0 6px rgb(var(--ctp-base));
  outline: 1px solid rgb(var(--ctp-surface1));
}
.mk-sidebar-item-active svg {
  color: rgb(var(--ctp-accent)) !important;
}
.mk-sidebar-item-active:hover svg, .mk-sidebar-item-active:hover {
  background-color: rgb(var(--ctp-accent));
  box-shadow: none;
  color: var(--text-on-accent) !important;
}

body:not(.is-mobile) .mk-tree-item:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.mk-tree-item:hover svg {
  color: var(--text-on-accent) !important;
}

.mk-options-menu__suggestions li.is-active,
.mk-options-menu__suggestions li:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.mk-file-context-field,
.mk-file-context-field-new button,
.mk-file-context-field-new button svg {
  color: var(--text-muted) !important;
}

.mk-file-context-field-new button:hover {
  color: rgb(var(--ctp-accent)) !important;
}

body:not(.is-mobile) .mk-folder-buttons button {
  margin-left: 2px;
  background-color: transparent !important;
}
body:not(.is-mobile) .mk-folder-buttons button svg {
  border-radius: 4px;
}
body:not(.is-mobile) .mk-folder-buttons button:hover svg {
  background-color: rgb(var(--ctp-surface0));
  box-shadow: var(--box-shadow-large);
  color: var(--text-normal) !important;
  outline: 1px solid rgb(var(--ctp-surface1));
}

/*
* TODO: Some of this is redundant in that it's css from app.css
* but not required for the theme to work when MAKE.md is off, so
* it should be simplified at some point.
*/
body:not(.is-grabbing).ctp-full-palette .mk-sidebar {
  --nav-item-background-active: rgb(var(--ctp-mauve));
  --nav-item-background-selected: rgb(var(--ctp-mauve));
  --nav-item-color-active: var(--text-on-accent);
  --nav-item-color-selected: var(--text-on-accent);
}

body:not(.is-grabbing .ctp-full-palette) .mk-sidebar {
  --nav-item-background-active: rgb(var(--ctp-accent), 90%);
  --nav-item-background-selected: rgb(var(--ctp-accent), 90%);
  --nav-item-color-active: var(--text-on-accent);
  --nav-item-color-selected: var(--text-on-accent);
}
`;
}
