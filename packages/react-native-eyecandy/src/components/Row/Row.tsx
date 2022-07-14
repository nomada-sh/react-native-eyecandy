import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export interface RowProps extends ViewProps {
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
}

export function Row({ style, justifyContent, alignItems, ...props }: RowProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent,
          alignItems,
        },
        style,
      ]}
      {...props}
    />
  );
}
