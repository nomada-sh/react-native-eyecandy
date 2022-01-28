import React, { memo } from 'react';
import { Path } from 'react-native-svg';
import Icon from './Icon';

const SvgComponent = props => /*#__PURE__*/React.createElement(Icon, props, /*#__PURE__*/React.createElement(Path, {
  d: "m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const Search = /*#__PURE__*/memo(SvgComponent);
export default Search;
//# sourceMappingURL=Search.js.map