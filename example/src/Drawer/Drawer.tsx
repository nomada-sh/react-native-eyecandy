import React from 'react';

import { Switch } from '@nomada-sh/react-native-eyecandy';
import { useTheme as useEyecandyTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Avatars from '../Avatars';
import Calendars from '../Calendars';
import CheckLists from '../CheckLists';
import LineValueSelectors from '../LineValueSelectors';
import TextInputs from '../TextInputs';
import { useTheme } from '../shared/hooks';

const { Navigator, Screen } = createDrawerNavigator();

export default function Drawer() {
  const { dark, setDark } = useTheme();
  const { colors } = useEyecandyTheme();

  return (
    <Navigator
      initialRouteName="Calendars"
      screenOptions={{
        headerTintColor: colors.text.default.normal,
        headerRight: () => <Switch value={dark} onValueChange={setDark} />,
        swipeEnabled: false,
      }}
    >
      <Screen name="TextInputs" component={TextInputs} />
      <Screen name="LineValueSelectors" component={LineValueSelectors} />
      <Screen name="CheckLists" component={CheckLists} />
      <Screen name="Calendars" component={Calendars} />
      <Screen name="Avatars" component={Avatars} />
    </Navigator>
  );
}
