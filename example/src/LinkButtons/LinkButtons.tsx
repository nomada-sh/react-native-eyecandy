import React from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

import { LinkButton } from '@nomada-sh/react-native-eyecandy';
import {
  Edit,
  Notifications,
  Settings,
} from '@nomada-sh/react-native-eyecandy-icons';

export default function LinkButtons() {
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
        <LinkButton
          marginBottom={20}
          icon={Settings}
          onPress={() => Alert.alert('Go to Settings')}
        >
          Settings
        </LinkButton>
        <LinkButton
          marginBottom={20}
          icon={Notifications}
          onPress={() => Alert.alert('Go to Notifications')}
        >
          Notifications
        </LinkButton>
        <LinkButton
          marginBottom={20}
          variant="rounded"
          icon={Edit}
          onPress={() => Alert.alert('Go to Change Password')}
        >
          Change Password
        </LinkButton>
        <LinkButton disabled marginBottom={20}>
          Disabled
        </LinkButton>
        <LinkButton loading marginBottom={20}>
          Loading
        </LinkButton>
      </ScrollView>
    </SafeAreaView>
  );
}
