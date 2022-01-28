import React, { ReactNode } from 'react';
import {
  Switch as SwitchBase,
  SwitchProps as SwitchBaseProps,
} from 'react-native';

import { useColors, ThemeSwitchColorChoices } from '@nomada-sh/react-native-eyecandy-theme';

export interface SwitchProps extends SwitchBaseProps {
  children?: ReactNode;
  color?: ThemeSwitchColorChoices;
}

function Switch({ color = 'default', ...props }: SwitchProps) {
  const colors = useColors(c => c.switch[color]);

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
