import React from 'react';
import TextInput, { TextInputProps } from '../TextInput';
import { User } from '../../icons';

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
