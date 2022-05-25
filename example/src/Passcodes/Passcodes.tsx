import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';

import {
  Body,
  PasscodeKeyProps,
  Passcode,
  TextInput,
} from '@nomada-sh/react-native-eyecandy';

const SquaredKey = ({
  keyValue,
  isDeleteKey,
  onPressIn,
  onPressOut,
}: PasscodeKeyProps) => (
  <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
    <Body>{isDeleteKey ? 'Delete' : keyValue}</Body>
  </Pressable>
);

export default function Passcodes() {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 20,
          }}
        >
          <Body marginBottom={20} weight="bold" size="xlarge">
            {value}
          </Body>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="number-pad"
          />
        </View>
        <Passcode
          testID="passcode"
          value={value}
          onChange={setValue}
          // KeyComponent={SquaredKey}
        />
      </View>
    </SafeAreaView>
  );
}
