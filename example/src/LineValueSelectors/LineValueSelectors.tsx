import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import { Body, LineValueSelector } from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();

  const [value, setValue] = React.useState(400);

  return (
    <ScrollView>
      <Body
        style={{
          padding: 20,
        }}
        size="xlarge"
        weight="bold"
      >
        {value}
      </Body>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <LineValueSelector
          width={width}
          increment={100}
          onIncrease={increase => setValue(prev => prev + increase)}
          onDecrease={decrease => setValue(prev => prev - decrease)}
        />
        {/* <LineValueSelector width={width / 2} tickCount={3} /> */}
      </View>
    </ScrollView>
  );
}
