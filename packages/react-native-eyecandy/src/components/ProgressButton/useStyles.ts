import { StyleSheet } from 'react-native';

import {
  ThemeButtonColorChoices,
  useColors,
} from '@nomada-sh/react-native-eyecandy-theme';

export default function useStyles({
  color = 'default',
  inverse = false,
}: {
  color?: ThemeButtonColorChoices;
  inverse?: boolean;
  hasIcon?: boolean;
}) {
  const { background, foreground } = useColors(c => c.button[color]);

  return StyleSheet.create({
    text: {
      color: inverse ? background : foreground,
    },
    icon: {
      color: inverse ? background : foreground,
      fontSize: 24,
    },
    loadingContainer: {
      marginEnd: 8,
    },
    loading: {
      color: inverse ? background : foreground,
      fontSize: 24,
    },
  });
}
