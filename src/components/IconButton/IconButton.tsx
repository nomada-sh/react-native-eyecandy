import React, { useMemo, FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import BaseButton, { BaseButtonProps } from '../BaseButton';
import { useTheme } from '../../hooks';

interface IconProps {
  size: number;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}

export interface IconButtonProps extends BaseButtonProps {
  icon?: FC<IconProps>;
  size?: number;
  iconSize?: number;
  iconColor?: string;
}

function IconButton({
  icon: Icon,
  style,
  size = 56,
  iconSize: iconSizeProp,
  color = 'default',
  iconColor: iconColorProp,
  variant = 'rounded',
  inverse,
  ...props
}: IconButtonProps) {
  const { foreground, background } = useTheme().components.button[color];

  let icon: ReactNode = useMemo(() => {
    const iconSize = iconSizeProp ?? size * 0.4;
    const iconColor = iconColorProp
      ? iconColorProp
      : inverse
      ? background
      : foreground;

    return Icon ? <Icon size={iconSize} stroke={iconColor} /> : null;
  }, [
    Icon,
    background,
    foreground,
    iconColorProp,
    iconSizeProp,
    inverse,
    size,
  ]);

  return (
    <BaseButton
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
      color={color}
      inverse={inverse}
      height={size}
      variant={variant}
      {...props}
    >
      {icon}
    </BaseButton>
  );
}

export default IconButton;
