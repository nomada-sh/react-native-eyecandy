"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _BaseButton = _interopRequireDefault(require("../BaseButton"));

var _typography = require("../../typography");

var _useStyles = _interopRequireDefault(require("./useStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Button(_ref) {
  let {
    text,
    color,
    inverse,
    ...props
  } = _ref;
  const styles = (0, _useStyles.default)({
    color,
    inverse
  });
  return /*#__PURE__*/_react.default.createElement(_BaseButton.default, _extends({
    color: color,
    inverse: inverse
  }, props), /*#__PURE__*/_react.default.createElement(_typography.Body, {
    weight: "bold",
    size: "large",
    style: styles.text
  }, text));
}

var _default = Button;
exports.default = _default;
//# sourceMappingURL=Button.js.map