import { ThemeColors } from '../colors';
export default function useColors(): ThemeColors;
export default function useColors<T>(selector: (colors: ThemeColors) => T): T;
