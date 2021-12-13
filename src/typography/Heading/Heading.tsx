import React from 'react';
import { useTheme } from '../../hooks';
import type { ThemeHeadingFontSizes } from '../../theme';

import Text, { TextProps } from '../Text';

export interface HeadingProps extends Omit<TextProps, 'variant'> {
  variant?: keyof ThemeHeadingFontSizes;
}

export default function Heading({
  variant = 'h1',
  weight = 'bold',
  ...props
}: HeadingProps) {
  const size = useTheme().typography.heading.fontSize[variant];

  return <Text size={size} weight={weight} {...props} />;
}
