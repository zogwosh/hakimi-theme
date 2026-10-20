// Aligned with catppuccin/zed syntax rules
// Implements the 6 Base Colors × 4 Font Styles Syntax Matrix
export const getZedSyntax = (palette) => ({
  // -------------------------------------------------------------
  // Cool 1: Mauve (#336fd6 / #7ab2ff)
  // -------------------------------------------------------------
  // normal: HTML/XML Tag
  tag: {
    color: palette.mauve,
    font_style: null,
    font_weight: null,
  },
  // bold: keywords & control
  keyword: {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.control': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.function': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.return': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.conditional': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.Conditional': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.conditional.ternary': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.repeat': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.import': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.export': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.type': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.storage': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.coroutine': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.operator': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.debug': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.exception': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.directive': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'keyword.directive.define': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  operator: {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  label: {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  'tag.doctype': {
    color: palette.mauve,
    font_style: null,
    font_weight: 700,
  },
  // italic: language modifiers, self/this, lifetime
  'keyword.modifier': {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: null,
  },
  'variable.special': {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: null,
  },
  lifetime: {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: null,
  },
  // bold italic: built-ins and primitives
  'type.builtin': {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: 700,
  },
  'function.builtin': {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: 700,
  },
  'variable.builtin': {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: 700,
  },
  'constant.builtin': {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: 700,
  },
  'constant.macro': {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: 700,
  },

  // -------------------------------------------------------------
  // Cool 2: Green (#004b8f / #80dcff)
  // -------------------------------------------------------------
  // normal: strings & characters
  string: {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  'string.special': {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  'string.special.symbol': {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  'string.special.path': {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  'string.special.url': {
    color: palette.green,
    font_style: 'italic',
    font_weight: null,
  },
  character: {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  'character.special': {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  symbol: {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  'text.literal': {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  link_text: {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  link_uri: {
    color: palette.green,
    font_style: 'italic',
    font_weight: null,
  },
  'diff.plus': {
    color: palette.green,
    font_style: null,
    font_weight: null,
  },
  // bold: escape & regex
  'string.escape': {
    color: palette.green,
    font_style: null,
    font_weight: 700,
  },
  'string.regex': {
    color: palette.green,
    font_style: null,
    font_weight: 700,
  },
  'string.regexp': {
    color: palette.green,
    font_style: null,
    font_weight: 700,
  },
  // italic: namespace & module
  namespace: {
    color: palette.green,
    font_style: 'italic',
    font_weight: null,
  },
  module: {
    color: palette.green,
    font_style: 'italic',
    font_weight: null,
  },

  // -------------------------------------------------------------
  // Warm 1: Blue (#8a5200 / #f0d68f)
  // -------------------------------------------------------------
  // normal: functions & methods
  function: {
    color: palette.blue,
    font_style: null,
    font_weight: null,
  },
  'function.method': {
    color: palette.blue,
    font_style: null,
    font_weight: null,
  },
  'function.method.call': {
    color: palette.blue,
    font_style: null,
    font_weight: null,
  },
  'function.call': {
    color: palette.blue,
    font_style: null,
    font_weight: null,
  },
  'function.definition': {
    color: palette.blue,
    font_style: null,
    font_weight: null,
  },
  parent: {
    color: palette.blue,
    font_style: null,
    font_weight: null,
  },
  // bold: constructors, components, type tags
  constructor: {
    color: palette.blue,
    font_style: null,
    font_weight: 700,
  },
  'type.tag': {
    color: palette.blue,
    font_style: null,
    font_weight: 700,
  },

  // -------------------------------------------------------------
  // Warm 2: Yellow (#3a1f0b / #ff9536)
  // -------------------------------------------------------------
  // normal: numbers & booleans
  number: {
    color: palette.yellow,
    font_style: null,
    font_weight: null,
  },
  'number.float': {
    color: palette.yellow,
    font_style: null,
    font_weight: null,
  },
  float: {
    color: palette.yellow,
    font_style: null,
    font_weight: null,
  },
  boolean: {
    color: palette.yellow,
    font_style: null,
    font_weight: null,
  },
  variant: {
    color: palette.yellow,
    font_style: null,
    font_weight: null,
  },
  // bold: constants, classes, structs, enums
  constant: {
    color: palette.yellow,
    font_style: null,
    font_weight: 700,
  },
  'type.class': {
    color: palette.yellow,
    font_style: null,
    font_weight: 700,
  },
  'type.class.definition': {
    color: palette.yellow,
    font_style: null,
    font_weight: 700,
  },
  'type.struct': {
    color: palette.yellow,
    font_style: null,
    font_weight: 700,
  },
  'type.enum': {
    color: palette.yellow,
    font_style: null,
    font_weight: 700,
  },
  enum: {
    color: palette.yellow,
    font_style: null,
    font_weight: 700,
  },
  // italic: types, interfaces, type parameters
  type: {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: null,
  },
  'type.interface': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: null,
  },
  'type.parameter': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: null,
  },
  'type.super': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: null,
  },
  'type.definition': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: null,
  },
  // bold italic: macros, decorators, annotations, preproc
  'function.macro': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },
  'function.special': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },
  'function.special.definition': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },
  'function.decorator': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },
  preproc: {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },
  attribute_item: {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },

  // -------------------------------------------------------------
  // Neutral 1: Text (#45494c / #e0e0e0)
  // -------------------------------------------------------------
  // normal: variables & properties
  variable: {
    color: palette.text,
    font_style: null,
    font_weight: null,
  },
  'variable.member': {
    color: palette.text,
    font_style: null,
    font_weight: null,
  },
  property: {
    color: palette.text,
    font_style: null,
    font_weight: null,
  },
  primary: {
    color: palette.text,
    font_style: null,
    font_weight: null,
  },
  field: {
    color: palette.text,
    font_style: null,
    font_weight: null,
  },
  text: {
    color: palette.text,
    font_style: null,
    font_weight: null,
  },
  embedded: {
    color: palette.text,
    font_style: null,
    font_weight: null,
  },
  // italic: parameters & attributes
  'variable.parameter': {
    color: palette.text,
    font_style: 'italic',
    font_weight: null,
  },
  parameter: {
    color: palette.text,
    font_style: 'italic',
    font_weight: null,
  },
  attribute: {
    color: palette.text,
    font_style: 'italic',
    font_weight: null,
  },
  'tag.attribute': {
    color: palette.text,
    font_style: 'italic',
    font_weight: null,
  },
  emphasis: {
    color: palette.text,
    font_style: 'italic',
    font_weight: null,
  },

  // -------------------------------------------------------------
  // Neutral 2: Overlay2 (#6f706f / #99a0a8)
  // -------------------------------------------------------------
  // normal: punctuation & delimiters
  punctuation: {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  'punctuation.bracket': {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  'punctuation.delimiter': {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  'punctuation.special': {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  'punctuation.special.symbol': {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  'punctuation.list_marker': {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  'tag.delimiter': {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  predictive: {
    color: palette.overlay2,
    font_style: null,
    font_weight: null,
  },
  // italic: comments
  comment: {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: null,
  },
  'comment.documentation': {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: null,
  },
  hint: {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: null,
  },
  'comment.hint': {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: null,
  },
  'comment.info': {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: null,
  },
  'comment.note': {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: null,
  },
  // bold italic: documentation comments
  'comment.doc': {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: 700,
  },
  'string.doc': {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: 700,
  },
  'string.documentation': {
    color: palette.overlay2,
    font_style: 'italic',
    font_weight: 700,
  },

  // -------------------------------------------------------------
  // Semantic Error / Diff
  // -------------------------------------------------------------
  error: {
    color: palette.red,
    font_style: null,
    font_weight: 700,
  },
  'diff.minus': {
    color: palette.red,
    font_style: null,
    font_weight: 700,
  },
  'comment.error': {
    color: palette.red,
    font_style: 'italic',
    font_weight: 700,
  },
  'comment.warning': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },
  'comment.warn': {
    color: palette.yellow,
    font_style: 'italic',
    font_weight: 700,
  },
  'comment.todo': {
    color: palette.blue,
    font_style: 'italic',
    font_weight: 700,
  },
  predoc: {
    color: palette.red,
    font_style: null,
    font_weight: 700,
  },
  'emphasis.strong': {
    color: palette.text,
    font_style: null,
    font_weight: 700,
  },
  title: {
    color: palette.text,
    font_style: null,
    font_weight: 800,
  },
  concept: {
    color: palette.mauve,
    font_style: 'italic',
    font_weight: 700,
  },
});
