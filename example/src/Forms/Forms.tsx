import React from 'react';
import { ScrollView } from 'react-native';

import {
  TextInputEmail,
  TextInputPassword,
  TextInputName,
  TextInputUsername,
} from '@nomada-sh/react-native-eyecandy';

export default function CheckLists() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <TextInputName marginBottom={20} />
      <TextInputUsername marginBottom={20} />
      <TextInputEmail marginBottom={20} />
      <TextInputPassword marginBottom={20} />
      <TextInputPassword placeholder="Confirm Password" />
    </ScrollView>
  );
}
