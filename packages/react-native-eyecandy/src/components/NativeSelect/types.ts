import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import type { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
import type {
  PickerSelectProps as SelectBaseProps,
  Item as ItemBase,
} from 'react-native-picker-select';

export interface NativeSelectItem<V = unknown> extends ItemBase {
  value: V | null;
}

export interface NativeSelectProps<V = unknown>
  extends Omit<
    SelectBaseProps,
    'items' | 'onValueChange' | 'style' | 'placeholder' | 'value'
  > {
  items?: NativeSelectItem<V>[];
  onValueChange?: (value: V | null, index: number) => void;
  value?: V | null;
  placeholder?: string;
  color?: ThemeInputColorChoices;
  variant?: 'default' | 'outlined';
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: React.ComponentType<IconProps> | React.ReactElement<any>;
  style?: StyleProp<ViewStyle>;
  androidItemSelectedColor?: string;
}
