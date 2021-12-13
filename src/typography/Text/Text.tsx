import React, { useMemo } from 'react';
import {
  Text as TextBase,
  TextProps as TextBaseProps,
  TextStyle,
} from 'react-native';

import { useTheme } from '../../hooks';
import type { TextColors } from '../../theme';

export interface TextProps extends TextBaseProps {
  weight?: TextStyle['fontWeight'] | 'semibold' | 'medium' | 'regular';
  size?: TextStyle['fontSize'];
  align?: TextStyle['textAlign'];
  contrast?: boolean;
  color?: TextColors;
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
  const colors = useTheme().components.text[color];
  const textColor = useMemo(() => {
    if (customColor) return customColor;
    if (contrast) return colors.contrast;
    return colors.normal;
  }, [colors, contrast, customColor]);

  let fontWeight = useMemo(() => {
    switch (weight) {
      case 'semibold':
        return '700';
      case 'regular':
        return 'normal';
      case 'medium':
        return '500';
    }
    return weight;
  }, [weight]);

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
