import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Vibration,
  Alert,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';

import { Icon } from 'react-native-paper';
import { openAppSettings } from '../../utils/openAppSettings';
import { useQRScanner } from '../../hooks/useQRScanner.ts';
import color from '../../ui/token/colors.ts';

export const QRCodeScannerScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [active, setActive] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const [scanned, setScanned] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setActive(true);
      setScanned(false);
      setFocusCount(c => c + 1);
      return () => {
        setActive(false);
      };
    }, []),
  );

  const handledRef = useRef(false);
  const safeNavigate = useCallback(
    (addr: string) => {
      if (handledRef.current) return;
      handledRef.current = true;

      setActive(false);
      setScanned(true);

      Vibration.vibrate(80);

      setTimeout(() => {
        navigation.dispatch(
          StackActions.replace('QRResultScreen', { address: addr }),
        );
      }, 60);
    },
    [navigation],
  );

  const onCodeScanned = (value: string) => {
    if (typeof value !== 'string') return;
    const trimmed = value.trim();
    if (!trimmed || scanned) return;
    safeNavigate(trimmed);
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
    safeNavigate(val);
  };

  const onCameraInitialized = () => {
    handledRef.current = false;
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
        <Text style={styles.title}>Cámara no disponible</Text>
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
          <Icon source="close" size={30} color={color.black} />
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

  const shouldRenderCamera = !!device && isFocused && active && !scanned;

  return (
    <View style={styles.container}>
      {shouldRenderCamera && (
        <Camera
          key={`focus-${focusCount}`}
          style={RNStyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          onInitialized={onCameraInitialized}
        />
      )}

      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon source="close" size={30} color={color.white} />
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
    backgroundColor: color.brand,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionSecondary: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: color.brandTrackOn,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionText: { color: color.black, fontWeight: '700' },
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
  qrBox: {
    flex: 7,
    borderColor: color.white,
    borderWidth: 3,
    borderRadius: 12,
  },

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
    backgroundColor: color.brand,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryText: { color: color.black, fontWeight: '700' },
  secondary: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: color.brandTrackOn,
    alignItems: 'center',
  },
  secondaryText: { color: color.black, fontWeight: '700' },
  link: { marginTop: 16, padding: 8 },
  linkText: { textDecorationLine: 'underline', opacity: 0.8 },
});
