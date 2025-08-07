import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import Ionicons from '@react-native-vector-icons/ionicons';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PaperProvider
      settings={{
        icon: props => <Ionicons {...props} />,
      }}
    >
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  </QueryClientProvider>
);

export default App;
