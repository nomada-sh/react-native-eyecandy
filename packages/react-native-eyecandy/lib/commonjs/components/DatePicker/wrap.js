"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrap;

function wrap(m, n) {
  'worklet';

  return n >= 0 ? n % m : (n % m + m) % m;
}
//# sourceMappingURL=wrap.js.map