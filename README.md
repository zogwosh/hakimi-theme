# Hakimi Colorblindness Safe Theme

> **本主题是专为 绿色盲（Deuteranopia / Green-blindness） 深度设计和优化的无障碍编程主题。**

Accessible VS Code and Zed themes whose syntax palette is optimized for **deuteranopia**
(green-blindness), building on the colorblind-safe color systems from David Nichols'
*Coloring for Colorblindness*. Three variants ship:

- **Hakimi Colorblindness Light** — for white backgrounds.
- **Hakimi Colorblindness Dark** — balanced; the recommended dark theme.
- **Hakimi Colorblindness Dark Bright** — maximum readability (every token at APCA
  Lc ≥ 60). See *Choosing a dark variant* below.

## Design principle

A deuteranope perceives color along essentially two surviving axes — **luminance**
and **blue↔yellow** — while the **red↔green** axis carries almost no information.
So every token role is separated along luminance and/or blue↔yellow only; red↔green
is never used to distinguish two roles. The palette collapses to just two chromatic
families plus neutrals:

- **Cool family (blue):** keywords, tags, built-in classes, strings
- **Warm family (yellow/orange):** functions, types, classes, numbers, constants, enums
- **Neutral:** variables, properties, parameters (editor foreground), comments (grey)

Following Nichols' "beyond color" guidance, roles are also distinguished by **font
style** as a redundant channel: keywords are **bold**, comments are *italic*, and
errors are **bold + underlined** (no hue reliably signals "error" to a deuteranope).

Semantic highlighting and TextMate scopes are kept on a single shared palette, so
colors never jump when a language server attaches.

## Verification

Everything is evaluated in the **deuteranope's perceived space**: each color is first
projected through a **Viénot 1999** dichromat simulation (the gold-standard deutan model,
applied in linear RGB), and only then measured. `npm test` enforces three gates:

1. **Readability (APCA)** — the APCA Lc of each *simulated* color against the *simulated*
   background clears its floor: regular text Lc ≥ 60, bold ≥ 50 (APCA's weight relaxation),
   comments ≥ 45 (de-emphasized). APCA replaces WCAG 2.x because it models perceived
   lightness far better — e.g. it correctly flags blue / mid-grey text on dark backgrounds
   that WCAG over-rates.
2. **Separation** — every pair of simultaneously-visible roles stays distinct after
   simulation (OKLab ΔE ≥ 0.10); the error role is carried by bold+underline.
3. **Consistency** — each role's semantic-token color equals its TextMate color.

## Syntax palette

| Role | Dark | Dark Bright | Light |
| --- | --- | --- | --- |
| Keyword / tag / built-in (bold) | `#6ea9ff` | `#80baff` | `#0a3d91` |
| String / attribute | `#74d7e3` | `#a3e4ef` | `#1d6fd0` |
| Function / method | `#e2cb8d` | `#ffdd6e` | `#c2570a` |
| Type / class / number / const / enum | `#f7993f` | `#ff9536` | `#7a2e00` |
| Variable / property / parameter | `#e0e0e0` | `#ffffff` | `#000000` |
| Comment (italic) | `#99a0a8` | `#b4b4ba` | `#6e6e6e` |
| Error / invalid (bold + underline) | `#ff7575` | `#ff8f8f` | `#c4141a` |

## Choosing a dark variant

On a near-black background there is a genuine tension between **readability** (APCA
wants light text) and **deutan separation** (which needs a spread of lightnesses — and
pushing every token light compresses that spread). The two dark themes pick different
points on that trade-off:

- **Dark** — keyword/error use APCA's bold-weight relaxation (Lc ≥ 50), the comment is a
  dim cool grey (Lc 49). Richer, more saturated colors; comments recede. All colored-token
  pairs stay ≥ 0.12 apart in deuteranope-space. **Recommended for most people.**
- **Dark Bright** — *every* token clears Lc ≥ 60, so colors are lighter/pastel and the
  comment is louder. Best if you find the balanced theme's blues/greys too dim. The cost
  is tighter separation: comment↔keyword and comment↔error fall back on font style (italic
  vs bold vs bold-underline) rather than color.

Try both and keep whichever reads better for you — that is what the two variants are for.

## Build

Themes are generated from the `templates/*.tera` files (color tokens live in
`scripts/build.mjs`) via the [whiskers](https://github.com/catppuccin/whiskers) CLI:

```sh
npm run build   # regenerate themes/ and dist/
npm test        # validate tokens, consistency, and deutan safety
```

## License

MIT
