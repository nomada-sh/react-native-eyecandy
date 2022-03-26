import React from 'react';

import { User } from '@nomada-sh/react-native-eyecandy-icons';

import TextInput, { TextInputProps } from '../TextInput';

function InputName(props: TextInputProps) {
  return (
    <TextInput
      autoCapitalize="none"
      placeholder="Name"
      autoComplete="name"
      startIcon={User}
      {...props}
    />
  );
}

export default InputName;
