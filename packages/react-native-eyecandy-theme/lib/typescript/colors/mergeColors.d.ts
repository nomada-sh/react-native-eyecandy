import { MergeThemeColorsOptions } from './types';
export default function mergeColors<T>({ colors, defaultColors, ...variables }: MergeThemeColorsOptions<T>): T;
