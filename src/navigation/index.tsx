import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CryptoListScreen from '../screens/cryptolist/CryptoListScreen';
import MainTabsNavigator from './MainTabsNavigator';
import { QRCodeScannerScreen } from '../screens/scan/QRCodeScannerScreen';
import { QRResultScreen } from '../screens/scan/QRResultScreen';
import { ExchangeScreen } from '../screens/exchange/ExchangeScreen';

export type RootStackParamList = {
  Login: undefined;
  CryptoList: undefined;
  Home: undefined;
  QRCodeScanner: undefined;
  MainScreen: undefined;
  QRResultScreen: { address: string };
  Exchange: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainScreen" component={MainTabsNavigator} />
      <Stack.Screen name="CryptoList" component={CryptoListScreen} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      <Stack.Screen name="QRResultScreen" component={QRResultScreen} />
      <Stack.Screen name="Exchange" component={ExchangeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
