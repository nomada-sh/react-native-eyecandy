import React from 'react';
import { useTypography, ThemeBodyFontSizes } from '@nomada-sh/react-native-eyecandy-theme';

import Text, { TextProps } from '../Text';

export interface BodyProps extends Omit<TextProps, 'size'> {
  size?: keyof ThemeBodyFontSizes;
}

function Body({ size = 'medium', ...props }: BodyProps) {
  const fontSize = useTypography(t => t.body.fontSize[size]);

  return <Text size={fontSize} {...props} />;
}

export default Body;
