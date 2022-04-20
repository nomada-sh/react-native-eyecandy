import React from 'react';
import { ScrollView } from 'react-native';

import {
  TextInput,
  SearchBar,
  MaskedTextInputPhone,
  useTextInputPhone,
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
      <MaskedTextInputPhone {...phoneInputProps} />
      <SearchBar />
      <TextInput iconLeft={Lock} placeholder="test" error required />
      <TextInput iconLeft={Lock} placeholder="test" />
      <TextInput iconLeft={Lock} placeholder="test" />
    </ScrollView>
  );
}
