/**
 * Hakimi Theme Syntax Highlighting Engine for Zed Editor
 *
 * Fully and strictly aligned with:
 * 1. Zed Language Extensions Official Tree-sitter Captures Specification:
 *    https://zed.dev/docs/extensions/languages
 *    - All 43 Official Theme Captures
 *    - Standard Tree-sitter Grammar Sub-captures (Rust, TS/JS, Python, Go, C++, etc.)
 *    - Fallback captures architecture
 * 2. Cognitive Dual-Coding Matrix (Color × Font Style):
 *    - Bold (700): Control flow, skeleton, declarations, concrete types, constants
 *    - Italic: Abstract contracts, interfaces, type parameters, function arguments, meta
 *    - Bold Italic (700 + italic): Platform standard library built-ins, authoritative documentation
 *    - Regular: Concrete runtime data, function calls, local variables, properties, literals
 */

const FONT_WEIGHT_BOLD = 700;
const FONT_STYLE_ITALIC = 'italic';

/**
 * Generates the complete syntax style map for Zed editor themes.
 * Organizes tokens into intentional semantic groups with consistent abstraction.
 */
export function getZedSyntax(tokens) {
  const { syntax, fg, intent } = tokens;

  return {
    ...getKeywordSyntax(syntax),
    ...getTypeSyntax(syntax),
    ...getFunctionSyntax(syntax),
    ...getVariableAndPropertySyntax(syntax),
    ...getAttributeSyntax(syntax),
    ...getLiteralAndStringSyntax(syntax, fg),
    ...getCommentSyntax(syntax, fg),
    ...getPunctuationAndOperatorSyntax(syntax),
    ...getMarkupAndTagSyntax(syntax, fg),
    ...getDiagnosticSyntax(syntax, intent, fg),
  };
}

/**
 * Keywords, control flow, declarations, and preprocessors.
 * Role: Structural skeleton and control flow anchors (Bold).
 */
function getKeywordSyntax(syntax) {
  return {
    // Official captures
    keyword: createStyle(syntax.keyword, { bold: true }),
    label: createStyle(syntax.keyword, { italic: true }),
    preproc: createStyle(syntax.keyword, { bold: true }),

    // Sub-captures & control grammar
    'keyword.control': createStyle(syntax.keyword, { bold: true }),
    'keyword.function': createStyle(syntax.keyword, { bold: true }),
    'keyword.return': createStyle(syntax.keyword, { bold: true }),
    'keyword.conditional': createStyle(syntax.keyword, { bold: true }),
    'keyword.Conditional': createStyle(syntax.keyword, { bold: true }),
    'keyword.conditional.ternary': createStyle(syntax.keyword, { bold: true }),
    'keyword.repeat': createStyle(syntax.keyword, { bold: true }),
    'keyword.import': createStyle(syntax.keyword, { bold: true }),
    'keyword.export': createStyle(syntax.keyword, { bold: true }),
    'keyword.type': createStyle(syntax.keyword, { bold: true }),
    'keyword.storage': createStyle(syntax.keyword, { bold: true }),
    'keyword.operator': createStyle(syntax.keyword, { bold: true }),
    'keyword.debug': createStyle(syntax.keyword, { bold: true }),
    'keyword.exception': createStyle(syntax.keyword, { bold: true }),
    'keyword.modifier': createStyle(syntax.keyword, { bold: true }),
    'keyword.directive': createStyle(syntax.keyword, { bold: true }),
    'keyword.directive.define': createStyle(syntax.keyword, { bold: true }),

    // Asynchronous & Coroutine flow contract (Bold Italic)
    'keyword.coroutine': createStyle(syntax.keyword, {
      bold: true,
      italic: true,
    }),
  };
}

/**
 * Types, interfaces, classes, and generic type parameters.
 * Role: Type hierarchy and abstract contracts (Color × Font Style duality).
 */
function getTypeSyntax(syntax) {
  return {
    // Official captures
    type: createStyle(syntax.type),
    'type.builtin': createStyle(syntax.type, { bold: true, italic: true }),
    constructor: createStyle(syntax.type, { bold: true }),
    enum: createStyle(syntax.type, { bold: true }),

    // Concrete type definitions (Bold)
    'type.class': createStyle(syntax.type, { bold: true }),
    'type.class.definition': createStyle(syntax.type, { bold: true }),
    'type.struct': createStyle(syntax.type, { bold: true }),
    'type.enum': createStyle(syntax.type, { bold: true }),
    'type.super': createStyle(syntax.type, { bold: true }),
    'type.definition': createStyle(syntax.type, { bold: true }),
    'type.tag': createStyle(syntax.type),

    // Abstract type contracts & generic parameters (Italic)
    'type.interface': createStyle(syntax.type, { italic: true }),
    'type.parameter': createStyle(syntax.type, { italic: true }),
    namespace: createStyle(syntax.type, { italic: true }),
    module: createStyle(syntax.type, { italic: true }),
    lifetime: createStyle(syntax.type, { italic: true }),
  };
}

/**
 * Functions, methods, and executable invocations.
 * Role: Dynamic execution and declarations.
 */
function getFunctionSyntax(syntax) {
  return {
    // Official captures
    function: createStyle(syntax.function),

    // Invocations & Methods (Regular)
    'function.method': createStyle(syntax.function),
    'function.call': createStyle(syntax.function),
    'function.method.call': createStyle(syntax.function),
    'function.special': createStyle(syntax.function),
    parent: createStyle(syntax.function),

    // Declarations & Macros (Bold)
    'function.definition': createStyle(syntax.function, { bold: true }),
    'function.special.definition': createStyle(syntax.function, { bold: true }),
    'function.macro': createStyle(syntax.function, { bold: true }),

    // Platform built-ins (Bold Italic)
    'function.builtin': createStyle(syntax.function, {
      bold: true,
      italic: true,
    }),

    // Method decorators (Italic, aligned with VS Code entity.name.function.decorator)
    'function.decorator': createStyle(syntax.function, { italic: true }),
  };
}

/**
 * Variables, parameters, and struct/object properties.
 * Calibrated deuteranopia-safe separation between variables and properties.
 */
function getVariableAndPropertySyntax(syntax) {
  return {
    // Official captures
    variable: createStyle(syntax.variable),
    'variable.parameter': createStyle(syntax.parameter, { italic: true }),
    'variable.special': createStyle(syntax.keyword, { italic: true }), // this, self, super (aligned with VS Code variable.language)
    property: createStyle(syntax.property),
    primary: createStyle(syntax.variable),

    // Sub-captures & Fallback aliases
    parameter: createStyle(syntax.parameter, { italic: true }),
    'variable.member': createStyle(syntax.property),
    field: createStyle(syntax.property),

    // Platform built-in globals (Bold Italic)
    'variable.builtin': createStyle(syntax.variable, {
      bold: true,
      italic: true,
    }),
  };
}

/**
 * Attributes, annotations, and decorators.
 * Role: Metadata and structural annotations (Italic).
 */
function getAttributeSyntax(syntax) {
  return {
    // Official capture
    attribute: createStyle(syntax.attribute, { italic: true }),
  };
}

/**
 * Literals, strings, regular expressions, and numeric constants.
 */
function getLiteralAndStringSyntax(syntax, fg) {
  return {
    // Official captures
    string: createStyle(syntax.string),
    'string.escape': createStyle(syntax.regex),
    'string.regex': createStyle(syntax.regex),
    'string.special': createStyle(syntax.string),
    'string.special.symbol': createStyle(syntax.constant),
    number: createStyle(syntax.number),
    boolean: createStyle(syntax.constant, { bold: true }),
    constant: createStyle(syntax.constant, { bold: true }),
    'constant.builtin': createStyle(syntax.constant, {
      bold: true,
      italic: true,
    }),
    variant: createStyle(syntax.constant, { bold: true }),
    'text.literal': createStyle(syntax.string),
    link_text: createStyle(fg.accent),
    link_uri: createStyle(fg.accent, { italic: true }),
    embedded: createStyle(fg.default),

    // Sub-captures & Numeric formats
    'number.float': createStyle(syntax.number),
    float: createStyle(syntax.number),
    'constant.macro': createStyle(syntax.constant, { bold: true }),
    'string.regexp': createStyle(syntax.regex),
    'string.special.path': createStyle(syntax.string),
    'string.special.url': createStyle(fg.accent, { italic: true }),
    character: createStyle(syntax.string),
    'character.special': createStyle(syntax.regex),
    symbol: createStyle(syntax.constant),
    text: createStyle(fg.default),
  };
}

/**
 * Code comments and authoritative documentation.
 * Role: Contextual explanations and formal documentation specifications.
 */
function getCommentSyntax(syntax, fg) {
  return {
    // Official captures
    comment: createStyle(syntax.comment, { italic: true }),
    'comment.doc': createStyle(syntax.comment, { bold: true, italic: true }),

    // Aliases
    'comment.documentation': createStyle(syntax.comment, {
      bold: true,
      italic: true,
    }),
    hint: createStyle(fg.subtle),
  };
}

/**
 * Operators, punctuation, and structural brackets.
 * Role: Neutral framing that doesn't distract from semantic code tokens.
 */
function getPunctuationAndOperatorSyntax(syntax) {
  return {
    // Official captures
    operator: createStyle(syntax.operator),
    punctuation: createStyle(syntax.punctuation),
    'punctuation.bracket': createStyle(syntax.punctuation),
    'punctuation.delimiter': createStyle(syntax.punctuation),
    'punctuation.list_marker': createStyle(syntax.punctuation),
    'punctuation.special': createStyle(syntax.punctuation),
  };
}

/**
 * Markup, titles, emphasis, and HTML/XML tags.
 */
function getMarkupAndTagSyntax(syntax, fg) {
  return {
    // Official captures
    tag: createStyle(syntax.tag),
    'tag.doctype': createStyle(syntax.keyword, { bold: true }),
    title: createStyle(syntax.keyword, { bold: true }),
    emphasis: createStyle(fg.default, { italic: true }),
    'emphasis.strong': createStyle(fg.default, { bold: true }),

    // Sub-captures
    strong: createStyle(fg.default, { bold: true }),
  };
}

/**
 * Diagnostic indicators, diff markers, and predictive ghost text.
 */
function getDiagnosticSyntax(syntax, intent, fg) {
  return {
    // Official captures
    predictive: createStyle(fg.subtle, { italic: true }),

    // Error and invalid tokens (Bold)
    error: createStyle(syntax.error, { bold: true }),
    invalid: createStyle(syntax.error, { bold: true }),

    // Diff highlights
    'diff.plus': createStyle(intent.success),
    'diff.minus': createStyle(intent.danger),
  };
}

/**
 * Pure factory for Zed HighlightStyleContent objects.
 * Enforces consistency and eliminates repetitive object structuring.
 */
function createStyle(color, { bold = false, italic = false } = {}) {
  return {
    color,
    font_style: italic ? FONT_STYLE_ITALIC : null,
    font_weight: bold ? FONT_WEIGHT_BOLD : null,
  };
}
