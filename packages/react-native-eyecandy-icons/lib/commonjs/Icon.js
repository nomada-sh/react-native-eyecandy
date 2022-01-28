"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Icon;

var _react = _interopRequireDefault(require("react"));

var _reactNativeSvg = _interopRequireDefault(require("react-native-svg"));

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Icon(_ref) {
  let {
    size = 24,
    stroke: strokeProp,
    fill: fillProp,
    color = 'default',
    filled,
    ...props
  } = _ref;
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.text);
  const stroke = strokeProp || colors[color].normal;
  const fill = fillProp || (filled ? stroke : undefined);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, _extends({
    preserveAspectRatio: "none",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: stroke,
    color: fill
  }, props));
}
//# sourceMappingURL=Icon.js.map