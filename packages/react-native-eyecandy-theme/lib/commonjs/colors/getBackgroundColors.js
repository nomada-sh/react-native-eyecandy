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
      container: dark ? palette.grey[900] : 'white',
      content: dark ? palette.grey[900] : 'white'
    }
  };
  return (0, _mergeColors.default)({ ...options,
    defaultColors: defaultColors
  });
};

var _default = getButtonColors;
exports.default = _default;
//# sourceMappingURL=getBackgroundColors.js.map