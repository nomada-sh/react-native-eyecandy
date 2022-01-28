"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePickerSelect = _interopRequireDefault(require("react-native-picker-select"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

var _useStyles = _interopRequireDefault(require("./useStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Select(_ref) {
  let {
    items = [],
    onValueChange = () => {},
    value,
    color,
    icon: Icon,
    onFocus,
    onBlur,
    style,
    variant,
    pickerProps = {},
    placeholder: placeholderProp = 'Select an item...',
    androidItemSelectedColor = '#9ea0a4',
    ...props
  } = _ref;
  const placeholder = (0, _react.useMemo)(() => {
    let placeholderColor = _reactNative.Platform.OS === 'android' ? androidItemSelectedColor : undefined;
    return {
      label: placeholderProp,
      value: null,
      color: placeholderColor
    };
  }, [placeholderProp, androidItemSelectedColor]);
  const [focused, setFocused] = (0, _react.useState)(false);
  const styles = (0, _useStyles.default)({
    color,
    variant,
    value,
    focused,
    withPaddingStart: Icon === undefined
  });
  const selectRef = (0, _react.useRef)(null);
  const openPicker = (0, _react.useCallback)(() => {
    if (_reactNative.Platform.OS === 'android') {
      var _selectRef$current;

      (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.focus();
    } else {
      var _selectRef$current2;

      (_selectRef$current2 = selectRef.current) === null || _selectRef$current2 === void 0 ? void 0 : _selectRef$current2.togglePicker(true);
    }
  }, []);
  const handleFocus = (0, _react.useCallback)(() => {
    setFocused(true);
    onFocus === null || onFocus === void 0 ? void 0 : onFocus();
  }, [onFocus]);
  const handleBlur = (0, _react.useCallback)(() => {
    setFocused(false);
    onBlur === null || onBlur === void 0 ? void 0 : onBlur();
  }, [onBlur]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, style]
  }, Icon ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => openPicker()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    size: styles.icon.fontSize,
    stroke: styles.icon.color
  }))) : null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.selectContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNativePickerSelect.default, _extends({
    ref: _reactNative.Platform.OS === 'android' ? undefined : selectRef,
    pickerProps: { ...pickerProps,
      // @ts-ignore
      ref: _reactNative.Platform.OS === 'android' ? selectRef : undefined,
      onFocus: handleFocus,
      onBlur: handleBlur
    },
    useNativeAndroidPickerStyle: false,
    style: {
      inputAndroid: styles.input,
      inputIOS: styles.input,
      placeholder: styles.placeholder
    },
    items: items,
    onValueChange: onValueChange,
    value: value,
    placeholder: placeholder
  }, props))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => openPicker()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNativeEyecandyIcons.ChevronDown, {
    size: styles.icon.fontSize,
    stroke: focused ? styles.icon.color : styles.placeholder.color
  }))));
}

var _default = Select;
exports.default = _default;
//# sourceMappingURL=Select.js.map