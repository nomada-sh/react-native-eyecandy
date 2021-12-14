import {
  EyeCandy,
  DefaultTheme,
  DarkTheme,
  Switch,
  Button,
  BottomSheet,
  BottomSheetHandle,
  Body,
} from '@nomada-sh/react-native-eyecandy';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Components from './Components';

import Form from './Form';
import Icons from './Icons';
import Typography from './Typography';
import DisableCompanyBottomSheet from './features/DisableCompanyBottomSheet';

export default function App() {
  const [dark, setDark] = useState(false);

  const theme = useMemo(() => (dark ? DarkTheme : DefaultTheme), [dark]);

  const backgroundColor = theme.palette.background.container;

  const bottomSheetRef = React.useRef<BottomSheetHandle>(null);

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
        keyboardShouldPersistTaps="always"
      >
        <Icons />
        <Button
          text="BottomSheet"
          onPress={() => {
            bottomSheetRef.current?.open();
          }}
        />
        <Components />
        <Typography />
        <Form />
      </ScrollView>
    </EyeCandy>
  );
}
