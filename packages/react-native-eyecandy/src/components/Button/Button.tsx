import React from 'react';
import BaseButton, {BaseButtonProps} from '../BaseButton';
import {Body} from '../../typography';

import useStyles from './useStyles';

export interface ButtonProps extends Omit<BaseButtonProps, 'children'> {
  text: string;
}

function Button({text, color, inverse, ...props}: ButtonProps) {
  const styles = useStyles({color, inverse});

  return (
    <BaseButton color={color} inverse={inverse} {...props}>
      <Body weight="bold" size="large" style={styles.text}>
        {text}
      </Body>
    </BaseButton>
  );
}

export default Button;
