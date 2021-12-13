import React, { ReactNode } from 'react';
import {
  Switch as SwitchBase,
  SwitchProps as SwitchBaseProps,
} from 'react-native';

import { useTheme } from '../../hooks';
import type { SwitchColors } from '../../theme';

export interface SwitchProps extends SwitchBaseProps {
  children?: ReactNode;
  color?: SwitchColors;
}

function Switch({ color = 'default', ...props }: SwitchProps) {
  const colors = useTheme().components.toggle[color];

  return (
    <SwitchBase
      trackColor={{
        false: colors.trackColor,
        true: colors.trackColorEnabled,
      }}
      thumbColor={colors.thumbColor}
      {...props}
    />
  );
}

export default Switch;
