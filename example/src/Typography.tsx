import React from 'react';
import * as typography from '@nomada-sh/react-native-eyecandy/typography';
import { View } from 'react-native';

export default function Typography() {
  return (
    <View>
      {Object.keys(typography).map(key => {
        const Component = typography[key as keyof typeof typography];

        return (
          <Component key={key}>
            {key}: The quick brown fox jumps over the lazy dog{' '}
          </Component>
        );
      })}
    </View>
  );
}
