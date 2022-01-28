"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HeadingFontSizes = exports.BodyFontSizes = void 0;
const HeadingFontSizes = {
  h1: 48,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 20,
  h6: 18
};
exports.HeadingFontSizes = HeadingFontSizes;
const BodyFontSizes = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18
};
exports.BodyFontSizes = BodyFontSizes;
const Typography = {
  heading: {
    fontSize: HeadingFontSizes
  },
  body: {
    fontSize: BodyFontSizes
  }
};
var _default = Typography;
exports.default = _default;
//# sourceMappingURL=Typography.js.map