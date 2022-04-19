import React from 'react';
import { ImageSourcePropType, ScrollView } from 'react-native';

import { AvatarEdit } from '@nomada-sh/react-native-eyecandy';

export default function Avatars() {
  const [source, setSource] = React.useState<ImageSourcePropType>({
    uri: 'https://avatars.githubusercontent.com/u/39095957',
  });

  return (
    <ScrollView>
      <AvatarEdit
        source={source}
        onChange={assets => {
          if (assets && assets.length) {
            console.log(assets[0]);
            setSource(assets[0]);
          }
        }}
      />
    </ScrollView>
  );
}
