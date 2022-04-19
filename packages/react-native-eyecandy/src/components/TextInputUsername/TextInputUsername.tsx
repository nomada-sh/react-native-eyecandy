import React from 'react';

import { User } from '@nomada-sh/react-native-eyecandy-icons';

import TextInput, { TextInputProps } from '../TextInput';

function TextInputUsername(props: TextInputProps) {
  return (
    <TextInput
      required
      iconLeft={User}
      autoCorrect={false}
      autoCapitalize="none"
      autoComplete="username"
      placeholder="Username"
      {...props}
    />
  );
}

export default TextInputUsername;
