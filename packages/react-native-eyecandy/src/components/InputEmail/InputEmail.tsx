import React from 'react';
import TextInput, { TextInputProps } from '../TextInput';
import { Mail } from '@nomada-sh/react-native-eyecandy-icons';

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
