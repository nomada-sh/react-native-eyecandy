"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useBottomSheet;

var _react = require("react");

function useBottomSheet() {
  const ref = (0, _react.useRef)(null);
  return {
    ref,
    open: () => {
      var _ref$current;

      return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.open();
    },
    close: () => {
      var _ref$current2;

      return (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.close();
    }
  };
}
//# sourceMappingURL=useBottomSheet.js.map