import { Linking, Platform } from 'react-native';

export async function openAppSettings() {
  try {
    if (Platform.OS === 'ios') {
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
