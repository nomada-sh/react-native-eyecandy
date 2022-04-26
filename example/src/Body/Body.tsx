import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import { Body } from '@nomada-sh/react-native-eyecandy';
import {
  ThemeBodyFontSizesChoices,
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

const fontSizes: ThemeBodyFontSizesChoices[] = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];

export default function () {
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
            {fontSizes.map(fontSize => (
              <View
                key={fontSize}
                style={{
                  marginBottom: 10,
                }}
              >
                {weights.map(weight => (
                  <Body
                    size={fontSize}
                    key={weight}
                    color={color}
                    weight={weight}
                  >
                    {`${color} ${weight} ${fontSize}`}: The quick brown fox
                    jumps over the lazy dog.
                  </Body>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
