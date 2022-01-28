"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePalette;

var _useTheme = _interopRequireDefault(require("./useTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function usePalette(selector) {
  const theme = (0, _useTheme.default)();

  if (selector) {
    return selector(theme.palette);
  }

  return theme.palette;
}
//# sourceMappingURL=usePalette.js.map