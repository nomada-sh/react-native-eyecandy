"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = H2;

var _react = _interopRequireDefault(require("react"));

var _Heading = _interopRequireDefault(require("./Heading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function H2(props) {
  return /*#__PURE__*/_react.default.createElement(_Heading.default, _extends({
    variant: "h2"
  }, props));
}
//# sourceMappingURL=H2.js.map