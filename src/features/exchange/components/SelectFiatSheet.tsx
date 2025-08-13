import React, { forwardRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import {
  getCurrencyName,
  getFiatFlag,
  isFiatCountry,
} from '../../../utils/fiat';
import { useSupportedFiatCurrencies } from '../hooks/useSupportedFiatCurrencies';
import { styles } from './SelectFiatSheet.styles';
import { te } from '../i18n/te';

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
      <ActionSheet ref={ref} containerStyle={styles.sheetContainer} {...props}>
        <Text style={styles.header}>{te('selectFiatTitle')}</Text>

        {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}

        {!isLoading && rows.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{te('emptyFiatList')}</Text>
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

export default SelectFiatSheet;
