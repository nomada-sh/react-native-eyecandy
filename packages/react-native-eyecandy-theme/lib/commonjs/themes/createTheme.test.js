"use strict";

var _createTheme = _interopRequireDefault(require("./createTheme"));

var _palette = require("../palette");

var _typography = require("../typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('createTheme', () => {
  const theme = (0, _createTheme.default)();
  expect(theme).toEqual({
    dark: false,
    palette: _palette.Palette,
    typography: _typography.Typography,
    colors: expect.any(Object)
  });
});
test('createTheme dark', () => {
  const theme = (0, _createTheme.default)({
    dark: true
  });
  expect(theme).toEqual({
    dark: true,
    palette: _palette.Palette,
    typography: _typography.Typography,
    colors: expect.any(Object)
  });
});
test('createTheme custom palette', () => {
  const customPalette = {
    primary: {
      100: '#e5f7fa',
      200: '#9ae2ed',
      300: '#68d3e4',
      400: '#36c5db',
      500: '#04b7d2'
    },
    secondary: {
      100: '#e5eef4',
      200: '#99bdd4',
      300: '#669cbf',
      400: '#327baa',
      500: '#005b95'
    }
  };
  const theme = (0, _createTheme.default)({
    palette: customPalette
  });
  expect(theme.palette.primary).toEqual({ ..._palette.Palette.primary,
    ...customPalette.primary
  });
  expect(theme.palette.secondary).toEqual({ ..._palette.Palette.secondary,
    ...customPalette.secondary
  });
});
//# sourceMappingURL=createTheme.test.js.map