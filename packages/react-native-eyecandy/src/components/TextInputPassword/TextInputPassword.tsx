import React from 'react';

import { Lock } from '@nomada-sh/react-native-eyecandy-icons';

import { TextInput, TextInputProps } from '../TextInput';

function TextInputPassword(props: TextInputProps) {
  return (
    <TextInput
      required
      iconLeft={Lock}
      autoCorrect={false}
      autoCapitalize="none"
      autoComplete="password"
      placeholder="Password"
      showSecureTextEntryToggle
      secureTextEntry
      {...props}
    />
  );
}

export default TextInputPassword;
