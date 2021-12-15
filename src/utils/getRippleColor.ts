import Color from 'color';

const DARK_RIPPLE_COLOR = Color('rgba(255, 255, 255, 0.1)'),
  LIGHT_RIPPLE_COLOR = Color('rbga(0, 0, 0, 0.1)');

type ColorType = string | Color;

export default function getRippleColor(
  backgroundColor: ColorType,
  lightRippleColor: ColorType = LIGHT_RIPPLE_COLOR,
  darkRippleColor: ColorType = DARK_RIPPLE_COLOR,
) {
  return Color(backgroundColor).isDark()
    ? Color(darkRippleColor)
    : Color(lightRippleColor);
}
