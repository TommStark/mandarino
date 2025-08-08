import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../../components/Home/Header';
import { BigBanner } from '../../components/Home/BigBanner';
import { HoldingsPreview } from '../../components/Home/HoldingsPreview';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import { ActionNav } from '../../components/Home/ActionNav';
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
