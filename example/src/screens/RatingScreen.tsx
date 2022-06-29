import React from 'react';
import { View } from 'react-native';

import { Rating } from '@nomada-sh/react-native-eyecandy';

export function RatingScreen() {
  const [value, setValue] = React.useState(0);

  return (
    <View>
      <Rating value={value} onChange={setValue} max={5} />
    </View>
  );
}
