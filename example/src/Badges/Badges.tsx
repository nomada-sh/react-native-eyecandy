import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { IconButton, Badge, Avatar } from '@nomada-sh/react-native-eyecandy';
import { Photo } from '@nomada-sh/react-native-eyecandy-icons';

export default function Badges() {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <Badge>
            <Avatar
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
            />
          </Badge>
          <Badge
            color="success"
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
          >
            <Avatar
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
            />
          </Badge>
          <Badge
            color="warning"
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            <Avatar
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
            />
          </Badge>
          <Badge
            color="error"
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'top',
            }}
          >
            <Avatar
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
            />
          </Badge>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Badge>
            <IconButton icon={Photo} />
          </Badge>
          <Badge
            color="success"
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
          >
            <IconButton icon={Photo} />
          </Badge>
          <Badge
            color="warning"
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            <IconButton icon={Photo} />
          </Badge>
          <Badge
            color="error"
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'top',
            }}
          >
            <IconButton icon={Photo} />
          </Badge>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
