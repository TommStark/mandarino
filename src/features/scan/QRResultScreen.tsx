import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { styles } from './QRResultScreen.styles.ts';
import { te } from './i18n/te.ts';
import { useUser } from '../../context/UserContext';

type QRResultRouteProp = RouteProp<RootStackParamList, 'QRResultScreen'>;

export const QRResultScreen = () => {
  const route = useRoute<QRResultRouteProp>();
  const navigation =
    useNavigation<
      import('@react-navigation/native-stack').NativeStackNavigationProp<
        RootStackParamList,
        'QRResultScreen'
      >
    >();

  const { address } = route.params;
  const { addWallet, isFavorite, toggleFavorite } = useUser();
  const [type, setType] = useState<'ETH' | 'BTC' | 'UNKNOWN'>('UNKNOWN');

  useEffect(() => {
    if (address.startsWith('0x')) setType('ETH');
    else if (address.startsWith('1') || address.startsWith('3')) setType('BTC');
    addWallet(address);
  }, [address, addWallet]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{te('resultTitle')}</Text>

      <Text selectable style={styles.address}>
        {address}
      </Text>

      <Text style={styles.label}>{te('typeLabel', { type })}</Text>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(address)}
      >
        <Text style={styles.favoriteText}>
          {isFavorite(address) ? te('unmarkFavorite') : te('markFavorite')}
        </Text>
      </Pressable>

      <Button
        title={te('backHome')}
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
};

export default QRResultScreen;
