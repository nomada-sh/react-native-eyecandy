"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../../hooks");

var _useStyles = _interopRequireDefault(require("./useStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function BaseButton(_ref) {
  let {
    children,
    style,
    buttonStyle,
    inverse,
    color,
    variant,
    height,
    fullwidth,
    disabled: disabledProp,
    loading,
    styles: customStyles = {},
    hideDisabledOverlay,
    ...props
  } = _ref;
  const disabled = (0, _react.useMemo)(() => disabledProp || loading, [disabledProp, loading]);
  const styles = (0, _useStyles.default)({
    color,
    inverse,
    variant,
    height,
    disabled,
    fullwidth
  });
  const getButtonStyle = (0, _hooks.usePressableStyles)([styles.button, buttonStyle, customStyles.button]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, style, customStyles.container]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, _extends({
    style: getButtonStyle,
    android_ripple: {
      color: styles.ripple.color
    },
    disabled: disabled
  }, props), children), disabled && !hideDisabledOverlay ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.disabled
  }) : null, loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.loadingContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: "large",
    color: styles.loading.color
  })) : null);
}

var _default = BaseButton;
exports.default = _default;
//# sourceMappingURL=BaseButton.js.map