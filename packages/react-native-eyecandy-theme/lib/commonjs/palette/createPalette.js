"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPalette;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _Palette = _interopRequireDefault(require("./Palette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPalette(palette) {
  if (palette) return (0, _deepmerge.default)(_Palette.default, palette);
  return _Palette.default;
}
//# sourceMappingURL=createPalette.js.map