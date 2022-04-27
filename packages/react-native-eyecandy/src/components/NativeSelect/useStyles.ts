import { StyleSheet } from 'react-native';

import {
  ThemeInputColorChoices,
  useColors,
} from '@nomada-sh/react-native-eyecandy-theme';

export default function useStyles({
  color = 'default',
  variant = 'default',
  focused,
  removePaddingLeft,
}: {
  color?: ThemeInputColorChoices;
  focused?: boolean;
  removePaddingLeft?: boolean;
  variant?: 'default' | 'outlined';
}) {
  const colors = useColors(c => c.input[color]);
  const padding = 16;

  return StyleSheet.create({
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
    select: {
      color: colors.foreground,
      paddingHorizontal: 0,
      paddingStart: removePaddingLeft ? 0 : padding,
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
  });
}
