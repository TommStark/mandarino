import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './context/UserContext';
import AppNavigator from './navigation';
import Ionicons from '@react-native-vector-icons/ionicons';
import RNBootSplash from 'react-native-bootsplash';
import { MicroSplash } from './screens/splash/MicroSplash';

const queryClient = new QueryClient();

const App = () => {
  const [showMicroSplash, setShowMicroSplash] = useState(true);

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
      <UserProvider>
        <PaperProvider settings={{ icon: props => <Ionicons {...props} /> }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
