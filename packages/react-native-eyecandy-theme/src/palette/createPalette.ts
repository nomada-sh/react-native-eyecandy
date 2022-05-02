import { merge } from '../utils';

import defaultPalette from './Palette';
import { CreateThemePaletteOptions, ThemePalette } from './types';

export default function createPalette(
  options: CreateThemePaletteOptions = {},
): ThemePalette {
  const basePalette: typeof defaultPalette = JSON.parse(
    JSON.stringify(defaultPalette),
  );

  if (options.palette instanceof Function) {
    return merge(
      basePalette,
      options.palette({
        dark: Boolean(options.dark),
      }),
    );
  }

  if (options.palette) {
    return merge(basePalette, options.palette);
  }

  return basePalette;
}
