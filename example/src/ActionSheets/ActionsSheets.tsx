import React from 'react';
import { ScrollView, Alert, SafeAreaView } from 'react-native';

import {
  Button,
  ActionSheet,
  ActionSheetOption,
} from '@nomada-sh/react-native-eyecandy';
import {
  Camera,
  Mail,
  Photo,
  Eye,
  Download,
} from '@nomada-sh/react-native-eyecandy-icons';

const profilePictureOptions: ActionSheetOption[] = [
  {
    label: 'Take a photo',
    icon: Camera,
  },
  {
    label: 'Choose from gallery',
    icon: Photo,
  },
];

const shareDocumentOptions: ActionSheetOption[] = [
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
  const [visibleChangePicture, setVisibleChangePicture] = React.useState(false);
  const [visibleShare, setVisibleShare] = React.useState(false);
  const [nativeVisible, setNativeVisible] = React.useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Button
          marginBottom={20}
          onPress={() => setVisibleChangePicture(true)}
          text="Change your profile picture"
        />
        <ActionSheet
          title="Change your profile picture"
          message="Select a new profile picture"
          options={profilePictureOptions}
          visible={visibleChangePicture}
          onClose={() => setVisibleChangePicture(false)}
          onPressAction={index => {
            const option = profilePictureOptions[index];
            if (typeof option === 'string') Alert.alert(option);
            else Alert.alert(option.label);
          }}
          showCancelIcon
        />
        <Button
          marginBottom={20}
          onPress={() => setVisibleShare(true)}
          text="Share document"
        />
        <ActionSheet
          options={shareDocumentOptions}
          visible={visibleShare}
          onClose={() => setVisibleShare(false)}
          onPressAction={index => {
            const option = shareDocumentOptions[index];
            if (typeof option === 'string') Alert.alert(option);
            else Alert.alert(option.label);
          }}
          showCancelIcon
        />
        <Button
          marginBottom={20}
          onPress={() => setNativeVisible(true)}
          text="Share document (native)"
        />
        <ActionSheet
          native
          options={shareDocumentOptions}
          visible={nativeVisible}
          onClose={() => setNativeVisible(false)}
          onPressAction={index => {
            const option = shareDocumentOptions[index];
            if (typeof option === 'string') Alert.alert(option);
            else Alert.alert(option.label);
          }}
          showCancelIcon
        />
      </ScrollView>
    </SafeAreaView>
  );
}
