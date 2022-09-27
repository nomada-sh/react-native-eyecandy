import React from 'react';

import { Mail } from '@nomada-sh/react-native-eyecandy-icons';

import { TextInput, TextInputProps } from '../TextInput';

export const TEXT_INPUT_EMAIL_DEFAULT_PROPS: Partial<TextInputProps> = {
  placeholder: 'Email',
  keyboardType: 'email-address',
  autoCapitalize: 'none',
  autoComplete: 'email',
  autoCorrect: false,
  iconLeft: Mail,
  required: true,
  renderValueAsTextUnfocused: false,
};

export function TextInputEmail(props: TextInputProps) {
  return <TextInput {...TEXT_INPUT_EMAIL_DEFAULT_PROPS} {...props} />;
}
