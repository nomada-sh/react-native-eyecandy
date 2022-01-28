import React from 'react';
import { StyleSheet } from 'react-native';
import BaseMenuItem from '../BaseMenuItem';
import { Body } from '../../typography';
import Switch from '../Switch';

function MenuItemSwitch(_ref) {
  let {
    textColor,
    text,
    value,
    onValueChange,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(BaseMenuItem, props, /*#__PURE__*/React.createElement(Body, {
    style: styles.text,
    weight: "bold",
    size: "medium",
    customColor: textColor
  }, text), /*#__PURE__*/React.createElement(Switch, {
    value: value,
    onValueChange: onValueChange
  }));
}

const styles = StyleSheet.create({
  text: {
    flex: 1
  }
});
export default MenuItemSwitch;
//# sourceMappingURL=MenuItemSwitch.js.map