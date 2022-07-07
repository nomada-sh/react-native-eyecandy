import React from 'react';
import { ImageBackground, Pressable, SafeAreaView, View } from 'react-native';

import {
  Body,
  DialerKeyProps,
  Dialer,
  TextInput,
} from '@nomada-sh/react-native-eyecandy';
import { Backspace } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

const LettersKey = ({
  keyValue,
  onPressIn,
  onPressOut,
  isDeleteKey,
}: DialerKeyProps) => {
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'red',
        // width: 60,
        // height: 60,
        // borderRadius: 30,
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
}: DialerKeyProps) => {
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

const TransparentKey = ({
  keyValue,
  isDeleteKey,
  isEmptyKey,
  onPressIn,
  onPressOut,
}: DialerKeyProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        margin: 4,
        marginVertical: 15,
      }}
    >
      {isEmptyKey || isDeleteKey ? null : (
        <Pressable
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.55)',
            borderWidth: 1,
            borderColor: 'white',
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Body size={24} color="white">
            {isDeleteKey ? <Backspace color="white" /> : keyValue}
          </Body>
        </Pressable>
      )}
    </View>
  );
};

export function DialerScreen() {
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
        {/* <ImageBackground source={require('./Background.jpg')}> */}
        <Dialer
          style={{
            // marginBottom: 20,
            // width: '50%',
            marginHorizontal: 20,
          }}
          testID="Dialer"
          value={value}
          onChange={setValue}
          // KeyComponent={LettersKey}
          // KeyComponent={SquaredKey}
          // KeyComponent={TransparentKey}
        />
        {/* </ImageBackground> */}
      </View>
    </SafeAreaView>
  );
}
