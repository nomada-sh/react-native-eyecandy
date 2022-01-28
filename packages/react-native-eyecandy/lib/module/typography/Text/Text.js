function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Text as TextBase } from 'react-native';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';

function Text(_ref) {
  let {
    weight,
    style,
    size = 14,
    contrast = false,
    color = 'default',
    customColor,
    align,
    ...props
  } = _ref;
  const colors = useColors(c => c.text[color]);
  let textColor = colors.normal;
  if (customColor) textColor = customColor;
  if (contrast) textColor = colors.contrast;
  let fontWeight;

  switch (weight) {
    case 'semibold':
      fontWeight = '700';
      break;

    case 'regular':
      fontWeight = 'normal';
      break;

    case 'medium':
      fontWeight = '500';
      break;

    default:
      fontWeight = weight;
  }

  return /*#__PURE__*/React.createElement(TextBase, _extends({
    style: [{
      fontWeight,
      fontSize: size,
      color: textColor,
      textAlign: align
    }, style]
  }, props));
}

export default Text;
//# sourceMappingURL=Text.js.map