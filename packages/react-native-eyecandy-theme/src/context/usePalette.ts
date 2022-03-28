import { ThemePalette } from '../palette';

import useTheme from './useTheme';

function usePalette(): ThemePalette;

function usePalette<T>(selector: (palette: ThemePalette) => T): T;

function usePalette<T>(
  selector?: (palette: ThemePalette) => T,
): T | ThemePalette {
  const theme = useTheme();

  if (selector) {
    return selector(theme.palette);
  }

  return theme.palette;
}

export default usePalette;
