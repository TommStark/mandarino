import React from 'react';
import { View, KeyboardAvoidingView, Platform, Image } from 'react-native';
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
import color from '../../ui/token/colors';
import { styles } from './LoginScreen.styles';
import { te } from './i18n/te';

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
      setLocalError(te('fillEmailPass'));
      return;
    }
    setLocalError(null);
    showSnack(te('onlyGoogleSnack'));
  };

  if (isHydrating) {
    return (
      <View style={styles.center}>
        <Text variant="bodyMedium">{te('preparing')}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScreenBackground blurAmount={20} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brand}>{te('brand')}</Text>
          <Text style={styles.subtitle}>{te('subtitle')}</Text>
        </View>

        <Surface style={styles.card} elevation={3}>
          <Text style={styles.cardTitle}>{te('cardTitle')}</Text>

          <TextInput
            mode="outlined"
            label={te('emailLabel')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label={te('passwordLabel')}
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
            style={[styles.primaryBtn, { backgroundColor: color.brand }]}
            labelStyle={styles.primaryLabel}
          >
            {te('login')}
          </Button>

          <View style={styles.dividerRow}>
            <Divider style={styles.flex1} />
            <Text style={styles.o}>{te('or')}</Text>
            <Divider style={styles.flex1} />
          </View>

          <Button
            mode="contained"
            onPress={signIn}
            disabled={loading}
            icon="logo-google"
            contentStyle={{ height: 48 }}
            style={[styles.googleBtn, { backgroundColor: color.blue300 }]}
            labelStyle={styles.googleLabel}
          >
            {loading ? te('connecting') : te('continueWithGoogle')}
          </Button>

          {!!error && (
            <HelperText type="error" visible style={styles.centerText}>
              {error}
            </HelperText>
          )}

          <Text style={styles.terms}>{te('terms')}</Text>
        </Surface>

        <View style={styles.footerArt}>
          <Image
            source={require('../../assets/splash/mandarino_logo.png')}
            style={styles.footerArtImg}
          />
        </View>

        <Snackbar
          visible={!!snack}
          onDismiss={() => setSnack(null)}
          duration={2500}
          style={styles.snack}
        >
          {snack}
        </Snackbar>
      </View>
    </KeyboardAvoidingView>
  );
}
