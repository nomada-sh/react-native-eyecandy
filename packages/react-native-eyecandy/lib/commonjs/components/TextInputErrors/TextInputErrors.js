"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _typography = require("../../typography");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TextInputErrors(_ref) {
  let {
    errors = [],
    error
  } = _ref;
  const isEmpty = (0, _react.useMemo)(() => !errors.length && !error, [errors.length, error]);
  const containerStyle = (0, _react.useMemo)(() => ({
    marginTop: isEmpty ? 0 : 4,
    marginLeft: isEmpty ? 0 : 12
  }), [isEmpty]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: containerStyle
  }, error && error[0] && /*#__PURE__*/_react.default.createElement(_typography.Body, {
    size: "small",
    color: "error"
  }, error[1]), errors.map((_ref2, index) => {
    let [e, message] = _ref2;
    return e ? /*#__PURE__*/_react.default.createElement(_typography.Body, {
      key: index,
      color: "error",
      size: "small"
    }, message) : null;
  }));
}

var _default = TextInputErrors;
exports.default = _default;
//# sourceMappingURL=TextInputErrors.js.map