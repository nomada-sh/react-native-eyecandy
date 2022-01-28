import { Dimensions } from 'react-native';
const {
  width,
  height
} = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width]; // Default guideline sizes are based on Figma's iPhone 13 mini frame.

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
export const scale = size => shortDimension / guidelineBaseWidth * size;
export const verticalScale = size => longDimension / guidelineBaseHeight * size;
export const moderateScale = function (size) {
  let factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return size + (scale(size) - size) * factor;
};
export const moderateVerticalScale = function (size) {
  let factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return size + (verticalScale(size) - size) * factor;
};
export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
//# sourceMappingURL=scaling.js.map