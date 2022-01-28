"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPalette;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _Typography = _interopRequireDefault(require("./Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPalette(typography) {
  if (typography) return (0, _deepmerge.default)(_Typography.default, typography);
  return _Typography.default;
}
//# sourceMappingURL=createTypography.js.map