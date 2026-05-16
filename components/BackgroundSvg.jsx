import React from 'react';
import { View, useColorScheme } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { backgroundSvgXml } from '../assets/images';

const BackgroundSvg = () => {
  const isDark = useColorScheme() === 'dark';
  const color = isDark ? '#334155' : '#E5E7EB';
  const xml = backgroundSvgXml.replace(/COLOR_PLACEHOLDER/g, color);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      pointerEvents="none"
    >
      <SvgXml xml={xml} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
    </View>
  );
};

export default BackgroundSvg;
