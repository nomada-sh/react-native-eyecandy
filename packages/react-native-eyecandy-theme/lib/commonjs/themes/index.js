"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createTheme: true,
  DefaultTheme: true,
  DarkTheme: true
};
Object.defineProperty(exports, "DarkTheme", {
  enumerable: true,
  get: function () {
    return _DarkTheme.default;
  }
});
Object.defineProperty(exports, "DefaultTheme", {
  enumerable: true,
  get: function () {
    return _DefaultTheme.default;
  }
});
Object.defineProperty(exports, "createTheme", {
  enumerable: true,
  get: function () {
    return _createTheme.default;
  }
});

var _createTheme = _interopRequireDefault(require("./createTheme"));

var _DefaultTheme = _interopRequireDefault(require("./DefaultTheme"));

var _DarkTheme = _interopRequireDefault(require("./DarkTheme"));

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