import deepmerge from 'deepmerge';

import Components from '../components';
import type {
  ThemeOptions,
  ThemeComponents,
  ThemePalette,
  ThemeTypography,
} from '../typings';

export default function createComponents({
  dark = false,
  palette,
  typography,
  components,
  baseComponents,
}: {
  dark?: boolean;
  palette: ThemePalette;
  typography: ThemeTypography;
  components?: ThemeOptions['components'];
  baseComponents?: ThemeComponents;
}): ThemeComponents {
  const defaultComponents = baseComponents
    ? baseComponents
    : Components({
        dark,
        palette,
        typography,
      });

  if (typeof components === 'function')
    return deepmerge(
      defaultComponents,
      components({
        dark,
        palette,
        typography,
      }),
    ) as ThemeComponents;

  if (components)
    return deepmerge(defaultComponents, components) as ThemeComponents;

  return defaultComponents;
}
