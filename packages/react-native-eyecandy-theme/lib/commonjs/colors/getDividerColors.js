"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeColors = _interopRequireDefault(require("./mergeColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getDividerColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: palette.grey[dark ? 800 : 200]
  };
  return (0, _mergeColors.default)({ ...options,
    defaultColors: defaultColors
  });
};

var _default = getDividerColors;
exports.default = _default;
//# sourceMappingURL=getDividerColors.js.map