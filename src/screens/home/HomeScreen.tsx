import React from 'react';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';

import { useUser } from '../../context/UserContext';
import { Header } from './components/Header';
import { BigBanner } from './components/BigBanner';
import { ActionNav } from './components/ActionNav';
import { HoldingsPreview } from './components/HoldingsPreview';

export default function HomeScreen() {
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
      <HoldingsPreview />
    </ScreenWrapper>
  );
}
