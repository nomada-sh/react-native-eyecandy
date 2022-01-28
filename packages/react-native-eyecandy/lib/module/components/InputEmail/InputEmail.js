function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import TextInput from '../TextInput';
import { Mail } from '@nomada-sh/react-native-eyecandy-icons';

function InputEmail(props) {
  return /*#__PURE__*/React.createElement(TextInput, _extends({
    required: true,
    autoCapitalize: "none",
    keyboardType: "email-address",
    placeholder: "Email",
    autoComplete: "email",
    startIcon: Mail
  }, props));
}

export default InputEmail;
//# sourceMappingURL=InputEmail.js.map