function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import SwipeButtonBase from 'rn-swipe-button';
import Color from 'color';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { ChevronRight } from '@nomada-sh/react-native-eyecandy-icons'; // TODO: Fix thumbIconComponent type.

const ThumbIcon = () => /*#__PURE__*/React.createElement(ChevronRight, {
  stroke: "white",
  size: 40
});

function SwipeButton(_ref) {
  let {
    titleStyles,
    containerStyles,
    thumbIconStyles,
    title = '',
    ...props
  } = _ref;
  const {
    typography,
    colors
  } = useTheme(t => ({
    typography: t.typography,
    colors: t.colors.button.primary
  }));
  const fillColor = Color(colors.background).rgb().darken(0.3).alpha(0.8).string();
  const thumbColor = Color(colors.background).darken(0.4).string();
  return /*#__PURE__*/React.createElement(SwipeButtonBase, _extends({
    title: title,
    containerStyles: StyleSheet.flatten([{
      borderWidth: 0,
      width: '100%'
    }, containerStyles]),
    titleStyles: StyleSheet.flatten([{
      fontSize: typography.body.fontSize.medium,
      fontWeight: 'bold',
      color: colors.foreground
    }, titleStyles]),
    thumbIconStyles: StyleSheet.flatten([{
      borderWidth: 0
    }, thumbIconStyles]) // @ts-ignore
    ,
    thumbIconComponent: ThumbIcon,
    railBackgroundColor: colors.background,
    railFillBackgroundColor: fillColor,
    railFillBorderColor: fillColor,
    thumbIconBackgroundColor: thumbColor,
    thumbIconBorderColor: thumbColor
  }, props));
}

export default SwipeButton;
//# sourceMappingURL=SwipeButton.js.map