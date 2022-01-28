"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRippleColor;

var _color = _interopRequireDefault(require("color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DARK_RIPPLE_COLOR = (0, _color.default)('rgba(255, 255, 255, 0.1)'),
      LIGHT_RIPPLE_COLOR = (0, _color.default)('rgba(0, 0, 0, 0.1)');

function getRippleColor(backgroundColor) {
  let lightRippleColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LIGHT_RIPPLE_COLOR;
  let darkRippleColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DARK_RIPPLE_COLOR;
  return (0, _color.default)(backgroundColor).isDark() ? (0, _color.default)(darkRippleColor) : (0, _color.default)(lightRippleColor);
}
//# sourceMappingURL=getRippleColor.js.map