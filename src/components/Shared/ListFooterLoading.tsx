import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function ListFooterLoading() {
  return (
    <View style={styles.footer}>
      <IconButton icon="loading" animated />
    </View>
  );
}
const styles = StyleSheet.create({
  footer: { paddingVertical: 16, alignItems: 'center' },
});
