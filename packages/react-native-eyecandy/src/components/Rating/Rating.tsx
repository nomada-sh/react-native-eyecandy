import React from 'react';
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { StarFill } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

export interface RatingProps {
  style?: StyleProp<ViewStyle>;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  gap?: number;
}

export function Rating({
  style,
  value,
  onChange,
  max = 5,
  gap = 10,
}: RatingProps) {
  const { palette, dark } = useTheme();

  const onColor = palette.primary[500];
  const offColor = palette.grey[dark ? '800' : '200'];
  const onPress = (i: number) => onChange(i === value ? 0 : i);

  const children: React.ReactNode[] = [];
  for (let i = 1; i <= max; i++) {
    children.push(
      <View
        key={i}
        style={{
          marginRight: i < max ? gap : 0,
        }}
      >
        <TouchableWithoutFeedback onPress={() => onPress(i)}>
          <StarFill size={32} color={i <= value ? onColor : offColor} />
        </TouchableWithoutFeedback>
      </View>,
    );
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
