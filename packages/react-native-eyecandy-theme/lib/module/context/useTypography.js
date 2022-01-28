import useTheme from './useTheme';
export default function useTypography(selector) {
  const theme = useTheme();

  if (selector) {
    return selector(theme.typography);
  }

  return theme.typography;
}
//# sourceMappingURL=useTypography.js.map