import React, { forwardRef } from 'react';
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
import { getCurrencyName, getFlag } from '../../utils/fiat';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props extends SheetProps {
  onSelect: (fiat: { code: string; name: string; flag: string }) => void;
}

const SelectFiatSheet = forwardRef<ActionSheetRef, Props>(
  ({ sheetId, onSelect, ...props }, ref) => {
    const { data: fiatCodes, isLoading } = useSupportedFiatCurrencies();

    return (
      <ActionSheet
        ref={ref}
        gestureEnabled
        containerStyle={styles.sheetContainer}
        {...props}
      >
        <Text style={styles.header}>Seleccionar moneda</Text>
        {isLoading && <ActivityIndicator style={{ marginTop: 16 }} />}
        {fiatCodes && (
          <FlatList
            data={fiatCodes}
            keyExtractor={item => item}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() =>
                  onSelect({
                    code: item,
                    name: getCurrencyName(item),
                    flag: getFlag(item),
                  })
                }
              >
                <View style={styles.left}>
                  <Text style={styles.flag}>{getFlag(item)}</Text>
                  <Text style={styles.name}>{getCurrencyName(item)}</Text>
                </View>
                <Text style={styles.code}>{item.toUpperCase()}</Text>
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
