import React from 'react';
import { ScrollView } from 'react-native';

import {
  TextInputV2,
  TextInput,
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
    >
      <PhoneTextInput placeholder="0000" {...phoneInputProps} />

      <TextInputV2 iconLeft={Lock} placeholder="test" error required />
      <TextInput
        startIcon={Lock}
        errors={[[true, 'Error']]}
        placeholder="test"
      />
      <TextInput startIcon={Lock} placeholder="test" />
    </ScrollView>
  );
}
