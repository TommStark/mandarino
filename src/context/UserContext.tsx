import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { STORAGE_KEYS } from '../constants/storage';
import type { UserData, Holdings, Wallet } from '../types/user';

type UserContextType = {
  user: UserData;
  showBalances: boolean;
  toggleShowBalances: () => Promise<void>;
  wallets: Wallet[];
  addWallet: (address: string) => Promise<void>;
  toggleFavorite: (address: string) => Promise<void>;
  isFavorite: (address: string) => boolean;
  removeWallet: (address: string) => Promise<void>;
  clearWallets: () => Promise<void>;
  hydrating: boolean;
  error?: string | null;
};

const mockHoldings: Holdings = {
  BTC: 0.712,
  ETH: 5.1,
  USDT: 125,
  XRP: 8.3,
  BNB: 5300,
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user: authUser } = useAuth();

  const [hydrating, setHydrating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showBalances, setShowBalances] = useState<boolean>(true);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const entries = await AsyncStorage.multiGet([
          STORAGE_KEYS.SHOW_BALANCES,
          STORAGE_KEYS.SCANNED_WALLETS,
        ]);
        const map = Object.fromEntries(entries);

        if (map[STORAGE_KEYS.SHOW_BALANCES] != null) {
          setShowBalances(map[STORAGE_KEYS.SHOW_BALANCES] === 'true');
        }
        if (map[STORAGE_KEYS.SCANNED_WALLETS]) {
          const parsed = JSON.parse(
            map[STORAGE_KEYS.SCANNED_WALLETS] || '[]',
          ) as Wallet[];
          setWallets(Array.isArray(parsed) ? parsed : []);
        }
      } catch (e) {
        setError('No pudimos leer tus preferencias locales.');
      } finally {
        setHydrating(false);
      }
    })();
  }, []);

  const persistShowBalances = useCallback(async (val: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SHOW_BALANCES, String(val));
    } catch {
      setError('No pudimos guardar la preferencia de visibilidad.');
    }
  }, []);

  const persistWallets = useCallback(async (list: Wallet[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SCANNED_WALLETS,
        JSON.stringify(list),
      );
    } catch {
      setError('No pudimos guardar tus wallets escaneadas.');
    }
  }, []);

  const toggleShowBalances = useCallback(async () => {
    setShowBalances(prev => {
      const next = !prev;
      persistShowBalances(next);
      return next;
    });
  }, [persistShowBalances]);

  const addWallet = useCallback(
    async (address: string) => {
      setWallets(prev => {
        const exists = prev.some(w => w.address === address);
        if (exists) return prev;
        const next = [
          { address, favorite: false, scannedAt: Date.now() },
          ...prev,
        ];
        persistWallets(next);
        return next;
      });
    },
    [persistWallets],
  );

  const toggleFavorite = useCallback(
    async (address: string) => {
      setWallets(prev => {
        const next = prev.map(w =>
          w.address === address ? { ...w, favorite: !w.favorite } : w,
        );
        persistWallets(next);
        return next;
      });
    },
    [persistWallets],
  );

  const removeWallet = useCallback(
    async (address: string) => {
      setWallets(prev => {
        const next = prev.filter(w => w.address !== address);
        persistWallets(next);
        return next;
      });
    },
    [persistWallets],
  );

  const clearWallets = useCallback(async () => {
    setWallets([]);
    await persistWallets([]);
  }, [persistWallets]);

  const isFavorite = useCallback(
    (address: string) =>
      wallets.find(w => w.address === address)?.favorite ?? false,
    [wallets],
  );

  const email = authUser?.user?.email ?? 'user@mandarino.app';
  const name = (authUser?.user?.name ?? email.split('@')[0]) || 'user';
  const avatarUrl = authUser?.user?.photo ?? 'https://i.pravatar.cc/150?img=10';

  const user: UserData = useMemo(
    () => ({
      name,
      email,
      avatarUrl,
      totalBalanceUSD: 12452.55,
      holdings: mockHoldings,
      balanceChange: { amount: 512.35, percent: 4.29 },
    }),
    [name, email, avatarUrl],
  );

  const value = useMemo<UserContextType>(
    () => ({
      user,
      showBalances,
      toggleShowBalances,
      wallets,
      addWallet,
      toggleFavorite,
      isFavorite,
      removeWallet,
      clearWallets,
      hydrating,
      error,
    }),
    [
      user,
      showBalances,
      toggleShowBalances,
      wallets,
      addWallet,
      toggleFavorite,
      isFavorite,
      removeWallet,
      clearWallets,
      hydrating,
      error,
    ],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
};
