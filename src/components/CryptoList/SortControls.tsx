// src/components/CryptoList/SortControls.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Divider } from 'react-native-paper';
import type { SortBy, SortDir } from '../../hooks/useMarketsInfinite';
import CurrencySelectorChip from './CurrencySelectorChip';

type Props = {
  sortBy: SortBy;
  sortDir: SortDir;
  onChangeSortBy: (s: SortBy) => void;
  onToggleDir: () => void;

  vsCurrency: string;
  onChangeCurrency: (c: string) => void;
  currencyOptions?: string[];
  showCurrencyNameOnChip?: boolean;
};

export default function SortControls({
  sortBy,
  sortDir,
  onChangeSortBy,
  onToggleDir,
  vsCurrency,
  onChangeCurrency,
  currencyOptions,
  showCurrencyNameOnChip = false,
}: Props) {
  return (
    <>
      <View style={styles.row}>
        <CurrencySelectorChip
          value={vsCurrency}
          onChange={onChangeCurrency}
          options={currencyOptions}
          showNameOnChip={showCurrencyNameOnChip}
          testID="currency-chip"
        />

        <Chip
          selected={sortBy === 'market_cap'}
          onPress={() => onChangeSortBy('market_cap')}
          style={styles.chip}
          selectedColor="#B95C00"
          icon={sortBy === 'market_cap' ? 'check' : undefined}
        >
          Mkt Cap
        </Chip>

        <Chip
          selected={sortBy === 'volume'}
          onPress={() => onChangeSortBy('volume')}
          style={styles.chip}
          selectedColor="#B95C00"
          icon={sortBy === 'volume' ? 'check' : undefined}
        >
          Volumen
        </Chip>

        <Chip
          onPress={onToggleDir}
          style={styles.chip}
          selected
          selectedColor="#B95C00"
          icon={sortDir === 'desc' ? 'arrow-down' : 'arrow-up'}
        >
          {sortDir === 'desc' ? 'Desc' : 'Asc'}
        </Chip>
      </View>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexWrap: 'wrap',
  },
  chip: { backgroundColor: '#FFF3EA' },
});
