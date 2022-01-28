import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "m12 6 4 6 5-4-2 10H5L3 8l5 4 4-6Z",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const Memo = /*#__PURE__*/memo(SvgComponent);
export default Memo;
//# sourceMappingURL=Crown.js.map