import deepmerge from 'deepmerge';
import defaultPalette from './Palette';
export default function createPalette(palette) {
  if (palette) return deepmerge(defaultPalette, palette);
  return defaultPalette;
}
//# sourceMappingURL=createPalette.js.map