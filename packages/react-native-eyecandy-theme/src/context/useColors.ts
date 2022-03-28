import { ThemeColors } from '../colors';

import useTheme from './useTheme';

function useColors(): ThemeColors;

function useColors<T>(selector: (colors: ThemeColors) => T): T;

function useColors<T>(selector?: (colors: ThemeColors) => T): T | ThemeColors {
  const theme = useTheme();

  if (selector) {
    return selector(theme.colors);
  }

  return theme.colors;
}

export default useColors;
