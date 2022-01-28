"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vs = exports.verticalScale = exports.scale = exports.s = exports.mvs = exports.ms = exports.moderateVerticalScale = exports.moderateScale = void 0;

var _reactNative = require("react-native");

const {
  width,
  height
} = _reactNative.Dimensions.get('window');

const [shortDimension, longDimension] = width < height ? [width, height] : [height, width]; // Default guideline sizes are based on Figma's iPhone 13 mini frame.

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => shortDimension / guidelineBaseWidth * size;

exports.scale = scale;

const verticalScale = size => longDimension / guidelineBaseHeight * size;

exports.verticalScale = verticalScale;

const moderateScale = function (size) {
  let factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return size + (scale(size) - size) * factor;
};

exports.moderateScale = moderateScale;

const moderateVerticalScale = function (size) {
  let factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return size + (verticalScale(size) - size) * factor;
};

exports.moderateVerticalScale = moderateVerticalScale;
const s = scale;
exports.s = s;
const vs = verticalScale;
exports.vs = vs;
const ms = moderateScale;
exports.ms = ms;
const mvs = moderateVerticalScale;
exports.mvs = mvs;
//# sourceMappingURL=scaling.js.map