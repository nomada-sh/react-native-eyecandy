"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTypography;

var _useTheme = _interopRequireDefault(require("./useTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useTypography(selector) {
  const theme = (0, _useTheme.default)();

  if (selector) {
    return selector(theme.typography);
  }

  return theme.typography;
}
//# sourceMappingURL=useTypography.js.map