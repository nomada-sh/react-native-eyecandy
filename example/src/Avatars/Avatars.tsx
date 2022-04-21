import React from 'react';
import { ImageSourcePropType, ScrollView } from 'react-native';

import { Avatar, AvatarEdit } from '@nomada-sh/react-native-eyecandy';

export default function Avatars() {
  const [source, setSource] = React.useState<ImageSourcePropType>({
    uri: 'https://avatars.githubusercontent.com/u/39095957',
  });

  return (
    <ScrollView>
      <AvatarEdit
        source={source}
        onChange={image => {
          if (image) setSource(image);
        }}
      />
      <Avatar source={source} />
    </ScrollView>
  );
}
