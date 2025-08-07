// src/components/ScreenBackground.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

export const ScreenBackground = () => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#FFF3EA', '#FFFFFF']}
      style={StyleSheet.absoluteFill}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 1]}
    />
    <View style={styles.blob1} />
    <View style={styles.blob2} />
    <View style={styles.blob3} />

    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="light"
      blurAmount={28}
      reducedTransparencyFallbackColor="#b6640dff"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#FF6600',
    top: -100,
    left: -60,
    opacity: 0.25,
  },
  blob2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FF9966',
    bottom: 60,
    right: -40,
    opacity: 0.3,
  },
  blob3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFA726',
    top: 200,
    right: 60,
    opacity: 0.22,
  },
});
