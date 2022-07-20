import mergeColors from './mergeColors';
import { ThemeTextColors, GetThemeColors } from './types';

const createTextColors: GetThemeColors<ThemeTextColors> = options => {
  const { dark, palette } = options;

  const defaultColors: ThemeTextColors = {
    default: {
      normal: palette.grey[dark ? 100 : 900],
      contrast: palette.grey[dark ? 900 : 100],
    },
    primary: {
      normal: palette.primary[500],
      contrast: palette.primary[100],
    },
    greyout: {
      normal: palette.grey[dark ? 400 : 500],
      contrast: palette.grey[dark ? 500 : 400],
    },
    error: {
      normal: palette.error[200],
      contrast: palette.grey[100],
    },
    warning: {
      normal: palette.warning[200],
      contrast: palette.grey[100],
    },
    success: {
      normal: palette.success[200],
      contrast: palette.grey[100],
    },
  };

  return mergeColors({
    ...options,
    defaultColors,
  });
};

export default createTextColors;
