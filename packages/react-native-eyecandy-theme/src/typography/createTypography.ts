import deepmerge from 'deepmerge';

import defaultTypography from './Typography';
import { ThemeTypography, CreateThemeTypographyOptions } from './types';

export default function createPalette(
  typography?: CreateThemeTypographyOptions,
) {
  if (typography) {
    return deepmerge(defaultTypography, typography) as ThemeTypography;
  }

  return defaultTypography;
}
