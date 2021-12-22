import React from 'react';
import { View } from 'react-native';

export interface InputProps {
  children?: React.ReactNode;
}

function Input({ children }: InputProps) {
  return <View>{children}</View>;
}

export default Input;
