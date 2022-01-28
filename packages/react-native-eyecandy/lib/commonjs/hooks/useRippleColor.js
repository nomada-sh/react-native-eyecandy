"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRippleColor;

var _react = require("react");

var _utils = require("../utils");

function useRippleColor(backgroundColor, lightRippleColor, darkRippleColor) {
  return (0, _react.useMemo)(() => (0, _utils.getRippleColor)(backgroundColor, lightRippleColor, darkRippleColor), [backgroundColor, darkRippleColor, lightRippleColor]);
}
//# sourceMappingURL=useRippleColor.js.map