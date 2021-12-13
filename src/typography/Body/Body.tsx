import React from 'react';
import { useTheme } from '../../hooks';
import type { ThemeBodyFontSizes } from '../../theme';

import Text, { TextProps } from '../Text';

export interface BodyProps extends Omit<TextProps, 'size'> {
  size?: keyof ThemeBodyFontSizes;
}

function Body({ size = 'medium', ...props }: BodyProps) {
  const fontSize = useTheme().typography.body.fontSize[size];

  return <Text size={fontSize} {...props} />;
}

export default Body;
