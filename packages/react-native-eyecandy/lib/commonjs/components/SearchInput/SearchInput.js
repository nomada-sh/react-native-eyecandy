"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Button = _interopRequireDefault(require("../Button"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SearchInput(_ref) {
  let {
    style,
    value,
    cancelButtonText = 'Cancel',
    onPressCancel,
    onPressFilter,
    onFocus,
    onBlur,
    ...props
  } = _ref;
  const [focused, setFocused] = (0, _react.useState)(false);
  const shouldRenderCancelButton = focused && value && value.length > 0;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, style]
  }, /*#__PURE__*/_react.default.createElement(_TextInput.default, _extends({
    onFocus: e => {
      setFocused(true);
      onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    },
    value: value,
    startIcon: _reactNativeEyecandyIcons.Search,
    endIcon: _reactNativeEyecandyIcons.Filter,
    onPressAction: onPressFilter,
    style: [styles.inputContainer, {
      marginEnd: shouldRenderCancelButton ? 8 : 0
    }]
  }, props)), shouldRenderCancelButton ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    fullwidth: false,
    color: "primary",
    inverse: true,
    text: cancelButtonText,
    buttonStyle: styles.cancelButton,
    onPress: () => onPressCancel === null || onPressCancel === void 0 ? void 0 : onPressCancel()
  }) : null);
}

const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 1
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12
  }
});

var _default = SearchInput;
exports.default = _default;
//# sourceMappingURL=SearchInput.js.map