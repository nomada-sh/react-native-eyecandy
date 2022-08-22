import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path
      d="M12 5v14m-7-7h14"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIconContainer>
);

export const Plus = React.memo(Icon);
