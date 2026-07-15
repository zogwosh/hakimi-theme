import fs from 'node:fs';

const themeFamily = JSON.parse(
  fs.readFileSync('zed/themes/hakimi-deuteranopia.json', 'utf8'),
);
const palette = JSON.parse(fs.readFileSync('dist/palette.json', 'utf8'));

const requiredStyleKeys = [
  'background.appearance',
  'vim.mode.text',
  'vim.normal.foreground',
  'vim.normal.background',
  'border',
  'border.variant',
  'border.focused',
  'border.selected',
  'border.disabled',
  'elevated_surface.background',
  'surface.background',
  'background',
  'element.background',
  'element.hover',
  'element.active',
  'element.selected',
  'drop_target.background',
  'ghost_element.background',
  'ghost_element.hover',
  'ghost_element.active',
  'ghost_element.selected',
  'text',
  'text.muted',
  'text.placeholder',
  'text.disabled',
  'text.accent',
  'icon',
  'icon.muted',
  'icon.disabled',
  'icon.placeholder',
  'icon.accent',
  'status_bar.background',
  'title_bar.background',
  'title_bar.inactive_background',
  'toolbar.background',
  'tab_bar.background',
  'tab.inactive_background',
  'tab.active_background',
  'search.match_background',
  'search.active_match_background',
  'panel.background',
  'panel.focused_border',
  'panel.indent_guide',
  'panel.indent_guide_active',
  'panel.indent_guide_hover',
  'panel.overlay_background',
  'pane.focused_border',
  'pane_group.border',
  'scrollbar.thumb.background',
  'scrollbar.thumb.hover_background',
  'scrollbar.thumb.active_background',
  'scrollbar.thumb.border',
  'scrollbar.track.background',
  'scrollbar.track.border',
  'minimap.thumb.background',
  'minimap.thumb.hover_background',
  'minimap.thumb.active_background',
  'minimap.thumb.border',
  'editor.foreground',
  'editor.background',
  'editor.gutter.background',
  'editor.subheader.background',
  'editor.active_line.background',
  'editor.highlighted_line.background',
  'editor.line_number',
  'editor.active_line_number',
  'editor.invisible',
  'editor.wrap_guide',
  'editor.active_wrap_guide',
  'editor.document_highlight.bracket_background',
  'editor.document_highlight.read_background',
  'editor.document_highlight.write_background',
  'editor.indent_guide',
  'editor.indent_guide_active',
  'terminal.background',
  'terminal.ansi.background',
  'terminal.foreground',
  'terminal.dim_foreground',
  'terminal.bright_foreground',
  'terminal.ansi.black',
  'terminal.ansi.white',
  'terminal.ansi.red',
  'terminal.ansi.green',
  'terminal.ansi.yellow',
  'terminal.ansi.blue',
  'terminal.ansi.magenta',
  'terminal.ansi.cyan',
  'terminal.ansi.bright_black',
  'terminal.ansi.bright_white',
  'terminal.ansi.bright_red',
  'terminal.ansi.bright_green',
  'terminal.ansi.bright_yellow',
  'terminal.ansi.bright_blue',
  'terminal.ansi.bright_magenta',
  'terminal.ansi.bright_cyan',
  'terminal.ansi.dim_black',
  'terminal.ansi.dim_white',
  'terminal.ansi.dim_red',
  'terminal.ansi.dim_green',
  'terminal.ansi.dim_yellow',
  'terminal.ansi.dim_blue',
  'terminal.ansi.dim_magenta',
  'terminal.ansi.dim_cyan',
  'link_text.hover',
  'conflict',
  'conflict.border',
  'conflict.background',
  'created',
  'created.border',
  'created.background',
  'deleted',
  'deleted.border',
  'deleted.background',
  'hidden',
  'hidden.border',
  'hidden.background',
  'hint',
  'hint.border',
  'hint.background',
  'ignored',
  'ignored.border',
  'ignored.background',
  'modified',
  'modified.border',
  'modified.background',
  'predictive',
  'predictive.border',
  'predictive.background',
  'renamed',
  'renamed.border',
  'renamed.background',
  'info',
  'info.border',
  'info.background',
  'warning',
  'warning.border',
  'warning.background',
  'error',
  'error.border',
  'error.background',
  'success',
  'success.border',
  'success.background',
  'unreachable',
  'unreachable.border',
  'unreachable.background',
  'players',
  'version_control.added',
  'version_control.deleted',
  'version_control.modified',
  'version_control.renamed',
  'version_control.conflict',
  'version_control.conflict_marker.ours',
  'version_control.conflict_marker.theirs',
  'version_control.ignored',
  'debugger.accent',
  'editor.debugger_active_line.background',
];

const requiredSyntaxKeys = [
  'variable',
  'variable.builtin',
  'variable.parameter',
  'variable.member',
  'variable.special',
  'constant',
  'constant.builtin',
  'constant.macro',
  'module',
  'label',
  'string',
  'string.documentation',
  'string.regexp',
  'string.escape',
  'string.special',
  'string.special.path',
  'string.special.symbol',
  'string.special.url',
  'character',
  'character.special',
  'boolean',
  'number',
  'number.float',
  'tag',
  'tag.attribute',
  'tag.delimiter',
  'type',
  'type.builtin',
  'type.definition',
  'type.interface',
  'type.super',
  'attribute',
  'property',
  'function',
  'function.builtin',
  'function.call',
  'function.macro',
  'function.method',
  'function.method.call',
  'constructor',
  'operator',
  'keyword',
  'keyword.modifier',
  'keyword.type',
  'keyword.coroutine',
  'keyword.function',
  'keyword.operator',
  'keyword.import',
  'keyword.repeat',
  'keyword.return',
  'keyword.debug',
  'keyword.exception',
  'keyword.conditional',
  'keyword.conditional.ternary',
  'keyword.directive',
  'keyword.directive.define',
  'keyword.export',
  'punctuation',
  'punctuation.delimiter',
  'punctuation.bracket',
  'punctuation.special',
  'punctuation.special.symbol',
  'punctuation.list_marker',
  'comment',
  'comment.doc',
  'comment.documentation',
  'comment.info',
  'comment.error',
  'comment.warning',
  'comment.warn',
  'comment.hint',
  'comment.todo',
  'comment.note',
  'diff.plus',
  'diff.minus',
  'parameter',
  'field',
  'namespace',
  'float',
  'symbol',
  'string.regex',
  'text',
  'emphasis.strong',
  'emphasis',
  'embedded',
  'text.literal',
  'concept',
  'enum',
  'function.decorator',
  'type.class.definition',
  'hint',
  'link_text',
  'link_uri',
  'parent',
  'predictive',
  'predoc',
  'primary',
  'tag.doctype',
  'string.doc',
  'title',
  'variant',
  'error',
];

const expectedThemes = {
  'Hakimi Deuteranopia Light': {
    appearance: 'light',
    palette: palette.flavors.light.colors,
  },
  'Hakimi Deuteranopia Dark': {
    appearance: 'dark',
    palette: palette.flavors.dark.colors,
  },
};

let failures = 0;

function fail(message) {
  console.log(`FAIL: ${message}`);
  failures++;
}

function hasOwn(object, key) {
  return Object.hasOwn(object, key);
}

function expectEqual(label, actual, expected) {
  if (actual !== expected) fail(`${label}: got ${actual}, expected ${expected}`);
}

function expectDistinct(label, values) {
  if (new Set(values).size !== values.length) {
    fail(`${label} should use distinct state values, got ${values.join(', ')}`);
  }
}

console.log('Validating generated Zed theme coverage...');

if (themeFamily.$schema !== 'https://zed.dev/schema/themes/v0.2.0.json') {
  fail(`unexpected Zed schema ${themeFamily.$schema}`);
}

if (!Array.isArray(themeFamily.themes) || themeFamily.themes.length !== 2) {
  fail(`expected 2 Zed themes, found ${themeFamily.themes?.length ?? 0}`);
}

const serialized = JSON.stringify(themeFamily);
if (serialized.includes('{{')) {
  fail('generated Zed theme contains unrendered template markers');
}

for (const theme of themeFamily.themes ?? []) {
  const expected = expectedThemes[theme.name];
  if (!expected) {
    fail(`unexpected theme name ${theme.name}`);
    continue;
  }

  expectEqual(`${theme.name} appearance`, theme.appearance, expected.appearance);

  const style = theme.style ?? {};
  const syntax = style.syntax ?? {};
  const styleCount = Object.keys(style).filter((key) => key !== 'syntax').length;
  const syntaxCount = Object.keys(syntax).length;

  if (styleCount < 170) fail(`${theme.name} has only ${styleCount} style keys`);
  if (syntaxCount < 100)
    fail(`${theme.name} has only ${syntaxCount} syntax keys`);

  for (const key of requiredStyleKeys) {
    if (!hasOwn(style, key)) fail(`${theme.name} missing style key ${key}`);
  }

  for (const key of requiredSyntaxKeys) {
    if (!hasOwn(syntax, key)) {
      fail(`${theme.name} missing syntax key ${key}`);
      continue;
    }

    const value = syntax[key];
    if (!hasOwn(value, 'color')) fail(`${theme.name} syntax ${key} lacks color`);
    if (!hasOwn(value, 'font_style'))
      fail(`${theme.name} syntax ${key} lacks font_style`);
    if (!hasOwn(value, 'font_weight'))
      fail(`${theme.name} syntax ${key} lacks font_weight`);
  }

  expectDistinct(`${theme.name} element states`, [
    style['element.background'],
    style['element.hover'],
    style['element.active'],
    style['element.selected'],
  ]);

  expectDistinct(`${theme.name} ghost element states`, [
    style['ghost_element.background'],
    style['ghost_element.hover'],
    style['ghost_element.active'],
    style['ghost_element.selected'],
  ]);

  if (!Array.isArray(style.players) || style.players.length < 7) {
    fail(`${theme.name} should define at least 7 player colors`);
  }

  expectEqual(
    `${theme.name} editor background`,
    style['editor.background'],
    expected.palette.surface_editor.hex,
  );
  expectEqual(`${theme.name} text`, style.text, expected.palette.foreground.hex);
  expectEqual(
    `${theme.name} keyword syntax`,
    syntax.keyword?.color,
    expected.palette.syn_keyword.hex,
  );
  expectEqual(
    `${theme.name} string syntax`,
    syntax.string?.color,
    expected.palette.syn_string.hex,
  );
  expectEqual(
    `${theme.name} function syntax`,
    syntax.function?.color,
    expected.palette.syn_function.hex,
  );
  expectEqual(
    `${theme.name} type syntax`,
    syntax.type?.color,
    expected.palette.syn_type.hex,
  );
  expectEqual(
    `${theme.name} comment syntax`,
    syntax.comment?.color,
    expected.palette.syn_comment.hex,
  );

  if (syntax.keyword?.font_weight !== 700) {
    fail(`${theme.name} keyword should keep bold deutan cue`);
  }
  if (syntax.comment?.font_style !== 'italic') {
    fail(`${theme.name} comment should keep italic cue`);
  }
  if (syntax.error?.font_weight !== 700) {
    fail(`${theme.name} error should keep bold cue`);
  }

  if (theme.appearance === 'dark') {
    const oldHardcodedSurfaces = ['#181818', '#1e1e1e', '#2a2a2a', '#333333'];
    const darkStyleValues = Object.values(style)
      .filter((value) => typeof value === 'string')
      .map((value) => value.toLowerCase());
    const leaked = oldHardcodedSurfaces.filter((color) =>
      darkStyleValues.includes(color),
    );
    if (leaked.length) {
      fail(
        `${theme.name} still uses old hardcoded dark surfaces: ${leaked.join(', ')}`,
      );
    }
  }
}

if (failures) {
  console.log(`Zed theme validation failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log('Zed theme coverage validation passed.');
