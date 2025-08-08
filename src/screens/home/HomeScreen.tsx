// src/screens/HomeScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Header } from '../../components/Header';
import { BigBanner } from '../../components/BigBanner';
import { HoldingsPreview } from '../../components/HoldingsPreview';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { ActionNav } from '../../components/ActionNav';
import { RootStackParamList } from '../../navigation';

import { useUser } from '../../context/UserContext';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user } = useUser();

  return (
    <ScreenWrapper scroll>
      <Header username={user.name} />
      <BigBanner
        balance={user.totalBalanceUSD}
        changeAmount={user.balanceChange.amount}
        changePercent={user.balanceChange.percent}
      />
      <ActionNav />
      <HoldingsPreview
        onPressViewAll={() => navigation.navigate('CryptoList')}
      />
    </ScreenWrapper>
  );
}
