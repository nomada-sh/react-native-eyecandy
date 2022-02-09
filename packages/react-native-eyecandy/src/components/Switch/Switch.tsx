import React, { ReactNode, useCallback } from 'react';
import {
  Switch as SwitchBase,
  SwitchProps as SwitchBaseProps,
} from 'react-native';

import {
  useColors,
  ThemeSwitchColorChoices,
} from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export interface SwitchProps extends SwitchBaseProps {
  children?: ReactNode;
  color?: ThemeSwitchColorChoices;
}

function Switch({
  color = 'default',
  onValueChange: onValueChangeProp,
  ...props
}: SwitchProps) {
  const colors = useColors(c => c.switch[color]);

  const onValueChange = useCallback(
    (value: boolean) => {
      ReactNativeHapticFeedback.trigger('impactMedium');

      if (onValueChangeProp) return onValueChangeProp(value);
    },
    [onValueChangeProp],
  );

  return (
    <SwitchBase
      onValueChange={onValueChange}
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
