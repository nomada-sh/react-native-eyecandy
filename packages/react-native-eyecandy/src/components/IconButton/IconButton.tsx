import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';

import { ButtonBase, ButtonBaseProps } from '../ButtonBase';

export interface IconButtonProps extends ButtonBaseProps {
  icon?: React.ComponentType<IconProps> | React.ReactElement<any> | null;
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
  transparent,
  ...props
}: IconButtonProps) {
  const { foreground, background } = useColors(c => c.button[color]);

  const iconSize = iconSizeProp ?? Math.round(size * 0.4);
  let iconColor = iconColorProp;

  if (iconColor === undefined) {
    iconColor = inverse ? background : foreground;
  }

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
          flex: 0,
        },
        style,
      ]}
      color={color}
      inverse={inverse}
      height={size}
      variant={variant}
      transparent={transparent}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}

export default IconButton;
