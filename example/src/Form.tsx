import React from 'react';
import { View } from 'react-native';
import {
  InputEmail,
  InputName,
  InputPassword,
  useForm,
} from '@nomada-sh/react-native-eyecandy';

export default function Form() {
  const { register } = useForm({
    email: {
      is: 'email',
    },
    name: {
      required: true,
    },
    password: {
      required: true,
    },
  });

  return (
    <View>
      <InputEmail {...register('email')} />
      <InputName {...register('name')} />
      <InputPassword {...register('password')} />
    </View>
  );
}
