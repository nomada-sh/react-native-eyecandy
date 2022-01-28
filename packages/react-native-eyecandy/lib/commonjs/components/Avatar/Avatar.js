"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Avatar(_ref) {
  let {
    size = (0, _utils.ms)(64),
    style,
    ...props
  } = _ref;
  const {
    dark,
    palette
  } = (0, _reactNativeEyecandyTheme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, _extends({
    style: [{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: palette.grey[dark ? 800 : 100]
    }, styles.container, style]
  }, props));
}

const styles = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});

var _default = Avatar;
exports.default = _default;
//# sourceMappingURL=Avatar.js.map