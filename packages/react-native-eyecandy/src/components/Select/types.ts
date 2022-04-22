import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';

export interface SelectItemIconProps extends IconProps {
  selected: boolean;
}

export interface SelectIconProps extends IconProps {
  focused: boolean;
}

export interface SelectItem<V> {
  value: V;
  label: string;
  key?: string;
  icon?: React.ComponentType<SelectItemIconProps> | React.ReactElement<any>;
}

export interface SelectHandle {
  focus: () => void;
  blur: () => void;
}

type IsSelected<V> = (item: SelectItem<V>, value: any) => boolean;

export interface PickerProps<V> {
  onClose: () => void;
  visible: boolean;
  items: SelectItem<V>[];
  isSelected: IsSelected<V>;
  value?: V;
  onPress: (item: SelectItem<V>, index: number) => void;
  title?: string;
  selectedItemIndex: number;
}

export interface SelectPropsStyleProps {
  color?: ThemeInputColorChoices;
  variant?: 'default' | 'outlined';
}

export interface SelectProps<V> extends SelectPropsStyleProps {
  items?: SelectItem<V>[];
  onChange?: (value: V | undefined, index: number) => void;
  value?: V;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: React.ComponentType<SelectIconProps> | React.ReactElement<any>;
  style?: StyleProp<ViewStyle>;
  isSelected?: IsSelected<V>;
  closeOnSelect?: boolean;
  modalTitle?: string;
  emptyText?: string;
  marginBottom?: number;
  marginTop?: number;
  hideClearIcon?: boolean;
}
