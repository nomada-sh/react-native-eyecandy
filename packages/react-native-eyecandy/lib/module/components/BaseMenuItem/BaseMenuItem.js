import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import IconButton from '../IconButton';
import { useRippleColor } from '../../hooks';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';

function BaseMenuItem(_ref) {
  let {
    style,
    icon,
    iconColor,
    iconBackgroundColor,
    separator = false,
    onPress,
    children
  } = _ref;
  const {
    background,
    divider
  } = useColors(c => ({
    background: c.background.default,
    divider: c.divider.default
  }));
  const rippleColor = useRippleColor(background.container);
  return /*#__PURE__*/React.createElement(Pressable, {
    android_ripple: {
      color: rippleColor.string()
    },
    style: [{
      backgroundColor: background.container
    }, styles.container, style],
    onPress: onPress
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, icon && /*#__PURE__*/React.createElement(IconButton, {
    variant: "transparent-rounded",
    style: styles.icon,
    buttonStyle: {
      backgroundColor: iconBackgroundColor
    },
    icon: icon,
    iconColor: iconColor,
    size: 40,
    iconSize: 22,
    disabled: true,
    hideDisabledOverlay: true
  }), children), separator ? /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor: divider
    }, styles.separator]
  }) : null);
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  text: {
    flex: 1
  },
  icon: {
    marginEnd: 16
  },
  separator: {
    height: 1,
    width: '100%'
  }
});
export default BaseMenuItem;
//# sourceMappingURL=BaseMenuItem.js.map