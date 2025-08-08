import React from 'react';
import { View, Text, StyleSheet, Pressable, Vibration } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useQRScanner } from '../../hooks/useQRScanner.ts';
import { Icon } from 'react-native-paper';

export const QRCodeScannerScreen = () => {
  const navigation = useNavigation();

  const onCodeScanned = (value: string) => {
    Vibration.vibrate(100);
    console.log('Código escaneado:', value);
    navigation.dispatch(
      StackActions.replace('QRResultScreen', { address: value }),
    );
  };

  const { device, status, codeScanner } = useQRScanner(onCodeScanned);

  if (status === 'denied') {
    return (
      <View style={styles.center}>
        <Text>Necesitamos permiso</Text>
      </View>
    );
  }

  if (status !== 'ready') {
    return (
      <View style={styles.center}>
        <Text>Cargando cámara...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device!}
        isActive
        codeScanner={codeScanner}
      />

      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>
          <Icon source="close" size={30} />
        </Text>
      </Pressable>

      <View style={styles.maskContainer}>
        <View style={styles.maskRow} />
        <View style={styles.qrRow}>
          <View style={styles.maskSide} />
          <View style={styles.qrBox} />
          <View style={styles.maskSide} />
        </View>
        <View style={styles.maskRow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  maskContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },
  maskRow: {
    flex: 3,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  qrRow: {
    flex: 4,
    flexDirection: 'row',
  },
  maskSide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  qrBox: {
    flex: 7,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 12,
  },
});
