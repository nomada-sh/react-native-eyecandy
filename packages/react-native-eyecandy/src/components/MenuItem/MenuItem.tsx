import React from 'react';
import { StyleSheet } from 'react-native';

import { ChevronRight } from '@nomada-sh/react-native-eyecandy-icons';

import { Body } from '../../typography';
import MenuItemBase, { MenuItemBaseProps } from '../MenuItemBase';

export interface MenuItemProps extends Omit<MenuItemBaseProps, 'children'> {
  text?: string;
  textColor?: string;
  hideArrow?: boolean;
}

function MenuItem({ textColor, text, hideArrow, ...props }: MenuItemProps) {
  return (
    <MenuItemBase {...props}>
      <Body style={styles.text} weight="bold" size="medium" color={textColor}>
        {text}
      </Body>
      {hideArrow ? null : <ChevronRight size={16} color="greyout" />}
    </MenuItemBase>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default MenuItem;
