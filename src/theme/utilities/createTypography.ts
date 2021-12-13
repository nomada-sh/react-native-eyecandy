import deepmerge from 'deepmerge';

import type { ThemeTypography, ThemeOptions } from '../typings';
import { Typography as BaseTypography } from '../variables';

export default function createPalette({
  dark = false,
  typography,
}: {
  dark?: boolean;
  typography?: ThemeOptions['typography'];
}): ThemeTypography {
  if (typeof typography === 'function')
    return deepmerge(
      BaseTypography,
      typography({ dark, typography: BaseTypography }),
    ) as ThemeTypography;

  if (typography)
    return deepmerge(BaseTypography, typography) as ThemeTypography;

  return BaseTypography;
}
