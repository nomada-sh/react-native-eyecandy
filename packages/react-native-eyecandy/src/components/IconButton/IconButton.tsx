import React, { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import BaseButton, { BaseButtonProps } from '../BaseButton';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';

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
  iconStyle?: StyleProp<ViewStyle>;
}

function IconButton({
  icon: Icon,
  style,
  size = 56,
  iconSize: iconSizeProp,
  color = 'default',
  iconColor: iconColorProp,
  iconStyle,
  variant = 'rounded',
  inverse,
  ...props
}: IconButtonProps) {
  const { foreground, background } = useColors(c => c.button[color]);

  const iconSize = iconSizeProp ?? size * 0.4;
  const iconColor = iconColorProp
    ? iconColorProp
    : inverse
    ? background
    : foreground;

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
      {...props}>
      {Icon ? (
        <Icon size={iconSize} stroke={iconColor} style={iconStyle} />
      ) : null}
    </BaseButton>
  );
}

export default IconButton;
