import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
export default function useStyles(_ref) {
  let {
    color = 'default',
    inverse = false
  } = _ref;
  const {
    background,
    foreground
  } = useColors(c => c.button[color]);
  return useMemo(() => StyleSheet.create({
    text: {
      color: inverse ? background : foreground
    }
  }), [inverse, background, foreground]);
}
//# sourceMappingURL=useStyles.js.map