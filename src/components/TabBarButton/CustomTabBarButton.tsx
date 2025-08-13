import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-paper';
import color from '../../ui/token/colors';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
};

export const CustomTabBarButton = ({ onPress }: Props) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <View style={styles.buttonLight}>
      <View style={styles.button}>
        <Icon source="qr-code" color={'white'} size={34} />
      </View>
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
    borderRadius: 32,
    backgroundColor: color.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLight: {
    width: 63,
    height: 63,
    borderRadius: 32,
    backgroundColor: color.brandCircle,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
