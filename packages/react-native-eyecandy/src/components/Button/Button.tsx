import React from 'react';
import { TextStyle, StyleProp, View, ActivityIndicator } from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';

import { usePressableStyles } from '../../hooks';
import { Body } from '../../typography';
import { ButtonBase, ButtonBaseProps, ButtonBaseStyles } from '../ButtonBase';

import useStyles from './useStyles';

export interface ButtonStyles extends ButtonBaseStyles {
  text?: StyleProp<TextStyle>;
}
export interface ButtonProps
  extends Omit<ButtonBaseProps, 'children' | 'styles'> {
  children?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ComponentType<IconProps> | React.ReactElement<any> | null;
  loadingOverlay?: boolean;
  styles?: ButtonStyles;
}

export function Button({
  color,
  inverse,
  textStyle,
  children,
  icon: Icon,
  loading: loadingProp,
  disabled: disabledProp,
  loadingOverlay,
  styles: customStyles,
  pressableStyle: pressableStyleProp,
  ...props
}: ButtonProps) {
  const styles = useStyles({ color, inverse });

  let icon = Icon ? (
    React.isValidElement(Icon) ? (
      Icon
    ) : (
      <Icon size={styles.icon.fontSize} stroke={styles.icon.color} />
    )
  ) : null;

  let disabled = disabledProp;
  let loading = loadingProp;

  if (!loadingOverlay && loading) {
    disabled = true;
    loading = false;

    icon = (
      <ActivityIndicator
        color={styles.loading.color}
        size={styles.loading.fontSize}
      />
    );
  }

  const pressableStyle = usePressableStyles([
    styles.pressable,
    pressableStyleProp,
  ]);

  return (
    <ButtonBase
      color={color}
      inverse={inverse}
      disabled={disabled}
      loading={loading}
      styles={customStyles}
      pressableStyle={pressableStyle}
      {...props}
    >
      {icon ? <View style={styles.loadingContainer}>{icon}</View> : null}
      {typeof children === 'string' ? (
        <Body
          weight="bold"
          size="large"
          style={[styles.text, textStyle, customStyles?.text]}
        >
          {children}
        </Body>
      ) : null}
    </ButtonBase>
  );
}
