import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  title: string;
  subtitle: string;
};

export default function EmptyState({ title, subtitle }: Props) {
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
