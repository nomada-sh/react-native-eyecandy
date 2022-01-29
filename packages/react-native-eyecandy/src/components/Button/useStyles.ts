import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

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
}) {
  const {background, foreground} = useColors(c => c.button[color]);

  return useMemo(
    () =>
      StyleSheet.create({
        text: {
          color: inverse ? background : foreground,
        },
      }),
    [inverse, background, foreground],
  );
}
