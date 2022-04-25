import React from 'react';
import { View, SafeAreaView, Alert } from 'react-native';

import { Body, CodeInput } from '@nomada-sh/react-native-eyecandy';

export default function CodeInputs() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Body marginBottom={20} weight="bold" size="xlarge" align="center">
          Enter confirmation code:
        </Body>
        <CodeInput
          onFinish={code => {
            Alert.alert(`Code: ${code}`);
          }}
          length={5}
        />
      </View>
    </SafeAreaView>
  );
}
