import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function EmptyState({
  title = 'No hay resultados',
  subtitle = 'Probá con otro término o revisá tu conexión.',
}) {
  return (
    <View style={styles.box}>
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  box: { alignItems: 'center', paddingVertical: 32, gap: 4 },
  title: { opacity: 0.7 },
  subtitle: { opacity: 0.6, marginTop: 4 },
});
