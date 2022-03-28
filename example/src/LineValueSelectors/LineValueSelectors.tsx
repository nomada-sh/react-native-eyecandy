import React from 'react';
import { ScrollView } from 'react-native';

import { Body, LineValueSelector } from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
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
      <LineValueSelector />
    </ScrollView>
  );
}
