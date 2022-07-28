import React from 'react';

import { TextInput, TextInputProps } from '../TextInput';

export function TextArea({ ...props }: TextInputProps) {
  return (
    <TextInput
      height={150}
      multiline
      textAlign="left"
      textAlignVertical="top"
      {...props}
    />
  );
}
