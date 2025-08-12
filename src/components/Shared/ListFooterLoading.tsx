import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
export default function ListFooterLoading() {
  return (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );
}
const styles = StyleSheet.create({
  footer: { paddingVertical: 16, alignItems: 'center' },
});
