import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export interface ColProps extends ViewProps {
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
}

export function Col({ style, justifyContent, alignItems, ...props }: ColProps) {
  return (
    <View
      style={[
        {
          alignItems,
          justifyContent,
        },
        style,
      ]}
      {...props}
    />
  );
}
