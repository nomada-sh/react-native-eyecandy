function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import { Text } from '../../../typography';
const Cell = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    size = 56,
    index,
    value,
    focused,
    onPress,
    ...props
  } = _ref;
  const colors = useColors(c => c.input.default);
  return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => onPress === null || onPress === void 0 ? void 0 : onPress(index)
  }, /*#__PURE__*/React.createElement(View, _extends({
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
  }, props), /*#__PURE__*/React.createElement(Text, {
    size: size / 2.5,
    weight: "semibold"
  }, value)));
});
export default Cell;
//# sourceMappingURL=Cell.js.map