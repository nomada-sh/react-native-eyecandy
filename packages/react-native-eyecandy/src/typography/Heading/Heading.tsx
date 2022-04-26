import React from 'react';

import {
  useTypography,
  ThemeHeadingVariants,
} from '@nomada-sh/react-native-eyecandy-theme';

import Text, { TextProps } from '../Text';

export interface HeadingProps extends Omit<TextProps, 'variant'> {
  variant?: ThemeHeadingVariants;
}

export default function Heading({
  variant = 'h1',
  weight = 'bold',
  ...props
}: HeadingProps) {
  const size = useTypography(t => t.heading.fontSize[variant]);

  return <Text size={size} weight={weight} {...props} />;
}
