import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';

type Props = {
  label: string;
  iconUri?: string;
  currencyCode: string;
  value: string;
  editable?: boolean;
  onPress: () => void;
  onChangeText?: (text: string) => void;
};

export const ExchangeBox = ({
  label,
  iconUri,
  currencyCode,
  value,
  editable = true,
  onPress,
  onChangeText,
}: Props) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={onPress} style={styles.box}>
        <View style={styles.left}>
          {iconUri ? (
            <Image source={{ uri: iconUri }} style={styles.icon} />
          ) : (
            <Text style={styles.flag}>{currencyCode}</Text>
          )}
          <Text style={styles.currency}>{currencyCode?.toUpperCase()}</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          editable={editable}
          value={value}
          onChangeText={onChangeText}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#999',
  },
  box: {
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  flag: {
    fontSize: 28,
    marginRight: 8,
  },
  currency: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  input: {
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'right',
    minWidth: 120,
    color: '#000',
  },
});
