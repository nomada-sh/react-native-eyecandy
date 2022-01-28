"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Switch(_ref) {
  let {
    color = 'default',
    ...props
  } = _ref;
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.switch[color]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Switch, _extends({
    trackColor: {
      false: colors.trackColor,
      true: colors.trackColorEnabled
    },
    thumbColor: colors.thumbColor
  }, props));
}

var _default = Switch;
exports.default = _default;
//# sourceMappingURL=Switch.js.map