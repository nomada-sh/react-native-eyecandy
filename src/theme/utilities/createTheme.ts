import type { Theme, ThemeOptions } from '../typings';

import createComponents from './createComponents';
import createPalette from './createPalette';
import createTypography from './createTypography';

export default function createTheme(options: ThemeOptions = {}): Theme {
  const dark = !!options.dark;

  const palette = createPalette({
    dark,
    palette: options.palette,
  });

  const typography = createTypography({
    dark,
    typography: options.typography,
  });

  return {
    dark,
    palette,
    typography,
    components: createComponents({
      dark,
      palette,
      typography,
    }),
  };
}
