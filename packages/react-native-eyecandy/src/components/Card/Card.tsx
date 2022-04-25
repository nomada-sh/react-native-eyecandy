import React from 'react';
import type { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

export interface CardProps extends ViewProps {
  children?: ReactNode;
  marginBottom?: number;
  marginTop?: number;
  padding?: number;
}

function Card({
  style,
  marginBottom,
  marginTop,
  padding,
  ...props
}: CardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.background.default.content,
          padding: padding !== undefined ? padding : 20,
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom,
          marginTop,
        },
        style,
      ]}
      {...props}
    />
  );
}

export default Card;
