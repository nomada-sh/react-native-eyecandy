import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import {
  Body,
  LineValueSelector,
  TextInputV2,
} from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();

  const [value, setValue] = React.useState('');
  const n = Number.isNaN(Number(value)) ? 0 : Number(value);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <View>
        <TextInputV2 value={value} onChangeText={setValue} />
        <Body
          style={{
            padding: 40,
            fontSize: 48,
          }}
          weight="bold"
        >
          $ {n.toFixed(2)}
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
            increment={0.25}
            tickCount={3}
            onChange={ticks =>
              setValue(prev => {
                if (Number.isNaN(Number(prev))) return prev;
                return String(Number(prev) + ticks);
              })
            }
            ticksColor="white"
            indicatorColor="#49dbe9"
            min={0}
            max={1000}
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
