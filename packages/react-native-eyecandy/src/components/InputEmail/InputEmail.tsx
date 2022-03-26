import React from 'react';

import { Mail } from '@nomada-sh/react-native-eyecandy-icons';

import TextInput, { TextInputProps } from '../TextInput';

function InputEmail(props: TextInputProps) {
  return (
    <TextInput
      required
      autoCapitalize="none"
      keyboardType="email-address"
      placeholder="Email"
      autoComplete="email"
      startIcon={Mail}
      {...props}
    />
  );
}

export default InputEmail;
