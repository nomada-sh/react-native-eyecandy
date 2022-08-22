import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path
      strokeWidth={1}
      d="M10.75 18.25v3H3.5V2.75h17v18.5h-7.25v-3h-2.5Zm-6.25-15H4v17.5h6.25v-3h3.5v3H20V3.25H4.5Zm4 3h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm-9 3h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm-9 3h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm-9 3h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm4.5 0h-2v-.5h2v.5Zm-9 3h-2v-.5h2v.5Zm9 0h-2v-.5h2v.5Z"
    />
  </SvgIconContainer>
);

export const Building = React.memo(Icon);
