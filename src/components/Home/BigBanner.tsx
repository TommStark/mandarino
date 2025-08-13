import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { useUser } from '../../context/UserContext';
import color from '../../ui/token/colors';

type Props = {
  balance: number;
  changeAmount: number;
  changePercent: number;
};

export const BigBanner = ({ balance, changeAmount, changePercent }: Props) => {
  const isPositive = changeAmount >= 0;
  const { showBalances, toggleShowBalances } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.label}>Balance Total</Text>
        <TouchableOpacity onPress={toggleShowBalances}>
          <Icon
            source={showBalances ? 'eye' : 'eye-off'}
            size={28}
            color={color.white}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.balance}>
        $
        {showBalances
          ? `${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          : ' •••••••'}
      </Text>

      {showBalances && (
        <Text style={[styles.change, isPositive ? styles.green : styles.red]}>
          {isPositive ? '▲' : '▼'} ${Math.abs(changeAmount).toFixed(2)} (
          {Math.abs(changePercent).toFixed(1)}%) Hoy
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.brandSolid,
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 16,
    paddingVertical: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: color.white,
    fontWeight: '600',
    paddingTop: 4,
    fontSize: 14,
  },
  balance: {
    color: color.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  green: {
    color: color.successSoft,
  },
  red: {
    color: color.dangerSoft,
  },
});
