import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Menu, Divider, Text } from 'react-native-paper';
import { getCurrencyName, getFlag } from '../../utils/fiat';
import { CURRENCY_OPTIONS } from '../../constants/currencies';
import color from '../../ui/token/colors';

type Props = {
  value: string;
  onChange: (code: string) => void;
  options?: string[];
  showNameOnChip?: boolean;
  testID?: string;
};

function CurrencyMenuItemRow({
  flag,
  code,
  name,
  active,
}: {
  flag: string;
  code: string;
  name: string;
  active: boolean;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ width: 20, textAlign: 'center' }}>{flag}</Text>
      <Text style={{ fontWeight: active ? '700' : '400' }}>{code}</Text>
      <Text style={{ opacity: 0.6 }} numberOfLines={1} ellipsizeMode="tail">
        · {name}
      </Text>
    </View>
  );
}

export default function CurrencySelectorChip({
  value,
  onChange,
  options = CURRENCY_OPTIONS,
  showNameOnChip = false,
  testID,
}: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const closeMenu = () => setIsMenuVisible(false);
  const toggleMenu = () => setIsMenuVisible(prevState => !prevState);

  const currencyCode = (value ?? '').toUpperCase();
  const currencyFlag = getFlag(value);
  const currencyName = getCurrencyName(value);

  const handleSelectCurrency = (selectedOption: string) => {
    closeMenu();
    if (selectedOption.toLowerCase() !== (value ?? '').toLowerCase()) {
      onChange(selectedOption);
    }
  };

  return (
    <View>
      <Menu
        visible={isMenuVisible}
        onDismiss={closeMenu}
        anchor={
          <Chip
            testID={testID}
            selected
            style={styles.chip}
            onPress={toggleMenu}
            selectedColor={color.brandBorder}
            icon={() => <Text>{currencyFlag}</Text>}
          >
            {showNameOnChip ? (
              <Text numberOfLines={1} ellipsizeMode="tail">
                {currencyFlag} {currencyCode} · {currencyName}
              </Text>
            ) : (
              currencyCode
            )}
          </Chip>
        }
      >
        <Text
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            color: color.transparent6,
          }}
        >
          Seleccionar moneda Vs
        </Text>
        <Divider />
        {options.map(optionValue => {
          const optionCode = optionValue.toUpperCase();
          const optionFlag = getFlag(optionValue);
          const optionName = getCurrencyName(optionValue);
          const isActive =
            optionValue.toLowerCase() === (value ?? '').toLowerCase();

          return (
            <Menu.Item
              key={optionValue}
              onPress={() => handleSelectCurrency(optionValue)}
              title={
                <CurrencyMenuItemRow
                  flag={optionFlag}
                  code={optionCode}
                  name={optionName}
                  active={isActive}
                />
              }
            />
          );
        })}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: color.brandSoftBg,
    marginRight: 8,
    borderColor: color.brandBorder,
    borderWidth: 1,
  },
});
