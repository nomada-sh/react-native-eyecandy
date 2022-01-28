"use strict";

var _wrap = _interopRequireDefault(require("./wrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('should get correct wrapped values', () => {
  expect((0, _wrap.default)(10, -1)).toBe(9);
  expect((0, _wrap.default)(10, 0)).toBe(0);
  expect((0, _wrap.default)(10, 10)).toBe(0);
  expect((0, _wrap.default)(10, -2)).toBe(8);
  expect((0, _wrap.default)(10, 20)).toBe(0);
});
//# sourceMappingURL=wrap.test.js.map