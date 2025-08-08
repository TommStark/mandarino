import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useCoinsMarketsQuery } from '../../hooks/useCoinsMarketsQuery';
import { CryptoCard } from '../CryptoCard';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useUser } from '../../context/UserContext';
import { EmptyList, HttpLost } from '../../assets/svg';
import HttpErrorModal from '../Shared/HttpErrorModal';
import LoadingState from '../Shared/LoadingState';

type Props = {
  onPressViewAll: () => void;
};

export const HoldingsPreview = ({ onPressViewAll }: Props) => {
  const { data, isLoading, isError } = useCoinsMarketsQuery({
    vs_currency: 'usd',
    page: 1,
    per_page: 5,
    order: 'market_cap_desc',
  });

  const { user, showBalances } = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tus Crypto</Text>
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAll}>Ver Todo</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <LoadingState />}

      {!isLoading && (isError || !data || data.length === 0) && (
        <HttpErrorModal />
      )}

      {!isLoading && data && data.length > 0 && (
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const symbol = item.symbol.toUpperCase();
            const userAmount =
              user.holdings[symbol as keyof typeof user.holdings] ?? 0;

            return (
              <CryptoCard
                coin={item}
                userAmount={showBalances ? userAmount : undefined}
                showUserAmount={showBalances}
              />
            );
          }}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 12,
    marginBottom: 24,
  },
  headerRow: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111',
  },
  viewAll: {
    fontSize: 14,
    color: '#FF6600',
  },
  separator: {
    height: 4,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
});
