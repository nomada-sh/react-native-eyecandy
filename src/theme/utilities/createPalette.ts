import deepmerge from 'deepmerge';

import type { ThemePalette, ThemeOptions } from '../typings';
import { Palette } from '../variables';

export default function createPalette({
  dark = false,
  palette,
}: {
  dark?: boolean;
  palette: ThemeOptions['palette'];
}): ThemePalette {
  const basePalette = Palette(dark);

  if (typeof palette === 'function')
    return deepmerge(
      basePalette,
      palette({
        dark,
        palette: basePalette,
      }),
    ) as ThemePalette;

  if (palette) return deepmerge(basePalette, palette) as ThemePalette;

  return basePalette;
}
