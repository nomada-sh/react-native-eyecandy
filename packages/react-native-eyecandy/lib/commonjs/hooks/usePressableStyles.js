"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePressableStyles;

var _react = require("react");

function usePressableStyles(style) {
  const getButtonStyle = (0, _react.useCallback)(e => {
    const styles = [];

    if (style instanceof Array) {
      styles.push(style.map(s => s instanceof Function ? s(e) : s));
    } else if (style instanceof Function) {
      styles.push(style(e));
    } else {
      styles.push(style);
    }

    return styles;
  }, [style]);
  return getButtonStyle;
}
//# sourceMappingURL=usePressableStyles.js.map