// src/components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Feather, Ionicons } from '@expo/vector-icons';

type Props = {
  username: string;
};

export const Header = ({ username }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Mandarino</Text>
        <Text style={styles.subtitle}>Good morning, {username}</Text>
      </View>
      <View style={styles.icons}>
        {/* <Feather name="search" size={20} style={styles.icon} />
        <Ionicons name="notifications-outline" size={20} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FF6600',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    marginRight: 12,
  },
});
