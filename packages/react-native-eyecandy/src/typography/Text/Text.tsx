import React from 'react';
import {
  Text as TextBase,
  TextProps as TextBaseProps,
  TextStyle,
} from 'react-native';

import { useColors, ThemeTextColorsChoices } from '@nomada-sh/react-native-eyecandy-theme';

export interface TextProps extends TextBaseProps {
  weight?: TextStyle['fontWeight'] | 'semibold' | 'medium' | 'regular';
  size?: TextStyle['fontSize'];
  align?: TextStyle['textAlign'];
  contrast?: boolean;
  color?: ThemeTextColorsChoices;
  customColor?: string;
}

function Text({
  weight,
  style,
  size = 14,
  contrast = false,
  color = 'default',
  customColor,
  align,
  ...props
}: TextProps) {
  const colors = useColors(c => c.text[color]);

  let textColor: string = colors.normal;

  if (customColor)
    textColor = customColor;
  if (contrast)
    textColor = colors.contrast;

  let fontWeight: TextStyle['fontWeight'];

  switch (weight) {
    case 'semibold':
      fontWeight = '700'
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
        },
        style,
      ]}
      {...props}
    />
  );
}

export default Text;
