function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import TextInput from '../TextInput';
import { Lock } from '@nomada-sh/react-native-eyecandy-icons';

function InputPassword(props) {
  return /*#__PURE__*/React.createElement(TextInput, _extends({
    autoCapitalize: "none",
    autoComplete: "password",
    autoCorrect: false,
    placeholder: "Password",
    showSecureTextEntryToggle: true,
    secureTextEntry: true,
    startIcon: Lock
  }, props));
}

export default InputPassword;
//# sourceMappingURL=InputPassword.js.map