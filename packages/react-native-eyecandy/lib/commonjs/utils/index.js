"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ActionSheet: true,
  getRippleColor: true
};
Object.defineProperty(exports, "ActionSheet", {
  enumerable: true,
  get: function () {
    return _ActionSheet.default;
  }
});
Object.defineProperty(exports, "getRippleColor", {
  enumerable: true,
  get: function () {
    return _getRippleColor.default;
  }
});

var _ActionSheet = _interopRequireDefault(require("./ActionSheet"));

var _getRippleColor = _interopRequireDefault(require("./getRippleColor"));

var _scaling = require("./scaling");

Object.keys(_scaling).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scaling[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scaling[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map