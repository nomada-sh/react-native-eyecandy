import React from 'react';

import Svg from 'react-native-svg';
import { useSvgIconColors } from '../hooks';
import { SvgIconContainerProps } from '../types';

export function SvgIconContainer({
  size = 24,
  color = 'default',
  variant = 'stroke',
  style,
  children,
}: SvgIconContainerProps) {
  const svgColorProps = useSvgIconColors({
    color,
    variant,
  });

  return (
    <Svg
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
      {...svgColorProps}
    >
      {children}
    </Svg>
  );
}
