import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';

export interface SelectItemIconProps extends IconProps {
  selected: boolean;
}

export interface SelectItem {
  value: any;
  label: string;
  key?: string;
  icon?: React.ComponentType<SelectItemIconProps> | React.ReactElement<any>;
}

export interface SelectHandle {
  focus: () => void;
  blur: () => void;
}

type IsSelected = (item: SelectItem, value: any) => boolean;

export interface PickerProps {
  onClose: () => void;
  visible: boolean;
  items: SelectItem[];
  isSelected: IsSelected;
  value?: any;
  onPress: (item: SelectItem, index: number) => void;
  title?: string;
  selectedItemIndex: number;
}

export interface SelectPropsStyleProps {
  color?: ThemeInputColorChoices;
  variant?: 'default' | 'outlined';
}

export interface SelectProps extends SelectPropsStyleProps {
  items?: SelectItem[];
  onChange?: (value: any, index: number) => void;
  value?: any;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: React.ComponentType<IconProps> | React.ReactElement<any>;
  style?: StyleProp<ViewStyle>;
  isSelected?: IsSelected;
  closeOnSelect?: boolean;
  modalTitle?: string;
  emptyText?: string;
  marginBottom?: number;
  marginTop?: number;
  hideClearIcon?: boolean;
}
