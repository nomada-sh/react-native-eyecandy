import React from 'react';
import { StyleSheet } from 'react-native';

import { ChevronRight } from '@nomada-sh/react-native-eyecandy-icons';

import { Body } from '../../typography';
import BaseMenuItem, { BaseMenuItemProps } from '../BaseMenuItem';

export interface MenuItemProps extends Omit<BaseMenuItemProps, 'children'> {
  text?: string;
  textColor?: string;
  hideArrow?: boolean;
}

function MenuItem({ textColor, text, hideArrow, ...props }: MenuItemProps) {
  return (
    <BaseMenuItem {...props}>
      <Body style={styles.text} weight="bold" size="medium" color={textColor}>
        {text}
      </Body>
      {hideArrow ? null : <ChevronRight size={16} color="greyout" />}
    </BaseMenuItem>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default MenuItem;
