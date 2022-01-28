"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _color = _interopRequireDefault(require("color"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RadioButton(_ref) {
  let {
    value = false,
    size = 32,
    style,
    onValueChange
  } = _ref;
  const {
    palette,
    dark
  } = (0, _reactNativeEyecandyTheme.useTheme)();
  const frontSize = size - 10;
  const backgroundColor = value ? palette.success[200] : palette.grey[dark ? 700 : 200];
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(!value)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      width: size,
      height: size,
      borderRadius: size,
      backgroundColor: (0, _color.default)(backgroundColor).alpha(0.3).rgb().string()
    }, styles.container, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      width: frontSize,
      height: frontSize,
      borderRadius: frontSize,
      backgroundColor
    }, styles.iconContainer]
  }, value ? /*#__PURE__*/_react.default.createElement(_reactNativeEyecandyIcons.Check, {
    stroke: "white",
    size: 15
  }) : null)));
}

const styles = _reactNative.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

var _default = RadioButton;
exports.default = _default;
//# sourceMappingURL=RadioButton.js.map