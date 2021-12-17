import {
  EyeCandy,
  DefaultTheme,
  DarkTheme,
  Switch,
} from '@nomada-sh/react-native-eyecandy';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Components from './Components';

import Form from './Form';
import Icons from './Icons';
import Typography from './Typography';
import DisableCompanyBottomSheet from './features/DisableCompanyFeature';
import DatePickerFeature from './features/DatePickerFeature';

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
        <DisableCompanyBottomSheet />
        <Switch value={dark} onValueChange={() => setDark(!dark)} />
      </View>
      <ScrollView
        style={{
          backgroundColor,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <DatePickerFeature />
        <Icons />
        <Components />
        <Typography />
        <Form />
      </ScrollView>
    </EyeCandy>
  );
}
