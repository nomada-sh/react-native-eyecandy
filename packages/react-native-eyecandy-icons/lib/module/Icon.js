function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Svg from 'react-native-svg';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
export default function Icon(_ref) {
  let {
    size = 24,
    stroke: strokeProp,
    fill: fillProp,
    color = 'default',
    filled,
    ...props
  } = _ref;
  const colors = useColors(c => c.text);
  const stroke = strokeProp || colors[color].normal;
  const fill = fillProp || (filled ? stroke : undefined);
  return /*#__PURE__*/React.createElement(Svg, _extends({
    preserveAspectRatio: "none",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: stroke,
    color: fill
  }, props));
}
//# sourceMappingURL=Icon.js.map