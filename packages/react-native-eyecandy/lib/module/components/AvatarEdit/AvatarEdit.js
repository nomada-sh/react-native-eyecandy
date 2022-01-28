function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Avatar from '../Avatar';
import IconButton from '../IconButton';
import { Camera } from '@nomada-sh/react-native-eyecandy-icons';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import { ActionSheet } from '../../utils';
import { ms } from '../../utils';

function AvatarEdit(_ref) {
  let {
    style,
    size = ms(100),
    source,
    onPress,
    onChange,
    ...props
  } = _ref;
  const colors = useColors(c => c.background.default);
  const onImageSelected = useCallback(res => {
    if (res.errorCode) throw JSON.stringify(res);
    if (res.didCancel) return;
    onChange === null || onChange === void 0 ? void 0 : onChange(res.assets);
  }, [onChange]);
  const onActionSheetSelect = useCallback(index => {
    if (index === 2) return;
    const options = {
      mediaType: 'photo'
    };
    const launch = index === 0 ? launchImageLibrary : launchCamera;
    launch(options).then(onImageSelected).catch(console.error);
  }, [onImageSelected]);
  const handlePress = useCallback(e => {
    ActionSheet({
      optionsIOS: ['From Gallery', 'From Camera', 'Cancel'],
      optionsAndroid: ['From Gallery', 'From Camera'],
      cancelButtonIndex: 2,
      onCancelAndroidIndex: 2,
      title: 'Update Profile Picture'
    }, onActionSheetSelect);
    onPress === null || onPress === void 0 ? void 0 : onPress(e);
  }, [onActionSheetSelect, onPress]);
  return /*#__PURE__*/React.createElement(Pressable, _extends({
    onPress: handlePress,
    style: [{
      width: size,
      height: size,
      borderRadius: size / 2
    }, style]
  }, props), /*#__PURE__*/React.createElement(Avatar, {
    size: size,
    source: source
  }), /*#__PURE__*/React.createElement(IconButton, {
    style: [{
      borderWidth: 1.5,
      borderColor: colors.content
    }, styles.cameraIconButton],
    icon: Camera,
    iconSize: 14,
    size: 24,
    color: "primary",
    onPress: handlePress
  }));
}

const styles = StyleSheet.create({
  cameraIconButton: {
    position: 'absolute',
    bottom: 2,
    right: 2
  }
});
export default AvatarEdit;
//# sourceMappingURL=AvatarEdit.js.map