import { ThemeTypography } from '../typography';
export default function useTypography(): ThemeTypography;
export default function useTypography<T>(selector: (typography: ThemeTypography) => T): T;
