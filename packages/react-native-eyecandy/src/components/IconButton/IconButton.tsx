import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { useColors } from '@nomada-sh/react-native-eyecandy-theme';

import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

interface IconProps {
  size: number;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}

export interface IconButtonProps extends ButtonBaseProps {
  icon?: React.ComponentType<IconProps> | React.ReactElement<any>;
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

  const iconSize = iconSizeProp ?? Math.round(size * 0.4);
  const iconColor = iconColorProp
    ? iconColorProp
    : inverse
    ? background
    : foreground;

  const children = Icon ? (
    React.isValidElement(Icon) ? (
      Icon
    ) : (
      <Icon size={iconSize} stroke={iconColor} style={iconStyle} />
    )
  ) : null;

  return (
    <ButtonBase
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
      {children}
    </ButtonBase>
  );
}

export default IconButton;
