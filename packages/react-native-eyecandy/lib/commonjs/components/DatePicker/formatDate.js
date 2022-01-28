"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDate;

var _getLocale = _interopRequireDefault(require("./getLocale"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDate(date, format, locale) {
  return (0, _dateFns.format)(date, format, {
    locale: (0, _getLocale.default)(locale)
  });
}
//# sourceMappingURL=formatDate.js.map