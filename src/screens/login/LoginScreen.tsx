import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Divider,
  HelperText,
  Snackbar,
  Surface,
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { ScreenBackground } from '../../components/Shared/ScreenBackground';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({}: Props) {
  const { isHydrating, loading, error, signIn } = useAuth();

  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [snack, setSnack] = React.useState<string | null>(null);
  const showSnack = (msg: string) => setSnack(msg);

  const tryPasswordLogin = () => {
    if (!email || !pass) {
      setLocalError('Completá email y contraseña.');
      return;
    }
    setLocalError(null);
    showSnack('Por ahora solo podés iniciar sesión con Google ✨');
  };

  if (isHydrating) {
    return (
      <View style={styles.center}>
        <Text variant="bodyMedium">Preparando todo…</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScreenBackground />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brand}>Mandarino</Text>
          <Text style={styles.subtitle}>Tu mundo cripto, simple y bonito</Text>
        </View>

        <Surface style={styles.card} elevation={3}>
          <Text style={styles.cardTitle}>Ingresá a tu cuenta</Text>

          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Contraseña"
            value={pass}
            onChangeText={setPass}
            secureTextEntry
            style={styles.input}
          />
          {!!localError && (
            <HelperText type="error" visible>
              {localError}
            </HelperText>
          )}

          <Button
            mode="contained"
            onPress={tryPasswordLogin}
            disabled={loading}
            style={[styles.primaryBtn, { backgroundColor: '#ff7b00a9' }]}
            labelStyle={{ color: '#fff', fontWeight: '700' }}
          >
            Ingresar
          </Button>

          <View style={styles.dividerRow}>
            <Divider style={styles.flex1} />
            <Text style={styles.o}>o</Text>
            <Divider style={styles.flex1} />
          </View>

          <Button
            mode="contained"
            onPress={signIn}
            disabled={loading}
            icon="logo-google"
            contentStyle={{ height: 48 }}
            style={[styles.googleBtn, { backgroundColor: '#007bff78' }]}
            labelStyle={{ color: '#fff', fontWeight: '700' }}
          >
            {loading ? 'Conectando…' : 'Continuar con Google'}
          </Button>

          {!!error && (
            <HelperText type="error" visible style={{ textAlign: 'center' }}>
              {error}
            </HelperText>
          )}

          <Text style={styles.terms}>
            Al continuar aceptás nuestras políticas de privacidad y manejo de
            datos.
          </Text>
        </Surface>

        <View style={styles.footerArt}>
          <Image
            source={require('../../assets/splash/mandarino_logo.png')}
            style={{ width: 120, height: 120, opacity: 0.15 }}
          />
        </View>

        <Snackbar
          visible={!!snack}
          onDismiss={() => setSnack(null)}
          duration={2500}
          style={{ marginBottom: 12 }}
        >
          {snack}
        </Snackbar>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brand: {
    fontSize: 38,
    fontWeight: '900',
    color: '#ff7a00',
    letterSpacing: 0.3,
  },
  subtitle: { fontSize: 14, color: '#6b6b6b', marginTop: 4 },
  card: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: { marginTop: 8 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 8,
  },
  o: { marginHorizontal: 6, color: '#8b8b8b' },
  primaryBtn: { borderRadius: 12, marginTop: 8 },
  googleBtn: { borderRadius: 12 },
  terms: {
    marginTop: 12,
    fontSize: 12,
    color: '#8b8b8b',
    textAlign: 'center',
  },
  footerArt: { alignItems: 'center', marginTop: 20 },
});
