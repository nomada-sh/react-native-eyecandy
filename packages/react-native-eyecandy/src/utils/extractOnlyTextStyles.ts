import { TextStyle, ViewStyle } from 'react-native';

export function extractOnlyTextStyles(textStyle: TextStyle): TextStyle {
  const {
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    fontVariant,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecorationLine,
    textDecorationStyle,
    textDecorationColor,
    textShadowColor,
    textShadowOffset,
    textShadowRadius,
    textTransform,
    textAlignVertical,
    includeFontPadding,
    writingDirection,
  } = textStyle;

  return {
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontVariant,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecorationColor,
    textDecorationLine,
    textDecorationStyle,
    textShadowColor,
    textShadowOffset,
    textShadowRadius,
    textTransform,
    textAlignVertical,
    includeFontPadding,
    writingDirection,
  };
}
