import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import {
  Body,
  Button,
  LineValueSelector,
  TextInputV2,
} from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();

  const [value, setValue] = React.useState(0);
  const [increment, setIncrement] = React.useState('1');
  const min = 0;
  const max = 230;

  const n = /^\d+$/.test(increment) ? Number(increment) : 1;

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <View>
        <TextInputV2 value={increment} onChangeText={setIncrement} />
        <Button
          text="Increment"
          onPress={() => {
            if (value + n <= max) setValue(value + n);
          }}
        />
        <Button
          text="Decrement"
          onPress={() => {
            if (value - n >= min) setValue(value - n);
          }}
        />
        <Body
          style={{
            padding: 40,
            fontSize: 48,
          }}
          weight="bold"
        >
          $ {value.toFixed(2)}
        </Body>
        <View
          style={{
            backgroundColor: '#3e39ea',
            paddingTop: 40,
            paddingBottom: 60,
            borderTopLeftRadius: 30,
          }}
        >
          <LineValueSelector
            width={width}
            tickCount={3}
            ticksWidth={80}
            increment={0.5}
            ticksColor="white"
            indicatorColor="#49dbe9"
            value={value}
            onChange={setValue}
            min={min}
            max={max}
            indicatorTickPosition={2}
          />
          <View
            style={{
              marginHorizontal: 40,
              marginTop: 20,
            }}
          >
            <Body
              size="xlarge"
              customColor="white"
              weight="bold"
              style={{
                marginBottom: 20,
              }}
            >
              Lorem ipsum dolor
            </Body>
            <Body customColor="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
