import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
declare type StyleType = StyleProp<ViewStyle> | ((e: PressableStateCallbackType) => StyleProp<ViewStyle>);
export default function usePressableStyles(style: StyleType[] | StyleType): (e: PressableStateCallbackType) => StyleProp<ViewStyle>[];
export {};
