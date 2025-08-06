import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </QueryClientProvider>
);

export default App;
