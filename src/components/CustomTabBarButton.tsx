// src/components/CustomTabBarButton.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
};

export const CustomTabBarButton = ({ children, onPress }: Props) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <View style={styles.buttonLight}>
      <View style={styles.button}> {children}</View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === 'android' ? -7 : -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 32.5,
    backgroundColor: '#00C853',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLight: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#8fe9b5b0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
