function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const MoonSun = props => /*#__PURE__*/React.createElement(Icon, _extends({
  filled: true
}, props), /*#__PURE__*/React.createElement(Path, {
  d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 0 1 0 16Z",
  fill: "currentColor"
}));

export default /*#__PURE__*/React.memo(MoonSun);
//# sourceMappingURL=MoonSun.js.map