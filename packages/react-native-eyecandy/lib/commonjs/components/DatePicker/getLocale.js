"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _locale = require("date-fns/locale");

function _default(locale) {
  switch (locale) {
    case 'en-US':
      return _locale.enUS;

    case 'es':
      return _locale.es;

    default:
      console.warn(`Unsupported locale: ${locale} falling back to en-US`);
      return _locale.enUS;
  }
}
//# sourceMappingURL=getLocale.js.map