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
  d: "M10.33 16.593h-6.3M13.14 6.9h6.301",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
  clipRule: "evenodd",
  d: "M8.726 6.846A2.355 2.355 0 0 0 6.363 4.5 2.355 2.355 0 0 0 4 6.846a2.355 2.355 0 0 0 2.363 2.347 2.355 2.355 0 0 0 2.363-2.347ZM20 16.554a2.354 2.354 0 0 0-2.362-2.346 2.355 2.355 0 0 0-2.364 2.346 2.355 2.355 0 0 0 2.364 2.346A2.354 2.354 0 0 0 20 16.554Z",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

const Filter = /*#__PURE__*/(0, _react.memo)(SvgComponent);
var _default = Filter;
exports.default = _default;
//# sourceMappingURL=Filter.js.map