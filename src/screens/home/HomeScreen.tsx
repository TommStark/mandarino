// src/screens/HomeScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { BigBanner } from '../../components/BigBanner';
import { HoldingsPreview } from '../../components/HoldingsPreview';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { ActionNav } from '../../components/ActionNav';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <Header username="Alex" />
      <BigBanner balance={5612.05} changeAmount={234.56} changePercent={4.2} />
      <ActionNav />
      <HoldingsPreview
        onPressViewAll={() => navigation.navigate('CryptoList')}
      />
    </ScreenWrapper>
  );
}
