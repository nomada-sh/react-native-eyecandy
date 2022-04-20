import React from 'react';
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';

export interface IconTouchableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: React.ComponentType<IconProps> | React.ReactElement<any>;
  color: string;
}

export default function IconTouchable({
  onPress,
  icon: Icon,
  style,
  color,
}: IconTouchableProps) {
  if (!Icon) return null;

  const icon = React.isValidElement(Icon) ? (
    Icon
  ) : (
    <Icon size={20} stroke={color} />
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          {
            justifyContent: 'center',
          },
          style,
        ]}
      >
        {icon}
      </View>
    </TouchableWithoutFeedback>
  );
}
