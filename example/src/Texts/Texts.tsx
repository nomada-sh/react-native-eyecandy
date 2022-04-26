import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import { Text } from '@nomada-sh/react-native-eyecandy';
import {
  ThemeTextColorsChoices,
  ThemeTextWeights,
} from '@nomada-sh/react-native-eyecandy-theme';

const colors: ThemeTextColorsChoices[] = [
  'default',
  'primary',
  'error',
  'greyout',
];

const weights: ThemeTextWeights[] = ['normal', 'bold'];

export default function Texts() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {colors.map(color => (
          <View
            key={color}
            style={{
              marginBottom: 20,
            }}
          >
            {weights.map(weight => (
              <Text key={weight} color={color} weight={weight}>
                {`${color} ${weight}`}: The quick brown fox jumps over the lazy
                dog.
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
