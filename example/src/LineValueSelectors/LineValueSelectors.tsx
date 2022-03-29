import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import { Body, LineValueSelector } from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <Body
        style={{
          padding: 20,
        }}
        weight="bold"
        size="xlarge"
      >
        100
      </Body>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <LineValueSelector width={width} />
        <LineValueSelector width={width / 2} tickCount={3} />
      </View>
    </ScrollView>
  );
}
