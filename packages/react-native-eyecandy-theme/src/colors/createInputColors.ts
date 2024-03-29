import mergeColors from './mergeColors';
import { ThemeInputColors, GetThemeColors, ThemeInputColor } from './types';

const createInputColors: GetThemeColors<ThemeInputColors> = options => {
  const { dark, palette } = options;

  const defaultBackgroundColor = palette.grey[dark ? 800 : 100];

  const defaultColor: ThemeInputColor = {
    background: defaultBackgroundColor,
    foreground: palette.grey[dark ? 50 : 900],
    placeholder: palette.grey[500],
    border: defaultBackgroundColor,
    focused: {
      background: palette.grey[dark ? 900 : 200],
      indicator: palette.primary[500],
    },
  };

  const defaultColors: ThemeInputColors = {
    default: defaultColor,
    error: {
      ...defaultColor,
      foreground: palette.error[200],
      border: palette.error[200],
      focused: {
        ...defaultColor.focused,
        indicator: palette.error[200],
      },
    },
    success: {
      ...defaultColor,
      foreground: palette.success[200],
      border: palette.success[200],
      focused: {
        ...defaultColor.focused,
        indicator: palette.success[200],
      },
    },
  };

  return mergeColors({
    ...options,
    defaultColors,
  });
};

export default createInputColors;
