import {useCallback} from 'react';
import type {
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

type StyleType =
  | StyleProp<ViewStyle>
  | ((e: PressableStateCallbackType) => StyleProp<ViewStyle>);

export default function usePressableStyles(style: StyleType[] | StyleType) {
  const getButtonStyle = useCallback(
    (e: PressableStateCallbackType) => {
      const styles: StyleProp<ViewStyle>[] = [];

      if (style instanceof Array) {
        styles.push(style.map(s => (s instanceof Function ? s(e) : s)));
      } else if (style instanceof Function) {
        styles.push(style(e));
      } else {
        styles.push(style);
      }

      return styles;
    },
    [style],
  );

  return getButtonStyle;
}
