import React from 'react';
import {
  Text as TextBase,
  TextProps as TextBaseProps,
  TextStyle,
} from 'react-native';

import {
  ThemeTextColorsChoices,
  useTheme,
} from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

import { isThemeTextColorsChoices } from '../../utils';

export interface TextProps extends TextBaseProps {
  weight?: TextStyle['fontWeight'] | 'semibold' | 'medium' | 'regular';
  size?: TextStyle['fontSize'];
  align?: TextStyle['textAlign'];
  contrast?: boolean;
  color?: ThemeTextColorsChoices | string;
  marginTop?: number;
  marginBottom?: number;
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
