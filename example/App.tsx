import React from 'react';
import { View } from 'react-native';

import { Badge, Avatar, TextInputMask } from '@nomada-sh/react-native-eyecandy';
import { ThemeProvider } from '@nomada-sh/react-native-eyecandy-theme';

const App = () => {
  return (
    <ThemeProvider>
      <View>
        <Badge>
          <Avatar
            source={{
              uri: 'https://avatars0.githubusercontent.com/u/137727?s=460&v=4',
            }}
          />
        </Badge>
        <TextInputMask
          onChangeText={(formatted, extracted) => {
            console.log(formatted, extracted);
          }}
          mask={'+1 ([000]) [000] [00] [00]'}
          placeholder="+1 (___) ___ __ __"
          keyboardType="numeric"
        />
      </View>
    </ThemeProvider>
  );
};

export default App;
