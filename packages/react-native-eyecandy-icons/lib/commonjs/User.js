"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeSvg = require("react-native-svg");

var _Icon = _interopRequireDefault(require("./Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SvgComponent = props => /*#__PURE__*/_react.default.createElement(_Icon.default, props, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
  d: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const User = /*#__PURE__*/(0, _react.memo)(SvgComponent);
var _default = User;
exports.default = _default;
//# sourceMappingURL=User.js.map