"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _BaseButton = _interopRequireDefault(require("../BaseButton"));

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _hooks = require("../../hooks");

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

var _typography = require("../../typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function LinkButton(_ref) {
  let {
    text,
    icon,
    buttonStyle,
    color = 'default',
    showChevron = true,
    bold,
    focused,
    ...props
  } = _ref;
  const {
    palette
  } = (0, _reactNativeEyecandyTheme.useTheme)();
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.button[color]);
  const Icon = icon;
  const buttonStyles = (0, _hooks.usePressableStyles)([styles.button, buttonStyle, {
    borderColor: focused ? palette.primary[500] : colors.background
  }]);
  const textStyle = {
    color: colors.foreground,
    fontWeight: bold ? 'bold' : 'normal'
  };
  return /*#__PURE__*/_react.default.createElement(_BaseButton.default, _extends({
    color: color,
    buttonStyle: buttonStyles
  }, props), Icon ? /*#__PURE__*/_react.default.createElement(Icon, {
    style: styles.icon,
    size: 20,
    stroke: focused ? palette.primary[500] : textStyle.color
  }) : null, /*#__PURE__*/_react.default.createElement(_typography.Body, {
    style: [textStyle, styles.text]
  }, text), showChevron ? /*#__PURE__*/_react.default.createElement(_reactNativeEyecandyIcons.ChevronRight, {
    color: "greyout",
    size: 20
  }) : null);
}

const styles = _reactNative.StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderWidth: 1
  },
  text: {
    flex: 1,
    marginEnd: 16
  },
  icon: {
    marginEnd: 16
  }
});

var _default = LinkButton;
exports.default = _default;
//# sourceMappingURL=LinkButton.js.map