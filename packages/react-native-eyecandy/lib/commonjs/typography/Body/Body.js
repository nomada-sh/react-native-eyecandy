"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _Text = _interopRequireDefault(require("../Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Body(_ref) {
  let {
    size = 'medium',
    ...props
  } = _ref;
  const fontSize = (0, _reactNativeEyecandyTheme.useTypography)(t => t.body.fontSize[size]);
  return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({
    size: fontSize
  }, props));
}

var _default = Body;
exports.default = _default;
//# sourceMappingURL=Body.js.map