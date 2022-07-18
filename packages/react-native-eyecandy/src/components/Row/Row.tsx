import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export interface RowProps extends ViewProps {
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  marginBottom?: number;
  marginTop?: number;
}

export function Row({
  style,
  justifyContent,
  alignItems,
  marginBottom,
  marginTop,
  ...props
}: RowProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent,
          alignItems,
          marginBottom,
          marginTop,
        },
        style,
      ]}
      {...props}
    />
  );
}
