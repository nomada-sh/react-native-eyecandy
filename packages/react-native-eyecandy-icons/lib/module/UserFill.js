function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const UserFill = props => /*#__PURE__*/React.createElement(Icon, _extends({
  filled: true
}, props), /*#__PURE__*/React.createElement(Path, {
  d: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement(Path, {
  d: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2H6Z",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

export default /*#__PURE__*/React.memo(UserFill);
//# sourceMappingURL=UserFill.js.map