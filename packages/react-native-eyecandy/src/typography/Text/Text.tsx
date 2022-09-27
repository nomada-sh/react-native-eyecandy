import React from 'react';
import {
  Text as TextBase,
  TextProps as TextBaseProps,
  TextStyle,
} from 'react-native';

import {
  ThemeTextColorsChoices,
  useTheme,
  isThemeTextColorsChoices,
  ThemeTextWeights,
} from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';
import { LiteralUnion } from 'type-fest/source/literal-union';

export interface TextProps extends TextBaseProps {
  weight?: ThemeTextWeights;
  size?: TextStyle['fontSize'];
  align?: TextStyle['textAlign'];
  contrast?: boolean;
  color?: LiteralUnion<ThemeTextColorsChoices, string>;
  marginTop?: number;
  marginBottom?: number;
  bold?: boolean;
}

function Text({
  weight,
  style,
  size = 14,
  contrast = false,
  color = 'default',
  align,
  marginBottom,
  marginTop,
  bold,
  ...props
}: TextProps) {
  const { colors } = useTheme();

  let textColor: string = isThemeTextColorsChoices(color)
    ? colors.text[color].normal
    : color;

  if (contrast)
    textColor = isThemeTextColorsChoices(color)
      ? colors.text[color].contrast
      : Color(color).negate().string();

  let fontWeight: TextStyle['fontWeight'];

  switch (weight) {
    case 'semibold':
      fontWeight = '700';
      break;
    case 'regular':
      fontWeight = 'normal';
      break;
    case 'medium':
      fontWeight = '500';
      break;
    default:
      fontWeight = weight;
  }

  if (bold !== undefined) fontWeight = bold ? 'bold' : fontWeight;

  return (
    <TextBase
      style={[
        {
          fontWeight,
          fontSize: size,
          color: textColor,
          textAlign: align,
          marginBottom,
          marginTop,
        },
        style,
      ]}
      {...props}
    />
  );
}

export default Text;
