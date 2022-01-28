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

const MoonSun = props => /*#__PURE__*/_react.default.createElement(_Icon.default, _extends({
  filled: true
}, props), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
  d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 0 1 0 16Z",
  fill: "currentColor"
}));

var _default = /*#__PURE__*/_react.default.memo(MoonSun);

exports.default = _default;
//# sourceMappingURL=MoonSun.js.map