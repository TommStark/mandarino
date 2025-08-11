import * as React from 'react';
import {
  GoogleSignin,
  statusCodes,
  type SignInResponse,
  type SignInSuccessResponse,
  type User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import { logAuth, logErrorAuth } from '../utils/logger';
import { Platform } from 'react-native';

export type GoogleConfig = {
  webClientId: string;
  iosClientId?: string;
  scopes?: string[];
  offlineAccess?: boolean;
  forceCodeForRefreshToken?: boolean;
};

export function useGoogleSignIn(config: GoogleConfig) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const configuredRef = React.useRef(false);

  React.useEffect(() => {
    if (configuredRef.current) return;
    configuredRef.current = true;

    logAuth('configure()', {
      platform: Platform.OS,
      webClientId: config.webClientId,
      iosClientId: config.iosClientId,
      scopes: config.scopes ?? ['profile', 'email'],
      offlineAccess: config.offlineAccess ?? true,
      forceCodeForRefreshToken: config.forceCodeForRefreshToken ?? true,
    });

    GoogleSignin.configure({
      webClientId: config.webClientId,
      iosClientId: config.iosClientId,
      scopes: config.scopes ?? ['profile', 'email'],
      offlineAccess: config.offlineAccess ?? true,
      forceCodeForRefreshToken: config.forceCodeForRefreshToken ?? true,
    });
  }, [config]);

  const getCurrentUser =
    React.useCallback(async (): Promise<GoogleUser | null> => {
      try {
        const current = await GoogleSignin.getCurrentUser();
        logAuth(
          'getCurrentUser()',
          !!current ? 'FOUND' : 'NULL',
          current?.user?.email,
        );
        return current;
      } catch (e) {
        logErrorAuth('getCurrentUser()', e);
        return null;
      }
    }, []);

  const signIn = React.useCallback(async (): Promise<GoogleUser | null> => {
    setError(null);
    setLoading(true);
    logAuth('signIn(): start');

    try {
      if (Platform.OS === 'android') {
        const ok = await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        logAuth('hasPlayServices()', ok);
      }

      const res: SignInResponse = await GoogleSignin.signIn();
      logAuth('signIn(): response.type', res?.type);

      if (res.type === 'success') {
        const { data } = res as SignInSuccessResponse;
        logAuth('signIn(): success -> user', {
          email: data?.user?.email,
          id: data?.user?.id,
          grantedScopes: data?.scopes,
          hasServerAuthCode: !!data?.serverAuthCode,
        });

        // opcional: tokens (para depurar audience issues)
        try {
          const tokens = await GoogleSignin.getTokens();
          logAuth('getTokens()', {
            hasIdToken: !!tokens?.idToken,
            hasAccessToken: !!tokens?.accessToken,
          });
        } catch (tokErr) {
          logErrorAuth('getTokens()', tokErr);
        }

        return data;
      } else {
        setError('Inicio de sesión cancelado.');
        logAuth('signIn(): cancelled');
        return null;
      }
    } catch (e: any) {
      logErrorAuth('signIn()', e);

      let msg = 'No se pudo iniciar sesión.';
      if (e?.code === statusCodes.IN_PROGRESS)
        msg = 'Ya hay un login en curso.';
      if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
        msg = 'Play Services no disponible.';
      // iOS AppAuth comunes:
      // invalid_audience / invalid_client -> suelen ser IDs cruzados o URL scheme
      if (e?.message?.includes('invalid_audience')) {
        msg =
          'Config de Google inválida (invalid_audience). Revisá webClientId/iosClientId.';
      }
      setError(msg);
      return null;
    } finally {
      setLoading(false);
      logAuth('signIn(): end');
    }
  }, []);

  const signOut = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    logAuth('signOut(): start');
    try {
      await GoogleSignin.signOut();
      logAuth('signOut(): done');
    } catch (e) {
      logErrorAuth('signOut()', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const revokeAccess = React.useCallback(async () => {
    setError(null);
    setLoading(true);
    logAuth('revokeAccess(): start');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      logAuth('revokeAccess(): done');
    } catch (e) {
      logErrorAuth('revokeAccess()', e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, signIn, signOut, revokeAccess, getCurrentUser };
}
