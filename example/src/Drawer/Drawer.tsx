import React from 'react';

import { Switch } from '@nomada-sh/react-native-eyecandy';
import { useTheme as useEyecandyTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ActionSheets from '../ActionSheets';
import AvatarEdits from '../AvatarEdits';
import Avatars from '../Avatars';
import BottomSheetSwipeConfirmation from '../BottomSheetSwipeConfirmation/BottomSheetSwipeConfirmation';
import BottomSheets from '../BottomSheets';
import ButtonBase from '../ButtonBase';
import Buttons from '../Buttons';
import Calendars from '../CalendarStrips';
import Cards from '../Cards';
import CheckLists from '../CheckLists';
import CodeInputs from '../CodeInputs';
import Forms from '../Forms';
import IconButtons from '../IconButtons';
import LineValueSelectors from '../LineValueSelectors';
import LinkButtons from '../LinkButtons';
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
        headerShown: false,
        headerRight: () => (
          <Switch
            style={{
              marginEnd: 10,
            }}
            value={dark}
            onValueChange={setDark}
          />
        ),
        // swipeEnabled: false,
      }}
    >
      <Screen name="Button" component={Buttons} />
      <Screen name="ButtonBase" component={ButtonBase} />
      <Screen name="IconButtons" component={IconButtons} />
      <Screen name="LinkButtons" component={LinkButtons} />
      <Screen name="TextInput" component={TextInputs} />
      <Screen name="CodeInput" component={CodeInputs} />
      <Screen name="Select" component={Selects} />
      <Screen name="SwipeButton" component={SwipeButtons} />
      <Screen name="Cards" component={Cards} />
      <Screen name="Forms" component={Forms} />
      <Screen name="Avatar" component={Avatars} />
      <Screen name="AvatarEdit" component={AvatarEdits} />
      <Screen name="BottomSheet" component={BottomSheets} />
      <Screen
        name="BottomSheetSwipeConfirmation"
        component={BottomSheetSwipeConfirmation}
      />
      <Screen name="ActionSheet" component={ActionSheets} />
      <Screen name="CheckList" component={CheckLists} />
      <Screen name="RadioGroup" component={RadioGroups} />
      <Screen name="LineValueSelector" component={LineValueSelectors} />
      <Screen name="CalendarStrip" component={Calendars} />
    </Navigator>
  );
}
