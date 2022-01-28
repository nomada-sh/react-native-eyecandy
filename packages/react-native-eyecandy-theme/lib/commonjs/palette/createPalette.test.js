"use strict";

var _createPalette = _interopRequireDefault(require("./createPalette"));

var _Palette = _interopRequireDefault(require("./Palette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('createPalette default', () => {
  const palette = (0, _createPalette.default)();
  expect(palette).toEqual(_Palette.default);
});
test('createPalette', () => {
  const palette = (0, _createPalette.default)({
    error: {
      '50': 'red',
      '100': 'red',
      '200': 'red'
    }
  });
  expect(palette).toEqual({ ..._Palette.default,
    error: { ..._Palette.default.error,
      '50': 'red',
      '100': 'red',
      '200': 'red'
    }
  });
});
//# sourceMappingURL=createPalette.test.js.map