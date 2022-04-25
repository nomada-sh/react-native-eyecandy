import React from 'react';
import { ImageSourcePropType, ScrollView } from 'react-native';

import { AvatarEdit } from '@nomada-sh/react-native-eyecandy';

export default function Avatars() {
  const [source, setSource] = React.useState<ImageSourcePropType>({
    uri: 'https://i.pravatar.cc/300',
  });

  return (
    <ScrollView>
      <AvatarEdit
        source={source}
        onChange={image => {
          if (image) setSource(image);
        }}
      />
    </ScrollView>
  );
}
