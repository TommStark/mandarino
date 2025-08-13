import React, { forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useCoinsMarketsQuery } from '../../hooks/useCoinsMarketsQuery';
import { CryptoMarket } from '../../types/coingecko';
import ActionSheet, {
  SheetProps,
  ActionSheetRef,
} from 'react-native-actions-sheet';
import color from '../../ui/token/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

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
      <ActionSheet
        ref={ref}
        gestureEnabled
        containerStyle={styles.sheetContainer}
        {...props}
      >
        <Text style={styles.header}>Seleccionar criptomoneda</Text>

        {isLoading && <ActivityIndicator style={{ marginTop: 16 }} />}

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

const styles = StyleSheet.create({
  sheetContainer: {
    maxHeight: SCREEN_HEIGHT * 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  listContent: {
    paddingBottom: 44,
  },
  item: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  symbol: {
    fontSize: 12,
    color: color.grayTrackOff,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SelectCryptoSheet;
