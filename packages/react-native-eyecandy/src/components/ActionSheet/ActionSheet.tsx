// import React, { useEffect } from 'react';
import React from 'react';
import {
  Platform,
  // ActionSheetIOS,
  View,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';

import { IconProps, Close } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

// import { ActionSheetAndroid } from '../../modules';
import { Body } from '../../typography';
import { BottomSheet } from '../BottomSheet';
import Menu from '../Menu';
import MenuItemBase from '../MenuItemBase';

export type ActionSheetOption =
  | string
  | {
      label: string;
      icon?: React.ComponentType<IconProps> | React.ReactElement;
      hidden?: any;
      loading?: any;
      disabled?: any;
    };

export interface ActionSheetProps {
  visible?: boolean;
  options: ActionSheetOption[];
  title?: string;
  message?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onPressAction?: (index: number) => void;
  cancelText?: string;
  showCancelIcon?: boolean;
  /**
   * @deprecated
   */
  dark?: boolean;
  /**
   * @deprecated
   */
  native?: boolean;
  itemStyle?: StyleProp<ViewStyle>;
  itemHeight?: number;
  closeOnPressActionDisabled?: boolean;
}

export default function ActionSheet({
  visible,
  options,
  title,
  message,
  // native,
  onPressAction,
  onCancel,
  onClose,
  cancelText = 'Cancel',
  showCancelIcon,
  // dark: darkProp,
  itemStyle,
  itemHeight = 45,
  closeOnPressActionDisabled,
}: ActionSheetProps) {
  // const options = optionsProp.filter(o =>
  //   typeof o === 'string' ? true : !o.hidden,
  // );
  // const { dark: darkTheme, palette, colors } = useTheme();
  // const dark = darkProp !== undefined ? darkProp : darkTheme;

  // const cancelButtonIndex = options.length;

  // const isNative =
  //   native && (Platform.OS === 'ios' || Platform.OS === 'android');

  // useEffect(() => {
  //   if (!isNative || !visible) return;

  //   const newOptions = options.map(option => {
  //     if (typeof option === 'string') return option;

  //     return option.label;
  //   });

  //   const callback = (index: number) => {
  //     if (index !== cancelButtonIndex) onPressAction && onPressAction(index);
  //     else onCancel && onCancel();
  //     onClose && onClose();
  //   };

  //   switch (Platform.OS) {
  //     case 'ios':
  //       return ActionSheetIOS.showActionSheetWithOptions(
  //         {
  //           cancelButtonIndex,
  //           options: [...newOptions, cancelText],
  //           userInterfaceStyle: dark ? 'dark' : 'light',
  //           title,
  //           message,
  //         },
  //         callback,
  //       );

  //     case 'android':
  //       return ActionSheetAndroid.show(
  //         {
  //           options: newOptions,
  //           title,
  //           cancelButtonIndex,
  //           userInterfaceStyle: dark ? 'dark' : 'light',
  //         },
  //         callback,
  //       );
  //   }
  // }, [
  //   cancelButtonIndex,
  //   cancelText,
  //   dark,
  //   message,
  //   onCancel,
  //   onClose,
  //   onPressAction,
  //   options,
  //   title,
  //   visible,
  //   isNative,
  // ]);

  // if (isNative) return null;

  const { palette, colors } = useTheme();

  const showHeader = title || message;
  const paddingVertical = 10;
  const cancelItemBottomMargin = Platform.OS === 'ios' ? 20 : 10;
  const heightAddedSeparation =
    2 * paddingVertical + cancelItemBottomMargin + (showHeader ? 20 : 0);
  const titleHeight = title ? 24 : 0;
  const messageHeight = message ? 20 : 0;

  const visibleOptionsLength = options.filter(o =>
    typeof o === 'string' ? true : !o.hidden,
  ).length;

  let height =
    (visibleOptionsLength + 1) * itemHeight +
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
          const loading = typeof option === 'string' ? false : option.loading;
          const disabled = typeof option === 'string' ? false : option.disabled;
          const hidden = typeof option === 'string' ? false : option.hidden;

          if (hidden) return null;

          let icon = Icon ? (
            React.isValidElement(Icon) ? (
              Icon
            ) : (
              <Icon size={20} color={colors.text.default.normal} />
            )
          ) : null;

          if (loading)
            icon = (
              <ActivityIndicator color={colors.text.default.normal} size={20} />
            );

          return (
            <MenuItemBase
              disabled={disabled || loading}
              onPress={() => {
                onPressAction && onPressAction(index);

                if (!closeOnPressActionDisabled && onClose) onClose();
              }}
              style={[
                {
                  height: itemHeight,
                  justifyContent: 'center',
                },
                itemStyle,
              ]}
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
            height: itemHeight,
            justifyContent: 'center',
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
