import React from 'react';

import {Path} from 'react-native-svg';

import Icon, {IconProps} from './Icon';

const Tree = (props: IconProps) => (
  <Icon {...props}>
    <Path d="M15.75 3.504h.5v-1.25a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-1.25h-4v7.75h4v-1.25a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-1.25h-4v7.75h4v-1.25a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-1.25h-3.5a1.002 1.002 0 0 1-1-1v-15.5h-4v1.25a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1v1.25h8Zm1.5-1.75h-.5v4h5.5v-4h-5Zm-10.5 4h.5v-4h-5.5v4h5Zm10.5 12.5h-.5v4h5.5v-4h-5Zm0-8.25h-.5v4h5.5v-4h-5Z" />
  </Icon>
);

export default React.memo(Tree);
