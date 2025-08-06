// src/components/BigBanner.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Feather } from '@expo/vector-icons';

type Props = {
  balance: number;
  changeAmount: number;
  changePercent: number;
};

export const BigBanner = ({ balance, changeAmount, changePercent }: Props) => {
  const isPositive = changeAmount >= 0;
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.label}>Total Balance</Text>
        <TouchableOpacity>
          {/* <Feather name="eye" size={18} color="white" /> */}
        </TouchableOpacity>
      </View>
      <Text style={styles.balance}>
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </Text>
      <Text style={[styles.change, isPositive ? styles.green : styles.red]}>
        {isPositive ? '▲' : '▼'} ${Math.abs(changeAmount).toFixed(2)} (
        {Math.abs(changePercent).toFixed(1)}%) Today
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6600',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  balance: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  green: {
    color: '#b9ffce',
  },
  red: {
    color: '#ffd6d6',
  },
});
