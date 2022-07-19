import React from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

import { Button, Row } from '@nomada-sh/react-native-eyecandy';
import { Star } from '@nomada-sh/react-native-eyecandy-icons';

export function ButtonScreen() {
  const [loading, setLoading] = React.useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Button
          onPress={() => {
            setLoading(true);

            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          icon={Star}
          marginBottom={20}
          loading={loading}
        >
          Loading
        </Button>
        <Row>
          <Button
            onPress={() => {
              setLoading(true);

              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
            icon={Star}
            marginBottom={20}
            loading={loading}
          >
            Button
          </Button>
          <Button marginBottom={20} loadingOverlay loading={loading}>
            Button
          </Button>
          <Button marginBottom={20} loading>
            Button Loading
          </Button>
        </Row>
        <Button marginBottom={20} disabled>
          Button Disabled
        </Button>
        <Button
          marginBottom={20}
          color="primary"
          onLongPress={() => {
            Alert.alert('Button long pressed');
          }}
        >
          Button Primary
        </Button>
        <Button marginBottom={20} color="secondary">
          Button Secondary
        </Button>
        <Button variant="rounded" marginBottom={20}>
          Button Rounded Inverse
        </Button>
        <Button variant="rounded" transparent>
          Button Rounded Transparent
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
