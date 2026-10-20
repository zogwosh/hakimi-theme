// Aligned with catppuccin-vsc/src/theme/extensions/error-lens.ts
import { opacity } from '../../colors.mjs';

export default function errorLens(context) {
  const { palette } = context;

  return {
    'errorLens.errorBackground': opacity(palette.red, 0.15),
    'errorLens.errorBackgroundLight': opacity(palette.red, 0.15),
    'errorLens.errorForeground': palette.red,
    'errorLens.errorForegroundLight': palette.red,
    'errorLens.errorMessageBackground': opacity(palette.red, 0.15),
    'errorLens.hintBackground': opacity(palette.teal, 0.15),
    'errorLens.hintBackgroundLight': opacity(palette.teal, 0.15),
    'errorLens.hintForeground': palette.teal,
    'errorLens.hintForegroundLight': palette.teal,
    'errorLens.hintMessageBackground': opacity(palette.teal, 0.15),
    'errorLens.infoBackground': opacity(palette.sky, 0.15),
    'errorLens.infoBackgroundLight': opacity(palette.sky, 0.15),
    'errorLens.infoForeground': palette.sky,
    'errorLens.infoForegroundLight': palette.sky,
    'errorLens.infoMessageBackground': opacity(palette.sky, 0.15),
    'errorLens.statusBarErrorForeground': palette.red,
    'errorLens.statusBarHintForeground': palette.teal,
    'errorLens.statusBarIconErrorForeground': palette.red,
    'errorLens.statusBarIconWarningForeground': palette.maroon,
    'errorLens.statusBarInfoForeground': palette.sky,
    'errorLens.statusBarWarningForeground': palette.maroon,
    'errorLens.warningBackground': opacity(palette.maroon, 0.15),
    'errorLens.warningBackgroundLight': opacity(palette.maroon, 0.15),
    'errorLens.warningForeground': palette.maroon,
    'errorLens.warningForegroundLight': palette.maroon,
    'errorLens.warningMessageBackground': opacity(palette.maroon, 0.15),
  };
}
