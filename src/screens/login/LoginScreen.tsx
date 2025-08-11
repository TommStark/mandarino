import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({}: Props) {
  const { isHydrating, loading, error, signIn } = useAuth();

  if (isHydrating) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Preparando todo…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Mandarino</Text>
      <Text style={styles.subtitle}>Tu mundo cripto, simple y bonito 🍊</Text>

      <Pressable
        onPress={signIn}
        disabled={loading}
        style={({ pressed }) => [
          styles.googleBtn,
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          loading && { opacity: 0.6 },
        ]}
      >
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>
          {loading ? 'Conectando…' : 'Continuar con Google'}
        </Text>
        {loading && <ActivityIndicator style={{ marginLeft: 8 }} />}
      </Pressable>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 24,
  },
  brand: { fontSize: 36, fontWeight: '800', color: '#ff7a00' },
  subtitle: { fontSize: 16, color: '#6b6b6b', marginTop: 6, marginBottom: 24 },
  googleBtn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  googleIcon: { width: 18, height: 18, marginRight: 10 },
  googleText: { fontSize: 16, fontWeight: '700', color: '#222' },
  error: { color: '#d93025', marginTop: 12, textAlign: 'center' },
});
