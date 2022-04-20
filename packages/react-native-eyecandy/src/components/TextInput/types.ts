import {
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';

export type TextInputStyles = {
  container?: StyleProp<ViewStyle>;
  input?: StyleProp<TextStyle>;
  iconContainer?: StyleProp<ViewStyle>;
  leftIconContainer?: StyleProp<ViewStyle>;
  rightIconContainer?: StyleProp<ViewStyle>;
};

export interface TextInputStyleProps {
  color?: ThemeInputColorChoices;
  error?: boolean;
  inputPaddingLeft?: number;
  inputPaddingRight?: number;
  inputDefaultHorizontalPadding?: number;
  marginBottom?: number;
  marginTop?: number;
  fullWidth?: boolean;
  height?: number;
}

export interface TextInputSecureTextEntryProps {
  showSecureTextEntryToggle?: boolean;
  secureTextEntry?: boolean;
  onSecureTextEntryChange?: (secureTextEntry: boolean) => void;
}

export interface TextInputBaseProps
  extends TextInputStyleProps,
    TextInputSecureTextEntryProps {
  style?: StyleProp<ViewStyle>;
  styles?: TextInputStyles;
  iconLeft?: React.ComponentType<IconProps> | React.ReactElement<any>;
  onPressIconLeft?: () => void;
  iconRight?: React.ComponentType<IconProps> | React.ReactElement<any>;
  onPressIconRight?: () => void;
  focusOnLeftIconPress?: boolean;
  focusOnRightIconPress?: boolean;
  inputLeft?: React.ReactNode;
  inputRight?: React.ReactNode;
  required?: boolean;
}

export interface TextInputHandle {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
}

export interface TextInputProps
  extends TextInputBaseProps,
    Omit<RNTextInputProps, 'style'> {}
