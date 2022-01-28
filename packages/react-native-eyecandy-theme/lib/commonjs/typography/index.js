"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Typography: true,
  createTypography: true
};
Object.defineProperty(exports, "Typography", {
  enumerable: true,
  get: function () {
    return _Typography.default;
  }
});
Object.defineProperty(exports, "createTypography", {
  enumerable: true,
  get: function () {
    return _createTypography.default;
  }
});

var _Typography = _interopRequireDefault(require("./Typography"));

var _createTypography = _interopRequireDefault(require("./createTypography"));

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map