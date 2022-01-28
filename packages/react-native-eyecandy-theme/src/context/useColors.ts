import useTheme from './useTheme';

import { ThemeColors } from '../colors';

export default function useColors(): ThemeColors;

export default function useColors<T>(selector: (colors: ThemeColors) => T): T;

export default function useColors<T>(
  selector?: (colors: ThemeColors) => T,
): T | ThemeColors {
  const theme = useTheme();

  if (selector) {
    return selector(theme.colors);
  }

  return theme.colors;
}
