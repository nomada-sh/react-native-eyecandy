import React from 'react';
import { ScrollView } from 'react-native';

import {
  TextInput,
  SearchBar,
  MaskedTextInputPhone,
  useTextInputPhone,
  CodeInput,
} from '@nomada-sh/react-native-eyecandy';
import { Lock } from '@nomada-sh/react-native-eyecandy-icons';

export default function TextInputs() {
  const phoneInputProps = useTextInputPhone();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
      keyboardShouldPersistTaps="always"
    >
      <MaskedTextInputPhone marginBottom={20} {...phoneInputProps} />
      <SearchBar marginBottom={20} />
      <TextInput
        marginBottom={20}
        iconLeft={Lock}
        placeholder="test"
        error
        required
      />
      <TextInput marginBottom={20} iconLeft={Lock} placeholder="test" />
      <TextInput marginBottom={20} iconLeft={Lock} placeholder="test" />
      <CodeInput
        onFinish={console.log}
        length={6}
        dimissKeyboardOnFinish={false}
      />
    </ScrollView>
  );
}
