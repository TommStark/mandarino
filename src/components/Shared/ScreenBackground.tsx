import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { isIOS } from '../../utils/openAppSettings';
import color from '../../ui/token/colors';

type Props = { blurAmount?: number };

export const ScreenBackground = ({ blurAmount = 4 }: Props) => {
  const blurProps = isIOS
    ? { blurType: 'light' as const, blurAmount: 24 }
    : { blurType: 'light' as const, blurAmount };

  return (
    <View pointerEvents="none" style={styles.container}>
      <LinearGradient
        colors={[color.bgGradStart, color.bgGradEnd]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 1]}
      />
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={styles.blob3} />

      <BlurView
        {...blurProps}
        style={StyleSheet.absoluteFillObject}
        reducedTransparencyFallbackColor={color.bgBlurFallback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  blob1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: color.bgBlob1,
    top: -100,
    left: -60,
    opacity: 0.25,
  },
  blob2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: color.bgBlob2,
    bottom: 60,
    right: -40,
    opacity: 0.3,
  },
  blob3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: color.bgBlob3,
    top: 200,
    right: 60,
    opacity: 0.22,
  },
});
