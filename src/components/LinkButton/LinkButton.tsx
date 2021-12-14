import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import BaseButton, { BaseButtonProps } from '../BaseButton';
import { usePressableStyles } from '../../hooks';
import { ChevronRight } from '../../icons';
import { Body } from '../../typography';

export interface LinkButtonProps extends BaseButtonProps {
  icon?: FC<{
    size?: number;
    stroke?: string;
    style?: StyleProp<ViewStyle>;
  }>;
  text: string;
}

function LinkButton({ text, icon, buttonStyle, ...props }: LinkButtonProps) {
  const Icon = icon;

  const buttonStyles = usePressableStyles([styles.button, buttonStyle]);

  return (
    <BaseButton buttonStyle={buttonStyles} {...props}>
      {Icon ? <Icon style={styles.icon} size={20} /> : null}
      <Body style={styles.text}>{text}</Body>
      <ChevronRight color="grey" size={20} />
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  text: {
    flex: 1,
    marginEnd: 16,
  },
  icon: {
    marginEnd: 16,
  },
});

export default LinkButton;
