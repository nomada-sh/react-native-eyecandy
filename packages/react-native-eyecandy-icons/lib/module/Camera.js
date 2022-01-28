import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const Camera = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "M5 7h1a2 2 0 0 0 2-2 1 1 0 0 1 1-1h6a1 1 0 0 1 1 1 2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement(Path, {
  d: "M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const Memo = /*#__PURE__*/memo(Camera);
export default Memo;
//# sourceMappingURL=Camera.js.map