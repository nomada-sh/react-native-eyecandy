import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import Color from 'color';

import { Check as CheckIcon } from '../../icons';
import { useTheme } from '../../hooks';

export interface CheckProps {
  value?: boolean;
  onValueChange?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: number;
  label?: string;
}

function Check({ value = false, size = 32, style, onValueChange }: CheckProps) {
  const { palette, dark } = useTheme();

  const frontSize = size - 10;
  const backgroundColor = value
    ? palette.success[200]
    : palette.grey[dark ? 700 : 200];

  return (
    <TouchableWithoutFeedback onPress={() => onValueChange?.(!value)}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: Color(backgroundColor).alpha(0.3).rgb().string(),
          },
          styles.container,
          style,
        ]}
      >
        <View
          style={[
            {
              width: frontSize,
              height: frontSize,
              borderRadius: frontSize,
              backgroundColor,
            },
            styles.iconContainer,
          ]}
        >
          {value ? <CheckIcon stroke="white" size={15} /> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Check;
