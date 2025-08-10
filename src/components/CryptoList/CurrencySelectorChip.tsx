import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip, Menu, Divider, Text } from 'react-native-paper';
import { getCurrencyName, getFlag } from '../../utils/fiat';

type Props = {
  value: string;
  onChange: (code: string) => void;
  options?: string[];
  showNameOnChip?: boolean;
  testID?: string;
};

const DEFAULTS = ['usd', 'ars', 'eur', 'brl'];

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
  options = DEFAULTS,
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
            style={{ backgroundColor: '#FFF3EA', maxWidth: 240 }}
            onPress={toggle}
            selectedColor="#B95C00"
            icon={() => <Text>{flag}</Text>}
          >
            {showNameOnChip ? (
              <Text numberOfLines={1} ellipsizeMode="tail">
                {code} · {name}
              </Text>
            ) : (
              code
            )}
          </Chip>
        }
      >
        <Text
          style={{ paddingHorizontal: 12, paddingVertical: 6, opacity: 0.6 }}
        >
          Seleccionar moneda
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
