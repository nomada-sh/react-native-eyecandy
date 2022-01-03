import deepmerge from 'deepmerge';

import type { ThemeTypography, ThemeOptions } from '../typings';
import { Typography } from '../variables';

export default function createPalette({
  dark = false,
  typography,
  baseTypography,
}: {
  dark?: boolean;
  typography?: ThemeOptions['typography'];
  baseTypography?: ThemeTypography;
}): ThemeTypography {
  const defaultTypography = baseTypography ? baseTypography : Typography;

  if (typeof typography === 'function')
    return deepmerge(
      defaultTypography,
      typography({ dark, typography: defaultTypography }),
    ) as ThemeTypography;

  if (typography)
    return deepmerge(defaultTypography, typography) as ThemeTypography;

  return defaultTypography;
}
