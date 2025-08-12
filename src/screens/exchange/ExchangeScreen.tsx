// src/screens/Exchange/ExchangeScreen.tsx
import React from 'react';
import { ExchangeBox } from '../../components/ExchangeBox';
import { Snackbar } from 'react-native-paper';
import { ScreenWrapper } from '../../components/Shared/ScreenWrapper';

export default function ExchangeScreen() {
  const [err, setErr] = React.useState<string | null>(null);
  return (
    <ScreenWrapper title="Exchange">
      <ExchangeBox onError={setErr} />
      <Snackbar visible={!!err} onDismiss={() => setErr(null)} duration={3000}>
        {err}
      </Snackbar>
    </ScreenWrapper>
  );
}
