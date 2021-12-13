import {
  EyeCandy,
  DefaultTheme,
  DarkTheme,
} from '@nomada-sh/react-native-eyecandy';
import { Switch } from '@nomada-sh/react-native-eyecandy/components';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Components from './Components';

import Form from './Form';
import Icons from './Icons';
import Typography from './Typography';

export default function App() {
  const [dark, setDark] = useState(false);

  const theme = useMemo(() => (dark ? DarkTheme : DefaultTheme), [dark]);

  const backgroundColor = theme.palette.background.container;

  return (
    <EyeCandy theme={theme}>
      <View
        style={{
          backgroundColor,
        }}
      >
        <Switch value={dark} onValueChange={() => setDark(!dark)} />
      </View>
      <ScrollView
        style={{
          backgroundColor,
        }}
        keyboardShouldPersistTaps="always"
      >
        <Icons />
        <Components />
        <Typography />
        <Form />
      </ScrollView>
    </EyeCandy>
  );
}
