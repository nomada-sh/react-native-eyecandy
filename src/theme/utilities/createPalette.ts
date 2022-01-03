import deepmerge from 'deepmerge';

import type { ThemePalette, ThemeOptions } from '../typings';
import { Palette } from '../variables';

export default function createPalette({
  dark = false,
  palette,
  basePalette,
}: {
  dark?: boolean;
  palette: ThemeOptions['palette'];
  basePalette?: ThemePalette;
}): ThemePalette {
  const defaultPalette = basePalette ? basePalette : Palette(dark);

  if (typeof palette === 'function')
    return deepmerge(
      defaultPalette,
      palette({
        dark,
        palette: defaultPalette,
      }),
    ) as ThemePalette;

  if (palette) return deepmerge(defaultPalette, palette) as ThemePalette;

  return defaultPalette;
}
