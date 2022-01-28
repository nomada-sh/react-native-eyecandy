"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useColors;

var _useTheme = _interopRequireDefault(require("./useTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useColors(selector) {
  const theme = (0, _useTheme.default)();

  if (selector) {
    return selector(theme.colors);
  }

  return theme.colors;
}
//# sourceMappingURL=useColors.js.map