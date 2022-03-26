import React from 'react';
import { View } from 'react-native';

import { Badge, Avatar } from '@nomada-sh/react-native-eyecandy';
import {
  ThemeProvider,
  DarkTheme,
} from '@nomada-sh/react-native-eyecandy-theme';

const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <View>
        <Badge>
          <Avatar
            source={{
              uri: 'https://avatars0.githubusercontent.com/u/137727?s=460&v=4',
            }}
          />
        </Badge>
      </View>
    </ThemeProvider>
  );
};

export default App;
