import React from 'react';
import { TextStyle, StyleProp, View, ActivityIndicator } from 'react-native';

import { IconProps } from '@nomada-sh/react-native-eyecandy-icons';

import { Body } from '../../typography';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';

import useStyles from './useStyles';

export interface ButtonProps extends Omit<ButtonBaseProps, 'children'> {
  children?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ComponentType<IconProps> | React.ReactElement<any> | null;
  loadingOverlay?: boolean;
}

export function Button({
  text,
  color,
  inverse,
  textStyle,
  children,
  icon: Icon,
  loading: loadingProp,
  disabled: disabledProp,
  loadingOverlay,
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

  return (
    <ButtonBase
      color={color}
      inverse={inverse}
      disabled={disabled}
      loading={loading}
      {...props}
    >
      {icon ? <View style={styles.loadingContainer}>{icon}</View> : null}
      <Body weight="bold" size="large" style={[styles.text, textStyle]}>
        {children ?? text}
      </Body>
    </ButtonBase>
  );
}
