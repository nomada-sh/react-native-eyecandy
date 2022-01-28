function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { TextInput as TextInputBase, View, TouchableWithoutFeedback } from 'react-native';
import TextInputErrors from '../TextInputErrors';
import { EyeCheck, EyeOff } from '@nomada-sh/react-native-eyecandy-icons';
import useStyles from './useStyles';
import useTextInput from './useTextInput';
export default function TextInput(_ref) {
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
  } = useTextInput({
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
  } = useStyles({
    color,
    focused,
    widthPaddingStart: StartIcon === undefined,
    widthPaddingEnd: !showSecureTextEntryToggle && EndIcon === undefined,
    value: value !== null && value !== void 0 ? value : defaultValue,
    hasError,
    fullWidth
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.inputContainer]
  }, StartIcon ? /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => onPressIcon()
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, renderIcon(StartIcon))) : null, /*#__PURE__*/React.createElement(TextInputBase, _extends({
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
  }, props)), EndIcon ? /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => onPressAction === null || onPressAction === void 0 ? void 0 : onPressAction()
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, renderIcon(EndIcon))) : null, showSecureTextEntryToggle ? /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => onPressSecureTextEntryToggle()
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, renderIcon(secureTextEntry ? EyeOff : EyeCheck, styles.inputPlaceholder.color))) : null), /*#__PURE__*/React.createElement(TextInputErrors, {
    error: error,
    errors: errors
  }));
}
//# sourceMappingURL=TextInput.js.map