function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import BaseButton from '../BaseButton';
import { Body } from '../../typography';
import useStyles from './useStyles';

function Button(_ref) {
  let {
    text,
    color,
    inverse,
    ...props
  } = _ref;
  const styles = useStyles({
    color,
    inverse
  });
  return /*#__PURE__*/React.createElement(BaseButton, _extends({
    color: color,
    inverse: inverse
  }, props), /*#__PURE__*/React.createElement(Body, {
    weight: "bold",
    size: "large",
    style: styles.text
  }, text));
}

export default Button;
//# sourceMappingURL=Button.js.map