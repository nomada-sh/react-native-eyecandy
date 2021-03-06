import React from 'react';

import {
  useTypography,
  ThemeBodyFontSizesChoices,
} from '@nomada-sh/react-native-eyecandy-theme';

import { isThemeBodyFontSizes } from '../../utils';
import Text, { TextProps } from '../Text';

export interface BodyProps extends Omit<TextProps, 'size'> {
  size?: ThemeBodyFontSizesChoices | number;
}

function Body({ size = 'medium', ...props }: BodyProps) {
  const fontSize = useTypography(t =>
    isThemeBodyFontSizes(size) ? t.body.fontSize[size] : size,
  );

  return <Text size={fontSize} {...props} />;
}

export default Body;
