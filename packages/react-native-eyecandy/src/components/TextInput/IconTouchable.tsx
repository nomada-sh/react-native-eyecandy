import React from 'react';
import {
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { TextInputIconProps } from './types';

export interface IconTouchableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: React.ComponentType<TextInputIconProps> | React.ReactElement<any>;
  color: string;
  focused: boolean;
}

export default function IconTouchable({
  onPress,
  icon: Icon,
  style,
  color,
  focused,
}: IconTouchableProps) {
  if (!Icon) return null;

  const icon = React.isValidElement(Icon) ? (
    Icon
  ) : (
    <Icon focused={focused} size={20} stroke={color} />
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
