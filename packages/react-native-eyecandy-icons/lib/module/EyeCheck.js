import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement(Path, {
  d: "M12 19c-4 0-7.333-2.333-10-7 2.667-4.667 6-7 10-7s7.333 2.333 10 7c-.42.736-.858 1.414-1.311 2.033M15 19l2 2 4-4",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const EyeCheck = /*#__PURE__*/memo(SvgComponent);
export default EyeCheck;
//# sourceMappingURL=EyeCheck.js.map