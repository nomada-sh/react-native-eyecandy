import React from 'react';
import { ScrollView } from 'react-native';

import {
  TextInput,
  SearchBar,
  PhoneTextInput,
  usePhoneTextInput,
} from '@nomada-sh/react-native-eyecandy';
import { Lock } from '@nomada-sh/react-native-eyecandy-icons';

export default function TextInputs() {
  const phoneInputProps = usePhoneTextInput();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
      keyboardShouldPersistTaps="always"
    >
      <PhoneTextInput {...phoneInputProps} />
      <SearchBar />
      <TextInput iconLeft={Lock} placeholder="test" error required />
      <TextInput iconLeft={Lock} placeholder="test" />
      <TextInput iconLeft={Lock} placeholder="test" />
    </ScrollView>
  );
}
