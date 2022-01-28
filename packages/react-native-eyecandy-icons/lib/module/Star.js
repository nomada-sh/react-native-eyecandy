import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "m12 17.75-6.172 3.245 1.179-6.873-5-4.867 6.9-1 3.086-6.253 3.086 6.253 6.9 1-5 4.867 1.179 6.873L12 17.75Z",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const Star = /*#__PURE__*/memo(SvgComponent);
export default Star;
//# sourceMappingURL=Star.js.map