import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import CryptoListScreen from '../screens/cryptolist/CryptoListScreen';
import MainTabsNavigator from './MainTabsNavigator';
import { QRCodeScannerScreen } from '../screens/scan/QRCodeScannerScreen';
import { QRResultScreen } from '../screens/scan/QRResultScreen';

export type RootStackParamList = {
  Login: undefined;
  CryptoList: undefined;
  Home: undefined;
  QRCodeScanner: undefined;
  QRResultScreen: { address: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={MainTabsNavigator} />
      <Stack.Screen name="CryptoList" component={CryptoListScreen} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      <Stack.Screen name="QRResultScreen" component={QRResultScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
