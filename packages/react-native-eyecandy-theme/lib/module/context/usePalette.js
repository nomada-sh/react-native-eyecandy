import useTheme from './useTheme';
export default function usePalette(selector) {
  const theme = useTheme();

  if (selector) {
    return selector(theme.palette);
  }

  return theme.palette;
}
//# sourceMappingURL=usePalette.js.map