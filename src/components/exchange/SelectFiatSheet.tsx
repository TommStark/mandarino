import React, { forwardRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import { useSupportedFiatCurrencies } from '../../hooks/useSupportedFiatCurrencies';
import { getCurrencyName } from '../../utils/fiat';
import { getFiatFlag, isFiatCountry } from '../../utils/fiat';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props extends SheetProps {
  onSelect: (fiat: { code: string; name: string; flag: string }) => void;
}

const SelectFiatSheet = forwardRef<ActionSheetRef, Props>(
  ({ onSelect, ...props }, ref) => {
    const { data: fiatCodes, isLoading } = useSupportedFiatCurrencies();
    const rows = useMemo(() => {
      if (!fiatCodes?.length) return [];
      return fiatCodes
        .filter(isFiatCountry)
        .map(code => {
          const flag = getFiatFlag(code);
          return {
            code,
            name: getCurrencyName(code),
            flag: flag ?? '',
          };
        })
        .filter(r => !!r.flag)
        .sort((a, b) => a.name.localeCompare(b.name, 'es'));
    }, [fiatCodes]);

    return (
      <ActionSheet
        ref={ref}
        gestureEnabled
        containerStyle={styles.sheetContainer}
        {...props}
      >
        <Text style={styles.header}>Seleccionar moneda</Text>

        {isLoading && <ActivityIndicator style={{ marginTop: 16 }} />}

        {!isLoading && rows.length === 0 && (
          <View style={{ paddingVertical: 16 }}>
            <Text style={{ textAlign: 'center', color: '#777' }}>
              No hay monedas disponibles
            </Text>
          </View>
        )}

        {rows.length > 0 && (
          <FlatList
            data={rows}
            keyExtractor={item => item.code}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable style={styles.item} onPress={() => onSelect(item)}>
                <View style={styles.left}>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <Text style={styles.code}>{item.code.toUpperCase()}</Text>
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
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
  },
  code: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 44,
  },
});

export default SelectFiatSheet;
