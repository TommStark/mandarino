import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { Feather } from '@expo/vector-icons';
import { ActionButton } from './ActionButton';

export const ActionNav = () => {
  return (
    <View style={styles.row}>
      <ActionButton
        // icon={<Feather name="plus" size={20} />}
        label="Buy"
        onPress={() => console.log('Buy')}
      />
      <ActionButton
        // icon={<Feather name="arrow-down" size={20} />}
        label="Sell"
        onPress={() => console.log('Sell')}
      />
      <ActionButton
        // icon={<Feather name="arrow-up" size={20} />}
        label="Send"
        onPress={() => console.log('Send')}
      />
      <ActionButton
        // icon={<Feather name="download" size={20} />}
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
