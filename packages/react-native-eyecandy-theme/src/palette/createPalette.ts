import {CreateThemePaletteOptions, ThemePalette} from './types';
import deepmerge from 'deepmerge';

import defaultPalette from './Palette';

export default function createPalette(palette?: CreateThemePaletteOptions) {
  if (palette) {
    return deepmerge(defaultPalette, palette) as ThemePalette;
  }

  return defaultPalette;
}
