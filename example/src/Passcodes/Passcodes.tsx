import React from 'react';
import { SafeAreaView, View } from 'react-native';

import {
  Body,
  KeyValueProps,
  Passcode,
  TextInput,
} from '@nomada-sh/react-native-eyecandy';

const CustomKeyValue = ({ keyValue, isDeleteKey }: KeyValueProps) => (
  <View>
    <Body>{isDeleteKey ? 'Delete' : keyValue}</Body>
  </View>
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
          value={value}
          onChange={setValue}
          // KeyValueComponent={CustomKeyValue}
        />
      </View>
    </SafeAreaView>
  );
}
