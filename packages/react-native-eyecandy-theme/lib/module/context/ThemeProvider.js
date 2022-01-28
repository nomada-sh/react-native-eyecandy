function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { createContext } from 'react';
import { DefaultTheme } from '../themes';
export const ThemeContext = /*#__PURE__*/createContext(DefaultTheme);
export default function ThemeProvider(_ref) {
  let {
    theme = DefaultTheme,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, _extends({
    value: theme
  }, props));
}
//# sourceMappingURL=ThemeProvider.js.map