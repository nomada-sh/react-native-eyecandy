import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableWithoutFeedbackProps,
} from 'react-native';

import { Check, IconProps } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

export interface RadioButtonProps extends TouchableWithoutFeedbackProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  activeColor?: string;
  activeIcon?: React.ComponentType<IconProps> | React.ReactElement;
  activeIconColor?: string;
}

function RadioButton({
  size = 32,
  style,
  value,
  onValueChange,
  onPress,
  activeColor: activeColorProp,
  activeIconColor: activeIconColorProp,
  activeIcon: ActiveIcon,
  ...props
}: RadioButtonProps) {
  const { palette, dark } = useTheme();

  const activeColor = activeColorProp || palette.success[200];
  const activeIconColor = activeIconColorProp || 'white';
  const activeIconSize = size * 0.5;

  const frontSize = size * 0.7;
  const backgroundColor = value ? activeColor : palette.grey[dark ? 700 : 200];

  const activeIcon = ActiveIcon ? (
    React.isValidElement(ActiveIcon) ? (
      ActiveIcon
    ) : (
      <ActiveIcon size={activeIconSize} color={activeIconColor} />
    )
  ) : (
    <Check size={activeIconSize} color={activeIconColor} />
  );

  return (
    <TouchableWithoutFeedback
      onPress={e => {
        onValueChange?.(!value);
        onPress?.(e);
      }}
      {...props}
    >
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
          {value ? activeIcon : null}
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

export default RadioButton;
