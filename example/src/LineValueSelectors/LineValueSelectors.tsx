import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import { Body, LineValueSelector } from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();
  const [ticksMoved, setTicksMoved] = React.useState(0);
  const [value, setValue] = React.useState(0);

  return (
    <ScrollView>
      <Body
        style={{
          padding: 20,
        }}
        weight="bold"
        size="xlarge"
      >
        {value + ticksMoved}
      </Body>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <LineValueSelector width={width} onTicksMoved={setTicksMoved} />
        {/* <LineValueSelector width={width / 2} tickCount={3} /> */}
      </View>
    </ScrollView>
  );
}
