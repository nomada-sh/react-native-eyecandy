import { StyleSheet } from 'react-native';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
export default function useStyles(_ref) {
  let {
    color = 'default',
    variant = 'default',
    value,
    focused,
    withPaddingStart
  } = _ref;
  const colors = useColors(c => c.input[color]);
  const padding = 16;
  return StyleSheet.create({
    container: {
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'solid',
      overflow: 'hidden',
      flexDirection: 'row',
      borderColor: focused ? colors.focused.indicator : variant === 'outlined' ? colors.border : colors.background,
      backgroundColor: variant === 'outlined' ? undefined : focused ? colors.focused.background : colors.background
    },
    selectContainer: {
      flex: 1
    },
    input: {
      color: colors.foreground,
      fontWeight: value ? '700' : 'normal',
      paddingHorizontal: 0,
      paddingStart: withPaddingStart ? padding : 0,
      height: 56
    },
    placeholder: {
      color: colors.placeholder
    },
    iconContainer: {
      justifyContent: 'center',
      paddingHorizontal: padding
    },
    icon: {
      fontSize: 20,
      color: focused ? colors.focused.indicator : undefined
    }
  });
}
//# sourceMappingURL=useStyles.js.map