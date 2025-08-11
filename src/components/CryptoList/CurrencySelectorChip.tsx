import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip, Menu, Divider, Text } from 'react-native-paper';
import { getCurrencyName, getFlag } from '../../utils/fiat';
import { CURRENCY_OPTIONS } from '../../constants/currencies';
import { StyleSheet } from 'react-native';

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
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const toggle = () => setVisible(v => !v);

  const code = (value ?? '').toUpperCase();
  const flag = getFlag(value);
  const name = getCurrencyName(value);

  const handleSelect = (opt: string) => {
    close();
    if (opt.toLowerCase() !== (value ?? '').toLowerCase()) {
      onChange(opt);
    }
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={close}
        anchor={
          <Chip
            testID={testID}
            selected
            style={styles.chip}
            onPress={toggle}
            selectedColor="#B95C00"
            icon={() => <Text>{flag}</Text>}
          >
            {showNameOnChip ? (
              <Text numberOfLines={1} ellipsizeMode="tail">
                {flag} {code} · {name}
              </Text>
            ) : (
              code
            )}
          </Chip>
        }
      >
        <Text
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            color: 'rgba(0,0,0,0.6)',
          }}
        >
          Seleccionar moneda Vs
        </Text>
        <Divider />
        {options.map(opt => {
          const c = opt.toUpperCase();
          const f = getFlag(opt);
          const n = getCurrencyName(opt);
          const active = opt.toLowerCase() === (value ?? '').toLowerCase();

          return (
            <Menu.Item
              key={opt}
              onPress={() => handleSelect(opt)}
              title={
                <CurrencyMenuItemRow
                  flag={f}
                  code={c}
                  name={n}
                  active={active}
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
    backgroundColor: '#FFF3EA',
    marginRight: 8,
    borderColor: '#B95C00',
    borderWidth: 1,
  },
});
