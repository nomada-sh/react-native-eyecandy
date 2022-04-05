import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import {
  Body,
  Button,
  TextInputV2,
  LineValueSelectorV2,
  useLineValueSelector,
} from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();

  const [increment, setIncrement] = React.useState(1);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(230);

  const { props, setValue, value } = useLineValueSelector({
    initialValue: 32,
    max,
    min,
    increment,
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <View>
        <TextInputV2
          defaultValue={String(min)}
          onChangeText={text => {
            if (!Number.isNaN(Number(text))) setMin(Number(text));
          }}
        />
        <TextInputV2
          defaultValue={String(max)}
          onChangeText={text => {
            if (!Number.isNaN(Number(text))) setMax(Number(text));
          }}
        />
        <TextInputV2
          defaultValue={String(increment)}
          onChangeText={text => {
            if (!Number.isNaN(Number(text))) setIncrement(Number(text));
          }}
        />
        <Button
          text="Increment"
          onPress={() => {
            const newValue = value + increment;
            if (newValue <= max) setValue(newValue);
          }}
        />
        <Button
          text="Decrement"
          onPress={() => {
            const newValue = value - increment;
            if (newValue >= min) setValue(newValue);
          }}
        />
        <Body
          style={{
            padding: 40,
            fontSize: 48,
            textAlign: 'right',
          }}
          weight="bold"
        >
          {value.toFixed(2)} cm
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
            ticksWidth={80}
            ticksColor="white"
            indicatorColor="#49dbe9"
            indicatorTickPosition={2}
            {...props}
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
