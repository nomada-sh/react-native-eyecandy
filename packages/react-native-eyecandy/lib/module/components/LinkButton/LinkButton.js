function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import BaseButton from '../BaseButton';
import { useTheme, useColors } from '@nomada-sh/react-native-eyecandy-theme';
import { usePressableStyles } from '../../hooks';
import { ChevronRight } from '@nomada-sh/react-native-eyecandy-icons';
import { Body } from '../../typography';

function LinkButton(_ref) {
  let {
    text,
    icon,
    buttonStyle,
    color = 'default',
    showChevron = true,
    bold,
    focused,
    ...props
  } = _ref;
  const {
    palette
  } = useTheme();
  const colors = useColors(c => c.button[color]);
  const Icon = icon;
  const buttonStyles = usePressableStyles([styles.button, buttonStyle, {
    borderColor: focused ? palette.primary[500] : colors.background
  }]);
  const textStyle = {
    color: colors.foreground,
    fontWeight: bold ? 'bold' : 'normal'
  };
  return /*#__PURE__*/React.createElement(BaseButton, _extends({
    color: color,
    buttonStyle: buttonStyles
  }, props), Icon ? /*#__PURE__*/React.createElement(Icon, {
    style: styles.icon,
    size: 20,
    stroke: focused ? palette.primary[500] : textStyle.color
  }) : null, /*#__PURE__*/React.createElement(Body, {
    style: [textStyle, styles.text]
  }, text), showChevron ? /*#__PURE__*/React.createElement(ChevronRight, {
    color: "greyout",
    size: 20
  }) : null);
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderWidth: 1
  },
  text: {
    flex: 1,
    marginEnd: 16
  },
  icon: {
    marginEnd: 16
  }
});
export default LinkButton;
//# sourceMappingURL=LinkButton.js.map