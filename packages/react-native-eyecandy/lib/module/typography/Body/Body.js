function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useTypography } from '@nomada-sh/react-native-eyecandy-theme';
import Text from '../Text';

function Body(_ref) {
  let {
    size = 'medium',
    ...props
  } = _ref;
  const fontSize = useTypography(t => t.body.fontSize[size]);
  return /*#__PURE__*/React.createElement(Text, _extends({
    size: fontSize
  }, props));
}

export default Body;
//# sourceMappingURL=Body.js.map