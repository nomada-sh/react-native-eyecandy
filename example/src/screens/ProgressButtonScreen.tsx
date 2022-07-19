import React from 'react';
import { ScrollView } from 'react-native';

import { ProgressButton } from '@nomada-sh/react-native-eyecandy';
import {
  Check,
  Crown,
  Star,
  Trash,
  Warning,
} from '@nomada-sh/react-native-eyecandy-icons';

export function ProgressButtonScreen() {
  const [progress, setProgress] = React.useState(0);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <ProgressButton marginBottom={20} onPress={() => setProgress(0)}>
        ProgressButton
      </ProgressButton>
      <ProgressButton
        marginBottom={20}
        color="primary"
        icon={Star}
        onPress={() => setProgress(0.25)}
      >
        ProgressButton Primary
      </ProgressButton>
      <ProgressButton
        marginBottom={20}
        color="success"
        icon={Crown}
        onPress={() => setProgress(0.5)}
      >
        ProgressButton Secondary
      </ProgressButton>
      <ProgressButton
        marginBottom={20}
        color="danger"
        icon={Trash}
        onPress={() => setProgress(0.75)}
      >
        ProgressButton Danger
      </ProgressButton>
      <ProgressButton marginBottom={20} onPress={() => setProgress(1)}>
        ProgressButton
      </ProgressButton>
      <ProgressButton
        marginBottom={20}
        color="warning"
        icon={Warning}
        progress={progress}
      >
        ProgressButton Warning
      </ProgressButton>
    </ScrollView>
  );
}
