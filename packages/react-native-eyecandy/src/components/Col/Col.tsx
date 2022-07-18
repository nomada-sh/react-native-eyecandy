import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export interface ColProps extends ViewProps {
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  marginBottom?: number;
  marginTop?: number;
}

export function Col({
  style,
  justifyContent,
  alignItems,
  marginBottom,
  marginTop,
  ...props
}: ColProps) {
  return (
    <View
      style={[
        {
          alignItems,
          justifyContent,
          marginBottom,
          marginTop,
        },
        style,
      ]}
      {...props}
    />
  );
}
