import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { backgroundSvgXml } from '../assets/images';
import { useAppTheme } from '../constants/theme';

const BackgroundSvg = () => {
  const { colors } = useAppTheme();
  const xml = backgroundSvgXml.replace(/COLOR_PLACEHOLDER/g, colors.svgStroke);

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
