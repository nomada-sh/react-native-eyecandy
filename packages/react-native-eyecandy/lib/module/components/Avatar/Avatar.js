function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { ms } from '../../utils';

function Avatar(_ref) {
  let {
    size = ms(64),
    style,
    ...props
  } = _ref;
  const {
    dark,
    palette
  } = useTheme();
  return /*#__PURE__*/React.createElement(ImageBackground, _extends({
    style: [{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: palette.grey[dark ? 800 : 100]
    }, styles.container, style]
  }, props));
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});
export default Avatar;
//# sourceMappingURL=Avatar.js.map