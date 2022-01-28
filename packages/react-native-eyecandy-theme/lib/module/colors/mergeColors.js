import deepmerge from 'deepmerge';
export default function mergeColors(_ref) {
  let {
    colors,
    defaultColors,
    ...variables
  } = _ref;

  if (colors instanceof Function) {
    const newColors = colors(variables);
    return deepmerge(defaultColors, newColors);
  }

  if (colors) {
    return deepmerge(defaultColors, colors);
  }

  return defaultColors;
}
//# sourceMappingURL=mergeColors.js.map