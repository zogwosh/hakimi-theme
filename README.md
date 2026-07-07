# Hakimi Colorblindness Safe Theme

> **本主题专为绿色盲（Deuteranopia / Green-blindness）的实际编程体验设计。**

Accessible VS Code and Zed themes whose syntax palette is optimized specifically
for **deuteranopia**. The shipped variants are:

- **Hakimi Deuteranopia Light** — for light editor backgrounds.
- **Hakimi Deuteranopia Dark** — for dark editor backgrounds.

## Design Principle

A deuteranope has little useful red-green discrimination. This theme therefore
does not use red-vs-green hue as a primary distinction. Token roles are separated
with the channels that remain useful:

- **Luminance**
- **Blue/yellow direction**
- **Neutral grey levels**
- **Font style and decoration**

The syntax palette uses two chromatic families plus neutrals:

- **Cool family:** keywords, tags, built-ins, strings
- **Warm family:** functions, types, classes, numbers, constants, enums
- **Neutral:** variables, properties, parameters, comments

Important semantic states have redundant non-color cues. Keywords are **bold**,
comments are *italic*, and errors are **bold + underlined**. Error, warning,
success, and diff colors must not be interpreted by hue alone.

Semantic highlighting and TextMate scopes are kept on one shared palette, so
colors do not jump when a language server attaches.

## Verification

`npm test` validates the generated VS Code and Zed themes in the simulated
deuteranope's perceived space. The core audit deliberately does not use WCAG 2.x
contrast ratio as the design algorithm.

The deuteranopia pipeline is explicit:

```text
sRGB hex -> alpha blend when needed -> linear RGB -> LMS deutan projection
-> linear RGB -> sRGB hex
```

The simulated colors are then checked with:

1. **Readability:** APCA Lc on simulated foreground/background pairs.
   Regular syntax text must clear Lc >= 60, bold syntax may use Lc >= 50,
   comments may use Lc >= 45, and UI/terminal text must clear Lc >= 45.
2. **Role separation:** OKLab dE on simulated syntax role pairs.
   Simultaneously visible non-error roles must clear dEok >= 0.10. Error keeps
   a lower color-distance floor because it is also bold and underlined.
3. **Runtime coverage:** VS Code syntax, VS Code UI states, terminal ANSI colors,
   git/diff decorations, and Zed syntax are audited from generated theme files.
4. **Consistency:** each role's semantic-token color matches its TextMate fallback.

## Syntax Palette

| Role | Dark | Light |
| --- | --- | --- |
| Keyword / tag / built-in (bold) | `#7ab2ff` | `#4c6698` |
| String / attribute | `#80dcff` | `#004b8f` |
| Function / method | `#f0d68f` | `#704400` |
| Type / class / number / const / enum | `#ff9536` | `#4a250e` |
| Variable / property / parameter | `#e0e0e0` | `#45494c` |
| Comment (italic) | `#99a0a8` | `#6f706f` |
| Error / invalid (bold + underline) | `#ff8585` | `#6f1f65` |

## Build

Themes are generated from the `templates/*.tera` files. Source color tokens live
in `scripts/build.mjs`.

```sh
npm run build   # regenerate VS Code, Zed, and dist outputs
npm test        # validate tokens, consistency, and deutan safety
```

## License

MIT
