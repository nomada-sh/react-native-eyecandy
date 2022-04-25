import React from 'react';

import { Switch } from '@nomada-sh/react-native-eyecandy';
import { useTheme as useEyecandyTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ActionSheets from '../ActionSheets';
import AvatarEdits from '../AvatarEdits';
import Avatars from '../Avatars';
import BottomSheets from '../BottomSheets';
import Buttons from '../Buttons';
import Calendars from '../Calendars';
import CheckLists from '../CheckLists';
import Forms from '../Forms';
import LineValueSelectors from '../LineValueSelectors';
import RadioGroups from '../RadioGroups';
import Selects from '../Selects';
import SwipeButtons from '../SwipeButtons';
import TextInputs from '../TextInputs';
import { useTheme } from '../shared/hooks';

const { Navigator, Screen } = createDrawerNavigator();

export default function Drawer() {
  const { dark, setDark } = useTheme();
  const { colors } = useEyecandyTheme();

  return (
    <Navigator
      initialRouteName="Buttons"
      screenOptions={{
        headerTintColor: colors.text.default.normal,
        headerRight: () => <Switch value={dark} onValueChange={setDark} />,
        swipeEnabled: false,
      }}
    >
      <Screen name="Buttons" component={Buttons} />
      <Screen name="TextInputs" component={TextInputs} />
      <Screen name="Selects" component={Selects} />
      <Screen name="SwipeButtons" component={SwipeButtons} />
      <Screen name="Forms" component={Forms} />
      <Screen name="Avatars" component={Avatars} />
      <Screen name="AvatarEdits" component={AvatarEdits} />
      <Screen name="BottomSheets" component={BottomSheets} />
      <Screen name="ActionSheets" component={ActionSheets} />
      <Screen name="CheckLists" component={CheckLists} />
      <Screen name="RadioGroups" component={RadioGroups} />
      <Screen name="LineValueSelectors" component={LineValueSelectors} />
      <Screen name="Calendars" component={Calendars} />
    </Navigator>
  );
}
