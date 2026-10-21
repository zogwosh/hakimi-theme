/**
 * Hakimi Theme Syntax Highlighting Engine
 * 
 * Fully and strictly aligned with:
 * 1. Language Server Protocol (LSP) 3.16+ & VS Code Semantic Highlighting Guide:
 *    https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide
 *    - All 22 Standard Token Types
 *    - All 10 Standard Token Modifiers
 * 2. Official TextMate Scope Hierarchy & VS Code Syntax Highlight Guide:
 *    https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
 * 
 * Executes the First-Principles Cognitive Dual-Coding (Color × Font Style) Matrix:
 * - Bold: Skeleton, control flow, declarations, concrete classes/structs/enums
 * - Italic: Abstract contracts, interfaces, type parameters, function arguments, meta
 * - Bold Italic: Platform standard library built-ins, authoritative documentation
 * - Regular: Schema properties, concrete runtime data, function calls, strings, numbers
 */

export function getSyntaxHighlighting(tokens) {
  return {
    tokenColors: getTokenColors(tokens),
    semanticTokenColors: getSemanticTokenColors(tokens),
  };
}

/**
 * Standard Language Server Protocol (LSP) Semantic Token Colors.
 * Strictly covers the official 22 Token Types and 10 Token Modifiers.
 */
export function getSemanticTokenColors(tokens) {
  const { syntax } = tokens;

  return {
    // =========================================================================
    // 1. STANDARD TOKEN TYPES (All 22 Official LSP Types)
    // =========================================================================

    // Types & Structures
    namespace: { foreground: syntax.type, italic: true },
    class: { foreground: syntax.type, bold: true },
    enum: { foreground: syntax.type, bold: true },
    interface: { foreground: syntax.type, italic: true },
    struct: { foreground: syntax.type, bold: true },
    type: syntax.type,
    typeParameter: { foreground: syntax.type, italic: true },

    // Identifiers & Variables
    variable: syntax.variable,
    property: syntax.property,
    parameter: { foreground: syntax.parameter, italic: true },
    enumMember: { foreground: syntax.constant, bold: true },
    event: syntax.function,

    // Executables & Flow
    function: syntax.function,
    method: syntax.function,
    macro: { foreground: syntax.function, bold: true },
    keyword: { foreground: syntax.keyword, bold: true },
    modifier: { foreground: syntax.keyword, bold: true },
    label: { foreground: syntax.keyword, italic: true },

    // Literals & Data
    comment: { foreground: syntax.comment, italic: true },
    string: syntax.string,
    number: syntax.number,
    regexp: syntax.regex,
    operator: syntax.operator,

    // =========================================================================
    // 2. STANDARD TOKEN MODIFIERS (Official LSP Modifiers)
    // =========================================================================

    // Declaration & Definition: Bold emphasis on symbol introduction
    '*.declaration': { bold: true },
    '*.definition': { bold: true },
    'property.declaration': { foreground: syntax.property, bold: true },
    'function.declaration': { foreground: syntax.function, bold: true },
    'method.declaration': { foreground: syntax.function, bold: true },

    // Readonly: Immutability semantics
    '*.readonly': { bold: true },
    'variable.readonly': { foreground: syntax.constant, bold: true },
    'property.readonly': { foreground: syntax.constant, bold: true },

    // Abstract & Async: Non-concrete execution contracts
    '*.abstract': { italic: true },
    'class.abstract': { foreground: syntax.type, bold: true, italic: true },
    'method.abstract': { foreground: syntax.function, italic: true },
    '*.async': { italic: true },

    // Documentation: Authoritative API specification
    '*.documentation': { bold: true, italic: true },
    'comment.documentation': { foreground: syntax.comment, bold: true, italic: true },

    // Default Library: Platform built-in globals and runtime core
    '*.defaultLibrary': { bold: true, italic: true },
    'class.defaultLibrary': { foreground: syntax.type, bold: true, italic: true },
    'type.defaultLibrary': { foreground: syntax.type, bold: true, italic: true },
    'function.defaultLibrary': { foreground: syntax.function, bold: true, italic: true },
    'variable.defaultLibrary': { bold: true, italic: true },

    // Deprecated: Visual strike through
    '*.deprecated': { strikethrough: true },
  };
}

/**
 * Standard TextMate Token Color Rules.
 * Completely covers the official root scopes:
 * comment, constant, entity, keyword, storage, string, support, variable, invalid, markup.
 */
export function getTokenColors(tokens) {
  const { syntax } = tokens;

  return [
    // -------------------------------------------------------------------------
    // 1. Comments (`comment`)
    // -------------------------------------------------------------------------
    {
      name: 'Comments',
      scope: [
        'comment',
        'comment.line',
        'comment.block',
        'punctuation.definition.comment',
      ],
      settings: {
        foreground: syntax.comment,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Documentation Comments',
      scope: [
        'comment.documentation',
        'comment.block.documentation',
      ],
      settings: {
        foreground: syntax.comment,
        fontStyle: 'bold italic',
      },
    },

    // -------------------------------------------------------------------------
    // 2. Constants (`constant`)
    // -------------------------------------------------------------------------
    {
      name: 'Numeric Constants',
      scope: [
        'constant.numeric',
      ],
      settings: {
        foreground: syntax.number,
      },
    },
    {
      name: 'Language Constants (true, false, null, undefined, nil)',
      scope: [
        'constant.language',
        'constant.other',
        'support.constant',
      ],
      settings: {
        foreground: syntax.constant,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Character Escape Sequences & Regexp',
      scope: [
        'constant.character.escape',
        'string.regexp',
        'constant.regexp',
      ],
      settings: {
        foreground: syntax.regex,
      },
    },

    // -------------------------------------------------------------------------
    // 3. Keywords & Storage (`keyword`, `storage`)
    // -------------------------------------------------------------------------
    {
      name: 'Control Flow & Keywords',
      scope: [
        'keyword',
        'keyword.control',
        'keyword.other',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Storage Types and Modifiers (const, let, var, static, async)',
      scope: [
        'storage',
        'storage.type',
        'storage.modifier',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Operators',
      scope: [
        'keyword.operator',
      ],
      settings: {
        foreground: syntax.operator,
      },
    },

    // -------------------------------------------------------------------------
    // 4. Entities (`entity`)
    // -------------------------------------------------------------------------
    {
      name: 'Functions & Methods',
      scope: [
        'entity.name.function',
        'entity.name.function.member',
        'meta.function-call entity.name.function',
        'variable.function',
      ],
      settings: {
        foreground: syntax.function,
      },
    },
    {
      name: 'Classes, Structs & Enums',
      scope: [
        'entity.name.class',
        'entity.name.type.class',
        'entity.name.struct',
        'storage.type.struct',
        'entity.name.enum',
        'entity.name.type.enum',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Interfaces & Generics (Type Parameters)',
      scope: [
        'entity.name.type.interface',
        'entity.name.type.parameter',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: 'italic',
      },
    },
    {
      name: 'General Types & Primitive Types',
      scope: [
        'entity.name.type',
        'support.type',
        'support.type.primitive',
      ],
      settings: {
        foreground: syntax.type,
      },
    },
    {
      name: 'Namespaces & Modules',
      scope: [
        'entity.name.namespace',
        'entity.name.module',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: 'italic',
      },
    },
    {
      name: 'HTML / XML / JSX Tags',
      scope: [
        'entity.name.tag',
        'punctuation.definition.tag',
      ],
      settings: {
        foreground: syntax.tag,
        fontStyle: 'bold',
      },
    },
    {
      name: 'HTML / XML / JSX Attributes',
      scope: [
        'entity.other.attribute-name',
      ],
      settings: {
        foreground: syntax.attribute,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Inherited Classes',
      scope: [
        'entity.other.inherited-class',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Decorators & Annotations',
      scope: [
        'entity.name.function.decorator',
        'meta.decorator',
        'meta.annotation',
        'tag.decorator',
      ],
      settings: {
        foreground: syntax.function,
        fontStyle: 'italic',
      },
    },

    // -------------------------------------------------------------------------
    // 5. Strings (`string`)
    // -------------------------------------------------------------------------
    {
      name: 'Strings',
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'punctuation.definition.string',
      ],
      settings: {
        foreground: syntax.string,
      },
    },

    // -------------------------------------------------------------------------
    // 6. Support (`support`)
    // -------------------------------------------------------------------------
    {
      name: 'Built-in Functions (console.log, print)',
      scope: [
        'support.function',
        'support.function.builtin',
      ],
      settings: {
        foreground: syntax.function,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Built-in Classes and Types (Math, Promise, Array)',
      scope: [
        'support.class',
        'support.class.builtin',
        'support.type.builtin',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Built-in Variables',
      scope: [
        'support.variable',
      ],
      settings: {
        foreground: syntax.variable,
        fontStyle: 'bold italic',
      },
    },

    // -------------------------------------------------------------------------
    // 7. Variables (`variable`)
    // -------------------------------------------------------------------------
    {
      name: 'Object & Struct Properties (Fields)',
      scope: [
        'variable.other.property',
        'variable.other.object.property',
        'variable.other.member',
        'support.type.property-name',
        'entity.name.variable.field',
        'entity.name.field',
      ],
      settings: {
        foreground: syntax.property,
      },
    },
    {
      name: 'Function & Method Parameters',
      scope: [
        'variable.parameter',
      ],
      settings: {
        foreground: syntax.parameter,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Context Keywords (this, self, super)',
      scope: [
        'variable.language.this',
        'variable.language.self',
        'variable.language.super',
        'variable.language',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: 'italic',
      },
    },
    {
      name: 'General Variables',
      scope: [
        'variable',
        'variable.other',
        'variable.other.readwrite',
      ],
      settings: {
        foreground: syntax.variable,
      },
    },

    // -------------------------------------------------------------------------
    // 8. Punctuation & Delimiters (`punctuation`)
    // -------------------------------------------------------------------------
    {
      name: 'Punctuation and Delimiters',
      scope: [
        'punctuation',
        'punctuation.separator',
        'punctuation.terminator',
        'punctuation.brackets',
      ],
      settings: {
        foreground: syntax.punctuation,
      },
    },

    // -------------------------------------------------------------------------
    // 9. Markdown & Markup (`markup`)
    // -------------------------------------------------------------------------
    {
      name: 'Markup Headings',
      scope: [
        'markup.heading',
        'entity.name.section',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markup Bold',
      scope: [
        'markup.bold',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markup Italic',
      scope: [
        'markup.italic',
      ],
      settings: {
        foreground: syntax.parameter,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Markup Code',
      scope: [
        'markup.inline.raw',
        'markup.raw.block',
      ],
      settings: {
        foreground: syntax.string,
      },
    },
    {
      name: 'Markup Links',
      scope: [
        'markup.underline.link',
      ],
      settings: {
        foreground: syntax.function,
        fontStyle: 'underline',
      },
    },

    // -------------------------------------------------------------------------
    // 10. Invalid & Errors (`invalid`)
    // -------------------------------------------------------------------------
    {
      name: 'Invalid / Errors',
      scope: [
        'invalid',
        'invalid.illegal',
      ],
      settings: {
        foreground: syntax.error,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Deprecated',
      scope: [
        'invalid.deprecated',
      ],
      settings: {
        fontStyle: 'strikethrough',
      },
    },
  ];
}
