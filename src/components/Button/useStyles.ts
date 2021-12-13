import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '../../hooks';
import type { ButtonColors } from '../../theme';

export default function useStyles({
  color = 'default',
  inverse = false,
}: {
  color?: ButtonColors;
  inverse?: boolean;
}) {
  const theme = useTheme();
  const { background, foreground } = theme.components.button[color];

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
