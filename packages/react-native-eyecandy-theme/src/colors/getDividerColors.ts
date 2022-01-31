import {ThemeDividerColors, GetThemeColors} from './types';
import mergeColors from './mergeColors';

const getDividerColors: GetThemeColors<ThemeDividerColors> = options => {
  const {dark, palette} = options;

  const defaultColors: ThemeDividerColors = {
    default: palette.grey[dark ? 800 : 200],
  };

  return mergeColors({
    ...options,
    defaultColors: defaultColors,
  });
};

export default getDividerColors;
