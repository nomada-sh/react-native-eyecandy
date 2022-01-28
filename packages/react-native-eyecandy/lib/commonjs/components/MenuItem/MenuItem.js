"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _BaseMenuItem = _interopRequireDefault(require("../BaseMenuItem"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

var _typography = require("../../typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MenuItem(_ref) {
  let {
    textColor,
    text,
    ...props
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_BaseMenuItem.default, props, /*#__PURE__*/_react.default.createElement(_typography.Body, {
    style: styles.text,
    weight: "bold",
    size: "medium",
    customColor: textColor
  }, text), /*#__PURE__*/_react.default.createElement(_reactNativeEyecandyIcons.ChevronRight, {
    size: 16,
    color: "greyout"
  }));
}

const styles = _reactNative.StyleSheet.create({
  text: {
    flex: 1
  }
});

var _default = MenuItem;
exports.default = _default;
//# sourceMappingURL=MenuItem.js.map