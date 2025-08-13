import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
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
import { openAppSettings } from '../../utils/openAppSettings.ts';
import { useQRScanner } from './hooks/useQRScanner.ts';
import color from '../../ui/token/colors.ts';
import { styles } from './QRCodeScannerScreen.styles';
import { te } from './i18n/te.ts';

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
      return () => setActive(false);
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
      Alert.alert(te('noDataTitle'), te('noDataMessage'));
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
        <Text style={styles.title}>{te('permissionTitle')}</Text>
        <Text style={styles.caption}>{te('permissionSubtitle')}</Text>

        <Pressable style={styles.primary} onPress={requestPermission}>
          <Text style={styles.primaryText}>{te('allowCamera')}</Text>
        </Pressable>

        <Pressable style={styles.secondary} onPress={openAppSettings}>
          <Text style={styles.secondaryText}>{te('openSettings')}</Text>
        </Pressable>

        <Pressable style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>{te('cancel')}</Text>
        </Pressable>
      </View>
    );
  }

  if (status === 'no-device') {
    return (
      <View style={[styles.center, { padding: 24 }]}>
        <Text style={styles.title}>{te('cameraUnavailableTitle')}</Text>
        <Text style={styles.subtitle}>{te('cameraUnavailableDesc')}</Text>

        <Pressable
          style={styles.actionSecondary}
          onPress={() => goWith('bc1qexampleaddressfor-test-only-123')}
        >
          <Text style={styles.actionText}>{te('useTestQR')}</Text>
        </Pressable>

        <Pressable style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>{te('cancel')}</Text>
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
        <Text>{te('loadingCamera')}</Text>
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

export default QRCodeScannerScreen;
