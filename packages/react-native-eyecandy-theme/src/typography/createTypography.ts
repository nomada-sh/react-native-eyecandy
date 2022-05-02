import { merge } from '../utils';

import defaultTypography from './Typography';
import { CreateThemeTypographyOptions } from './types';

export default function createPalette(
  options: CreateThemeTypographyOptions = {},
) {
  const baseTypography: typeof defaultTypography = JSON.parse(
    JSON.stringify(defaultTypography),
  );

  if (options.typography instanceof Function) {
    return merge(
      baseTypography,
      options.typography({
        dark: Boolean(options.dark),
      }),
    );
  }

  if (options.typography) {
    return merge(baseTypography, options.typography);
  }

  return baseTypography;
}
