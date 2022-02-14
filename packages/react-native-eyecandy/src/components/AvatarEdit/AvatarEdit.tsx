import React from 'react';
import { useCallback } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import Avatar, { AvatarProps } from '../Avatar';
import IconButton from '../IconButton';
import { Camera } from '@nomada-sh/react-native-eyecandy-icons';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import { ActionSheet } from '../../utils';

import { ms } from '../../utils';

export interface AvatarEditProps extends Omit<PressableProps, 'style'> {
  size?: number;
  source: AvatarProps['source'];
  style?: StyleProp<ViewStyle>;
  onChange?: (assets: ImagePickerResponse['assets']) => void;
}

function AvatarEdit({
  style,
  size = ms(100),
  source,
  onPress,
  onChange,
  ...props
}: AvatarEditProps) {
  const colors = useColors(c => c.background.default);

  const onImageSelected = useCallback(
    (res: ImagePickerResponse) => {
      if (res.errorCode) {
        throw JSON.stringify(res);
      }

      if (res.didCancel) {
        return;
      }

      onChange?.(res.assets);
    },
    [onChange],
  );

  const onActionSheetSelect = useCallback(
    index => {
      if (index === 2) {
        return;
      }

      const options: ImageLibraryOptions = {
        mediaType: 'photo',
      };

      const launch = index === 0 ? launchImageLibrary : launchCamera;

      launch(options).then(onImageSelected).catch(console.error);
    },
    [onImageSelected],
  );

  // TODO: Translate this.

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      ReactNativeHapticFeedback.trigger('impactMedium');

      ActionSheet(
        {
          optionsIOS: ['From Gallery', 'From Camera', 'Cancel'],
          optionsAndroid: ['From Gallery', 'From Camera'],
          cancelButtonIndex: 2,
          onCancelAndroidIndex: 2,
          title: 'Update Profile Picture',
        },
        onActionSheetSelect,
      );

      onPress?.(e);
    },
    [onActionSheetSelect, onPress],
  );

  return (
    <Pressable
      onPress={handlePress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      {...props}>
      <Avatar size={size} source={source} />
      <IconButton
        style={[
          {
            borderWidth: 1.5,
            borderColor: colors.content,
          },
          styles.cameraIconButton,
        ]}
        icon={Camera}
        iconSize={14}
        size={24}
        color="primary"
        onPress={handlePress}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cameraIconButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});

export default AvatarEdit;
