import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Camera, Photo, Trash } from '@nomada-sh/react-native-eyecandy-icons';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';

import ActionSheet, { ActionSheetOption } from '../ActionSheet';
import Avatar, { AvatarProps } from '../Avatar';
import IconButton from '../IconButton';

export interface AvatarEditError {
  code: string;
  message: string;
}

export type AvatarEditAsset = Asset;

export interface AvatarEditProps {
  size?: number;
  source: AvatarProps['source'];
  avatarStyle?: StyleProp<ViewStyle>;
  imageStyle?: AvatarProps['imageStyle'];
  style?: StyleProp<ViewStyle>;
  onChange?: (image?: AvatarEditAsset, error?: AvatarEditError) => void;
  onDelete?: () => void;
  editable?: boolean;
  onPress?: () => void;
  fromGalleryText?: string;
  fromCameraText?: string;
  deleteText?: string;
  cancelText?: string;
  title?: string;
  fallbackComponent?: React.ReactNode;
  fallback?: boolean;
}

// TODO: Improve props.

export function AvatarEdit({
  style,
  size = 100,
  source,
  onPress: onPressProp,
  onChange,
  onDelete,
  fromGalleryText = 'From Gallery',
  fromCameraText = 'From Camera',
  deleteText = 'Delete Avatar',
  title = 'Change Avatar',
  cancelText = 'Cancel',
  editable = true,
  imageStyle,
  avatarStyle,
  fallback,
  fallbackComponent,
}: AvatarEditProps) {
  const colors = useColors(c => c.background.default);
  const [visible, setVisible] = React.useState(false);

  const onImageSelected = (res: ImagePickerResponse) => {
    if (res.didCancel) return;

    if (res.errorCode) {
      onChange?.(undefined, {
        code: res.errorCode,
        message: res.errorMessage ?? 'An unknown error occurred',
      });
    } else {
      if (res.assets && res.assets.length) onChange?.(res.assets[0]);
      else onChange?.();
    }
  };

  const onPressAction = (index: number) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    if (index === 2) {
      onDelete?.();
      return;
    }

    const launch = index === 0 ? launchImageLibrary : launchCamera;

    // TODO: Improve error handling.
    launch(options).then(onImageSelected).catch(console.error);
  };

  const options: ActionSheetOption[] = [
    {
      label: fromGalleryText,
      icon: Photo,
    },
    {
      label: fromCameraText,
      icon: Camera,
    },
    {
      label: deleteText,
      icon: Trash,
    },
  ];

  const onPress = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    setVisible(true);
    onPressProp && onPressProp();
  };

  return (
    <Pressable
      disabled={!editable}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Avatar
        style={avatarStyle}
        size={size}
        source={source}
        imageStyle={imageStyle}
        fallback={fallback}
        fallbackComponent={fallbackComponent}
      />
      {editable ? (
        <IconButton
          style={[
            {
              borderWidth: 1.5,
              borderColor: colors.container,
            },
            styles.cameraIconButton,
          ]}
          icon={Camera}
          iconSize={size * 0.2}
          size={size * 0.3}
          color="primary"
          onPress={onPress}
          disabled
          hideDisabledOverlay
        />
      ) : null}
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        onPressAction={onPressAction}
        options={options}
        title={title}
        cancelText={cancelText}
        showCancelIcon
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
