"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _rnSwipeButton = _interopRequireDefault(require("rn-swipe-button"));

var _color = _interopRequireDefault(require("color"));

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ThumbIcon = () => /*#__PURE__*/_react.default.createElement(_reactNativeEyecandyIcons.ChevronRight, {
  stroke: "white",
  size: 40
});

function SwipeButton(_ref) {
  let {
    titleStyles,
    containerStyles,
    thumbIconStyles,
    title = '',
    ...props
  } = _ref;
  const {
    typography,
    colors
  } = (0, _reactNativeEyecandyTheme.useTheme)(t => ({
    typography: t.typography,
    colors: t.colors.button.primary
  }));
  const fillColor = (0, _color.default)(colors.background).rgb().darken(0.3).alpha(0.8).string();
  const thumbColor = (0, _color.default)(colors.background).darken(0.4).string();
  return /*#__PURE__*/_react.default.createElement(_rnSwipeButton.default, _extends({
    title: title,
    containerStyles: _reactNative.StyleSheet.flatten([{
      borderWidth: 0,
      width: '100%'
    }, containerStyles]),
    titleStyles: _reactNative.StyleSheet.flatten([{
      fontSize: typography.body.fontSize.medium,
      fontWeight: 'bold',
      color: colors.foreground
    }, titleStyles]),
    thumbIconStyles: _reactNative.StyleSheet.flatten([{
      borderWidth: 0
    }, thumbIconStyles]) // @ts-ignore
    ,
    thumbIconComponent: ThumbIcon,
    railBackgroundColor: colors.background,
    railFillBackgroundColor: fillColor,
    railFillBorderColor: fillColor,
    thumbIconBackgroundColor: thumbColor,
    thumbIconBorderColor: thumbColor
  }, props));
}

var _default = SwipeButton;
exports.default = _default;
//# sourceMappingURL=SwipeButton.js.map