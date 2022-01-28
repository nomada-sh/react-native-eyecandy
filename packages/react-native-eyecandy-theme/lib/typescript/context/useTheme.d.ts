import { Theme } from '../themes';
export default function useTheme(): Theme;
export default function useTheme<T>(selector: (theme: Theme) => T): T;
