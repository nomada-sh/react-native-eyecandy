import React from 'react';
import TextInput, { TextInputProps } from '../TextInput';
import { Lock } from '../../icons';

function InputPassword(props: TextInputProps) {
  return (
    <TextInput
      autoCapitalize="none"
      autoComplete="password"
      autoCorrect={false}
      placeholder="Password"
      showSecureTextEntryToggle
      secureTextEntry
      startIcon={Lock}
      {...props}
    />
  );
}

export default InputPassword;
