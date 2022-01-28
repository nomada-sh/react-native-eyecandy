"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextInput;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _TextInputErrors = _interopRequireDefault(require("../TextInputErrors"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

var _useStyles = _interopRequireDefault(require("./useStyles"));

var _useTextInput = _interopRequireDefault(require("./useTextInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TextInput(_ref) {
  let {
    startIcon: StartIcon,
    endIcon: EndIcon,
    onPressAction,
    style,
    inputStyle,
    secureTextEntry: secureTextEntryProp,
    showSecureTextEntryToggle,
    onSecureTextEntryChange = () => {},
    color = 'default',
    value,
    defaultValue,
    onFocus: onFocus,
    onBlur: onBlur,
    inputRef: inputRefProp,
    error,
    errors,
    required,
    fullWidth,
    placeholder: placeholderProp,
    ...props
  } = _ref;
  const {
    inputRef,
    focused,
    handleBlur,
    handleFocus,
    onPressIcon,
    onPressSecureTextEntryToggle,
    secureTextEntry,
    hasError,
    placeholder
  } = (0, _useTextInput.default)({
    onBlur,
    onFocus,
    onSecureTextEntryChange,
    secureTextEntry: secureTextEntryProp,
    inputRef: inputRefProp,
    error,
    errors,
    required,
    placeholder: placeholderProp
  });
  const {
    styles,
    keyboardAppearance,
    renderIcon
  } = (0, _useStyles.default)({
    color,
    focused,
    widthPaddingStart: StartIcon === undefined,
    widthPaddingEnd: !showSecureTextEntryToggle && EndIcon === undefined,
    value: value !== null && value !== void 0 ? value : defaultValue,
    hasError,
    fullWidth
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.inputContainer]
  }, StartIcon ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => onPressIcon()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, renderIcon(StartIcon))) : null, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    onFocus: handleFocus,
    onBlur: handleBlur,
    secureTextEntry: secureTextEntry,
    ref: inputRef,
    placeholderTextColor: styles.inputPlaceholder.color,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    style: [styles.input, inputStyle],
    keyboardAppearance: keyboardAppearance,
    disableFullscreenUI: true
  }, props)), EndIcon ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => onPressAction === null || onPressAction === void 0 ? void 0 : onPressAction()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, renderIcon(EndIcon))) : null, showSecureTextEntryToggle ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => onPressSecureTextEntryToggle()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, renderIcon(secureTextEntry ? _reactNativeEyecandyIcons.EyeOff : _reactNativeEyecandyIcons.EyeCheck, styles.inputPlaceholder.color))) : null), /*#__PURE__*/_react.default.createElement(_TextInputErrors.default, {
    error: error,
    errors: errors
  }));
}
//# sourceMappingURL=TextInput.js.map