/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './context/UserContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import RNBootSplash from 'react-native-bootsplash';
import { MicroSplash } from './screens/splash/MicroSplash';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import Config from 'react-native-config';

const queryClient = new QueryClient();
const WEB_CLIENT_ID = Config.WEB_CLIENT_ID;
const IOS_CLIENT_ID = Config.IOS_CLIENT_ID;

const App = () => {
  const [showMicroSplash, setShowMicroSplash] = useState(true);
  if (!WEB_CLIENT_ID || !IOS_CLIENT_ID) {
    throw new Error('Missing Google client IDs in environment configuration.');
  }

  if (showMicroSplash) {
    return (
      <MicroSplash
        onDone={() => {
          RNBootSplash.hide({ fade: true });
          setShowMicroSplash(false);
        }}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        config={{
          webClientId: WEB_CLIENT_ID,
          iosClientId: IOS_CLIENT_ID,
        }}
      >
        <UserProvider>
          <PaperProvider settings={{ icon: props => <Ionicons {...props} /> }}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </PaperProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
