import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const LoadingState = () => (
  <View style={styles.container}>
    <ActivityIndicator animating={true} color={MD2Colors.orange900} size={40} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
});

export default LoadingState;
