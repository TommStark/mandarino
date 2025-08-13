import { Linking, Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';

export async function openAppSettings() {
  try {
    if (isIOS) {
      const url = 'app-settings:';
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        return;
      }
    }
    await Linking.openSettings();
  } catch (e) {
    console.warn('* openAppSettings error:', e);
  }
}
