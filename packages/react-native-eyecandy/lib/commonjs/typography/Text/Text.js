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

function Text(_ref) {
  let {
    weight,
    style,
    size = 14,
    contrast = false,
    color = 'default',
    customColor,
    align,
    ...props
  } = _ref;
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.text[color]);
  let textColor = colors.normal;
  if (customColor) textColor = customColor;
  if (contrast) textColor = colors.contrast;
  let fontWeight;

  switch (weight) {
    case 'semibold':
      fontWeight = '700';
      break;

    case 'regular':
      fontWeight = 'normal';
      break;

    case 'medium':
      fontWeight = '500';
      break;

    default:
      fontWeight = weight;
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, _extends({
    style: [{
      fontWeight,
      fontSize: size,
      color: textColor,
      textAlign: align
    }, style]
  }, props));
}

var _default = Text;
exports.default = _default;
//# sourceMappingURL=Text.js.map