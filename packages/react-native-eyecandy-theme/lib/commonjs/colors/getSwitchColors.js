"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeColors = _interopRequireDefault(require("./mergeColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSwitchColors = options => {
  const {
    dark,
    palette
  } = options;
  const defaultColors = {
    default: {
      thumbColor: palette.grey[100],
      trackColor: palette.grey[dark ? 800 : 200],
      trackColorEnabled: palette.primary[500]
    }
  };
  return (0, _mergeColors.default)({ ...options,
    defaultColors: defaultColors
  });
};

var _default = getSwitchColors;
exports.default = _default;
//# sourceMappingURL=getSwitchColors.js.map