import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Color from 'color';
import { Check } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

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
  } = useTheme();
  const frontSize = size - 10;
  const backgroundColor = value ? palette.success[200] : palette.grey[dark ? 700 : 200];
  return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(!value)
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      width: size,
      height: size,
      borderRadius: size,
      backgroundColor: Color(backgroundColor).alpha(0.3).rgb().string()
    }, styles.container, style]
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      width: frontSize,
      height: frontSize,
      borderRadius: frontSize,
      backgroundColor
    }, styles.iconContainer]
  }, value ? /*#__PURE__*/React.createElement(Check, {
    stroke: "white",
    size: 15
  }) : null)));
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default RadioButton;
//# sourceMappingURL=RadioButton.js.map