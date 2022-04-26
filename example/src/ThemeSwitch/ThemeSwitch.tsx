import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Body, Switch } from '@nomada-sh/react-native-eyecandy';

import useTheme from '../shared/hooks/useTheme';

export default function ThemeSwitch() {
  const { dark, setDark } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Switch
          value={dark}
          onValueChange={setDark}
          style={{
            alignSelf: 'center',
            marginBottom: 20,
          }}
        />
        <Body weight="bold" size="xlarge">
          Hello, world!
        </Body>
      </View>
    </SafeAreaView>
  );
}
