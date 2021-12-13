import React from 'react';
import type { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

import { useTheme } from '../../hooks';

export interface CardProps extends ViewProps {
  children?: ReactNode;
}

function Card({ style, ...props }: CardProps) {
  const { dark, palette } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: dark ? palette.grey[800] : palette.grey[50],
          padding: 16,
          borderRadius: 16,
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}
    />
  );
}

export default Card;
