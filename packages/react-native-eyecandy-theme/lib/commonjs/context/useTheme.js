"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTheme;

var _react = require("react");

var _ThemeProvider = require("./ThemeProvider");

function useTheme(selector) {
  const theme = (0, _react.useContext)(_ThemeProvider.ThemeContext);

  if (selector) {
    return selector(theme);
  }

  return theme;
}
//# sourceMappingURL=useTheme.js.map