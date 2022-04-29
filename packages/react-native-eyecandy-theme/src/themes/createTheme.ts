import { createColors } from '../colors';
import { createPalette } from '../palette';
import { createTypography } from '../typography';

import { CreateTheme } from './types';

const createTheme: CreateTheme = (options = {}) => {
  const dark = Boolean(options.dark);

  const palette = createPalette({
    dark,
    palette: options.palette,
  });
  const typography = createTypography({
    dark,
    typography: options.typography,
  });
  const colors = createColors({
    dark,
    colors: options.colors,
    palette,
    typography,
  });

  return {
    dark,
    palette,
    typography,
    colors,
  };
};

export default createTheme;
