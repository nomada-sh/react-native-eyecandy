function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import SelectBase from 'react-native-picker-select';
import { ChevronDown } from '@nomada-sh/react-native-eyecandy-icons';
import useStyles from './useStyles';

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
  const placeholder = useMemo(() => {
    let placeholderColor = Platform.OS === 'android' ? androidItemSelectedColor : undefined;
    return {
      label: placeholderProp,
      value: null,
      color: placeholderColor
    };
  }, [placeholderProp, androidItemSelectedColor]);
  const [focused, setFocused] = useState(false);
  const styles = useStyles({
    color,
    variant,
    value,
    focused,
    withPaddingStart: Icon === undefined
  });
  const selectRef = useRef(null);
  const openPicker = useCallback(() => {
    if (Platform.OS === 'android') {
      var _selectRef$current;

      (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.focus();
    } else {
      var _selectRef$current2;

      (_selectRef$current2 = selectRef.current) === null || _selectRef$current2 === void 0 ? void 0 : _selectRef$current2.togglePicker(true);
    }
  }, []);
  const handleFocus = useCallback(() => {
    setFocused(true);
    onFocus === null || onFocus === void 0 ? void 0 : onFocus();
  }, [onFocus]);
  const handleBlur = useCallback(() => {
    setFocused(false);
    onBlur === null || onBlur === void 0 ? void 0 : onBlur();
  }, [onBlur]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style]
  }, Icon ? /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => openPicker()
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(Icon, {
    size: styles.icon.fontSize,
    stroke: styles.icon.color
  }))) : null, /*#__PURE__*/React.createElement(View, {
    style: styles.selectContainer
  }, /*#__PURE__*/React.createElement(SelectBase, _extends({
    ref: Platform.OS === 'android' ? undefined : selectRef,
    pickerProps: { ...pickerProps,
      // @ts-ignore
      ref: Platform.OS === 'android' ? selectRef : undefined,
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
  }, props))), /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => openPicker()
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, /*#__PURE__*/React.createElement(ChevronDown, {
    size: styles.icon.fontSize,
    stroke: focused ? styles.icon.color : styles.placeholder.color
  }))));
}

export default Select;
//# sourceMappingURL=Select.js.map