import React from 'react';

import { IconButton, Switch } from '@nomada-sh/react-native-eyecandy';
import { Menu } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme as useEyecandyTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ActionSheets from '../ActionSheets';
import AvatarEdits from '../AvatarEdits';
import Avatars from '../Avatars';
import Badges from '../Badges';
import Body from '../Body';
import BottomSheetSwipeConfirmation from '../BottomSheetSwipeConfirmation';
import BottomSheets from '../BottomSheets';
import ButtonBase from '../ButtonBase';
import Buttons from '../Buttons';
import Calendars from '../CalendarStrips';
import Cards from '../Cards';
import CheckLists from '../CheckLists';
import CodeInputs from '../CodeInputs';
import Forms from '../Forms';
import Headings from '../Headings';
import IconButtons from '../IconButtons';
import LineValueSelectors from '../LineValueSelectors';
import LinkButtons from '../LinkButtons';
import Menus from '../Menus';
import NativeSelects from '../NativeSelects';
import RadioButtons from '../RadioButtons';
import RadioGroups from '../RadioGroups';
import Selects from '../Selects';
import SwipeButtons from '../SwipeButtons';
import Switchs from '../Switchs';
import TextInputs from '../TextInputs';
import Texts from '../Texts';
import ThemeSwitch from '../ThemeSwitch';
import { useTheme } from '../shared/hooks';

const { Navigator, Screen } = createDrawerNavigator();

function HeaderLeft(props: any) {
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };

  return (
    <IconButton
      icon={Menu}
      onPress={toggleDrawer}
      size={32}
      iconSize={24}
      style={{
        marginLeft: 20,
      }}
      transparent
    />
  );
}

export default function Drawer() {
  const { dark, setDark } = useTheme();
  const { colors } = useEyecandyTheme();

  return (
    <Navigator
      initialRouteName="Buttons"
      screenOptions={({ navigation }) => ({
        headerTintColor: colors.text.default.normal,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => (
          <Switch
            style={{
              marginEnd: 20,
              alignSelf: 'flex-end',
            }}
            value={dark}
            onValueChange={setDark}
          />
        ),
        headerShown: false,
        // swipeEnabled: false,
      })}
    >
      <Screen name="Button" component={Buttons} />
      <Screen name="ButtonBase" component={ButtonBase} />
      <Screen name="IconButton" component={IconButtons} />
      <Screen name="LinkButton" component={LinkButtons} />
      <Screen name="RadioButton" component={RadioButtons} />
      <Screen name="RadioGroup" component={RadioGroups} />
      <Screen name="Switch" component={Switchs} />
      <Screen name="SwipeButton" component={SwipeButtons} />
      <Screen name="Badge" component={Badges} />
      <Screen name="TextInput" component={TextInputs} />
      <Screen name="CodeInput" component={CodeInputs} />
      <Screen name="Select" component={Selects} />
      <Screen name="NativeSelect" component={NativeSelects} />
      <Screen name="Forms" component={Forms} />
      <Screen name="Card" component={Cards} />
      <Screen name="Avatar" component={Avatars} />
      <Screen name="AvatarEdit" component={AvatarEdits} />
      <Screen name="Text" component={Texts} />
      <Screen name="Body" component={Body} />
      <Screen name="Heading" component={Headings} />
      <Screen name="BottomSheet" component={BottomSheets} />
      <Screen
        name="BottomSheetSwipeConfirmation"
        component={BottomSheetSwipeConfirmation}
      />
      <Screen name="ActionSheet" component={ActionSheets} />
      <Screen name="Menu" component={Menus} />
      <Screen name="CheckList" component={CheckLists} />
      <Screen name="LineValueSelector" component={LineValueSelectors} />
      <Screen name="CalendarStrip" component={Calendars} />
      <Screen name="ThemeSwitch" component={ThemeSwitch} />
    </Navigator>
  );
}
