"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeColors = _interopRequireDefault(require("./mergeColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getInputColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: {
      background: palette.grey[dark ? 800 : 100],
      foreground: palette.grey[dark ? 50 : 900],
      placeholder: palette.grey[500],
      border: palette.grey[dark ? 800 : 300],
      focused: {
        background: palette.grey[dark ? 900 : 200],
        indicator: palette.primary[500]
      }
    }
  };
  return (0, _mergeColors.default)({ ...options,
    defaultColors: defaultColors
  });
};

var _default = getInputColors;
exports.default = _default;
//# sourceMappingURL=getInputColors.js.map