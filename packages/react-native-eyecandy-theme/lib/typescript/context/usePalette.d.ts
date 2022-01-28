import { ThemePalette } from '../palette';
export default function usePalette(): ThemePalette;
export default function usePalette<T>(selector: (palette: ThemePalette) => T): T;
