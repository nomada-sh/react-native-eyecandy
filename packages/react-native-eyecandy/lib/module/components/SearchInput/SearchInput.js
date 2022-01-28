function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../Button';
import TextInput from '../TextInput';
import { Search, Filter } from '@nomada-sh/react-native-eyecandy-icons';

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
  const [focused, setFocused] = useState(false);
  const shouldRenderCancelButton = focused && value && value.length > 0;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style]
  }, /*#__PURE__*/React.createElement(TextInput, _extends({
    onFocus: e => {
      setFocused(true);
      onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    },
    value: value,
    startIcon: Search,
    endIcon: Filter,
    onPressAction: onPressFilter,
    style: [styles.inputContainer, {
      marginEnd: shouldRenderCancelButton ? 8 : 0
    }]
  }, props)), shouldRenderCancelButton ? /*#__PURE__*/React.createElement(Button, {
    fullwidth: false,
    color: "primary",
    inverse: true,
    text: cancelButtonText,
    buttonStyle: styles.cancelButton,
    onPress: () => onPressCancel === null || onPressCancel === void 0 ? void 0 : onPressCancel()
  }) : null);
}

const styles = StyleSheet.create({
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
export default SearchInput;
//# sourceMappingURL=SearchInput.js.map