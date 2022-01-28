function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { RefreshControl as RefreshControlBase } from 'react-native';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

function RefreshControl(props) {
  const {
    palette
  } = useTheme();
  return /*#__PURE__*/React.createElement(RefreshControlBase, _extends({
    progressBackgroundColor: palette.white,
    colors: [palette.primary[500]],
    tintColor: palette.primary[500]
  }, props));
}

export default RefreshControl;
//# sourceMappingURL=RefreshControl.js.map