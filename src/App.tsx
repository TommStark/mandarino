import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './context/UserContext';
import AppNavigator from './navigation';
import Ionicons from '@react-native-vector-icons/ionicons';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <PaperProvider
        settings={{
          icon: props => <Ionicons {...props} />,
        }}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
