import type { StyleProp, ViewStyle } from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import type { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
import type { Item as ItemBase } from 'react-native-picker-select';

export interface NativeSelectIconProps extends IconProps {
  focused: boolean;
}

export interface NativeSelectItem<V> extends ItemBase {
  value: V;
}

export interface NativeSelectHandle {
  focus: () => void;
}

export interface NativeSelectStyleProps {
  color?: ThemeInputColorChoices;
  variant?: 'default' | 'outlined';
}

export interface NativeSelectProps<V> extends NativeSelectStyleProps {
  items?: NativeSelectItem<V>[];
  onChange?: (value: V | undefined, index: number) => void;
  value?: V;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: React.ComponentType<NativeSelectIconProps> | React.ReactElement<any>;
  style?: StyleProp<ViewStyle>;
  emptyText?: string;
  marginBottom?: number;
  marginTop?: number;
  dark?: boolean;
}
