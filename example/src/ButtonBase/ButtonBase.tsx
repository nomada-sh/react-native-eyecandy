import React from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';

import { Body, ButtonBase } from '@nomada-sh/react-native-eyecandy';
import { Crown, Star } from '@nomada-sh/react-native-eyecandy-icons';

export default function () {
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
        <ButtonBase
          onPress={() => {
            Alert.alert('Button pressed');
          }}
          pressableStyle={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
          }}
          marginBottom={20}
        >
          <Crown size={32} />
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Body>Button Base</Body>
            <Body color="greyout">This is a button base</Body>
          </View>
        </ButtonBase>
        <ButtonBase
          onLongPress={() => {
            Alert.alert('Button long pressed');
          }}
          variant="rounded"
          color="primary"
          pressableStyle={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
          }}
        >
          <Star color="white" />
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              alignItems: 'center',
            }}
          >
            <Body weight="bold" color="white">
              Button Base
            </Body>
            <Body color="white">This is a button base</Body>
          </View>
          <Star color="white" />
        </ButtonBase>
      </ScrollView>
    </SafeAreaView>
  );
}
