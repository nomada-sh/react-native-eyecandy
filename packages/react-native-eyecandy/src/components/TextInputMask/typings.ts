import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
import { MaskInputProps } from 'react-native-mask-input';

import type { TextInputErrorsProps } from '../TextInputErrors';

export type TextInputMaskIcon = React.FC<{
  size: number;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}>;

// TODO: Add type
export type TextInputMaskRefCurrent = any | null;

export interface TextInputMaskProps
  extends MaskInputProps,
    TextInputErrorsProps {
  startIcon?: TextInputMaskIcon;
  endIcon?: TextInputMaskIcon;
  onPressAction?: () => void;
  showSecureTextEntryToggle?: boolean;
  onSecureTextEntryChange?: (secureTextEntry: boolean) => void;
  color?: ThemeInputColorChoices;
  inputStyle?: MaskInputProps['style'];
  inputRef?:
    | React.MutableRefObject<TextInputMaskRefCurrent>
    | ((current: TextInputMaskRefCurrent) => void);
  fullWidth?: boolean;
  required?: boolean;
  inputStartPadding?: number;
  inputEndPadding?: number;
}
