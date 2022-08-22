import { ThemeTextColorsChoices } from '@nomada-sh/react-native-eyecandy-theme';
import { LiteralUnion } from 'type-fest';
import { useIconColor } from './useIconColor';

export interface UseSvgIconColorsParams {
 color: LiteralUnion<ThemeTextColorsChoices, string>
 variant: 'stroke' | 'fill' | 'both'
}

export function useSvgIconColors(params: UseSvgIconColorsParams){
  const color = useIconColor(params.color);

  let fill = "none";
  let stroke = "none";

  switch(params.variant) {
    case 'both':
      fill = color;
      stroke = color;
      break;
    case 'fill':
      fill = color;
      break;
    case 'stroke':
      stroke = color;
      break;
  }

  return {
    color,
    fill,
    stroke
  }
}