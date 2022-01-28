"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeSvg = require("react-native-svg");

var _Icon = _interopRequireDefault(require("./Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Plus = props => /*#__PURE__*/_react.default.createElement(_Icon.default, props, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
  d: "M12 5v14m-7-7h14",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

var _default = /*#__PURE__*/_react.default.memo(Plus);

exports.default = _default;
//# sourceMappingURL=Plus.js.map