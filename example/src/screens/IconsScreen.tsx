import React from 'react';
import { ScrollView } from 'react-native';
import * as Icons from '@nomada-sh/react-native-eyecandy-icons';

export function IconsScreens() {
  return <ScrollView>
    <Icons.Home color="primary" />
    <Icons.Home color="success" />
    <Icons.HomeFill color="error" />
    <Icons.MoonSun color="primary"/>
    <Icons.UserFill color="warning" />
    <Icons.User color="warning" />
  </ScrollView>
}