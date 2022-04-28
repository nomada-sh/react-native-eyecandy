import mergeColors from './mergeColors';
import { ThemeButtonColors, GetThemeColors } from './types';

const createButtonColors: GetThemeColors<ThemeButtonColors> = options => {
  const { dark, palette } = options;

  const defaultColors: ThemeButtonColors = {
    default: {
      background: palette.grey[dark ? 800 : 100],
      foreground: palette.grey[dark ? 100 : 800],
    },
    primary: {
      background: palette.primary['500'],
      foreground: palette.primary['100'],
    },
    secondary: {
      background: palette.secondary['500'],
      foreground: palette.secondary['100'],
    },
  };

  return mergeColors({
    ...options,
    defaultColors,
  });
};

export default createButtonColors;
