"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeColors;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeColors(_ref) {
  let {
    colors,
    defaultColors,
    ...variables
  } = _ref;

  if (colors instanceof Function) {
    const newColors = colors(variables);
    return (0, _deepmerge.default)(defaultColors, newColors);
  }

  if (colors) {
    return (0, _deepmerge.default)(defaultColors, colors);
  }

  return defaultColors;
}
//# sourceMappingURL=mergeColors.js.map