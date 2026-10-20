// Obsidian component rules ported from catppuccin/obsidian components/*
export function compileComponentStyles() {
  return `.cm-s-obsidian .cm-formatting-link.cm-url,
.cm-s-obsidian .cm-url,
.cm-s-obsidian .cm-link,
.cm-s-obsidian .cm-hmd-internal-link,
.markdown-source-view.mod-cm6 .cm-link .cm-underline,
.markdown-source-view.mod-cm6 .cm-url .cm-underline {
  text-decoration-color: transparent;
  text-decoration-line: underline;
  text-decoration-style: solid;
}
.cm-s-obsidian .cm-formatting-link.cm-url:hover,
.cm-s-obsidian .cm-url:hover,
.cm-s-obsidian .cm-link:hover,
.cm-s-obsidian .cm-hmd-internal-link:hover,
.markdown-source-view.mod-cm6 .cm-link .cm-underline:hover,
.markdown-source-view.mod-cm6 .cm-url .cm-underline:hover {
  text-decoration-color: inherit;
}

.cm-s-obsidian .is-flashing .cm-hmd-internal-link,
.cm-s-obsidian .is-flashing .cm-hmd-internal-link:hover,
.cm-s-obsidian .is-flashing .cm-formatting-link-start.cm-formatting-link,
.cm-s-obsidian .is-flashing .cm-formatting-link-end.cm-formatting-link {
  --link-color: var(--text-on-accent);
  color: var(--link-color);
}

body:not(.ctp-tag-pill) .cm-hashtag.cm-hashtag-end {
  text-decoration-color: transparent;
  text-decoration-line: underline;
  text-decoration-style: solid;
}
body:not(.ctp-tag-pill) .cm-hashtag.cm-hashtag-end:hover {
  text-decoration: underline 1px rgb(var(--ctp-tag-pill-color, var(--ctp-accent)));
  text-underline-offset: 1px;
}
body:not(.ctp-tag-pill) .cm-hashtag::selection {
  text-shadow: 0.4px 0 0 rgb(var(--ctp-tag-pill-color, var(--ctp-accent)));
}

/**
* 1. Restores default Obsidian settings to tags. See: #56
*/
.ctp-tag-pill {
  --tag-size: var(--font-smaller);
  --tag-decoration: none;
  --tag-decoration-hover: none;
  --tag-background: hsla(var(--interactive-accent-hsl), 0.1);
  --tag-background-hover: hsla(var(--interactive-accent-hsl), 0.2);
  --tag-border-color: hsla(var(--interactive-accent-hsl), 0.15);
  --tag-border-color-hover: hsla(var(--interactive-accent-hsl), 0.15);
  --tag-border-width: 0px;
  --tag-padding-x: 0.65em;
  --tag-padding-y: 0.25em;
  --tag-radius: 2em;
  --tag-weight: inherit;
}

/**
* 1. Allow users to pick tag text color with Style Settings
*/
.markdown-source-view.mod-cm6 .is-unresolved .cm-underline {
  text-decoration-line: none;
}
.markdown-source-view.mod-cm6 .is-unresolved:hover {
  color: rgb(var(--ctp-red));
  text-decoration-line: none;
}

.cm-s-obsidian .cm-formatting-link-string.cm-url,
.cm-s-obsidian .cm-formatting-link.cm-link,
.cm-s-obsidian .cm-formatting-link.cm-hmd-barelink,
.cm-s-obsidian .cm-formatting-link.cm-formatting-link-start,
.cm-s-obsidian .cm-formatting-link.cm-formatting-link-end {
  color: rgb(var(--ctp-accent));
}

.empty-state-action {
  border-radius: var(--radius-s);
}

@media (hover: hover) {
  .empty-state-action:hover {
    background-color: rgb(var(--ctp-accent));
    color: var(--text-on-accent);
  }
}
/**
* 1. Fix #97 highlighted link contrast issues
*/
.cm-s-obsidian .cm-highlight.cm-link .cm-underline {
  color: var(--text-on-accent);
  text-decoration: var(--text-on-accent) solid underline;
}
.cm-s-obsidian .cm-highlight.cm-link .cm-underline:hover {
  color: var(--text-on-accent);
  text-decoration-color: var(--text-on-accent);
}

.cm-s-obsidian .cm-highlight.cm-link:hover,
.cm-s-obsidian .cm-highlight.cm-url:hover {
  color: var(--text-on-accent);
}

/**
* 1. Compatibility for mermaid mindmaps #73
* 2. CSS modified from obsidian forums post, !important seems to be req
*/
.theme-dark .mermaid .mindmap-node text {
  fill: var(--text-on-accent) !important;
}

.theme-light .mermaid .mindmap-node text {
  fill: var(--text-on-accent) !important;
}

/**
* 1. Colors for the first eight nodes in a mindmap
*/
.mermaid .section-0 path,
.mermaid .section-0 line,
.mermaid .section-edge-0 {
  fill: var(--color-orange) !important;
  stroke: var(--color-orange) !important;
}

.mermaid .section-1 path,
.mermaid .section-1 line,
.mermaid .section-edge-1 {
  fill: var(--color-yellow) !important;
  stroke: var(--color-yellow) !important;
}

.mermaid .section-2 path,
.mermaid .section-2 line,
.mermaid .section-edge-3 {
  fill: var(--color-green) !important;
  stroke: var(--color-green) !important;
}

.mermaid .section-3 path,
.mermaid .section-3 line,
.mermaid .section-edge-3 {
  fill: var(--color-red) !important;
  stroke: var(--color-red) !important;
}

.mermaid .section-4 path,
.mermaid .section-4 line,
.mermaid .section-edge-4 {
  fill: var(--color-blue) !important;
  stroke: var(--color-blue) !important;
}

.mermaid .section-5 path,
.mermaid .section-5 line,
.mermaid .section-edge-5 {
  fill: var(--color-purple) !important;
  stroke: var(--color-purple) !important;
}

.mermaid .section-6 path,
.mermaid .section-6 line,
.mermaid .section-edge-6 {
  fill: var(--color-pink) !important;
  stroke: var(--color-pink) !important;
}

.mermaid .section-7 path,
.mermaid .section-7 line,
.mermaid .section-edge-7 {
  fill: var(--color-cyan) !important;
  stroke: var(--color-cyan) !important;
}

/**
* 1. User requested integration with Style Settings plugin to replicate Minimal
* and its treatment of PDFs. Credit/source of modified scss:
* https://github.com/kepano/obsidian-minimal/blob/0b98cc8ec4576e148057ce6c0ff751ab4df1ece4/src/scss/content/pdf.scss
*/
.theme-light.ctp-seamless-pdf,
.theme-dark.ctp-seamless-pdf {
  --pdf-shadow: none;
}
.theme-light.ctp-seamless-pdf .pdfViewer .page,
.theme-dark.ctp-seamless-pdf .pdfViewer .page {
  border: 0;
}

.theme-dark.ctp-pdf-darken .pdfViewer .canvasWrapper,
.theme-dark.ctp-pdf-darken .pdf-thumbnail-view .thumbnailImage {
  filter: invert(1) hue-rotate(180deg);
  mix-blend-mode: screen;
}

.theme-light.ctp-pdf-blend .pdfViewer .canvasWrapper,
.theme-light.ctp-pdf-blend .pdf-thumbnail-view .thumbnailImage {
  mix-blend-mode: multiply;
}

/* TODO Add to Style Settings instead */
.cm-s-obsidian span.obsidian-search-match-highlight {
  background-color: rgb(var(--ctp-rosewater));
  box-shadow: 0 0 0 3px rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.search-result-file-matches {
  background-color: rgb(var(--background-secondary));
  color: var(--text-normal);
}

/*
* Prevents super strong box-shadow when using arrow keys to highlight searches
*/
.workspace-leaf.mod-active .search-result.has-focus .tree-item-self,
.workspace-leaf.mod-active .search-result-file-match.has-focus {
  box-shadow: inset 0 0 0 1px rgb(var(--ctp-accent));
}

@media (hover: hover) {
  .search-result-file-match:hover .search-result-file-match-destination-file {
    background-color: var(--background-secondary);
  }
  .search-result-file-match:hover {
    background-color: rgb(var(--ctp-accent), 80%);
    color: var(--text-on-accent);
  }
  .search-result-file-match:hover .search-result-file-match-destination-file:hover {
    background-color: var(--interactive-hover);
    box-shadow: var(--input-shadow-hover);
    color: var(--text-normal);
  }
}
.search-suggest-item.is-selected {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.search-suggest-item.is-selected .search-suggest-info-text {
  color: var(--text-on-accent);
}

.suggestion .suggestion-item.mod-group {
  background-color: inherit;
  color: var(--text-muted);
  font-size: var(--font-ui-medium);
  font-variant: all-small-caps;
}

.search-suggest-item.is-selected {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.search-suggest-item.is-selected .list-item-part.clickable-icon {
  color: var(--text-muted);
}
.search-suggest-item.is-selected .search-suggest-info-text {
  color: var(--text-on-accent);
}

.list-item-part.clickable-icon:hover,
.list-item-part.clickable-icon:active {
  background-color: rgb(var(--ctp-accent));
}

.search-result-file-match:hover .search-result-file-matched-text {
  background-color: rgb(var(--ctp-rosewater), 60%);
  color: var(--text-on-accent);
}

.search-result-file-matched-text {
  background-color: rgb(var(--ctp-rosewater));
  color: var(--text-on-accent);
}

.is-flashing,
.cm-s-obsidian .is-flashing .cm-url {
  --tag-color: var(--text-on-accent);
  background-color: rgb(var(--ctp-rosewater));
  color: var(--text-on-accent);
}

.is-flashing .cm-quote.cm-quote {
  color: var(--text-on-accent);
}

.cm-s-obsidian .is-flashing .cm-url .cm-underline:hover,
.cm-s-obsidian .is-flashing span.cm-url:hover {
  --link-external-color-hover: var(--text-on-accent);
}

.community-item .suggestion-highlight {
  color: var(--text-on-accent);
}

.community-item:hover {
  --background-modifier-border-hover: rgb(var(--ctp-accent));
}

.community-item.is-selected,
.community-item.is-selected:hover {
  --interactive-accent: rgb(var(--ctp-mauve));
}

.status-bar-item.mod-clickable:hover {
  --background-modifier-hover: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.view-header-title-parent .view-header-breadcrumb:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.horizontal-tab-nav-item:hover,
.vertical-tab-nav-item:hover {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.horizontal-tab-nav-item.is-active,
.vertical-tab-nav-item.is-active {
  background-color: rgb(var(--ctp-accent));
}
.horizontal-tab-nav-item.is-active:hover,
.vertical-tab-nav-item.is-active:hover {
  background-color: rgb(var(--ctp-accent));
}

.search-result:not(.is-collapsed) .search-result-file-title {
  --nav-item-color-active: var(--text-normal);
}

:not(.is-grabbing) .nav-file-title:hover,
:not(.is-grabbing) .nav-folder-title:hover,
.nav-file-title.is-active,
.nav-folder-title.is-active,
.tree-item-self.is-clickable:hover {
  --nav-item-background-active: rgb(var(--ctp-accent));
  --nav-item-background-hover: rgb(var(--ctp-accent));
  --nav-item-color-hover: var(--text-on-accent);
  --nav-item-color-active: var(--text-on-accent);
}

.nav-folder.mod-root > .nav-folder-title:hover {
  color: rgb(var(--text-normal));
}

.tree-item-flair {
  color: var(--text-muted);
}

.tree-item-self:hover .tree-item-flair {
  color: var(--text-on-accent);
}

@media (hover: hover) {
  .backlink-pane > .tree-item-self.is-clickable.is-collapsed:hover,
  .outgoing-link-pane > .tree-item-self.is-clickable.is-collapsed:hover {
    color: var(--text-on-accent);
  }
}
.nav-file-tag {
  background-color: rgb(var(--ctp-surface0));
  color: var(--text-normal);
  outline: 1px solid rgb(var(--ctp-surface1));
}

.is-active .nav-file-tag {
  box-shadow: inset 0 0 2px rgb(var(--ctp-crust)), inset 0 0 4px rgb(var(--ctp-mantle));
}

/*
* #TODO?
* This is trying to minimize how jarring this weird thing
* that happens when you click the folder name in the header title.
* It looks odd in the default theme, too.
*/
.is-flashing .nav-folder-title,
.is-flashing .nav-file-title {
  color: var(--text-on-accent);
}

/*
* Bookmarks
*/
.tree-item-self.is-selected {
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}
.tree-item-self.is-selected .tree-item-icon {
  color: var(--text-on-accent);
}

body:not(.is-grabbing) .tree-item-self.is-active:hover,
.tree-item-self.is-active {
  --nav-item-color-active: var(--text-on-accent);
  --nav-item-background-active: rgb(var(--ctp-accent));
}
body:not(.is-grabbing) .tree-item-self.is-active:hover .tree-item-icon,
.tree-item-self.is-active .tree-item-icon {
  --icon-color: var(--text-on-accent);
}

@media (hover: hover) {
  body:not(.is-grabbing) .tree-item-self.is-clickable:hover .tree-item-icon {
    --icon-color: var(--text-on-accent);
  }
}
.theme-dark,
.theme-light {
  --sidebar-rosewater: rgb(var(--ctp-rosewater));
  --sidebar-flamingo: rgb(var(--ctp-flamingo));
  --sidebar-pink: rgb(var(--ctp-pink));
  --sidebar-mauve: rgb(var(--ctp-mauve));
  --sidebar-red: rgb(var(--ctp-red));
  --sidebar-maroon: rgb(var(--ctp-maroon));
  --sidebar-peach: rgb(var(--ctp-peach));
  --sidebar-yellow: rgb(var(--ctp-yellow));
  --sidebar-green: rgb(var(--ctp-green));
  --sidebar-teal: rgb(var(--ctp-teal));
  --sidebar-sky: rgb(var(--ctp-sky));
  --sidebar-sapphire: rgb(var(--ctp-sapphire));
  --sidebar-blue: rgb(var(--ctp-blue));
  --sidebar-lavender: rgb(var(--ctp-lavender));
  --sidebar-text: rgb(var(--ctp-text));
  --sidebar-overlay0: rgb(var(--ctp-overlay0));
  --sidebar-crust: rgb(var(--ctp-crust));
  --sidebar-default-text-color: var(--sidebar-text);
}

.theme-dark {
  --sidebar-contrast-color: var(--sidebar-rosewater);
  --sidebar-background-contrast: 15%;
  --sidebar-foreground-contrast: 40%;
  --sidebar-medium-contrast: 20%;
  --sidebar-active-contrast: 10%;
  --nav-item-weight-hover: bold;
}

.theme-light {
  --sidebar-contrast-color: var(--sidebar-text);
  --sidebar-background-contrast: 18%;
  --sidebar-foreground-contrast: 72%;
  --sidebar-medium-contrast: 72%;
  --sidebar-active-contrast: 16%;
}

body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="00"],
[data-path^="14"],
[data-path^="28"],
[data-path^="42"],
[data-path^="56"],
[data-path^="70"],
[data-path^="84"],
[data-path^="98"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="00"],
[data-path^="14"],
[data-path^="28"],
[data-path^="42"],
[data-path^="56"],
[data-path^="70"],
[data-path^="84"],
[data-path^="98"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-0, var(--ctp-green)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="01"],
[data-path^="15"],
[data-path^="29"],
[data-path^="43"],
[data-path^="57"],
[data-path^="71"],
[data-path^="85"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="01"],
[data-path^="15"],
[data-path^="29"],
[data-path^="43"],
[data-path^="57"],
[data-path^="71"],
[data-path^="85"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-1, var(--ctp-teal)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="02"],
[data-path^="16"],
[data-path^="30"],
[data-path^="44"],
[data-path^="58"],
[data-path^="72"],
[data-path^="86"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="02"],
[data-path^="16"],
[data-path^="30"],
[data-path^="44"],
[data-path^="58"],
[data-path^="72"],
[data-path^="86"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-2, var(--ctp-sapphire)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="03"],
[data-path^="17"],
[data-path^="31"],
[data-path^="45"],
[data-path^="59"],
[data-path^="73"],
[data-path^="87"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="03"],
[data-path^="17"],
[data-path^="31"],
[data-path^="45"],
[data-path^="59"],
[data-path^="73"],
[data-path^="87"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-3, var(--ctp-blue)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="04"],
[data-path^="18"],
[data-path^="32"],
[data-path^="46"],
[data-path^="60"],
[data-path^="74"],
[data-path^="88"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="04"],
[data-path^="18"],
[data-path^="32"],
[data-path^="46"],
[data-path^="60"],
[data-path^="74"],
[data-path^="88"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-4, var(--ctp-lavender)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="05"],
[data-path^="19"],
[data-path^="33"],
[data-path^="47"],
[data-path^="61"],
[data-path^="75"],
[data-path^="89"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="05"],
[data-path^="19"],
[data-path^="33"],
[data-path^="47"],
[data-path^="61"],
[data-path^="75"],
[data-path^="89"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-5, var(--ctp-mauve)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="06"],
[data-path^="20"],
[data-path^="34"],
[data-path^="48"],
[data-path^="62"],
[data-path^="76"],
[data-path^="90"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="06"],
[data-path^="20"],
[data-path^="34"],
[data-path^="48"],
[data-path^="62"],
[data-path^="76"],
[data-path^="90"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-6, var(--ctp-pink)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="07"],
[data-path^="21"],
[data-path^="35"],
[data-path^="49"],
[data-path^="63"],
[data-path^="77"],
[data-path^="91"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="07"],
[data-path^="21"],
[data-path^="35"],
[data-path^="49"],
[data-path^="63"],
[data-path^="77"],
[data-path^="91"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-7, var(--ctp-red)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="08"],
[data-path^="22"],
[data-path^="36"],
[data-path^="50"],
[data-path^="64"],
[data-path^="78"],
[data-path^="92"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="08"],
[data-path^="22"],
[data-path^="36"],
[data-path^="50"],
[data-path^="64"],
[data-path^="78"],
[data-path^="92"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-8, var(--ctp-peach)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="09"],
[data-path^="23"],
[data-path^="37"],
[data-path^="51"],
[data-path^="65"],
[data-path^="79"],
[data-path^="93"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="09"],
[data-path^="23"],
[data-path^="37"],
[data-path^="51"],
[data-path^="65"],
[data-path^="79"],
[data-path^="93"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-9, var(--ctp-maroon)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="10"],
[data-path^="24"],
[data-path^="38"],
[data-path^="52"],
[data-path^="66"],
[data-path^="80"],
[data-path^="94"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="10"],
[data-path^="24"],
[data-path^="38"],
[data-path^="52"],
[data-path^="66"],
[data-path^="80"],
[data-path^="94"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-10, var(--ctp-yellow)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="11"],
[data-path^="25"],
[data-path^="39"],
[data-path^="53"],
[data-path^="67"],
[data-path^="81"],
[data-path^="95"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="11"],
[data-path^="25"],
[data-path^="39"],
[data-path^="53"],
[data-path^="67"],
[data-path^="81"],
[data-path^="95"])) {
  --sidebar-folder-color: rgb(var(--ctp-sidebar-slot-11, var(--ctp-sky)));
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="12"],
[data-path^="26"],
[data-path^="40"],
[data-path^="54"],
[data-path^="68"],
[data-path^="82"],
[data-path^="96"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="12"],
[data-path^="26"],
[data-path^="40"],
[data-path^="54"],
[data-path^="68"],
[data-path^="82"],
[data-path^="96"])) {
  --sidebar-folder-color: rgb(
    var(--ctp-sidebar-slot-12, var(--ctp-rosewater))
  );
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="13"],
[data-path^="27"],
[data-path^="41"],
[data-path^="55"],
[data-path^="69"],
[data-path^="83"],
[data-path^="97"]),
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="13"],
[data-path^="27"],
[data-path^="41"],
[data-path^="55"],
[data-path^="69"],
[data-path^="83"],
[data-path^="97"])) {
  --sidebar-folder-color: rgb(
    var(--ctp-sidebar-slot-13, var(--ctp-flamingo))
  );
}
body.ctp-numbered-folder-colors .nav-folder-title[data-path^="99"],
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title[data-path^="99"]) {
  --sidebar-folder-color: rgb(
    var(--ctp-sidebar-slot-99, var(--ctp-overlay0))
  );
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"]) {
  color: var(--sidebar-folder-color) !important;
  border-radius: 5px;
  --nav-item-color: var(--sidebar-folder-color);
  --nav-item-color-hover: color-mix(
    in srgb,
    var(--sidebar-folder-color) var(--sidebar-foreground-contrast),
    var(--sidebar-contrast-color)
  );
  --nav-item-background-hover: color-mix(
    in srgb,
    var(--sidebar-folder-color) var(--sidebar-background-contrast),
    transparent
  );
  --background-modifier-border-focus: color-mix(
    in srgb,
    var(--sidebar-folder-color) 40%,
    transparent
  );
  --nav-collapse-icon-color: color-mix(
    in srgb,
    var(--sidebar-folder-color) 60%,
    transparent
  );
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"]) .nav-folder-title-content,
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"]) .nav-folder-title-content::before {
  color: var(--sidebar-folder-color) !important;
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"]) .nav-folder-title-content::before {
  background-color: currentcolor !important;
}
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"])) {
  --nav-indentation-guide-color: color-mix(
    in srgb,
    var(--sidebar-folder-color) var(--sidebar-medium-contrast),
    transparent
  );
}
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"])) .nav-file-title {
  color: color-mix(in srgb, var(--sidebar-folder-color) var(--sidebar-medium-contrast), var(--sidebar-default-text-color)) !important;
  --nav-item-color: color-mix(
    in srgb,
    var(--sidebar-folder-color) var(--sidebar-medium-contrast),
    var(--sidebar-default-text-color)
  );
  --nav-item-background-hover: color-mix(
    in srgb,
    var(--sidebar-folder-color) var(--sidebar-background-contrast),
    transparent
  );
  --background-modifier-border-focus: color-mix(
    in srgb,
    var(--sidebar-folder-color) 40%,
    transparent
  );
  --nav-item-background-active: color-mix(
    in srgb,
    var(--sidebar-folder-color) var(--sidebar-active-contrast),
    transparent
  );
}
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"])) .nav-file-title-content {
  color: inherit !important;
}

@media only screen and (min-width: 768px) {
  .nav-file-title,
  .nav-folder-title {
    padding-top: 3px !important;
    padding-right: 5px !important;
    padding-bottom: 2px !important;
    padding-left: 15px;
  }
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"]):is(:hover, .is-active) {
  background-color: var(--sidebar-folder-color) !important;
  --nav-collapse-icon-color: var(--sidebar-crust);
}
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"]):is(:hover, .is-active) .nav-folder-title-content,
body.ctp-numbered-folder-colors .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"]):is(:hover, .is-active) .nav-folder-title-content::before {
  color: var(--sidebar-crust) !important;
}
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"])) .nav-file-title:is(:hover, .is-active) {
  background-color: var(--sidebar-folder-color) !important;
}
body.ctp-numbered-folder-colors .nav-folder:has(> .nav-folder-title:is([data-path^="0"],
[data-path^="1"],
[data-path^="2"],
[data-path^="3"],
[data-path^="4"],
[data-path^="5"],
[data-path^="6"],
[data-path^="7"],
[data-path^="8"],
[data-path^="9"])) .nav-file-title:is(:hover, .is-active) .nav-file-title-content {
  color: var(--sidebar-crust) !important;
}

.mod-vertical .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner {
  --background-modifier-hover: rgb(var(--ctp-accent));
  --background-modifier-active-hover: rgb(var(--ctp-accent));
}
.mod-vertical .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner .workspace-tab-header-inner-title {
  color: var(--text-normal);
}
.mod-vertical .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner svg {
  color: var(--text-normal);
}

/* Stacked tabs */
/* TODO disentangle all the tabs css */
.mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner {
  --background-modifier-hover: transparent;
  --background-modifier-active-hover: transparent;
}
.mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active):hover .workspace-tab-header-inner .workspace-tab-header-inner-title {
  color: rgb(var(--ctp-accent));
}

.mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active) .workspace-tab-header-inner-close-button:hover svg {
  color: var(--text-on-accent);
}

.mod-vertical .workspace-tabs.mod-stacked .workspace-tab-header:not(.is-active) .workspace-tab-header-inner svg {
  color: var(--text-muted);
}

.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-header-inner:hover .workspace-tab-header-inner-title {
  color: rgb(var(--ctp-accent));
}

.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner-icon:hover {
  background-color: transparent;
}

.canvas-node-label {
  color: var(--text-muted);
}

/* Indicates item is selected/focused */
.canvas-node.is-selected .canvas-node-label,
.canvas-node.is-focused .canvas-node-label {
  color: var(--canvas-color);
}

.canvas-controls button:hover {
  --interactive-hover: rgb(var(--ctp-accent));
  --text-normal: var(--text-on-accent);
}

.canvas-controls button:disabled:hover {
  opacity: 40%;
}

@media (hover: hover) {
  .canvas-control-item:hover {
    background-color: rgb(var(--ctp-pink));
    color: var(--text-on-accent);
  }
}
.canvas-node-container {
  border-radius: var(--radius-l);
}

/* Makes boxes a little less intense */
.canvas-node.is-themed .canvas-node-container {
  border-width: 1px;
  border-color: color-mix(in srgb, var(--canvas-color) 60%, transparent);
  box-shadow: none;
}

.canvas-node.is-selected.is-themed .canvas-node-container,
.canvas-node.is-focused.is-themed .canvas-node-container {
  border-width: 2px;
  box-shadow: none;
}

.canvas-node.is-themed .canvas-node-content {
  background-color: color-mix(in srgb, var(--canvas-color) 10%, transparent);
}

.mod-settings input.slider {
  --slider-track-background: rgb(var(--ctp-accent));
}
.mod-settings input[type=color]::-webkit-color-swatch:hover {
  box-shadow: inset 0 0 0 1px rgb(var(--mono-rgb-100), 25%), 0 0 0 2px rgb(var(--ctp-surface1));
}
.mod-settings .checkbox-container {
  --background-modifier-border-hover: rgb(var(--ctp-red));
  box-shadow: 0 0 2px inset rgb(var(--ctp-base));
}
.mod-settings .checkbox-container::after {
  --toggle-thumb-color: var(--text-on-accent);
  box-shadow: 0 0 4px rgb(var(--ctp-base));
}
.mod-settings .checkbox-container:hover {
  box-shadow: none;
}
.mod-settings .vertical-tab-header-group-title {
  color: var(--text-muted);
  font-size: var(--font-ui-medium);
  font-variant: all-small-caps;
}

.checkbox-container.is-enabled {
  background-color: rgb(var(--ctp-green));
}

button.mod-cta {
  border: 0;
  border-radius: var(--button-radius);
  -webkit-app-region: no-drag;
  color: var(--text-normal);
  cursor: var(--cursor);
  font-family: inherit;
  font-size: var(--font-ui-small);
  font-weight: var(--input-font-weight);
  outline: none;
  user-select: none;
  white-space: nowrap;
}
button.mod-cta:not(.clickable-icon) {
  background-color: var(--interactive-normal);
}
button.mod-cta:hover {
  background-color: var(--interactive-hover);
}

.modal {
  border-color: rgb(var(--ctp-surface1));
}

.style-settings-heading[data-id=catppuccin-theme-credits-link] + .style-settings-container,
.style-settings-heading[data-id=catppuccin-theme-credits-link] .style-settings-collapse-indicator {
  display: none;
}
.style-settings-heading[data-id=catppuccin-theme-credits-link]:not(.is-collapsed) {
  margin-bottom: 0;
}

.community-item .flair:not(.mod-pop) {
  --tag-background: rgb(var(--ctp-accent));
  --tag-color: var(--text-on-accent);
  text-transform: lowercase;
}

body:not(.is-phone) .horizontal-tab-nav-item.is-active,
body:not(.is-phone) .vertical-tab-nav-item.is-active {
  --ctp-accent: var(--ctp-mauve);
  background-color: rgb(var(--ctp-accent));
  color: var(--text-on-accent);
}

.horizontal-tab-nav-item:hover .vertical-tab-nav-item-icon,
.vertical-tab-nav-item:hover .vertical-tab-nav-item-icon,
.horizontal-tab-nav-item.is-active .vertical-tab-nav-item-icon,
.vertical-tab-nav-item.is-active .vertical-tab-nav-item-icon {
  color: var(--text-on--accent);
}

/**`;
}
