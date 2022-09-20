import {
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';

export type TextInputStyleFnProps = {
  focused: boolean;
};

export type TextInputStyleFnInputProps = TextInputStyleFnProps & {
  paddingLeft: number;
  paddingRight: number;
};

export type TextInputStyles = {
  container?:
    | StyleProp<ViewStyle>
    | ((props: TextInputStyleFnProps) => StyleProp<ViewStyle>);
  input?:
    | StyleProp<TextStyle>
    | ((props: TextInputStyleFnInputProps) => StyleProp<TextStyle>);
  iconContainer?:
    | StyleProp<ViewStyle>
    | ((props: TextInputStyleFnProps) => StyleProp<ViewStyle>);
  leftIconContainer?:
    | StyleProp<ViewStyle>
    | ((props: TextInputStyleFnProps) => StyleProp<ViewStyle>);
  rightIconContainer?:
    | StyleProp<ViewStyle>
    | ((props: TextInputStyleFnProps) => StyleProp<ViewStyle>);
};

export interface TextInputIconProps extends IconProps {
  focused: boolean;
}

export interface TextInputLeftProps {
  focused: boolean;
  color: string;
  onPress: () => void;
}

export interface TextInputRightProps {
  focused: boolean;
  color: string;
  onPress: () => void;
  paddingLeft: number;
  paddingRight: number;
  iconRightVisible: boolean;
}

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
  flex?: number;
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
  inputStyle?: StyleProp<TextStyle>;
  styles?: TextInputStyles;
  iconLeft?:
    | React.ComponentType<TextInputIconProps>
    | React.ReactElement
    | null;
  onPressIconLeft?: () => void;
  iconRight?:
    | React.ComponentType<TextInputIconProps>
    | React.ReactElement
    | null;
  onPressIconRight?: () => void;
  focusOnLeftIconPress?: boolean;
  focusOnRightIconPress?: boolean;
  inputLeft?:
    | React.ComponentType<TextInputLeftProps>
    | React.ReactElement
    | null;
  inputRight?:
    | React.ComponentType<TextInputRightProps>
    | React.ReactElement
    | null;
  required?: boolean;
  hideIconLeftUnfocused?: boolean;
  hideIconRightUnfocused?: boolean;
  renderValueAsTextUnfocused?: boolean;
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
