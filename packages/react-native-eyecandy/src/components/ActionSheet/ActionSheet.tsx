import React, { useEffect } from 'react';
import { Platform, ActionSheetIOS, View } from 'react-native';

import { IconProps, Close } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

import { ActionSheetAndroid } from '../../modules';
import { Body } from '../../typography';
import { BottomSheet } from '../BottomSheet';
import Menu from '../Menu';
import MenuItemBase from '../MenuItemBase';

export type ActionSheetOption =
  | string
  | {
      label: string;
      icon?: React.ComponentType<IconProps> | React.ReactElement;
    };

export interface ActionSheetProps {
  visible?: boolean;
  options: ActionSheetOption[];
  title?: string;
  message?: string;
  native?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onPressAction?: (index: number) => void;
  cancelText?: string;
  showCancelIcon?: boolean;
  dark?: boolean;
}

export default function ActionSheet({
  visible,
  options,
  title,
  message,
  native,
  onPressAction,
  onCancel,
  onClose,
  cancelText = 'Cancel',
  showCancelIcon,
  dark: darkProp,
}: ActionSheetProps) {
  const { dark: darkTheme, palette } = useTheme();
  const dark = darkProp !== undefined ? darkProp : darkTheme;

  const cancelButtonIndex = options.length;

  const isNative =
    native && (Platform.OS === 'ios' || Platform.OS === 'android');

  useEffect(() => {
    if (!isNative || !visible) return;

    const newOptions = options.map(option => {
      if (typeof option === 'string') return option;

      return option.label;
    });

    const callback = (index: number) => {
      if (index !== cancelButtonIndex) onPressAction && onPressAction(index);
      else onCancel && onCancel();
      onClose && onClose();
    };

    switch (Platform.OS) {
      case 'ios':
        return ActionSheetIOS.showActionSheetWithOptions(
          {
            cancelButtonIndex,
            options: [...newOptions, cancelText],
            userInterfaceStyle: dark ? 'dark' : 'light',
            title,
            message,
          },
          callback,
        );

      case 'android':
        return ActionSheetAndroid.show(
          {
            options: newOptions,
            title,
            cancelButtonIndex,
            userInterfaceStyle: dark ? 'dark' : 'light',
          },
          callback,
        );
    }
  }, [
    cancelButtonIndex,
    cancelText,
    dark,
    message,
    onCancel,
    onClose,
    onPressAction,
    options,
    title,
    visible,
    isNative,
  ]);

  if (isNative) return null;

  const showHeader = title || message;
  const paddingVertical = 10;
  const cancelItemBottomMargin = Platform.OS === 'ios' ? 20 : 10;
  const heightAddedSeparation =
    2 * paddingVertical + cancelItemBottomMargin + (showHeader ? 20 : 0);
  const titleHeight = title ? 24 : 0;
  const messageHeight = message ? 20 : 0;
  let height =
    (options.length + 1) * 45 +
    heightAddedSeparation +
    titleHeight +
    messageHeight;

  return (
    <BottomSheet height={height} visible={visible} onClose={onClose}>
      {showHeader ? (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical,
          }}
        >
          {title ? (
            <Body
              size="large"
              weight="bold"
              style={{
                height: titleHeight,
              }}
            >
              {title}
            </Body>
          ) : null}
          {message ? (
            <Body
              style={{
                height: messageHeight,
              }}
            >
              {message}
            </Body>
          ) : null}
        </View>
      ) : null}
      <Menu>
        {options.map((option, index) => {
          const Icon = typeof option === 'string' ? null : option.icon;
          const label = typeof option === 'string' ? option : option.label;

          const icon = Icon ? (
            React.isValidElement(Icon) ? (
              Icon
            ) : (
              <Icon size={20} />
            )
          ) : null;

          return (
            <MenuItemBase
              onPress={() => {
                onPressAction && onPressAction(index);
                onClose && onClose();
              }}
              style={{
                height: 45,
                justifyContent: 'center',
              }}
              key={index}
            >
              {icon}
              <Body
                style={{
                  marginLeft: icon ? 10 : 0,
                }}
              >
                {label}
              </Body>
            </MenuItemBase>
          );
        })}
        <MenuItemBase
          style={{
            backgroundColor: Color(palette.error[200]).alpha(0.1).string(),
            marginTop: 10,
          }}
          onPress={() => {
            onCancel && onCancel();
            onClose && onClose();
          }}
        >
          {showCancelIcon ? <Close size={20} color="error" /> : null}
          <Body
            style={{
              marginLeft: showCancelIcon ? 10 : 0,
            }}
            color="error"
          >
            {cancelText}
          </Body>
        </MenuItemBase>
      </Menu>
    </BottomSheet>
  );
}
