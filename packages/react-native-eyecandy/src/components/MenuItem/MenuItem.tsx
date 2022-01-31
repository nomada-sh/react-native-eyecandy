import React from 'react';
import {StyleSheet} from 'react-native';

import BaseMenuItem, {BaseMenuItemProps} from '../BaseMenuItem';
import {ChevronRight} from '@nomada-sh/react-native-eyecandy-icons';
import {Body} from '../../typography';

export interface MenuItemProps extends Omit<BaseMenuItemProps, 'children'> {
  text?: string;
  textColor?: string;
}

function MenuItem({textColor, text, ...props}: MenuItemProps) {
  return (
    <BaseMenuItem {...props}>
      <Body
        style={styles.text}
        weight="bold"
        size="medium"
        customColor={textColor}>
        {text}
      </Body>
      <ChevronRight size={16} color="greyout" />
    </BaseMenuItem>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default MenuItem;
