import { useCallback } from 'react';
export default function usePressableStyles(style) {
  const getButtonStyle = useCallback(e => {
    const styles = [];

    if (style instanceof Array) {
      styles.push(style.map(s => s instanceof Function ? s(e) : s));
    } else if (style instanceof Function) {
      styles.push(style(e));
    } else {
      styles.push(style);
    }

    return styles;
  }, [style]);
  return getButtonStyle;
}
//# sourceMappingURL=usePressableStyles.js.map