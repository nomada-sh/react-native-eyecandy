import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "m6 9 6 6 6-6",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const ChevronDown = /*#__PURE__*/memo(SvgComponent);
export default ChevronDown;
//# sourceMappingURL=ChevronDown.js.map