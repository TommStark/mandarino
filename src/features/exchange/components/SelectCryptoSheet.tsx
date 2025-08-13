import React, { forwardRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import ActionSheet, {
  SheetProps,
  ActionSheetRef,
} from 'react-native-actions-sheet';
import { CryptoMarket } from '../../../types/coingecko';
import { useCoinsMarketsQuery } from '../hooks/useCoinsMarketsQuery';
import { styles } from './SelectCryptoSheet.styles';
import { te } from '../i18n/te';

type Props = SheetProps & {
  onSelect: (coin: CryptoMarket) => void;
};

const SelectCryptoSheet = forwardRef<ActionSheetRef, Props>(
  ({ onSelect, ...props }, ref) => {
    const { data, isLoading } = useCoinsMarketsQuery({
      vs_currency: 'ars',
      page: 1,
      per_page: 50,
      order: 'market_cap_desc',
    });

    const handleSelect = (coin: CryptoMarket) => {
      onSelect(coin);
    };

    return (
      <ActionSheet ref={ref} containerStyle={styles.sheetContainer} {...props}>
        <Text style={styles.header}>{te('selectCryptoTitle')}</Text>

        {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}

        {data && (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable style={styles.item} onPress={() => handleSelect(item)}>
                <View style={styles.left}>
                  <Image source={{ uri: item.image }} style={styles.icon} />
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.symbol}>
                      {item.symbol.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.price}>
                  $
                  {item.current_price.toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </Pressable>
            )}
          />
        )}
      </ActionSheet>
    );
  },
);

export default SelectCryptoSheet;
