import mergeColors from './mergeColors';
import { ThemeSwitchColors, GetThemeColors } from './types';

const createSwitchColors: GetThemeColors<ThemeSwitchColors> = options => {
  const { dark, palette } = options;

  const defaultColors: ThemeSwitchColors = {
    default: {
      thumbColor: palette.grey[100],
      trackColor: palette.grey[dark ? 800 : 200],
      trackColorEnabled: palette.primary[500],
    },
  };

  return mergeColors({
    ...options,
    defaultColors,
  });
};

export default createSwitchColors;
