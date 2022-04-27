import React from 'react';
import { TextStyle, StyleProp } from 'react-native';

import { Body } from '../../typography';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

import useStyles from './useStyles';

export interface ButtonProps extends Omit<ButtonBaseProps, 'children'> {
  children?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

function Button({
  text,
  color,
  inverse,
  textStyle,
  children,
  ...props
}: ButtonProps) {
  const styles = useStyles({ color, inverse });

  return (
    <ButtonBase color={color} inverse={inverse} {...props}>
      <Body weight="bold" size="large" style={[styles.text, textStyle]}>
        {children ?? text}
      </Body>
    </ButtonBase>
  );
}

export default Button;
