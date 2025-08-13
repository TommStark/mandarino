import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Chip, Divider } from 'react-native-paper';
import CurrencySelectorChip from './CurrencySelectorChip';
import color from '../../../ui/token/colors';
import { SortBy, SortDir } from '../hooks/useMarketsInfinite';
import { styles } from './SortControls.styles';
import { te } from '../i18n/te';

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

type ControlItem =
  | { type: 'currency' }
  | { type: 'sort'; key: SortBy; label: string }
  | { type: 'dir' };

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
  const controls: ControlItem[] = [
    { type: 'currency' },
    { type: 'dir' },
    { type: 'sort', key: 'market_cap', label: te('sortControls.mktCap') },
    { type: 'sort', key: 'volume', label: te('sortControls.volume') },
  ];

  const renderItem: ListRenderItem<ControlItem> = ({ item }) => {
    if (item.type === 'currency') {
      return (
        <CurrencySelectorChip
          value={vsCurrency}
          onChange={onChangeCurrency}
          options={currencyOptions}
          showNameOnChip={showCurrencyNameOnChip}
          testID="currency-chip"
        />
      );
    }
    if (item.type === 'dir') {
      return (
        <Chip
          onPress={onToggleDir}
          style={styles.chip}
          selected
          selectedColor={color.brandBorder}
          icon={sortDir === 'desc' ? 'arrow-down' : 'arrow-up'}
        >
          {sortDir === 'desc'
            ? te('sortControls.desc')
            : te('sortControls.asc')}
        </Chip>
      );
    }
    if (item.type === 'sort') {
      return (
        <Chip
          selected={sortBy === item.key}
          onPress={() => onChangeSortBy(item.key)}
          style={styles.chip}
          selectedColor={color.brandBorder}
          icon={sortBy === item.key ? 'checkmark' : undefined}
        >
          {item.label}
        </Chip>
      );
    }
    return null;
  };

  return (
    <>
      <FlatList
        data={controls}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.type === 'sort' ? item.key : item.type + index
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
      <Divider />
    </>
  );
}
