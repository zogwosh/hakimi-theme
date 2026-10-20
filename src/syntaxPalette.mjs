export const SYNTAX_PALETTE = {
  light: {
    base: '#ffead8',
    text: '#45494c',
    overlay0: '#6f706f',
    overlay2: '#6f706f',
    mauve: '#336fd6',
    green: '#004b8f',
    blue: '#8a5200',
    yellow: '#3a1f0b',
    red: '#6f1f65',
    maroon: '#684100',
    peach: '#7a3f00',
    teal: '#00543f',
    sky: '#005b9f',
    sapphire: '#4c6698',
  },
  dark: {
    base: '#263238',
    text: '#e0e0e0',
    overlay0: '#99a0a8',
    overlay2: '#99a0a8',
    mauve: '#7ab2ff',
    green: '#80dcff',
    blue: '#f0d68f',
    yellow: '#ff9536',
    red: '#ff8585',
    maroon: '#e1be6a',
    peach: '#f0d68f',
    teal: '#50c0b6',
    sky: '#8bdcff',
    sapphire: '#7ab2ff',
  },
};

function createTerminalAnsiColors(syntaxColors) {
  const chromaticSlots = {
    red: syntaxColors.red,
    green: syntaxColors.green,
    yellow: syntaxColors.blue,
    blue: syntaxColors.mauve,
    magenta: syntaxColors.red,
    cyan: syntaxColors.yellow,
  };

  return {
    background: syntaxColors.base,
    foreground: syntaxColors.text,
    dimForeground: syntaxColors.overlay2,
    brightForeground: syntaxColors.text,
    normal: {
      black: syntaxColors.text,
      ...chromaticSlots,
      white: syntaxColors.overlay2,
    },
    bright: {
      black: syntaxColors.overlay2,
      ...chromaticSlots,
      white: syntaxColors.text,
    },
    dim: {
      black: syntaxColors.overlay2,
      ...chromaticSlots,
      white: syntaxColors.overlay2,
    },
  };
}

export const TERMINAL_PALETTE = {
  light: createTerminalAnsiColors(SYNTAX_PALETTE.light),
  dark: createTerminalAnsiColors(SYNTAX_PALETTE.dark),
};
