"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStyles;

var _react = require("react");

var _reactNative = require("react-native");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function useStyles(_ref) {
  let {
    color = 'default',
    inverse = false
  } = _ref;
  const {
    background,
    foreground
  } = (0, _reactNativeEyecandyTheme.useColors)(c => c.button[color]);
  return (0, _react.useMemo)(() => _reactNative.StyleSheet.create({
    text: {
      color: inverse ? background : foreground
    }
  }), [inverse, background, foreground]);
}
//# sourceMappingURL=useStyles.js.map