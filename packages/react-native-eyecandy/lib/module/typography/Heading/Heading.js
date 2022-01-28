function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useTypography } from '@nomada-sh/react-native-eyecandy-theme';
import Text from '../Text';
export default function Heading(_ref) {
  let {
    variant = 'h1',
    weight = 'bold',
    ...props
  } = _ref;
  const size = useTypography(t => t.heading.fontSize[variant]);
  return /*#__PURE__*/React.createElement(Text, _extends({
    size: size,
    weight: weight
  }, props));
}
//# sourceMappingURL=Heading.js.map