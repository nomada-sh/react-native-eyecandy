"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeSvg = require("react-native-svg");

var _Icon = _interopRequireDefault(require("./Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const UserFill = props => /*#__PURE__*/_react.default.createElement(_Icon.default, _extends({
  filled: true
}, props), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
  d: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2",
  fill: "currentColor"
}), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
  d: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2H6Z",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

var _default = /*#__PURE__*/_react.default.memo(UserFill);

exports.default = _default;
//# sourceMappingURL=UserFill.js.map