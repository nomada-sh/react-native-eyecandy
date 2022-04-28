import mergeColors from './mergeColors';
import { ThemeDividerColors, GetThemeColors } from './types';

const createDividerColors: GetThemeColors<ThemeDividerColors> = options => {
  const { dark, palette } = options;

  const defaultColors: ThemeDividerColors = {
    default: palette.grey[dark ? 800 : 200],
  };

  return mergeColors({
    ...options,
    defaultColors,
  });
};

export default createDividerColors;
