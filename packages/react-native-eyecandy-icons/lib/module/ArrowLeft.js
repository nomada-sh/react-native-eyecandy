import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "M5 12h14M5 12l6 6m-6-6 6-6",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const ArrowLeft = /*#__PURE__*/memo(SvgComponent);
export default ArrowLeft;
//# sourceMappingURL=ArrowLeft.js.map