import type React from 'react';
import type {
  StyleProp,
  TextInput as TextInputBase,
  TextInputProps as TextInputBaseProps,
  ViewStyle,
} from 'react-native';

import type { TextInputErrorsProps } from '../TextInputErrors';
import type { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';

export type TextInputIcon = React.FC<{
  size: number;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}>;

export type TextInputRefCurrent = TextInputBase | null;

export interface TextInputProps
  extends TextInputBaseProps,
    TextInputErrorsProps {
  startIcon?: TextInputIcon;
  endIcon?: TextInputIcon;
  onPressAction?: () => void;
  showSecureTextEntryToggle?: boolean;
  onSecureTextEntryChange?: (secureTextEntry: boolean) => void;
  color?: ThemeInputColorChoices;
  inputStyle?: TextInputBaseProps['style'];
  inputRef?:
    | React.MutableRefObject<TextInputRefCurrent>
    | ((current: TextInputRefCurrent) => void);
  fullWidth?: boolean;
  required?: boolean;
}
