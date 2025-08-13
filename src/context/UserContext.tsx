import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

type Holdings = {
  BTC: number;
  ETH: number;
  USDT: number;
  XRP: number;
  BNB: number;
};

type UserData = {
  name: string;
  email: string;
  avatarUrl: string;
  totalBalanceUSD: number;
  holdings: Holdings;
  balanceChange: {
    amount: number;
    percent: number;
  };
};

type UserContextType = {
  user: UserData;
  showBalances: boolean;
  toggleShowBalances: () => void;
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
  const [showBalances, setShowBalances] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('showBalances');
      if (stored !== null) setShowBalances(stored === 'true');
    })();
  }, []);

  const toggleShowBalances = async () => {
    const next = !showBalances;
    setShowBalances(next);
    await AsyncStorage.setItem('showBalances', String(next));
  };

  const email = authUser?.user?.email ?? 'user@mandarino.app';
  const name = (authUser?.user?.name ?? email.split('@')[0]) || 'user';
  const avatarUrl = authUser?.user?.photo ?? 'https://i.pravatar.cc/150?img=10';

  const userData: UserData = {
    name,
    email,
    avatarUrl,
    totalBalanceUSD: 12452.55,
    holdings: mockHoldings,
    balanceChange: { amount: 512.35, percent: 4.29 },
  };

  return (
    <UserContext.Provider
      value={{
        user: userData,
        showBalances,
        toggleShowBalances,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
