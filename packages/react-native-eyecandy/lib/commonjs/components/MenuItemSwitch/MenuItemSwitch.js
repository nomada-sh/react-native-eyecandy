"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _BaseMenuItem = _interopRequireDefault(require("../BaseMenuItem"));

var _typography = require("../../typography");

var _Switch = _interopRequireDefault(require("../Switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MenuItemSwitch(_ref) {
  let {
    textColor,
    text,
    value,
    onValueChange,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_BaseMenuItem.default, props, /*#__PURE__*/_react.default.createElement(_typography.Body, {
    style: styles.text,
    weight: "bold",
    size: "medium",
    customColor: textColor
  }, text), /*#__PURE__*/_react.default.createElement(_Switch.default, {
    value: value,
    onValueChange: onValueChange
  }));
}

const styles = _reactNative.StyleSheet.create({
  text: {
    flex: 1
  }
});

var _default = MenuItemSwitch;
exports.default = _default;
//# sourceMappingURL=MenuItemSwitch.js.map