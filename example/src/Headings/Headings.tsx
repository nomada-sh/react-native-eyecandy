import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import { Heading } from '@nomada-sh/react-native-eyecandy';
import {
  ThemeHeadingVariants,
  ThemeTextWeights,
} from '@nomada-sh/react-native-eyecandy-theme';

const variants: ThemeHeadingVariants[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const weights: ThemeTextWeights[] = ['normal', 'bold'];

export default function Headings() {
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
        {variants.map(variant => (
          <View
            key={variant}
            style={{
              marginBottom: 20,
            }}
          >
            {weights.map(weight => (
              <Heading key={weight} variant={variant} weight={weight}>
                {`${variant} ${weight}`}: The quick brown fox jumps over the
                lazy dog.
              </Heading>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
