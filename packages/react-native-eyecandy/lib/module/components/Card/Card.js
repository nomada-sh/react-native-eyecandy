function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

function Card(_ref) {
  let {
    style,
    ...props
  } = _ref;
  const {
    dark,
    palette
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [{
      backgroundColor: palette.grey[dark ? 800 : 100],
      padding: 16,
      borderRadius: 16,
      overflow: 'hidden'
    }, style]
  }, props));
}

export default Card;
//# sourceMappingURL=Card.js.map