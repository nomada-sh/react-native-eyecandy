import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import { Text } from '../../../typography';

export interface CellProps {
  index: number;
  value: string;
  size?: number;
  ref?: React.RefObject<View>;
  focused?: boolean;
  onPress?: (index: number) => void;
}

const Cell = React.forwardRef<View, CellProps>(
  ({ size = 56, index, value, focused, onPress, ...props }, ref?) => {
    const colors = useColors(c => c.input.default);

    return (
      <TouchableWithoutFeedback onPress={() => onPress?.(index)}>
        <View
          ref={ref}
          style={{
            width: size,
            height: size,
            borderRadius: 12,
            backgroundColor: focused
              ? colors.focused.background
              : colors.background,
            borderWidth: 1,
            borderColor: focused ? colors.focused.indicator : colors.background,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...props}
        >
          <Text size={size / 2.5} weight="semibold">
            {value}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export default Cell;
