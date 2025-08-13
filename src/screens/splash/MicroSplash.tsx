import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../ui/token/colors';

const { width } = Dimensions.get('window');
const SIZE = Math.min(width * 0.34, 160);

type Props = { onDone: () => void };

export const MicroSplash: React.FC<Props> = ({ onDone }) => {
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const circleScale = useRef(new Animated.Value(0.9)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.sequence([
          Animated.timing(circleScale, {
            toValue: 1.02,
            duration: 450,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(circleScale, {
            toValue: 0.98,
            duration: 450,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.stagger(120, [
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(titleY, {
            toValue: 0,
            duration: 350,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => setTimeout(onDone, 220));
  }, [bgOpacity, circleScale, titleOpacity, titleY, onDone]);

  return (
    <View
      style={styles.container}
      accessibilityRole="image"
      accessibilityLabel="Mandarino iniciando"
    >
      <StatusBar barStyle="dark-content" />
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: bgOpacity }]}
      >
        <LinearGradient
          colors={[color.brandSoftBg, color.white]}
          start={{ x: 0.1, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Animated.View
        style={[styles.circleWrapper, { transform: [{ scale: circleScale }] }]}
      >
        <Image
          source={require('./../../assets/splash/mandarino_logo.png')}
          style={{ width: SIZE, height: SIZE }}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          { opacity: titleOpacity, transform: [{ translateY: titleY }] },
        ]}
      >
        Mandarino
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circleWrapper: { marginBottom: 16, elevation: 6 },
  title: { fontSize: 28, fontWeight: '800', color: color.black },
});
