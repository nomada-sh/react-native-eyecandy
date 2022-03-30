import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import { Body, LineValueSelector } from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();
  const [ticksMovedFromStart, setTicksMovedFromStart] = React.useState(0);

  const [value, setValue] = React.useState(400);
  const initialValueRef = React.useRef(value);

  return (
    <ScrollView>
      <Body
        style={{
          padding: 20,
        }}
        size="xlarge"
      >
        ticksMovedFromStart: {ticksMovedFromStart}
      </Body>
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
          onTicksMovedFromStartChange={ticksMovedFromStart => {
            setValue(initialValueRef.current + ticksMovedFromStart * 10);
          }}
          onStop={ticksMoved => {
            console.log(ticksMoved);
            // setValue(value + ticksMoved * 10);
          }}
        />
        {/* <LineValueSelector width={width / 2} tickCount={3} /> */}
      </View>
    </ScrollView>
  );
}
