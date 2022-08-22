import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer variant="both" {...props}>
    <Path
      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
      fill="currentColor"
    />
    <Path
      d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2H6Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIconContainer>
);

export const UserFill = React.memo(Icon);
