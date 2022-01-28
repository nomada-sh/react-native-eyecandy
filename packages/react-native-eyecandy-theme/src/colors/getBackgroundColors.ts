import { ThemeBackgroundColors, GetThemeColors } from './types';
import mergeColors from './mergeColors';

const getButtonColors: GetThemeColors<ThemeBackgroundColors> = options => {
  const { dark, palette } = options;

  const defaultColors: ThemeBackgroundColors = {
    default: {
      container: dark ? palette.grey[800] : 'white',
      content: dark ? palette.grey[800] : 'white',
    },
  };

  return mergeColors({
    ...options,
    defaultColors: defaultColors,
  });
};

export default getButtonColors;
