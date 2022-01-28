function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import TextInput from '../TextInput';
import { User } from '@nomada-sh/react-native-eyecandy-icons';

function InputName(props) {
  return /*#__PURE__*/React.createElement(TextInput, _extends({
    autoCapitalize: "none",
    placeholder: "Name",
    autoComplete: "name",
    startIcon: User
  }, props));
}

export default InputName;
//# sourceMappingURL=InputName.js.map