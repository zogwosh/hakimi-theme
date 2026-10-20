// Aligned with catppuccin-vsc/src/theme/semanticTokens.ts
// Implements the 6 Base Colors × 4 Font Styles Syntax Matrix
export const getSemanticTokens = (context) => {
  const { palette } = context;

  return {
    // -------------------------------------------------------------
    // Cool 1: Mauve
    // -------------------------------------------------------------
    // bold: keywords & control
    keyword: {
      foreground: palette.mauve,
      fontStyle: 'bold',
    },
    // italic: self/this, lifetime, async
    selfKeyword: {
      foreground: palette.mauve,
      fontStyle: 'italic',
    },
    lifetime: {
      foreground: palette.mauve,
      fontStyle: 'italic',
    },
    '*.async': {
      fontStyle: 'italic',
    },
    'keyword.async': {
      foreground: palette.mauve,
      fontStyle: 'italic',
    },
    // bold italic: built-ins, standard libraries, primitives
    '*.defaultLibrary': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'class.defaultLibrary': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'type.defaultLibrary': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'function.defaultLibrary': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'variable.defaultLibrary': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'class.builtin:python': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'type.defaultLibrary:go': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'variable.readonly.defaultLibrary:go': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },
    'constant.builtin.readonly:nix': {
      foreground: palette.mauve,
      fontStyle: 'bold italic',
    },

    // -------------------------------------------------------------
    // Cool 2: Green
    // -------------------------------------------------------------
    // normal: strings
    string: palette.green,
    // bold: regexp
    regexp: {
      foreground: palette.green,
      fontStyle: 'bold',
    },
    // italic: namespaces & modules
    namespace: {
      foreground: palette.green,
      fontStyle: 'italic',
    },

    // -------------------------------------------------------------
    // Warm 1: Blue
    // -------------------------------------------------------------
    // normal: functions & methods
    function: palette.blue,
    method: palette.blue,
    // bold: components & constructors & enum variants
    'class:typescriptreact': {
      foreground: palette.blue,
      fontStyle: 'bold',
    },
    'class:javascriptreact': {
      foreground: palette.blue,
      fontStyle: 'bold',
    },
    'enumMember:rust': {
      foreground: palette.blue,
      fontStyle: 'bold',
    },

    // -------------------------------------------------------------
    // Warm 2: Yellow
    // -------------------------------------------------------------
    // normal: numbers & booleans
    number: palette.yellow,
    boolean: {
      foreground: palette.yellow,
      fontStyle: '',
    },
    // bold: classes, structs, enums, constants
    class: {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    struct: {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    enum: {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    enumMember: {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    'property.readonly': {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    'variable.readonly': {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    'class:python': {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    // italic: types, interfaces, type parameters
    type: {
      foreground: palette.yellow,
      fontStyle: 'italic',
    },
    interface: {
      foreground: palette.yellow,
      fontStyle: 'italic',
    },
    typeParameter: {
      foreground: palette.yellow,
      fontStyle: 'italic',
    },
    'variable.typeHint:python': {
      foreground: palette.yellow,
      fontStyle: 'italic',
    },
    // bold italic: macros, decorators, annotations
    macro: {
      foreground: palette.yellow,
      fontStyle: 'bold italic',
    },
    decorator: {
      foreground: palette.yellow,
      fontStyle: 'bold italic',
    },
    annotation: {
      foreground: palette.yellow,
      fontStyle: 'bold italic',
    },
    'function.decorator:python': {
      foreground: palette.yellow,
      fontStyle: 'bold italic',
    },
    'builtinAttribute.attribute.library:rust': {
      foreground: palette.yellow,
      fontStyle: 'bold italic',
    },
    'generic.attribute:rust': {
      foreground: palette.yellow,
      fontStyle: 'bold italic',
    },

    // -------------------------------------------------------------
    // Neutral 1: Text
    // -------------------------------------------------------------
    // normal: variables & properties
    variable: palette.text,
    property: palette.text,
    'variable.readonly:javascript': {
      foreground: palette.text,
    },
    'variable.readonly:typescript': {
      foreground: palette.text,
    },
    'property.readonly:javascript': {
      foreground: palette.text,
    },
    'property.readonly:typescript': {
      foreground: palette.text,
    },
    'variable.readonly:javascriptreact': {
      foreground: palette.text,
    },
    'variable.readonly:typescriptreact': {
      foreground: palette.text,
    },
    'property.readonly:javascriptreact': {
      foreground: palette.text,
    },
    'property.readonly:typescriptreact': {
      foreground: palette.text,
    },
    'variable.readonly:scala': {
      foreground: palette.text,
    },
    // italic: function parameters
    parameter: {
      foreground: palette.text,
      fontStyle: 'italic',
    },

    // -------------------------------------------------------------
    // Neutral 2: Overlay2
    // -------------------------------------------------------------
    // italic: comments
    comment: {
      foreground: palette.overlay2,
      fontStyle: 'italic',
    },
    // bold italic: documentation comments
    'comment.documentation': {
      foreground: palette.overlay2,
      fontStyle: 'bold italic',
    },

    // -------------------------------------------------------------
    // Markup / Prose / Haskell / Config Roles
    // -------------------------------------------------------------
    heading: {
      foreground: palette.red,
    },
    'text.emph': {
      foreground: palette.red,
      fontStyle: 'italic',
    },
    'text.strong': {
      foreground: palette.red,
      fontStyle: 'bold',
    },
    'text.math': {
      foreground: palette.red,
    },
    pol: {
      foreground: palette.red,
    },
    'enumMember:haskell': {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    'enum:haskell': {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    'type:haskell': {
      foreground: palette.yellow,
      fontStyle: 'italic',
    },
    'class:haskell': {
      foreground: palette.yellow,
      fontStyle: 'bold',
    },
    'interface:haskell': {
      foreground: palette.yellow,
      fontStyle: 'italic',
    },
    'property:haskell': {
      foreground: palette.text,
    },
    'macro:haskell': {
      foreground: palette.yellow,
      fontStyle: 'bold italic',
    },
    'typeParameter:haskell': {
      foreground: palette.yellow,
      fontStyle: 'italic',
    },
    'variable:haskell': {
      fontStyle: '',
    },
    tomlArrayKey: {
      foreground: palette.blue,
      fontStyle: '',
    },
    tomlTableKey: {
      foreground: palette.blue,
      fontStyle: '',
    },
  };
};
