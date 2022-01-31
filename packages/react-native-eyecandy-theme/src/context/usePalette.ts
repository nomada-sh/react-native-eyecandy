import useTheme from './useTheme';

import {ThemePalette} from '../palette';

export default function usePalette(): ThemePalette;

export default function usePalette<T>(
  selector: (palette: ThemePalette) => T,
): T;

export default function usePalette<T>(
  selector?: (palette: ThemePalette) => T,
): T | ThemePalette {
  const theme = useTheme();

  if (selector) {
    return selector(theme.palette);
  }

  return theme.palette;
}
