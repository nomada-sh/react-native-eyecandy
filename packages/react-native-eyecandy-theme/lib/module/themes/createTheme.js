import { createPalette } from '../palette';
import { createTypography } from '../typography';
import { createColors } from '../colors';

const createTheme = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const palette = createPalette(options.palette);
  const typography = createTypography(options.typography);
  const colors = createColors({
    dark: options.dark,
    colors: options.colors,
    palette,
    typography
  });
  return {
    dark: Boolean(options.dark),
    palette,
    typography,
    colors
  };
};

export default createTheme;
//# sourceMappingURL=createTheme.js.map