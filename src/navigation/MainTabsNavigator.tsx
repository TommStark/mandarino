// MainTabsNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import CryptoListScreen from '../screens/cryptolist/CryptoListScreen';
// import ScannerScreen from '../screens/scanner/ScannerScreen'; // (ejemplo)
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';
import { CustomTabBarButton } from '../components/CustomTabBarButton';

const Tab = createBottomTabNavigator();

const HomeTabBarIcon = ({ color }: { color: string }) => (
  //   <Icon name="home-outline" color={color} size={24} />
  <Text>HOME</Text>
);

const CryptoTabBarIcon = ({ color }: { color: string }) => (
  //   <Icon name="currency-btc" color={color} size={24} />
  <Text>Crypto</Text>
);

const QRTabBarIcon = ({ color }: { color: string }) => (
  //   <Icon name="qrcode-scan" color={color} size={30} />
  <Text>QR</Text>
);

const MoreTabBarIcon = ({ color }: { color: string }) => (
  //   <Icon name="qrcode-scan" color={color} size={30} />
  <Text>Mas</Text>
);

const homeTabBarIcon = ({ color }: { color: string }) => (
  <HomeTabBarIcon color={color} />
);
const cryptoTabBarIcon = ({ color }: { color: string }) => (
  <CryptoTabBarIcon color={color} />
);
const qrTabBarIcon = ({ color }: { color: string }) => (
  <QRTabBarIcon color={color} />
);
const moreTabBarIcon = ({ color }: { color: string }) => (
  <MoreTabBarIcon color={color} />
);

import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

const QRTabBarButton = (props: BottomTabBarButtonProps) => {
  const { onPress, ...rest } = props;
  const handlePress = () => {
    if (onPress) {
      onPress({} as any);
    }
  };
  return <CustomTabBarButton {...rest} onPress={handlePress} />;
};

const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#00C853',
        tabBarInactiveTintColor: '#B0BEC5',
      }}
    >
      <Tab.Screen
        name="Inicio"
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
        name="QR"
        component={HomeScreen} // Temporal
        options={{
          tabBarIcon: qrTabBarIcon,
          tabBarButton: QRTabBarButton,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={HomeScreen}
        options={{
          tabBarIcon: moreTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Mas"
        component={HomeScreen}
        options={{
          tabBarIcon: moreTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabsNavigator;
