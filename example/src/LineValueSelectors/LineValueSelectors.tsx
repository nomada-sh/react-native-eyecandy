import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';

import { Body, LineValueSelector } from '@nomada-sh/react-native-eyecandy';

export default function TextInputs() {
  const { width } = useWindowDimensions();

  const [value, setValue] = React.useState(400);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <View>
        <Body
          style={{
            padding: 40,
            fontSize: 48,
          }}
          weight="bold"
        >
          $ {value}
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
            increment={10}
            onChange={ticks => setValue(prev => prev + ticks)}
            ticksColor="white"
            indicatorColor="#49dbe9"
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
