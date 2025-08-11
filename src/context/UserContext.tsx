import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const mockUserData: UserData = {
  name: 'Tomito',
  email: 'Toku@mandarino.app',
  avatarUrl: 'https://i.pravatar.cc/150?img=3',
  totalBalanceUSD: 12452.55,
  holdings: {
    BTC: 0.712,
    ETH: 5.1,
    USDT: 125,
    XRP: 8.3,
    BNB: 5300,
  },
  balanceChange: {
    amount: 512.35,
    percent: 4.29,
  },
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [showBalances, setShowBalances] = useState(true);

  useEffect(() => {
    const loadVisibility = async () => {
      const stored = await AsyncStorage.getItem('showBalances');
      if (stored !== null) {
        setShowBalances(stored === 'true');
      }
    };
    loadVisibility();
  }, []);

  const toggleShowBalances = async () => {
    const next = !showBalances;
    setShowBalances(next);
    await AsyncStorage.setItem('showBalances', String(next));
  };

  return (
    <UserContext.Provider
      value={{
        user: mockUserData,
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
