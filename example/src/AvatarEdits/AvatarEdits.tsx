import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { AvatarEdit, AvatarEditAsset } from '@nomada-sh/react-native-eyecandy';

export default function Avatars() {
  const [source, setSource] = React.useState<AvatarEditAsset>({
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
          source={source}
          onChange={image => {
            if (image) setSource(image);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
