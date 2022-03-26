import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
import type { TextInputMaskProps as TextInputMaskBaseProps } from 'react-native-text-input-mask';

import type { TextInputErrorsProps } from '../TextInputErrors';

export type TextInputMaskIcon = React.FC<{
  size: number;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}>;

// TODO: Add type
export type TextInputMaskRefCurrent = any | null;

export interface TextInputMaskProps
  extends TextInputMaskBaseProps,
    TextInputErrorsProps {
  startIcon?: TextInputMaskIcon;
  endIcon?: TextInputMaskIcon;
  onPressAction?: () => void;
  showSecureTextEntryToggle?: boolean;
  onSecureTextEntryChange?: (secureTextEntry: boolean) => void;
  color?: ThemeInputColorChoices;
  inputStyle?: TextInputMaskBaseProps['style'];
  inputRef?:
    | React.MutableRefObject<TextInputMaskRefCurrent>
    | ((current: TextInputMaskRefCurrent) => void);
  fullWidth?: boolean;
  required?: boolean;
}
