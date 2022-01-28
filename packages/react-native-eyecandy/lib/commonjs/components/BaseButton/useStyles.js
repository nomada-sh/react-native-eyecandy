"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStyles;

var _reactNative = require("react-native");

var _color = _interopRequireDefault(require("color"));

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useStyles(_ref) {
  let {
    color = 'default',
    inverse = false,
    variant = 'default',
    height = 56,
    disabled,
    fullwidth = true
  } = _ref;
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.button);
  const {
    background,
    foreground
  } = colors[color];
  const borderRadius = /([a-z]+-)?rounded$/.test(variant) ? height / 2 : 12;
  let backgroundColor = (0, _color.default)(inverse ? foreground : background).rgb();
  const rippleColor = (0, _utils.getRippleColor)(backgroundColor);
  let disabledColor = backgroundColor.fade(0.4);
  if (/^transparent(-[a-z]+)?/.test(variant)) backgroundColor = backgroundColor.alpha(0);
  return _reactNative.StyleSheet.create({
    container: {
      height,
      borderRadius,
      overflow: 'hidden',
      width: fullwidth ? '100%' : undefined
    },
    button: {
      flex: 1,
      borderRadius,
      backgroundColor: backgroundColor.string(),
      justifyContent: 'center',
      alignItems: 'center'
    },
    ripple: {
      color: rippleColor.string()
    },
    disabled: {
      backgroundColor: disabled ? disabledColor.string() : undefined,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center'
    },
    loading: {
      color: inverse ? background : foreground
    }
  });
}
//# sourceMappingURL=useStyles.js.map