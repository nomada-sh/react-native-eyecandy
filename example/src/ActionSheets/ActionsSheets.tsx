import React from 'react';
import { ScrollView } from 'react-native';

import {
  Button,
  ActionSheet,
  ActionSheetOption,
} from '@nomada-sh/react-native-eyecandy';
import {
  Camera,
  Mail,
  Star,
  Eye,
  Download,
} from '@nomada-sh/react-native-eyecandy-icons';

const options: ActionSheetOption[] = [
  {
    label: 'Take a photo',
    icon: Camera,
  },
  {
    label: 'Choose from gallery',
    icon: Star,
  },
];

const options2: ActionSheetOption[] = [
  {
    label: 'Download',
    icon: Download,
  },
  {
    label: 'Share',
    icon: Mail,
  },
  {
    label: 'Preview',
    icon: Eye,
  },
];

export default function ActionSheets() {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Button
        marginBottom={20}
        onPress={() => setVisible(true)}
        text="Show Action Sheet"
      />
      <ActionSheet
        title="Change your profile picture"
        message="Select a new profile picture"
        options={options}
        visible={visible}
        onClose={() => setVisible(false)}
        onPressAction={index => console.log(index)}
        showCancelIcon
      />
      <Button
        marginBottom={20}
        onPress={() => setVisible2(true)}
        text="Show Action Sheet 2"
      />
      <ActionSheet
        options={options2}
        visible={visible2}
        onClose={() => setVisible2(false)}
        onPressAction={index => console.log(index)}
        showCancelIcon
      />
      <Button
        marginBottom={20}
        onPress={() => setVisible3(true)}
        text="Show Native Action Sheet"
      />
      <ActionSheet
        native
        options={options2}
        visible={visible3}
        onClose={() => setVisible3(false)}
        onPressAction={index => console.log(index)}
        showCancelIcon
      />
    </ScrollView>
  );
}
