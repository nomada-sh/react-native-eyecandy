"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Palette: true,
  createPalette: true
};
Object.defineProperty(exports, "Palette", {
  enumerable: true,
  get: function () {
    return _Palette.default;
  }
});
Object.defineProperty(exports, "createPalette", {
  enumerable: true,
  get: function () {
    return _createPalette.default;
  }
});

var _Palette = _interopRequireDefault(require("./Palette"));

var _createPalette = _interopRequireDefault(require("./createPalette"));

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