function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import BaseButton from '../BaseButton';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';

function IconButton(_ref) {
  let {
    icon: Icon,
    style,
    size = 56,
    iconSize: iconSizeProp,
    color = 'default',
    iconColor: iconColorProp,
    variant = 'rounded',
    inverse,
    ...props
  } = _ref;
  const {
    foreground,
    background
  } = useColors(c => c.button[color]);
  let icon = useMemo(() => {
    const iconSize = iconSizeProp !== null && iconSizeProp !== void 0 ? iconSizeProp : size * 0.4;
    const iconColor = iconColorProp ? iconColorProp : inverse ? background : foreground;
    return Icon ? /*#__PURE__*/React.createElement(Icon, {
      size: iconSize,
      stroke: iconColor
    }) : null;
  }, [Icon, background, foreground, iconColorProp, iconSizeProp, inverse, size]);
  return /*#__PURE__*/React.createElement(BaseButton, _extends({
    style: [{
      width: size,
      height: size
    }, style],
    color: color,
    inverse: inverse,
    height: size,
    variant: variant
  }, props), icon);
}

export default IconButton;
//# sourceMappingURL=IconButton.js.map