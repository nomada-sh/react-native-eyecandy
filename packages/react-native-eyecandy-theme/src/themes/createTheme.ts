import { createColors } from '../colors';
import { createPalette } from '../palette';
import { createTypography } from '../typography';

import { CreateTheme } from './types';

const createTheme: CreateTheme = (options = {}) => {
  const palette = createPalette(options.palette);
  const typography = createTypography(options.typography);
  const colors = createColors({
    dark: options.dark,
    colors: options.colors,
    palette,
    typography,
  });

  return {
    dark: Boolean(options.dark),
    palette,
    typography,
    colors,
  };
};

export default createTheme;
