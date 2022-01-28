"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _typography = require("../../../typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Cell = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    size = 56,
    index,
    value,
    focused,
    onPress,
    ...props
  } = _ref;
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.input.default);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => onPress === null || onPress === void 0 ? void 0 : onPress(index)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    ref: ref,
    style: {
      width: size,
      height: size,
      borderRadius: 12,
      backgroundColor: focused ? colors.focused.background : colors.background,
      borderWidth: 1,
      borderColor: focused ? colors.focused.indicator : colors.background,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, props), /*#__PURE__*/_react.default.createElement(_typography.Text, {
    size: size / 2.5,
    weight: "semibold"
  }, value)));
});

var _default = Cell;
exports.default = _default;
//# sourceMappingURL=Cell.js.map