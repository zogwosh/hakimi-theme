// Aligned with catppuccin-vsc/src/theme/ui/brackets.ts
import { shade } from '../../colors.mjs';

export default function brackets(context) {
  const { isLatte, options, palette } = context;
  const dimAmount = -0.07 * (isLatte ? -1 : 1);

  const styles = {
    rainbow: {
      'editorBracketHighlight.foreground1': palette.sapphire,
      'editorBracketHighlight.foreground2': palette.peach,
      'editorBracketHighlight.foreground3': palette.teal,
      'editorBracketHighlight.foreground4': palette.sky,
      'editorBracketHighlight.foreground5': palette.lavender,
      'editorBracketHighlight.foreground6': palette.mauve,
      'editorBracketHighlight.unexpectedBracket.foreground': palette.red,
    },
    dimmed: {
      'editorBracketHighlight.foreground1': shade(palette.sapphire, dimAmount),
      'editorBracketHighlight.foreground2': shade(palette.peach, dimAmount),
      'editorBracketHighlight.foreground3': shade(palette.teal, dimAmount),
      'editorBracketHighlight.foreground4': shade(palette.sky, dimAmount),
      'editorBracketHighlight.foreground5': shade(palette.lavender, dimAmount),
      'editorBracketHighlight.foreground6': shade(palette.mauve, dimAmount),
      'editorBracketHighlight.unexpectedBracket.foreground': shade(
        palette.red,
        dimAmount,
      ),
    },
    monochromatic: {
      'editorBracketHighlight.foreground1': palette.subtext1,
      'editorBracketHighlight.foreground2': palette.subtext0,
      'editorBracketHighlight.foreground3': palette.overlay2,
      'editorBracketHighlight.foreground4': palette.overlay1,
      'editorBracketHighlight.foreground5': palette.overlay0,
      'editorBracketHighlight.foreground6': palette.surface2,
      'editorBracketHighlight.unexpectedBracket.foreground': palette.red,
    },
  };

  return styles[options.bracketMode || 'rainbow'];
}
