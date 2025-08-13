import React, { memo, useCallback } from 'react';
import { Text, Pressable, ScrollView } from 'react-native';
import { styles } from './CategoryChipsInline.styles';

export type CategoryOption = { key: string; label: string };

export const DEFAULT_CATEGORY_OPTIONS: CategoryOption[] = [
  { key: 'all', label: 'Todas' },
  { key: 'layer-1', label: 'Layer 1' },
  { key: 'stablecoins', label: 'Stablecoins' },
  { key: 'decentralized-finance-defi', label: 'DeFi' },
  { key: 'gaming', label: 'Gaming' },
  { key: 'meme-token', label: 'Meme' },
];

type Props = {
  value: string;
  onChange: (next: string) => void;
  options?: CategoryOption[];
  testID?: string;
};

export const CategoryChipsInline = memo(function CategoryChipsInline({
  value,
  onChange,
  options = DEFAULT_CATEGORY_OPTIONS,
  testID,
}: Props) {
  const handlePress = useCallback(
    (key: string) => {
      if (key !== value) onChange(key);
    },
    [onChange, value],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      testID={testID}
    >
      {options.map(opt => {
        const active = value === opt.key;
        return (
          <Pressable
            key={opt.key}
            onPress={() => handlePress(opt.key)}
            style={[styles.chip, active && styles.chipActive]}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected: active }}
            hitSlop={6}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
});
