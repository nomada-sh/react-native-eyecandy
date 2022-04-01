import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import {
  Body,
  Button,
  LineValueSelectorV2,
  TextInputV2,
} from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();

  // const [value, setValue] = React.useState('');
  // const n = Number.isNaN(Number(value)) ? 0 : Number(value);

  const [value, setValue] = React.useState(0);
  const [increment, setIncrement] = React.useState('1');

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
            const n = Number.isNaN(Number(increment)) ? 0 : Number(increment);
            setValue(value + n);
          }}
        />
        <Button
          text="Decrement"
          onPress={() => {
            const n = Number.isNaN(Number(increment)) ? 0 : Number(increment);
            setValue(value - n);
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
          <LineValueSelectorV2
            width={width}
            tickCount={3}
            increment={10}
            ticksColor="white"
            indicatorColor="#49dbe9"
            value={value}
            onChange={setValue}
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
