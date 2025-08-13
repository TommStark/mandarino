import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useScannedWallets } from '../../hooks/useScannedWallets';
import { RootStackParamList } from '../../navigation/index';
import color from '../../ui/token/colors';

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

  const { addWallet, isFavorite, toggleFavorite } = useScannedWallets();
  const [type, setType] = useState<'ETH' | 'BTC' | 'UNKNOWN'>('UNKNOWN');

  useEffect(() => {
    if (address.startsWith('0x')) setType('ETH');
    else if (address.startsWith('1') || address.startsWith('3')) setType('BTC');

    addWallet(address);
  }, [address, addWallet]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dirección escaneada</Text>
      <Text selectable style={styles.address}>
        {address}
      </Text>
      <Text style={styles.label}>Tipo: {type}</Text>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(address)}
      >
        <Text style={styles.favoriteText}>
          {isFavorite(address)
            ? '★ Marcar como NO favorita'
            : '☆ Marcar como favorita'}
        </Text>
      </Pressable>

      <Button
        title="Volver al inicio"
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  address: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  label: { fontSize: 14, marginBottom: 20 },
  favoriteButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: color.brand,
    borderRadius: 10,
  },
  favoriteText: { color: 'white', fontWeight: 'bold' },
});
