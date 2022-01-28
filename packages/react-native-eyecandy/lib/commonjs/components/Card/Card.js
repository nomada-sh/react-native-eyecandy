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

function Card(_ref) {
  let {
    style,
    ...props
  } = _ref;
  const {
    dark,
    palette
  } = (0, _reactNativeEyecandyTheme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: [{
      backgroundColor: palette.grey[dark ? 800 : 100],
      padding: 16,
      borderRadius: 16,
      overflow: 'hidden'
    }, style]
  }, props));
}

var _default = Card;
exports.default = _default;
//# sourceMappingURL=Card.js.map