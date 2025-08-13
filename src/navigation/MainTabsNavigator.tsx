import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import CryptoListScreen from '../screens/cryptolist/CryptoListScreen';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CustomTabBarButton } from '../components/TabBarButton/CustomTabBarButton';
import { WalletHistoryScreen } from '../screens/wallet/WalletHistoryScreen';
import { RootStackParamList } from '.';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ExchangeScreen from '../screens/exchange/ExchangeScreen';
import color from '../ui/token/colors';

const Tab = createBottomTabNavigator();

const homeTabBarIcon = ({ color }: { color: string }) => (
  <Icon source="home" color={color} size={20} />
);
const cryptoTabBarIcon = ({ color }: { color: string }) => (
  <Icon source="planet" color={color} size={20} />
);
const moreTabBarIcon = ({ color }: { color: string }) => (
  <Icon source="menu" color={color} size={20} />
);
const personTabBarIcon = ({ color }: { color: string }) => (
  <Icon source="sync" color={color} size={20} />
);

const QRTabBarButton = (props: BottomTabBarButtonProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate('QRCodeScanner');
  };
  return <CustomTabBarButton {...props} onPress={handlePress} />;
};
const EmptyScreen = () => null;

const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: color.brand,
        tabBarInactiveTintColor: color.blueGray300,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: homeTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Crypto"
        component={CryptoListScreen}
        options={{
          tabBarIcon: cryptoTabBarIcon,
        }}
      />
      <Tab.Screen
        name="ScanTrigger"
        component={EmptyScreen}
        options={{
          tabBarButton: QRTabBarButton,
        }}
      />
      <Tab.Screen
        name="Exchange"
        component={ExchangeScreen}
        options={{
          tabBarIcon: personTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Historial"
        component={WalletHistoryScreen}
        options={{
          tabBarIcon: moreTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabsNavigator;
