import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User as GoogleUser } from '@react-native-google-signin/google-signin';
import { useGoogleSignIn, type GoogleConfig } from '../hooks/useGoogleSignIn';
import { logAuth, logErrorAuth } from '../utils/logger';

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

const STORAGE_KEY = '@auth:user';

type Props = { children: React.ReactNode; config: GoogleConfig };

export function AuthProvider({ children, config }: Props) {
  const {
    loading: gLoading,
    error: gError,
    signIn: gSignIn,
    signOut: gSignOut,
    revokeAccess: gRevoke,
    getCurrentUser,
  } = useGoogleSignIn(config);

  const [state, setState] = React.useState<AuthState>({
    user: null,
    isHydrating: true,
    loading: false,
    error: null,
  });

  React.useEffect(() => {
    (async () => {
      try {
        logAuth('hydrate(): start');
        const live = await getCurrentUser();
        if (live) {
          logAuth('hydrate(): live session', live?.user?.email);
          setState({
            user: live,
            isHydrating: false,
            loading: false,
            error: null,
          });
          return;
        }
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const cached: GoogleUser = JSON.parse(raw);
          logAuth('hydrate(): from storage', cached?.user?.email);
          setState({
            user: cached,
            isHydrating: false,
            loading: false,
            error: null,
          });
          return;
        }
      } catch (e) {
        logErrorAuth('hydrate()', e);
      }
      setState(s => ({ ...s, isHydrating: false }));
      logAuth('hydrate(): no session');
    })();
  }, [getCurrentUser]);

  const persistUser = React.useCallback(async (user: GoogleUser | null) => {
    try {
      if (user) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        logAuth('persistUser(): saved', user?.user?.email);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
        logAuth('persistUser(): cleared');
      }
    } catch (e) {
      logErrorAuth('persistUser()', e);
    }
  }, []);

  const signIn = React.useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    logAuth('AuthContext.signIn(): call hook');
    const user = await gSignIn();
    if (user) {
      await persistUser(user);
      setState({ user, isHydrating: false, loading: false, error: null });
      logAuth('AuthContext.signIn(): success', user?.user?.email);
    } else {
      const err = gError ?? 'No se pudo iniciar sesión.';
      setState(s => ({ ...s, loading: false, error: err }));
      logAuth('AuthContext.signIn(): fail', err);
    }
  }, [gSignIn, gError, persistUser]);

  const signOut = React.useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    logAuth('AuthContext.signOut(): call hook');
    await gSignOut();
    await persistUser(null);
    setState({ user: null, isHydrating: false, loading: false, error: null });
    logAuth('AuthContext.signOut(): done');
  }, [gSignOut, persistUser]);

  const revokeAccess = React.useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));
    logAuth('AuthContext.revokeAccess(): call hook');
    await gRevoke();
    await persistUser(null);
    setState({ user: null, isHydrating: false, loading: false, error: null });
    logAuth('AuthContext.revokeAccess(): done');
  }, [gRevoke, persistUser]);

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
