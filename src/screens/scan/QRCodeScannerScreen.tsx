import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Vibration,
  Alert,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useQRScanner } from '../../hooks/useQRScanner.ts';
import { Icon } from 'react-native-paper';
import { openAppSettings } from '../../utils/openAppSettings.ts';

export const QRCodeScannerScreen = () => {
  const navigation = useNavigation();

  const onCodeScanned = (value: string) => {
    Vibration.vibrate(100);
    navigation.dispatch(
      StackActions.replace('QRResultScreen', { address: value }),
    );
  };

  const { device, status, codeScanner, requestPermission, hasPermission } =
    useQRScanner(onCodeScanned);

  useFocusEffect(
    useCallback(() => {
      if (!hasPermission) requestPermission();
    }, [hasPermission, requestPermission]),
  );

  const goWith = (val: string) => {
    if (!val) {
      Alert.alert('Sin datos', 'No encontramos un valor para continuar.');
      return;
    }
    onCodeScanned(val);
  };

  if (status === 'denied') {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>
          Necesitamos permiso para usar la cámara
        </Text>
        <Text style={styles.caption}>
          Si lo negaste por error, podés intentarlo de nuevo o abrir Ajustes.
        </Text>

        <Pressable style={styles.primary} onPress={requestPermission}>
          <Text style={styles.primaryText}>Permitir cámara</Text>
        </Pressable>

        <Pressable style={styles.secondary} onPress={openAppSettings}>
          <Text style={styles.secondaryText}>Abrir Ajustes</Text>
        </Pressable>

        <Pressable style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Cancelar</Text>
        </Pressable>
      </View>
    );
  }

  if (status === 'no-device') {
    return (
      <View style={[styles.center, { padding: 24 }]}>
        <Text style={styles.title}>Cámara no disponible en el simulador</Text>
        <Text style={styles.subtitle}>
          Probá en un dispositivo físico o usá una de estas opciones:
        </Text>
        <Pressable
          style={styles.actionSecondary}
          onPress={() => goWith('bc1qexampleaddressfor-test-only-123')}
        >
          <Text style={styles.actionText}>Usar QR de prueba</Text>
        </Pressable>
        <Pressable style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Cancelar</Text>
        </Pressable>

        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon source="close" size={30} color="#000" />
        </Pressable>
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
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          codeScanner={codeScanner}
          onInitialized={() => {}}
        />
      )}

      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon source="close" size={30} color="#fff" />
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
    textAlign: 'center',
  },
  action: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FF8C00',
    marginBottom: 12,
    alignItems: 'center',
  },
  actionSecondary: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFD4A7',
    marginBottom: 12,
    alignItems: 'center',
  },
  actionText: { color: '#000', fontWeight: '700' },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },

  maskContainer: { ...StyleSheet.absoluteFillObject, flexDirection: 'column' },
  maskRow: { flex: 3, backgroundColor: 'rgba(0,0,0,0.5)' },
  qrRow: { flex: 4, flexDirection: 'row' },
  maskSide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  qrBox: { flex: 7, borderColor: 'white', borderWidth: 3, borderRadius: 12 },

  caption: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 16,
  },
  primary: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryText: { color: '#000', fontWeight: '700' },
  secondary: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FFE1BF',
    alignItems: 'center',
  },
  secondaryText: { color: '#000', fontWeight: '700' },
  link: { marginTop: 16, padding: 8 },
  linkText: { textDecorationLine: 'underline', opacity: 0.8 },
});
