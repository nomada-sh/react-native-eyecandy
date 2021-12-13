import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '../../hooks';
import type { InputColors } from '../../theme';

export default function useStyles<ValueType>({
  color = 'default',
  variant = 'default',
  value,
  focused,
  withPaddingStart,
}: {
  color?: InputColors;
  value?: ValueType;
  focused?: boolean;
  withPaddingStart?: boolean;
  variant?: 'default' | 'outlined';
}) {
  const colors = useTheme().components.input[color];
  const padding = 16;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          borderRadius: 12,
          borderWidth: 1,
          borderStyle: 'solid',
          overflow: 'hidden',
          flexDirection: 'row',
          borderColor: focused
            ? colors.focused.indicator
            : variant === 'outlined'
            ? colors.border
            : colors.background,
          backgroundColor:
            variant === 'outlined'
              ? undefined
              : focused
              ? colors.focused.background
              : colors.background,
        },
        selectContainer: {
          flex: 1,
        },
        input: {
          color: colors.foreground,
          fontWeight: value ? '700' : 'normal',
          paddingHorizontal: 0,
          paddingStart: withPaddingStart ? padding : 0,
          height: 56,
        },
        placeholder: {
          color: colors.placeholder,
        },
        iconContainer: {
          justifyContent: 'center',
          paddingHorizontal: padding,
        },
        icon: {
          fontSize: 20,
          color: focused ? colors.focused.indicator : undefined,
        },
      }),
    [
      focused,
      colors.focused.indicator,
      colors.focused.background,
      colors.border,
      colors.background,
      colors.foreground,
      colors.placeholder,
      variant,
      value,
      withPaddingStart,
    ],
  );
}
