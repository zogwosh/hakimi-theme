const RGB_TO_LMS = [
  0.31399022, 0.63951294, 0.04649755, 0.15537241, 0.75789446, 0.08670142,
  0.01775239, 0.10944209, 0.87256922,
];
const LMS_TO_RGB = [
  5.47221206, -4.6419601, 0.16963708, -1.1252419, 2.29317094, -0.1678952,
  0.02980165, -0.19318073, 1.16364789,
];
const DEUTAN_LMS = [1, 0, 0, 0.9513092, 0, 0.04866992, 0, 0, 1];

const matMul = (m, v) => [
  m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
  m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
  m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
];

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const toLinear = (x) =>
  x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
const fromLinear = (x) =>
  x <= 0.0031308 ? x * 12.92 : 1.055 * x ** (1 / 2.4) - 0.055;

const hexToRgb = (hex) => {
  if (
    typeof hex !== 'string' ||
    !/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex)
  )
    throw new Error(`Invalid color: ${hex}`);
  let h = hex.replace(/^#/, '');
  if (h.length === 3 || h.length === 4) {
    h = [...h].map((ch) => ch + ch).join('');
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
};

const rgbToHex = ({ r, g, b }) => {
  const toHex = (val) => {
    const clamped = Math.min(255, Math.max(0, Math.round(val)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const blend = (fg, bg) => {
  const f = hexToRgb(fg);
  const b = hexToRgb(bg);
  return rgbToHex({
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
  });
};

const flatten = (hex, bg) => (hexToRgb(hex).a < 1 ? blend(hex, bg) : hex);

const deutan = (hex, bg = '#000000') => {
  const rgb = hexToRgb(flatten(hex, bg));
  const linearRgb = [rgb.r, rgb.g, rgb.b].map((x) => toLinear(x / 255));
  const lms = matMul(RGB_TO_LMS, linearRgb);
  const simulatedLms = matMul(DEUTAN_LMS, lms);
  const simulatedLinearRgb = matMul(LMS_TO_RGB, simulatedLms);
  return rgbToHex({
    r: 255 * fromLinear(clamp01(simulatedLinearRgb[0])),
    g: 255 * fromLinear(clamp01(simulatedLinearRgb[1])),
    b: 255 * fromLinear(clamp01(simulatedLinearRgb[2])),
  });
};

const h2 = (hex) => {
  const rgb = hexToRgb(hex);
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
};

function oklab([r, g, b]) {
  const lr = toLinear(r),
    lg = toLinear(g),
    lb = toLinear(b);
  const l = Math.cbrt(
      0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
    ),
    m = Math.cbrt(0.2119034982 * lr + 0.6806995477 * lg + 0.1073969541 * lb),
    s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}
const dEok = (a, b) => {
  const A = oklab(h2(a)),
    B = oklab(h2(b));
  return Math.hypot(A.L - B.L, A.a - B.a, A.b - B.b);
};

// ---- APCA (apca-w3 0.1.9 / "0.0.98G-4g" constants) ----
const APCA = {
  Rco: 0.2126729,
  Gco: 0.7151522,
  Bco: 0.072175,
  trc: 2.4,
  Ntx: 0.57,
  Nbg: 0.56,
  Rtx: 0.62,
  Rbg: 0.65,
  Bthr: 0.022,
  Bclmp: Math.SQRT2,
  scale: 1.14,
  loOff: 0.027,
  loClip: 0.1,
  dMin: 0.0005,
};
function apcaY(hex) {
  const [r, g, b] = h2(hex);
  return (
    APCA.Rco * r ** APCA.trc +
    APCA.Gco * g ** APCA.trc +
    APCA.Bco * b ** APCA.trc
  );
}
function apcaLc(txt, bg) {
  let Yt = apcaY(txt),
    Yb = apcaY(bg);
  if (Yt < APCA.Bthr) Yt += (APCA.Bthr - Yt) ** APCA.Bclmp;
  if (Yb < APCA.Bthr) Yb += (APCA.Bthr - Yb) ** APCA.Bclmp;
  if (Math.abs(Yb - Yt) < APCA.dMin) return 0;
  let S, out;
  if (Yb > Yt) {
    S = (Yb ** APCA.Nbg - Yt ** APCA.Ntx) * APCA.scale;
    out = S < APCA.loClip ? 0 : S - APCA.loOff;
  } else {
    S = (Yb ** APCA.Rbg - Yt ** APCA.Rtx) * APCA.scale;
    out = S > -APCA.loClip ? 0 : S + APCA.loOff;
  }
  return out * 100;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToOklch(r, g, b) {
  const lab = oklab([r / 255, g / 255, b / 255]);
  return {
    l: lab.L,
    c: Math.hypot(lab.a, lab.b),
    h: ((Math.atan2(lab.b, lab.a) * 180) / Math.PI + 360) % 360,
  };
}
function luminance(rgb) {
  const channels = [rgb.r, rgb.g, rgb.b].map((v) => toLinear(v / 255));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
function contrast(fg, bg) {
  const f = luminance(hexToRgb(flatten(fg, bg)));
  const b = luminance(hexToRgb(bg));
  return (Math.max(f, b) + 0.05) / (Math.min(f, b) + 0.05);
}
export {
  hexToRgb,
  flatten,
  blend,
  deutan,
  dEok,
  apcaLc,
  rgbToHsl,
  rgbToOklch,
  luminance,
  contrast,
};
