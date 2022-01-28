"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function InputEmail(props) {
  return /*#__PURE__*/_react.default.createElement(_TextInput.default, _extends({
    required: true,
    autoCapitalize: "none",
    keyboardType: "email-address",
    placeholder: "Email",
    autoComplete: "email",
    startIcon: _reactNativeEyecandyIcons.Mail
  }, props));
}

var _default = InputEmail;
exports.default = _default;
//# sourceMappingURL=InputEmail.js.map