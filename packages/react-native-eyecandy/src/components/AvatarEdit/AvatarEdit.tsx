import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

import { Camera, Photo } from '@nomada-sh/react-native-eyecandy-icons';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import ActionSheet, { ActionSheetOption } from '../ActionSheet';
import Avatar, { AvatarProps } from '../Avatar';
import IconButton from '../IconButton';

interface OnChangeError {
  code: string;
  message: string;
}

export interface AvatarEditProps extends Omit<PressableProps, 'style'> {
  size?: number;
  source: AvatarProps['source'];
  style?: StyleProp<ViewStyle>;
  onChange?: (image?: ImageSourcePropType, error?: OnChangeError) => void;
  fromGalleryText?: string;
  fromCameraText?: string;
  title?: string;
}

function AvatarEdit({
  style,
  size = 100,
  source,
  onPress: onPressProp,
  onChange,
  fromGalleryText = 'From Gallery',
  fromCameraText = 'From Camera',
  title = 'Change Avatar',
  ...props
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

    const launch = index === 0 ? launchImageLibrary : launchCamera;

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
  ];

  const onPress = (e: GestureResponderEvent) => {
    ReactNativeHapticFeedback.trigger('impactLight');
    setVisible(true);
    onPressProp && onPressProp(e);
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      {...props}
    >
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
        iconSize={size * 0.14}
        size={size * 0.24}
        color="primary"
        onPress={onPress}
      />
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        onPressAction={onPressAction}
        options={options}
        title={title}
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

export default AvatarEdit;
