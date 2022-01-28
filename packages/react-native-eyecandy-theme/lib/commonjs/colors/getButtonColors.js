"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeColors = _interopRequireDefault(require("./mergeColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getButtonColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: {
      background: palette.grey[dark ? 800 : 100],
      foreground: palette.grey[dark ? 100 : 800]
    },
    primary: {
      background: palette.primary['500'],
      foreground: palette.primary['100']
    }
  };
  return (0, _mergeColors.default)({ ...options,
    defaultColors: defaultColors
  });
};

var _default = getButtonColors;
exports.default = _default;
//# sourceMappingURL=getButtonColors.js.map