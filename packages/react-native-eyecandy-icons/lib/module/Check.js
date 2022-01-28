import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "m5 12 5 5L20 7",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const Check = /*#__PURE__*/memo(SvgComponent);
export default Check;
//# sourceMappingURL=Check.js.map