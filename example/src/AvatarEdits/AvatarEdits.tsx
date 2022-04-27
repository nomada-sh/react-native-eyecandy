import React from 'react';
import { ImageSourcePropType, SafeAreaView, ScrollView } from 'react-native';

import { AvatarEdit } from '@nomada-sh/react-native-eyecandy';

export default function Avatars() {
  const [source, setSource] = React.useState<ImageSourcePropType>({
    uri: 'https://i.pravatar.cc/300',
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          alignItems: 'center',
        }}
      >
        <AvatarEdit
          size={150}
          source={source}
          onChange={image => {
            if (image) setSource(image);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
