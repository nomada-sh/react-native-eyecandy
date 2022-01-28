"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _TextInput.default;
  }
});

var _TextInput = _interopRequireDefault(require("./TextInput"));

var _typings = require("./typings");

Object.keys(_typings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _typings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _typings[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map