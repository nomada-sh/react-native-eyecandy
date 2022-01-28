function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Switch as SwitchBase } from 'react-native';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';

function Switch(_ref) {
  let {
    color = 'default',
    ...props
  } = _ref;
  const colors = useColors(c => c.switch[color]);
  return /*#__PURE__*/React.createElement(SwitchBase, _extends({
    trackColor: {
      false: colors.trackColor,
      true: colors.trackColorEnabled
    },
    thumbColor: colors.thumbColor
  }, props));
}

export default Switch;
//# sourceMappingURL=Switch.js.map