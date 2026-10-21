import { hexToRgb } from '../colors.mjs';

/**
 * Derives workbench background zones from the editor base color.
 * Follows the 4-zone requirement:
 * 1. Editor area: base anchor color
 * 2. TitleBar & Footer (StatusBar): identical color
 * 3. SideBar: distinct derived color
 * 4. Panels (Left/Right panels, Terminal/Bottom panel): distinct derived color
 *
 * Uses OKLCH perceptual lightness adjustments to maintain flat, minimal contrast steps.
 */
export function deriveWorkbenchBackgrounds(editorBaseHex, mode = 'dark') {
  const isDark = mode === 'dark';

  // Perceptual delta L offsets (approx ±1.5% to 3% lightness)
  const chromeLightnessDelta = isDark ? -0.03 : -0.035;
  const sidebarLightnessDelta = isDark ? -0.015 : -0.018;
  const panelLightnessDelta = isDark ? 0.015 : 0.018;

  const chromeColor = adjustOklchLightness(editorBaseHex, chromeLightnessDelta);
  const sidebarColor = adjustOklchLightness(editorBaseHex, sidebarLightnessDelta);
  const panelColor = adjustOklchLightness(editorBaseHex, panelLightnessDelta);

  return {
    editor: editorBaseHex,
    chrome: chromeColor,       // Used for TitleBar and StatusBar (footer) identically
    sidebar: sidebarColor,     // Used for Primary SideBar
    panel: panelColor,         // Used for Panels and Secondary SideBar
  };
}

/**
 * Adjusts the OKLCH lightness of a hex color by a specified delta,
 * keeping chroma and hue intact.
 */
export function adjustOklchLightness(hex, deltaLightness) {
  const rgb = hexToNormalizedRgb(hex);
  const lab = linearRgbToOklab(srgbToLinearRgb(rgb));
  const nextL = clamp(lab.L + deltaLightness, 0, 1);
  const nextLab = { L: nextL, a: lab.a, b: lab.b };
  const nextLinearRgb = oklabToLinearRgb(nextLab);
  const nextSrgb = linearRgbToSrgb(nextLinearRgb);
  return normalizedRgbToHex(nextSrgb);
}

// ---- Color Space Transformations (OKLab <-> Linear RGB <-> sRGB) ----

function hexToNormalizedRgb(hex) {
  const { r, g, b } = hexToRgb(hex);
  return { r: r / 255, g: g / 255, b: b / 255 };
}

function normalizedRgbToHex({ r, g, b }) {
  const toHexByte = (val) => {
    const clamped = Math.min(255, Math.max(0, Math.round(val * 255)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}

function srgbToLinearRgb({ r, g, b }) {
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return { r: toLinear(r), g: toLinear(g), b: toLinear(b) };
}

function linearRgbToSrgb({ r, g, b }) {
  const toSrgb = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);
  return { r: clamp(toSrgb(r), 0, 1), g: clamp(toSrgb(g), 0, 1), b: clamp(toSrgb(b), 0, 1) };
}

function linearRgbToOklab({ r, g, b }) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995477 * g + 0.1073969541 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

function oklabToLinearRgb({ L, a, b }) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return {
    r: +4.0767434036 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
