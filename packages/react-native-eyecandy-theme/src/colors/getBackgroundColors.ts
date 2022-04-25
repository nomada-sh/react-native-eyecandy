import mergeColors from './mergeColors';
import { ThemeBackgroundColors, GetThemeColors } from './types';

const getButtonColors: GetThemeColors<ThemeBackgroundColors> = options => {
  const { dark, palette } = options;

  const defaultColors: ThemeBackgroundColors = {
    default: {
      container: dark ? palette.grey[900] : 'white',
      //content: dark ? palette.grey[900] : 'white',
      content: dark ? palette.grey[800] : palette.grey[100],
    },
  };

  return mergeColors({
    ...options,
    defaultColors,
  });
};

export default getButtonColors;
