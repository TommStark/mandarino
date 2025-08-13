import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { useScannedWallets, Wallet } from '../scan/hooks/useScannedWallets';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import Clipboard from '@react-native-clipboard/clipboard';
import { EmptyList } from '../../assets/svg';
import { Icon, Switch } from 'react-native-paper';
import color from '../../ui/token/colors';

export const WalletHistoryScreen = () => {
  const { wallets, toggleFavorite, removeWallet } = useScannedWallets();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const handleCopy = (address: string) => {
    Clipboard.setString(address);
    Alert.alert('Copiado', 'La dirección fue copiada al portapapeles');
  };

  const filteredWallets = showOnlyFavorites
    ? wallets.filter(w => w.favorite)
    : wallets;

  const renderItem = ({ item }: { item: Wallet }) => {
    const date = new Date(item.scannedAt).toLocaleString();

    const handleDelete = (address: string) => {
      Alert.alert(
        'Eliminar dirección',
        '¿Estás seguro que querés eliminar esta dirección del historial?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: () => removeWallet(address),
          },
        ],
      );
    };

    return (
      <View style={[styles.item, item.favorite && styles.favoriteItem]}>
        <Text style={styles.walletIcon}>
          <Pressable onPress={() => toggleFavorite(item.address)}>
            <Text style={styles.star}>{item.favorite ? '★' : '☆'}</Text>
          </Pressable>
        </Text>
        <View style={styles.flex1}>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.marginRight10} />

        <Pressable onPress={() => handleCopy(item.address)}>
          <Icon source="copy" size={28} />
        </Pressable>

        <Pressable onPress={() => handleDelete(item.address)}>
          <Icon source="trash" size={30} color={color.danger} />
        </Pressable>
      </View>
    );
  };

  return (
    <ScreenWrapper title="Historial" blurAmount={20}>
      <View style={styles.headerRow}>
        <Text style={styles.filterLabel}>Mostrar solo favoritos</Text>
        <Switch
          value={showOnlyFavorites}
          onValueChange={setShowOnlyFavorites}
          thumbColor={showOnlyFavorites ? color.brand : color.grayThumbOff}
          trackColor={{ false: color.grayTrackOff, true: color.brandTrackOn }}
        />
      </View>

      <FlatList
        data={filteredWallets}
        keyExtractor={item => item.address}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.footerSpacer} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyList width={128} height={128} />
            <Text style={styles.empty}>
              {showOnlyFavorites
                ? 'No hay direcciones favoritas.'
                : 'Aún no escaneaste direcciones.'}
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  favoriteItem: {
    backgroundColor: color.brandSoftBg,
  },
  address: { fontSize: 14, fontWeight: 'bold' },
  date: { fontSize: 12, color: color.blueGray600 },
  star: {
    fontSize: 27,
    marginHorizontal: 8,
    color: color.brand,
  },
  walletIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  empty: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: color.blueGray300,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: color.blueGray700,
  },
  footerSpacer: {
    height: 80,
  },
  marginRight10: {
    marginRight: 10,
  },
});
