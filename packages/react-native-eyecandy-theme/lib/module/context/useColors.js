import useTheme from './useTheme';
export default function useColors(selector) {
  const theme = useTheme();

  if (selector) {
    return selector(theme.colors);
  }

  return theme.colors;
}
//# sourceMappingURL=useColors.js.map