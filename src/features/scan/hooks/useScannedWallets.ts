import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

export type Wallet = {
  address: string;
  favorite: boolean;
  scannedAt: number;
};

const STORAGE_KEY = 'scannedWallets';

export const useScannedWallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setWallets(JSON.parse(data));
      }
    })();
  }, []);

  const saveWallets = async (newList: Wallet[]) => {
    setWallets(newList);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

  const addWallet = useCallback(
    (address: string) => {
      const exists = wallets.find(w => w.address === address);
      if (!exists) {
        const updated = [
          { address, favorite: false, scannedAt: Date.now() },
          ...wallets,
        ];
        saveWallets(updated);
      }
    },
    [wallets],
  );

  const toggleFavorite = useCallback(
    (address: string) => {
      const updated = wallets.map(w =>
        w.address === address ? { ...w, favorite: !w.favorite } : w,
      );
      saveWallets(updated);
    },
    [wallets],
  );

  const isFavorite = (address: string) =>
    wallets.find(w => w.address === address)?.favorite ?? false;

  const removeWallet = useCallback(
    (address: string) => {
      const updated = wallets.filter(w => w.address !== address);
      saveWallets(updated);
    },
    [wallets],
  );

  return {
    wallets,
    addWallet,
    toggleFavorite,
    isFavorite,
    removeWallet,
  };
};
