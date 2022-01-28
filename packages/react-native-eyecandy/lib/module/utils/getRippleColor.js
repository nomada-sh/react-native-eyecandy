import Color from 'color';
const DARK_RIPPLE_COLOR = Color('rgba(255, 255, 255, 0.1)'),
      LIGHT_RIPPLE_COLOR = Color('rgba(0, 0, 0, 0.1)');
export default function getRippleColor(backgroundColor) {
  let lightRippleColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LIGHT_RIPPLE_COLOR;
  let darkRippleColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DARK_RIPPLE_COLOR;
  return Color(backgroundColor).isDark() ? Color(darkRippleColor) : Color(lightRippleColor);
}
//# sourceMappingURL=getRippleColor.js.map