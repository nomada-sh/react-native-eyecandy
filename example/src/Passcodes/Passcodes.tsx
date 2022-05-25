import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';

import {
  Body,
  PasscodeKeyProps,
  Passcode,
  TextInput,
} from '@nomada-sh/react-native-eyecandy';
import { Backspace } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

const LettersKey = ({
  keyValue,
  onPressIn,
  onPressOut,
  isDeleteKey,
}: PasscodeKeyProps) => {
  let letters = '';
  switch (keyValue) {
    case '2':
      letters = 'ABC';
      break;
    case '3':
      letters = 'DEF';
      break;
    case '4':
      letters = 'GHI';
      break;
    case '5':
      letters = 'JKL';
      break;
    case '6':
      letters = 'MNO';
      break;
    case '7':
      letters = 'PQRS';
      break;
    case '8':
      letters = 'TUV';
      break;
    case '9':
      letters = 'WXYZ';
      break;
  }

  return (
    <Pressable
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Body size={24}>{isDeleteKey ? <Backspace /> : keyValue}</Body>
      <Body size={12}>{letters}</Body>
    </Pressable>
  );
};

const SquaredKey = ({
  keyValue,
  isDeleteKey,
  onPressIn,
  onPressOut,
  col,
}: PasscodeKeyProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={{
        flex: 1,
        borderTopWidth: 1,
        borderRightWidth: col < 3 ? 1 : 0,
        borderColor: colors.divider.default,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Body size={24}>{isDeleteKey ? <Backspace /> : keyValue}</Body>
    </Pressable>
  );
};

export default function Passcodes() {
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 20,
          }}
        >
          <Body marginBottom={20} weight="bold" size="xlarge">
            {value}
          </Body>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="number-pad"
          />
        </View>
        <Passcode
          style={
            {
              // marginBottom: 20,
            }
          }
          testID="passcode"
          value={value}
          onChange={setValue}
          KeyComponent={LettersKey}
          // KeyComponent={SquaredKey}
        />
      </View>
    </SafeAreaView>
  );
}
