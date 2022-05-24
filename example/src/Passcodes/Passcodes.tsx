import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  View,
} from 'react-native';

import { Body, Passcode, TextInput } from '@nomada-sh/react-native-eyecandy';
import { useHeaderHeight } from '@react-navigation/elements';

export default function Passcodes() {
  const [value, setValue] = React.useState('');

  const headerHeight = useHeaderHeight();
  const { height: windowHeight } = useWindowDimensions();

  const height = windowHeight - headerHeight;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView keyboardShouldPersistTaps="always">
        <View
          style={{
            height,
          }}
        >
          <Body>{value}</Body>
          <TextInput value={value} onChangeText={setValue} />
          <Passcode value={value} onChange={setValue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
