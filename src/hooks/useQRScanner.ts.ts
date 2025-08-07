import { useCallback, useEffect, useState } from 'react';
import type { Code, CodeScannerFrame } from 'react-native-vision-camera';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

type QRScannerHook = {
  device: ReturnType<typeof useCameraDevice> | null;
  hasPermission: boolean;
  requestPermission: () => void;
  status: 'pending' | 'denied' | 'ready' | 'no-device';
  codeScanner: ReturnType<typeof useCodeScanner>;
};

export const useQRScanner = (
  onCodeScanned: (value: string) => void,
): QRScannerHook => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [status, setStatus] = useState<
    'pending' | 'denied' | 'ready' | 'no-device'
  >('pending');

  //TODO hacer esto con un object literal
  useEffect(() => {
    if (!hasPermission) {
      setStatus('denied');
    } else if (!device) {
      setStatus('no-device');
    } else {
      setStatus('ready');
    }
  }, [hasPermission, device]);

  const handleScan = useCallback(
    (codes: Code[], _frame: CodeScannerFrame): void => {
      if (codes.length > 0) {
        const value = codes[0]?.value;
        if (typeof value === 'string') {
          onCodeScanned(value);
        }
      }
    },
    [onCodeScanned],
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: handleScan,
  });

  return {
    device,
    hasPermission,
    requestPermission,
    status,
    codeScanner,
  };
};
