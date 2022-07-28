import React from 'react';

import { Mail } from '@nomada-sh/react-native-eyecandy-icons';

import { TextInput, TextInputProps } from '../TextInput';

function TextInputEmail(props: TextInputProps) {
  return (
    <TextInput
      required
      iconLeft={Mail}
      placeholder="Email"
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect={false}
      {...props}
    />
  );
}

export default TextInputEmail;
