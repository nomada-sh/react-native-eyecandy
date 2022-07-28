import React from 'react';

import { User } from '@nomada-sh/react-native-eyecandy-icons';

import { TextInput, TextInputProps } from '../TextInput';

function InputName(props: TextInputProps) {
  return (
    <TextInput
      required
      iconLeft={User}
      autoCorrect={false}
      autoCapitalize="none"
      autoComplete="name"
      placeholder="Name"
      {...props}
    />
  );
}

export default InputName;
