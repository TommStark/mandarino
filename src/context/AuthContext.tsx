import React from 'react';
import type {
  User as GoogleUser,
  SignInSilentlyResponse,
} from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useGoogleSignIn, type GoogleConfig } from '../hooks/useGoogleSignIn';
import { logAuth, logErrorAuth } from '../utils/logger';
import { getJSON, getSecret } from '../services/secureStorage';

type AuthState = {
  user: GoogleUser | null;
  isHydrating: boolean;
  loading: boolean;
  error: string | null;
};

type AuthContextType = AuthState & {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  revokeAccess: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};

type Props = { children: React.ReactNode; config: GoogleConfig };

const SESSION_KEY = 'google.session';

export function AuthProvider({ children, config }: Props) {
  const {
    loading: gLoading,
    error: gError,
    signIn: gSignIn,
    signOut: gSignOut,
    revokeAccess: gRevoke,
  } = useGoogleSignIn(config);

  const [state, setState] = React.useState<AuthState>({
    user: null,
    isHydrating: true,
    loading: false,
    error: null,
  });

  React.useEffect(() => {
    (async () => {
      logAuth('hydrate(): start');
      try {
        try {
          const silent: SignInSilentlyResponse =
            await GoogleSignin.signInSilently();
          if (silent?.type === 'success') {
            logAuth('hydrate(): live session', silent.data.user?.email);
            setState({
              user: silent.data,
              isHydrating: false,
              loading: false,
              error: null,
            });
            return;
          }
        } catch {}

        const session = await getJSON<{ exp?: number; user?: any }>(
          SESSION_KEY,
        );
        const idToken = await getSecret('google.idToken');

        const nowSec = Math.floor(Date.now() / 1000);
        const valid = idToken && (session?.exp ? session.exp > nowSec : true);

        if (valid && session?.user) {
          logAuth('hydrate(): from keychain', session.user?.email);
          const pseudoUser: GoogleUser = {
            idToken: idToken || null,
            serverAuthCode: null,
            scopes: [],
            user: {
              id: session.user?.id,
              email: session.user?.email,
              name: session.user?.name,
              photo: session.user?.photo,
              familyName: null,
              givenName: null,
            },
          } as any;

          setState({
            user: pseudoUser,
            isHydrating: false,
            loading: false,
            error: null,
          });
          return;
        }

        setState(s => ({ ...s, isHydrating: false }));
        logAuth('hydrate(): no session');
      } catch (e) {
        logErrorAuth('hydrate()', e);
        setState(s => ({ ...s, isHydrating: false }));
      }
    })();
  }, []);

  const signIn = React.useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    logAuth('AuthContext.signIn(): call hook');
    const user = await gSignIn();
    if (user) {
      setState({ user, isHydrating: false, loading: false, error: null });
      logAuth('AuthContext.signIn(): success', user?.user?.email);
    } else {
      const err = gError ?? 'No se pudo iniciar sesión.';
      setState(s => ({ ...s, loading: false, error: err }));
      logAuth('AuthContext.signIn(): fail', err);
    }
  }, [gSignIn, gError]);

  const signOut = React.useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    logAuth('AuthContext.signOut(): call hook');
    await gSignOut();
    setState({ user: null, isHydrating: false, loading: false, error: null });
    logAuth('AuthContext.signOut(): done');
  }, [gSignOut]);

  const revokeAccess = React.useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    logAuth('AuthContext.revokeAccess(): call hook');
    await gRevoke();
    setState({ user: null, isHydrating: false, loading: false, error: null });
    logAuth('AuthContext.revokeAccess(): done');
  }, [gRevoke]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isHydrating: state.isHydrating,
        loading: state.loading || gLoading,
        error: state.error ?? gError ?? null,
        signIn,
        signOut,
        revokeAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
