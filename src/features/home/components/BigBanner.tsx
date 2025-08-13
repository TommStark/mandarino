import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { useUser } from '../../../context/UserContext';
import color from '../../../ui/token/colors';
import { styles } from './BigBanner.styles';
import { th } from '../i18n/t';

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
        <Text style={styles.label}>{th('banner.label')}</Text>
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
          ? balance.toLocaleString('en-US', { minimumFractionDigits: 2 })
          : th('banner.hidden')}
      </Text>

      {showBalances && (
        <Text style={[styles.change, isPositive ? styles.green : styles.red]}>
          {isPositive ? '▲' : '▼'} ${Math.abs(changeAmount).toFixed(2)} (
          {Math.abs(changePercent).toFixed(1)}%) {th('banner.today')}
        </Text>
      )}
    </View>
  );
};
