"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _palette = require("../palette");

var _typography = require("../typography");

var _colors = require("../colors");

const createTheme = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const palette = (0, _palette.createPalette)(options.palette);
  const typography = (0, _typography.createTypography)(options.typography);
  const colors = (0, _colors.createColors)({
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

var _default = createTheme;
exports.default = _default;
//# sourceMappingURL=createTheme.js.map