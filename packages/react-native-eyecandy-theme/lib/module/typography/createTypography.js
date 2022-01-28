import deepmerge from 'deepmerge';
import defaultTypography from './Typography';
export default function createPalette(typography) {
  if (typography) return deepmerge(defaultTypography, typography);
  return defaultTypography;
}
//# sourceMappingURL=createTypography.js.map