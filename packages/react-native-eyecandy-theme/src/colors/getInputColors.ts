import { ThemeInputColors, GetThemeColors } from './types';
import mergeColors from './mergeColors';

const getInputColors: GetThemeColors<ThemeInputColors> = options => {
  const { dark, palette } = options;

  const defaultColors: ThemeInputColors = {
    default: {
      background: palette.grey[dark ? 800 : 100],
      foreground: palette.grey[dark ? 50 : 900],
      placeholder: palette.grey[500],
      border: palette.grey[dark ? 800 : 300],
      focused: {
        background: palette.grey[dark ? 900 : 200],
        indicator: palette.primary[500],
      },
    },
  };

  return mergeColors({
    ...options,
    defaultColors: defaultColors,
  });
};

export default getInputColors;