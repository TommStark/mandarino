import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import CryptoListScreen from '../screens/cryptolist/CryptoListScreen';

export type RootStackParamList = {
  Login: undefined;
  CryptoList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CryptoList" component={CryptoListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
