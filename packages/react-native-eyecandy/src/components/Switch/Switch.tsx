import React, { ReactNode, useCallback } from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';

import {
  useColors,
  ThemeSwitchColorChoices,
} from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export interface SwitchProps extends RNSwitchProps {
  children?: ReactNode;
  color?: ThemeSwitchColorChoices;
}

function Switch({
  color = 'default',
  onValueChange: onValueChangeProp,
  style,
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
    <RNSwitch
      onValueChange={onValueChange}
      trackColor={{
        false: colors.trackColor,
        true: colors.trackColorEnabled,
      }}
      thumbColor={colors.thumbColor}
      style={[
        {
          alignSelf: 'flex-start',
        },
        style,
      ]}
      {...props}
    />
  );
}

export default Switch;
