import React from 'react';

import { Lock } from '@nomada-sh/react-native-eyecandy-icons';

import { TextInput, TextInputProps } from '../TextInput';

export const TEXT_INPUT_PASSWORD_DEFAULT_PROPS: Partial<TextInputProps> = {
  required: true,
  iconLeft: Lock,
  autoCorrect: false,
  autoCapitalize: 'none',
  autoComplete: 'password',
  placeholder: 'Password',
  showSecureTextEntryToggle: true,
  renderInputAsTextWhenUnfocused: false,
};

export function TextInputPassword(props: TextInputProps) {
  return <TextInput {...TEXT_INPUT_PASSWORD_DEFAULT_PROPS} {...props} />;
}
