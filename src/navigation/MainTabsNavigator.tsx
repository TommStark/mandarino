import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import CryptoListScreen from '../screens/cryptolist/CryptoListScreen';
import { CustomTabBarButton } from '../components/CustomTabBarButton';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

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
  <Icon source="person" color={color} size={20} />
);

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
        tabBarActiveTintColor: '#f65621ff',
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
        name=" "
        component={HomeScreen}
        options={{
          tabBarButton: QRTabBarButton,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={HomeScreen}
        options={{
          tabBarIcon: personTabBarIcon,
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
