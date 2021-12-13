import deepmerge from 'deepmerge';

import Components from '../components';
import type { ThemeOptions, ThemeComponents } from '../typings';

import createPalette from './createPalette';
import createTypography from './createTypography';

export default function createComponents({
  dark = false,
  palette,
  typography,
  components,
}: ThemeOptions): ThemeComponents {
  const newPalette = createPalette({ palette, dark });
  const newTypography = createTypography({ typography, dark });

  const baseComponents = Components({
    dark,
    palette: newPalette,
    typography: newTypography,
  });

  if (typeof components === 'function')
    return deepmerge(
      baseComponents,
      components({
        dark,
        palette: newPalette,
        typography: newTypography,
      }),
    ) as ThemeComponents;

  if (components)
    return deepmerge(baseComponents, components) as ThemeComponents;

  return baseComponents;
}
