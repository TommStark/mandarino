import React from 'react';
import { Header } from '../../components/Home/Header';
import { BigBanner } from '../../components/Home/BigBanner';
import { HoldingsPreview } from '../../components/Home/HoldingsPreview';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';
import { ActionNav } from '../../components/Home/ActionNav';

import { useUser } from '../../context/UserContext';

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
