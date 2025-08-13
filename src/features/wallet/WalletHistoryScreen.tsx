import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import type { Wallet } from '../scan/hooks/useScannedWallets';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import Clipboard from '@react-native-clipboard/clipboard';
import { EmptyList } from '../../assets/svg';
import { Icon, Switch } from 'react-native-paper';
import color from '../../ui/token/colors';
import { styles } from './WalletHistoryScreen.styles';
import { te } from './i18n/te';
import { useUser } from '../../context/UserContext';

export const WalletHistoryScreen = () => {
  const { wallets, toggleFavorite, removeWallet } = useUser();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const handleCopy = (address: string) => {
    Clipboard.setString(address);
    Alert.alert(te('copiedTitle'), te('copiedMsg'));
  };

  const filteredWallets = showOnlyFavorites
    ? wallets.filter(w => w.favorite)
    : wallets;

  const renderItem = ({ item }: { item: Wallet }) => {
    const date = new Date(item.scannedAt).toLocaleString();

    const handleDelete = (address: string) => {
      Alert.alert(te('deleteTitle'), te('deleteMsg'), [
        { text: te('cancel'), style: 'cancel' },
        {
          text: te('delete'),
          style: 'destructive',
          onPress: () => removeWallet(address),
        },
      ]);
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
    <ScreenWrapper title={te('title')} blurAmount={20}>
      <View style={styles.headerRow}>
        <Text style={styles.filterLabel}>{te('filterOnlyFavorites')}</Text>
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
              {showOnlyFavorites ? te('emptyFavorites') : te('emptyAll')}
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

export default WalletHistoryScreen;
