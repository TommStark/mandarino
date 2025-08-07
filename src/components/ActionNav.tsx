import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActionButton } from './ActionButton';
import { Icon } from 'react-native-paper';

export const ActionNav = () => {
  return (
    <View style={styles.row}>
      <ActionButton
        icon={<Icon source="add" size={20} color="#0d0c0cff" />}
        label="Buy"
        onPress={() => console.log('Buy')}
      />
      <ActionButton
        icon={<Icon source="arrow-down" size={20} color="#0d0c0cff" />}
        label="Sell"
        onPress={() => console.log('Sell')}
      />
      <ActionButton
        icon={<Icon source="arrow-up" size={20} color="#0d0c0cff" />}
        label="Send"
        onPress={() => console.log('Send')}
      />
      <ActionButton
        icon={<Icon source="download" size={20} color="#0d0c0cff" />}
        label="Receive"
        onPress={() => console.log('Receive')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 8,
  },
});
