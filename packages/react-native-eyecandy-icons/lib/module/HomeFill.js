function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const HomeFill = props => /*#__PURE__*/React.createElement(Icon, _extends({
  filled: true
}, props), /*#__PURE__*/React.createElement(Path, {
  d: "m19 8.71-5.333-4.148a2.666 2.666 0 0 0-3.274 0L5.059 8.71a2.665 2.665 0 0 0-1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.2c0-.823-.38-1.6-1.03-2.105Z",
  fill: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

export default /*#__PURE__*/React.memo(HomeFill);
//# sourceMappingURL=HomeFill.js.map