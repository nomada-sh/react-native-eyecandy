"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeColors = _interopRequireDefault(require("./mergeColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTextColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: {
      normal: palette.grey[dark ? 100 : 900],
      contrast: palette.grey[dark ? 900 : 100]
    },
    primary: {
      normal: palette.primary[500],
      contrast: palette.primary[100]
    },
    error: {
      normal: palette.error[200],
      contrast: palette.grey[100]
    },
    greyout: {
      normal: palette.grey[dark ? 400 : 500],
      contrast: palette.grey[dark ? 500 : 400]
    }
  };
  return (0, _mergeColors.default)({ ...options,
    defaultColors: defaultColors
  });
};

var _default = getTextColors;
exports.default = _default;
//# sourceMappingURL=getTextColors.js.map