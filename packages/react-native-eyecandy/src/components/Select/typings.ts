import type {FC} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';

import type {
  PickerSelectProps as SelectBaseProps,
  Item as ItemBase,
} from 'react-native-picker-select';

import type {ThemeInputColorChoices} from '@nomada-sh/react-native-eyecandy-theme';

export interface Item<ValueType = unknown> extends ItemBase {
  value: ValueType | null;
}

export type SelectIcon = FC<{
  size: number;
  stroke?: string;
}>;

export interface SelectProps<ValueType = unknown>
  extends Omit<
    SelectBaseProps,
    'items' | 'onValueChange' | 'style' | 'placeholder' | 'value'
  > {
  items?: Item<ValueType>[];
  onValueChange?: (value: ValueType | null, index: number) => void;
  value?: ValueType | null;
  placeholder?: string;
  color?: ThemeInputColorChoices;
  variant?: 'default' | 'outlined';
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: SelectIcon;
  style?: StyleProp<ViewStyle>;
  androidItemSelectedColor?: string;
}
