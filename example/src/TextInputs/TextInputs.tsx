import React from 'react';
import { ScrollView } from 'react-native';

import { TextInputMask } from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  return (
    <ScrollView>
      <TextInputMask
        onChangeText={(formatted, extracted) => {
          console.log(formatted, extracted);
        }}
        mask={'+1 ([000]) [000] [00] [00]'}
        placeholder="+1 (___) ___ __ __"
        keyboardType="numeric"
      />
    </ScrollView>
  );
}
