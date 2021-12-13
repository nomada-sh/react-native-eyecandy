import React from 'react';
import { useCallback, ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import type { ButtonColors } from '../../theme';

import useStyles from './useStyles';

export interface BaseButtonProps extends PressableProps {
  children?: ReactNode;
  /**
   * Container view style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Pressable style.
   */
  buttonStyle?: PressableProps['style'];
  inverse?: boolean;
  color?: ButtonColors;
  styles?: {
    /**
     * Container view style (Applied after style).
     */
    container?: StyleProp<ViewStyle>;
    /**
     * Pressable style (Applied after buttonStyle).
     */
    button?: PressableProps['style'];
  };
  variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
  height?: number;
  fullwidth?: boolean;
}

function BaseButton({
  children,
  style,
  buttonStyle,
  inverse,
  color,
  styles: customStyles = {},
  variant,
  height,
  fullwidth = true,
  ...props
}: BaseButtonProps) {
  const styles = useStyles({ color, inverse, variant, height });

  const getButtonStyle = useCallback(
    (styleProps: PressableStateCallbackType) => {
      const buttonStyles: [StyleProp<ViewStyle>] = [styles.button];

      if (typeof buttonStyle === 'function')
        buttonStyles.push(buttonStyle(styleProps));
      else buttonStyles.push(buttonStyle);

      if (typeof customStyles.button === 'function')
        buttonStyles.push(customStyles.button(styleProps));
      else if (customStyles.button) buttonStyles.push(customStyles.button);

      return buttonStyles;
    },
    [styles.button, customStyles, buttonStyle],
  );

  return (
    <View
      style={[
        {
          width: fullwidth ? '100%' : undefined,
        },
        styles.container,
        style,
        customStyles.container,
      ]}
    >
      <Pressable
        style={getButtonStyle}
        android_ripple={{
          color: styles.ripple.color,
        }}
        {...props}
      >
        {children}
      </Pressable>
    </View>
  );
}

export default BaseButton;
