function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Heading from './Heading';
export default function H1(props) {
  return /*#__PURE__*/React.createElement(Heading, _extends({
    variant: "h1"
  }, props));
}
//# sourceMappingURL=H1.js.map