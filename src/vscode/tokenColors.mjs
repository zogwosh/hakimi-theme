// Aligned with catppuccin-vsc/src/theme/tokenColors.ts & tokens/
// Preserves Hakimi deuteranopia-safe TextMate scopes and font-style cues.
export const getTokenColors = (context) => {
  const { palette } = context;

  return [
    {
      name: 'Comments',
      scope: ['comment', 'punctuation.definition.comment', 'unused'],
      settings: {
        foreground: palette.overlay2,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Documentation Tags',
      scope: [
        'entity.name.tag.documentation',
        'storage.type.class.jsdoc',
        'keyword.other.documentation',
      ],
      settings: {
        foreground: palette.overlay2,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Strings',
      scope: ['string', 'punctuation.definition.string', 'string.template'],
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Escape Characters, Regex & Format Placeholders',
      scope: [
        'constant.character.escape',
        'string.regexp',
        'constant.other.placeholder',
        'punctuation.definition.template-expression',
        'constant.character.format.placeholder.other.python',
      ],
      settings: {
        foreground: palette.green,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Keywords & Control',
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.word',
        'storage.type',
        'storage.modifier',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Language Modifiers, Self/This & Lifetimes',
      scope: [
        'variable.language.this',
        'variable.language.self',
        'variable.language.super',
        'variable.language.special.self',
        'variable.parameter.function.language.special.self.python',
        'variable.parameter.function.language.special.cls.python',
        'storage.modifier.async',
        'storage.modifier.mut.rust',
        'storage.modifier.lifetime.rust',
        'entity.name.lifetime.rust',
        'storage.modifier.static.java',
        'storage.modifier.final.java',
        'storage.modifier.abstract.java',
        'storage.modifier.synchronized.java',
        'keyword.operator.expression.typeof',
        'keyword.operator.expression.keyof',
        'keyword.operator.expression.readonly',
        'storage.type.function.lambda.python',
        'keyword.other.fn.rust',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Built-in Classes & Primitives',
      scope: [
        'support.class.builtin',
        'support.type.builtin',
        'support.type.primitive',
        'support.function.builtin',
        'storage.type.built-in',
        'storage.type.primitive',
        'storage.type.primitive.java',
        'storage.type.numeric.go',
        'storage.type.string.go',
        'storage.type.boolean.go',
        'storage.type.error.go',
        'storage.type.byte.go',
        'storage.type.rune.go',
        'storage.type.uintptr.go',
        'storage.type.primitive.rust',
        'support.type.core.rust',
        'support.class.js',
        'support.class.ts',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'HTML/XML Tags',
      scope: ['entity.name.tag'],
      settings: {
        foreground: palette.mauve,
        fontStyle: '',
      },
    },
    {
      name: 'Namespaces, Packages & Modules',
      scope: [
        'entity.name.namespace',
        'entity.name.scope-resolution',
        'support.type.namespace',
        'entity.name.package.go',
        'entity.name.namespace.rust',
        'storage.modifier.package.java',
        'storage.modifier.import.java',
        'entity.name.type.module',
        'support.other.namespace',
      ],
      settings: {
        foreground: palette.green,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Functions & Methods',
      scope: [
        'entity.name.function',
        'support.function',
        'variable.function',
        'meta.function-call entity.name.function',
        'entity.name.function.member',
        'variable.function.member',
        'support.function.member',
      ],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Components, Constructors & Magic Methods',
      scope: [
        'support.class.component',
        'support.class.component.jsx',
        'support.class.component.tsx',
        'support.class.component.vue',
        'support.function.magic.python',
        'entity.name.function.constructor',
        'entity.name.type.enum-variant.rust',
      ],
      settings: {
        foreground: palette.blue,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Numbers & Booleans',
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.language.boolean',
        'constant.character',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Classes, Structs, Enums & Constants',
      scope: [
        'entity.name.type.class',
        'entity.name.class',
        'entity.name.type.struct',
        'entity.name.type.enum',
        'entity.name.struct',
        'entity.name.enum',
        'variable.other.constant',
        'variable.other.enummember',
        'constant.other',
        'constant.other.enum',
        'constant.other.caps',
      ],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Types, Interfaces, Traits & Type Parameters',
      scope: [
        'entity.name.type',
        'entity.name.type.interface',
        'entity.name.type.trait',
        'entity.name.type.parameter',
        'entity.name.interface',
        'entity.name.trait',
        'entity.name.impl',
        'entity.name.type.alias',
        'support.type',
        'entity.name.type.go',
        'entity.name.type.rust',
      ],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Macros, Decorators & Annotations',
      scope: [
        'entity.name.function.macro',
        'entity.name.function.macro.rust',
        'entity.name.other.preprocessor.macro',
        'meta.preprocessor',
        'keyword.control.directive',
        'punctuation.definition.decorator',
        'entity.name.function.decorator',
        'storage.type.annotation',
        'punctuation.definition.annotation',
        'meta.attribute.rust',
      ],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Variables & Properties',
      scope: [
        'variable',
        'variable.other',
        'variable.other.readwrite',
        'variable.other.property',
        'variable.other.object.property',
        'support.variable.property',
      ],
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Function Parameters & HTML/JSX Attributes',
      scope: [
        'variable.parameter',
        'meta.parameter',
        'entity.other.attribute-name',
        'entity.other.attribute-name.jsx',
        'entity.other.attribute-name.tsx',
        'entity.other.attribute-name.html',
      ],
      settings: {
        foreground: palette.text,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Tag & General Punctuation',
      scope: [
        'punctuation.definition.tag',
        'punctuation.separator',
        'punctuation.terminator',
        'punctuation.accessor',
      ],
      settings: {
        foreground: palette.overlay2,
        fontStyle: '',
      },
    },
    {
      name: 'Parentheses, Brackets, Braces',
      scope: 'punctuation',
      settings: {
        foreground: palette.overlay2,
        fontStyle: '',
      },
    },
    {
      name: 'Errors',
      scope: ['invalid', 'invalid.illegal'],
      settings: {
        foreground: palette.red,
        fontStyle: 'bold underline',
      },
    },
    {
      name: 'Booleans, constants, numbers',
      scope: [
        'entity.name.constant',
        'constant.language.boolean',
        'constant.language.false',
        'constant.language.true',
        'keyword.other.unit.user-defined',
        'keyword.other.unit.suffix.floating-point',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: [
        'keyword.operator.word',
        'keyword.operator.new',
        'variable.language.super',
        'punctuation.definition.keyword',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Punctuation',
      scope: [
        'punctuation.accessor',
        'punctuation.definition.generic',
        'meta.function.closure punctuation.section.parameters',
        'punctuation.separator.key-value',
      ],
      settings: {
        foreground: palette.overlay2,
        fontStyle: '',
      },
    },
    {
      scope: ['meta.function-call.method', 'support.function.misc'],
      settings: {
        foreground: palette.blue,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Classes',
      scope: ['entity.other.inherited-class', 'meta.function-call.constructor'],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Enum member',
      scope: 'meta.enum variable.other.readwrite',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Types',
      scope: ['meta.type', 'meta.type-alias'],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Decorators',
      scope: [
        'meta.annotation variable.function',
        'meta.annotation variable.annotation.function',
        'meta.annotation punctuation.definition.annotation',
        'meta.decorator',
        'punctuation.decorator',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: 'meta.function.parameters',
      settings: {
        foreground: palette.text,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Built-ins',
      scope: 'support.function.builtin',
      settings: {
        foreground: palette.red,
      },
    },
    {
      scope: 'entity.other.attribute-name.documentation',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Preprocessor directives',
      scope: 'punctuation.definition.directive',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Property names (left hand assignments in json/yaml/css/less)',
      scope: 'support.type.property-name.less',
      settings: {
        foreground: palette.blue,
        fontStyle: '',
      },
    },
    {
      name: 'This/Self keyword',
      scope: [
        'variable.language.this',
        'variable.language.this punctuation.definition.variable',
      ],
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Object properties',
      scope: 'variable.object.property',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'String template interpolation',
      scope: ['string.template variable', 'string variable'],
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: '`new` as bold',
      scope: 'keyword.operator.new',
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      name: 'C++ extern keyword',
      scope: 'storage.modifier.specifier.extern.cpp',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'C++ scope resolution',
      scope: [
        'entity.name.scope-resolution.template.call.cpp',
        'entity.name.scope-resolution.parameter.cpp',
        'entity.name.scope-resolution.cpp',
        'entity.name.scope-resolution.function.definition.cpp',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'C++ doc keywords',
      scope: 'storage.type.class.doxygen',
      settings: {
        fontStyle: '',
      },
    },
    {
      name: 'C++ operators',
      scope: 'storage.modifier.reference.cpp',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'C# Interpolated Strings',
      scope: 'meta.interpolation.cs',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'C# xml-style docs',
      scope: 'comment.block.documentation.cs',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Classes, reflecting the className color in JSX',
      scope: [
        'source.css entity.other.attribute-name.class.css',
        'entity.other.attribute-name.parent-selector.css punctuation.definition.entity.css',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Operators',
      scope: 'punctuation.separator.operator.css',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Pseudo classes',
      scope: 'source.css entity.other.attribute-name.pseudo-class',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      scope: 'source.css constant.other.unicode-range',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: 'source.css variable.parameter.url',
      settings: {
        foreground: palette.green,
        fontStyle: '',
      },
    },
    {
      name: 'CSS vendored property names',
      scope: 'support.type.vendored.property-name',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Less/SCSS right-hand variables (@/$-prefixed)',
      scope: [
        'source.css meta.property-value variable',
        'source.css meta.property-value variable.other.less',
        'source.css meta.property-value variable.other.less punctuation.definition.variable.less',
        'meta.definition.variable.scss',
      ],
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'CSS variables (--prefixed)',
      scope: [
        'source.css meta.property-list variable',
        'meta.property-list variable.other.less',
        'meta.property-list variable.other.less punctuation.definition.variable.less',
      ],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'CSS Percentage values, styled the same as numbers',
      scope: 'keyword.other.unit.percentage.css',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'CSS Attribute selectors, styled the same as strings',
      scope: 'source.css meta.attribute-selector',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'JSON/YAML keys, other left-hand assignments',
      scope: [
        'keyword.other.definition.ini',
        'punctuation.support.type.property-name.json',
        'punctuation.support.type.property-name.toml',
        'punctuation.support.type.property-name.yaml',
      ],
      settings: {
        foreground: palette.blue,
        fontStyle: '',
      },
    },
    {
      name: 'JSON/YAML constants',
      scope: ['constant.language.json', 'constant.language.yaml'],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'YAML anchors',
      scope: ['entity.name.type.anchor.yaml', 'variable.other.alias.yaml'],
      settings: {
        foreground: palette.yellow,
        fontStyle: '',
      },
    },
    {
      name: 'TOML tables / ini groups',
      scope: [
        'support.type.property-name.table',
        'entity.name.section.group-title.ini',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'TOML dates',
      scope: 'constant.other.time.datetime.offset.toml',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'YAML anchor puctuation',
      scope: [
        'punctuation.definition.anchor.yaml',
        'punctuation.definition.alias.yaml',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'YAML triple dashes',
      scope: 'entity.other.document.begin.yaml',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markup Diff',
      scope: 'markup.changed.diff',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Diff',
      scope: [
        'meta.diff.header.from-file',
        'meta.diff.header.to-file',
        'punctuation.definition.from-file.diff',
        'punctuation.definition.to-file.diff',
      ],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Diff Inserted',
      scope: 'markup.inserted.diff',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Diff Deleted',
      scope: 'markup.deleted.diff',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'dotenv left-hand side assignments',
      scope: 'variable.other.env',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'dotenv reference to existing env variable',
      scope: 'string.quoted variable.other.env',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'GDScript functions',
      scope: 'support.function.builtin.gdscript',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'GDScript constants',
      scope: 'constant.language.gdscript',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Comment keywords',
      scope: 'comment meta.annotation.go',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'go:embed, go:build, etc.',
      scope: 'comment meta.annotation.parameters.go',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Go constants (nil, true, false)',
      scope: 'constant.language.go',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'GraphQL variables',
      scope: 'variable.graphql',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'GraphQL aliases',
      scope: 'string.unquoted.alias.graphql',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'GraphQL enum members',
      scope: 'constant.character.enum.graphql',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'GraphQL field in types',
      scope:
        'meta.objectvalues.graphql constant.object.key.graphql string.unquoted.graphql',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'data constructors',
      scope: [
        'meta.declaration.data constant.other.haskell',
        'constant.other.haskell',
        'meta.declaration.pattern constant.other.haskell',
        'constant.language.unit.haskell punctuation',
        'constant.language.unit.unboxed.haskell punctuation',
      ],
      settings: {
        foreground: palette.blue,
        fontStyle: '',
      },
    },
    {
      name: 'types',
      scope: 'storage.type.haskell',
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: '`()` unit type (not italicized)',
      scope: [
        'support.constant.unit.haskell punctuation',
        'support.constant.unit.haskell keyword.operator.hash',
        'support.constant.unit.unboxed.haskell punctuation',
        'support.constant.unit.unboxed.haskell keyword.operator.hash',
      ],
      settings: {
        foreground: palette.yellow,
        fontStyle: '',
      },
    },
    {
      name: 'type parameters',
      scope: 'variable.other.generic-type.haskell',
      settings: {
        foreground: palette.text,
        fontStyle: '',
      },
    },
    {
      name: 'special words (builtin constants-like)',
      scope: [
        'keyword.other.default.haskell',
        'keyword.other.role.nominal.haskell',
        'keyword.other.role.representational.haskell',
        'keyword.other.role.phantom.haskell',
      ],
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'pragma specifiers',
      scope: [
        'keyword.other.preprocessor.haskell',
        'keyword.other.preprocessor.pragma.haskell',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'pragma arguments',
      scope: 'keyword.other.preprocessor.extension.haskell',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'C preprocessor directives',
      scope: [
        'source.haskell meta.preprocessor.c',
        'source.haskell meta.preprocessor.c punctuation.definition.preprocessor.c',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Haskell preprocessor directives',
      scope: 'meta.preprocessor.haskell',
      settings: {
        foreground: palette.overlay0,
      },
    },
    {
      name: 'getters in data constructors/records',
      scope: [
        'variable.other.member.haskell',
        'variable.other.member.definition.haskell',
      ],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: 'fix else keyword',
      scope: 'keyword.control.else.haskell',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'char literals (are enum variants)',
      scope: [
        'string.quoted.single.haskell',
        'string.quoted.single.haskell punctuation.definition.string',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'operators',
      scope: [
        'storage.type.operator.haskell',
        'storage.type.operator.infix.haskell',
        'entity.name.function.infix.haskell',
        'punctuation.backtick.haskell',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'the , in `(,)`',
      scope: [
        'support.constant.tuple.haskell',
        'support.constant.tuple.unboxed.haskell',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'a few special symbols',
      scope: [
        'keyword.operator.lambda.haskell',
        'keyword.operator.pipe.haskell',
        'keyword.operator.double-dot.haskell',
        'variable.other.member.wildcard.haskell',
      ],
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'delimiter-like',
      scope: [
        'meta.type-application keyword.operator.prefix.at.haskell',
        'keyword.operator.infix.tight.at.haskell',
        'keyword.operator.prefix.tilde.haskell',
        'keyword.operator.prefix.bang.haskell',
        'keyword.operator.double-colon.haskell',
        'keyword.operator.big-arrow.haskell',
        'meta.function.type-declaration keyword.operator.period.haskell',
        'meta.type-declaration keyword.operator.period.haskell',
        'meta.declaration.type keyword.operator.period.haskell',
      ],
      settings: {
        foreground: palette.overlay0,
        fontStyle: '',
      },
    },
    {
      name: 'TemplateHaskell and QuasiQuoter (macros)',
      scope: [
        'keyword.operator.prefix.dollar.haskell',
        'keyword.operator.quasi-quotation.begin.haskell',
        'keyword.operator.quasi-quotation.end.haskell',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'minus sign in negative num literals',
      scope: 'keyword.operator.prefix.minus.haskell',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'HTML/XML DOCTYPE as keyword',
      scope: [
        'keyword.other.doctype',
        'meta.tag.sgml.doctype punctuation.definition.tag',
        'meta.tag.metadata.doctype entity.name.tag',
        'meta.tag.metadata.doctype punctuation.definition.tag',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Special characters like &amp;',
      scope: [
        'text.html constant.character.entity',
        'text.html constant.character.entity punctuation',
        'constant.character.entity.xml',
        'constant.character.entity.xml punctuation',
        'constant.character.entity.js.jsx',
        'constant.charactger.entity.js.jsx punctuation',
        'constant.character.entity.tsx',
        'constant.character.entity.tsx punctuation',
      ],
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Components',
      scope: [
        'support.class.component',
        'support.class.component.jsx',
        'support.class.component.tsx',
        'support.class.component.vue',
      ],
      settings: {
        foreground: palette.blue,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Annotations',
      scope: ['punctuation.definition.annotation', 'storage.type.annotation'],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Java enums',
      scope: 'constant.other.enum.java',
      settings: {
        foreground: palette.yellow,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Java imports',
      scope: 'storage.modifier.import.java',
      settings: {
        foreground: palette.green,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Javadoc',
      scope:
        'comment.block.javadoc.java keyword.other.documentation.javadoc.java',
      settings: {
        fontStyle: '',
      },
    },
    {
      name: 'Exported Variable',
      scope: 'meta.export variable.other.readwrite.js',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'JS/TS constants & properties',
      scope: [
        'variable.other.constant.js',
        'variable.other.constant.ts',
        'variable.other.property.js',
        'variable.other.property.ts',
      ],
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'JSDoc; these are mainly params, so styled as such',
      scope: [
        'variable.other.jsdoc',
        'comment.block.documentation variable.other',
      ],
      settings: {
        foreground: palette.text,
        fontStyle: '',
      },
    },
    {
      name: 'JSDoc keywords',
      scope: 'storage.type.class.jsdoc',
      settings: {
        fontStyle: '',
      },
    },
    {
      scope: 'support.type.object.console.js',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Node constants as keywords (module, etc.)',
      scope: ['support.constant.node', 'support.type.object.module.js'],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'implements as keyword',
      scope: 'storage.modifier.implements',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Builtin types',
      scope: [
        'constant.language.null.js',
        'constant.language.null.ts',
        'constant.language.undefined.js',
        'constant.language.undefined.ts',
        'support.type.builtin.ts',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      scope: 'variable.parameter.generic',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Arrow functions',
      scope: [
        'keyword.declaration.function.arrow.js',
        'storage.type.function.arrow.ts',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Decorator punctuations (decorators inherit from blue functions, instead of styleguide peach)',
      scope: 'punctuation.decorator.ts',
      settings: {
        foreground: palette.blue,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Extra JS/TS keywords',
      scope: [
        'keyword.operator.expression.in.js',
        'keyword.operator.expression.in.ts',
        'keyword.operator.expression.infer.ts',
        'keyword.operator.expression.instanceof.js',
        'keyword.operator.expression.instanceof.ts',
        'keyword.operator.expression.is',
        'keyword.operator.expression.keyof.ts',
        'keyword.operator.expression.of.js',
        'keyword.operator.expression.of.ts',
        'keyword.operator.expression.typeof.ts',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Julia macros',
      scope: 'support.function.macro.julia',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'italic bold',
      },
    },
    {
      name: 'Julia language constants (true, false)',
      scope: 'constant.language.julia',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Julia other constants (these seem to be arguments inside arrays)',
      scope: 'constant.other.symbol.julia',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'LaTeX preamble',
      scope: 'text.tex keyword.control.preamble',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'LaTeX be functions',
      scope: 'text.tex support.function.be',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'LaTeX math',
      scope: 'constant.other.general.math.tex',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Liquid Builtin Objects & User Defined Variables',
      scope: 'variable.language.liquid',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Lua docstring keywords',
      scope:
        'comment.line.double-dash.documentation.lua storage.type.annotation.lua',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Lua docstring variables',
      scope: [
        'comment.line.double-dash.documentation.lua entity.name.variable.lua',
        'comment.line.double-dash.documentation.lua variable.lua',
      ],
      settings: {
        foreground: palette.text,
      },
    },
    {
      scope: [
        'heading.1.markdown punctuation.definition.heading.markdown',
        'heading.1.markdown',
        'heading.1.quarto punctuation.definition.heading.quarto',
        'heading.1.quarto',
        'markup.heading.atx.1.mdx',
        'markup.heading.atx.1.mdx punctuation.definition.heading.mdx',
        'markup.heading.setext.1.markdown',
        'markup.heading.heading-0.asciidoc',
      ],
      settings: {
        foreground: palette.red,
      },
    },
    {
      scope: [
        'heading.2.markdown punctuation.definition.heading.markdown',
        'heading.2.markdown',
        'heading.2.quarto punctuation.definition.heading.quarto',
        'heading.2.quarto',
        'markup.heading.atx.2.mdx',
        'markup.heading.atx.2.mdx punctuation.definition.heading.mdx',
        'markup.heading.setext.2.markdown',
        'markup.heading.heading-1.asciidoc',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: [
        'heading.3.markdown punctuation.definition.heading.markdown',
        'heading.3.markdown',
        'heading.3.quarto punctuation.definition.heading.quarto',
        'heading.3.quarto',
        'markup.heading.atx.3.mdx',
        'markup.heading.atx.3.mdx punctuation.definition.heading.mdx',
        'markup.heading.heading-2.asciidoc',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: [
        'heading.4.markdown punctuation.definition.heading.markdown',
        'heading.4.markdown',
        'heading.4.quarto punctuation.definition.heading.quarto',
        'heading.4.quarto',
        'markup.heading.atx.4.mdx',
        'markup.heading.atx.4.mdx punctuation.definition.heading.mdx',
        'markup.heading.heading-3.asciidoc',
      ],
      settings: {
        foreground: palette.green,
      },
    },
    {
      scope: [
        'heading.5.markdown punctuation.definition.heading.markdown',
        'heading.5.markdown',
        'heading.5.quarto punctuation.definition.heading.quarto',
        'heading.5.quarto',
        'markup.heading.atx.5.mdx',
        'markup.heading.atx.5.mdx punctuation.definition.heading.mdx',
        'markup.heading.heading-4.asciidoc',
      ],
      settings: {
        foreground: palette.green,
      },
    },
    {
      scope: [
        'heading.6.markdown punctuation.definition.heading.markdown',
        'heading.6.markdown',
        'heading.6.quarto punctuation.definition.heading.quarto',
        'heading.6.quarto',
        'markup.heading.atx.6.mdx',
        'markup.heading.atx.6.mdx punctuation.definition.heading.mdx',
        'markup.heading.heading-5.asciidoc',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      scope: 'markup.bold',
      settings: {
        foreground: palette.red,
        fontStyle: 'bold',
      },
    },
    {
      scope: 'markup.italic',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      scope: 'markup.strikethrough',
      settings: {
        foreground: palette.overlay0,
        fontStyle: 'strikethrough',
      },
    },
    {
      name: 'Markdown auto links',
      scope: ['punctuation.definition.link', 'markup.underline.link'],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Markdown links',
      scope: [
        'text.html.markdown punctuation.definition.link.title',
        'text.html.quarto punctuation.definition.link.title',
        'string.other.link.title.markdown',
        'string.other.link.title.quarto',
        'markup.link',
        'punctuation.definition.constant.markdown',
        'punctuation.definition.constant.quarto',
        'constant.other.reference.link.markdown',
        'constant.other.reference.link.quarto',
        'markup.substitution.attribute-reference',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Markdown code spans',
      scope: [
        'punctuation.definition.raw.markdown',
        'punctuation.definition.raw.quarto',
        'markup.inline.raw.string.markdown',
        'markup.inline.raw.string.quarto',
        'markup.raw.block.markdown',
        'markup.raw.block.quarto',
      ],
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Markdown triple backtick language identifier',
      scope: 'fenced_code.block.language',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Markdown triple backticks',
      scope: [
        'markup.fenced_code.block punctuation.definition',
        'markup.raw support.asciidoc',
      ],
      settings: {
        foreground: palette.overlay0,
      },
    },
    {
      name: 'Markdown quotes',
      scope: ['markup.quote', 'punctuation.definition.quote.begin'],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown separators',
      scope: 'meta.separator.markdown',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown list bullets',
      scope: [
        'punctuation.definition.list.begin.markdown',
        'punctuation.definition.list.begin.quarto',
        'markup.list.bullet',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Quarto headings',
      scope: 'markup.heading.quarto',
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      name: 'Nix attribute names',
      scope: [
        'entity.other.attribute-name.multipart.nix',
        'entity.other.attribute-name.single.nix',
      ],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Nix parameter names',
      scope: 'variable.parameter.name.nix',
      settings: {
        foreground: palette.text,
        fontStyle: '',
      },
    },
    {
      name: 'Nix interpolated parameter names',
      scope: 'meta.embedded variable.parameter.name.nix',
      settings: {
        foreground: palette.yellow,
        fontStyle: '',
      },
    },
    {
      name: 'Nix paths',
      scope: 'string.unquoted.path.nix',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'PHP Attributes',
      scope: ['support.attribute.builtin', 'meta.attribute.php'],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'PHP Parameters (needed for the leading dollar sign)',
      scope: 'meta.function.parameters.php punctuation.definition.variable.php',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'PHP Constants (null, __FILE__, etc.)',
      scope: 'constant.language.php',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'PHP functions',
      scope: 'text.html.php support.function',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'PHPdoc keywords',
      scope: 'keyword.other.phpdoc.php',
      settings: {
        fontStyle: '',
      },
    },
    {
      name: 'Python argument functions reset to text, otherwise they inherit blue from function-call',
      scope: [
        'support.variable.magic.python',
        'meta.function-call.arguments.python',
      ],
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Python double underscore functions',
      scope: 'support.function.magic.python',
      settings: {
        foreground: palette.green,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Python `self` keyword',
      scope: [
        'variable.parameter.function.language.special.self.python',
        'variable.language.special.self.python',
      ],
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'python keyword flow/logical (for ... in)',
      scope: ['keyword.control.flow.python', 'keyword.operator.logical.python'],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'python storage type',
      scope: 'storage.type.function.python',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'python function support',
      scope: [
        'support.token.decorator.python',
        'meta.function.decorator.identifier.python',
      ],
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'python function calls',
      scope: 'meta.function-call.python',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'python function decorators',
      scope: [
        'entity.name.function.decorator.python',
        'punctuation.definition.decorator.python',
      ],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: 'python placeholder reset to normal string',
      scope: 'constant.character.format.placeholder.other.python',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Python exception & builtins such as exit()',
      scope: [
        'support.type.exception.python',
        'support.function.builtin.python',
      ],
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'entity.name.type',
      scope: 'support.type.python',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'python constants (True/False)',
      scope: 'constant.language.python',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Arguments accessed later in the function body',
      scope: ['meta.indexed-name.python', 'meta.item-access.python'],
      settings: {
        foreground: palette.text,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Python f-strings/binary/unicode storage types',
      scope: 'storage.type.string.python',
      settings: {
        foreground: palette.green,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Python type hints',
      scope: 'meta.function.parameters.python',
      settings: {
        fontStyle: '',
      },
    },
    {
      name: 'R function calls',
      scope: 'meta.function-call.r',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'R function call arguments',
      scope: 'meta.function-call.arguments.r',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Regex string begin/end in JS/TS',
      scope: [
        'string.regexp punctuation.definition.string.begin',
        'string.regexp punctuation.definition.string.end',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Regex anchors (^, $)',
      scope: 'keyword.control.anchor.regexp',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Regex regular string match',
      scope: 'string.regexp.ts',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Regex group parenthesis & backreference (\\1, \\2, \\3, ...)',
      scope: [
        'punctuation.definition.group.regexp',
        'keyword.other.back-reference.regexp',
      ],
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Regex character class []',
      scope: 'punctuation.definition.character-class.regexp',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Regex character classes (\\d, \\w, \\s)',
      scope: 'constant.other.character-class.regexp',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Regex range',
      scope: 'constant.other.character-class.range.regexp',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Regex quantifier',
      scope: 'keyword.operator.quantifier.regexp',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Regex constant/numeric',
      scope: 'constant.character.numeric.regexp',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Regex lookaheads, negative lookaheads, lookbehinds, negative lookbehinds',
      scope: [
        'punctuation.definition.group.no-capture.regexp',
        'meta.assertion.look-ahead.regexp',
        'meta.assertion.negative-look-ahead.regexp',
      ],
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Rust attribute',
      scope: [
        'meta.annotation.rust',
        'meta.annotation.rust punctuation',
        'meta.attribute.rust',
        'punctuation.definition.attribute.rust',
      ],
      settings: {
        foreground: palette.yellow,
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Rust attribute strings',
      scope: [
        'meta.attribute.rust string.quoted.double.rust',
        'meta.attribute.rust string.quoted.single.char.rust',
      ],
      settings: {
        fontStyle: '',
      },
    },
    {
      name: 'Rust keyword',
      scope: [
        'entity.name.function.macro.rules.rust',
        'storage.type.module.rust',
        'storage.modifier.rust',
        'storage.type.struct.rust',
        'storage.type.enum.rust',
        'storage.type.trait.rust',
        'storage.type.union.rust',
        'storage.type.impl.rust',
        'storage.type.rust',
        'storage.type.function.rust',
        'storage.type.type.rust',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Rust u/i32, u/i64, etc.',
      scope: 'entity.name.type.numeric.rust',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Rust generic',
      scope: 'meta.generic.rust',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Rust impl',
      scope: 'entity.name.impl.rust',
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Rust module',
      scope: 'entity.name.module.rust',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Rust trait',
      scope: 'entity.name.trait.rust',
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Rust struct',
      scope: 'storage.type.source.rust',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Rust union',
      scope: 'entity.name.union.rust',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Rust enum member',
      scope: 'meta.enum.rust storage.type.source.rust',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Rust macro',
      scope: [
        'support.macro.rust',
        'meta.macro.rust support.function.rust',
        'entity.name.function.macro.rust',
      ],
      settings: {
        foreground: palette.blue,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Rust lifetime',
      scope: ['storage.modifier.lifetime.rust', 'entity.name.type.lifetime'],
      settings: {
        foreground: palette.blue,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Rust string formatting',
      scope: 'string.quoted.double.rust constant.other.placeholder.rust',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Rust return type generic',
      scope:
        'meta.function.return-type.rust meta.generic.rust storage.type.rust',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Rust functions',
      scope: 'meta.function.call.rust',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Rust angle brackets',
      scope: 'punctuation.brackets.angle.rust',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Rust constants',
      scope: 'constant.other.caps.rust',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Rust function parameters',
      scope: 'meta.function.definition.rust variable.other.rust',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Rust closure variables',
      scope: 'meta.function.call.rust variable.other.rust',
      settings: {
        foreground: palette.text,
      },
    },
    {
      name: 'Rust self',
      scope: 'variable.language.self.rust',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Rust metavariable names',
      scope: [
        'variable.other.metavariable.name.rust',
        'meta.macro.metavariable.rust keyword.operator.macro.dollar.rust',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Shell shebang',
      scope: [
        'comment.line.shebang',
        'comment.line.shebang punctuation.definition.comment',
        'comment.line.shebang',
        'punctuation.definition.comment.shebang.shell',
        'meta.shebang.shell',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'italic bold',
      },
    },
    {
      name: 'Shell shebang command',
      scope: 'comment.line.shebang constant.language',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'italic bold',
      },
    },
    {
      name: 'Shell interpolated command',
      scope: [
        'meta.function-call.arguments.shell punctuation.definition.variable.shell',
        'meta.function-call.arguments.shell punctuation.section.interpolation',
        'meta.function-call.arguments.shell punctuation.definition.variable.shell',
        'meta.function-call.arguments.shell punctuation.section.interpolation',
      ],
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Shell interpolated command variable',
      scope:
        'meta.string meta.interpolation.parameter.shell variable.other.readwrite',
      settings: {
        foreground: palette.yellow,
        fontStyle: 'italic',
      },
    },
    {
      scope: [
        'source.shell punctuation.section.interpolation',
        'punctuation.definition.evaluation.backticks.shell',
      ],
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Shell EOF',
      scope: 'entity.name.tag.heredoc.shell',
      settings: {
        foreground: palette.mauve,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Shell quoted variable',
      scope: 'string.quoted.double.shell variable.other.normal.shell',
      settings: {
        foreground: palette.text,
      },
    },
    {
      scope: 'markup.heading.typst',
      settings: {
        foreground: palette.red,
      },
    },
  ];
};
