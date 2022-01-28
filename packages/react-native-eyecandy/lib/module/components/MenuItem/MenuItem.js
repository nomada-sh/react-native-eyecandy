import React from 'react';
import { StyleSheet } from 'react-native';
import BaseMenuItem from '../BaseMenuItem';
import { ChevronRight } from '@nomada-sh/react-native-eyecandy-icons';
import { Body } from '../../typography';

function MenuItem(_ref) {
  let {
    textColor,
    text,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(BaseMenuItem, props, /*#__PURE__*/React.createElement(Body, {
    style: styles.text,
    weight: "bold",
    size: "medium",
    customColor: textColor
  }, text), /*#__PURE__*/React.createElement(ChevronRight, {
    size: 16,
    color: "greyout"
  }));
}

const styles = StyleSheet.create({
  text: {
    flex: 1
  }
});
export default MenuItem;
//# sourceMappingURL=MenuItem.js.map