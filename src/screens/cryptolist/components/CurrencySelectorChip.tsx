import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Chip, Menu, Divider } from 'react-native-paper';
import { CURRENCY_OPTIONS } from '../../../constants/currencies';
import { getCurrencyName, getFlag } from '../../../utils/fiat';
import { styles } from './CurrencySelectorChip.styles';
import color from '../../../ui/token/colors';
import { te } from '../i18n/te';

type Props = {
  value: string;
  onChange: (code: string) => void;
  options?: string[];
  showNameOnChip?: boolean;
  testID?: string;
};

const CurrencyMenuItemRow = ({
  flag,
  code,
  name,
  active,
}: {
  flag: string;
  code: string;
  name: string;
  active: boolean;
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.flag}>{flag}</Text>
      <Text style={[styles.code, active && styles.codeActive]}>{code}</Text>
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        · {name}
      </Text>
    </View>
  );
};

const CurrencyIcon = ({ flag }: { flag: string }) => <Text>{flag}</Text>;

export default function CurrencySelectorChip({
  value,
  onChange,
  options = CURRENCY_OPTIONS,
  showNameOnChip = false,
  testID,
}: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const closeMenu = () => setIsMenuVisible(false);
  const toggleMenu = () => setIsMenuVisible(p => !p);

  const currencyCode = (value ?? '').toUpperCase();
  const currencyFlag = getFlag(value);
  const currencyName = getCurrencyName(value);

  const renderIcon = useCallback(
    () => <CurrencyIcon flag={currencyFlag} />,
    [currencyFlag],
  );

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
            icon={renderIcon}
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
        <Text style={styles.header}>{te('selectVsCurrency')}</Text>
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
