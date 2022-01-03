import deepmerge from 'deepmerge';
import type { Theme, DeepPartial } from '../typings';

export default function mergeThemes(a: Theme, b: DeepPartial<Theme>): Theme {
  return deepmerge(a, b) as Theme;
}
