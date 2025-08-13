import { StyleSheet } from 'react-native';
import color from '../../ui/token/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  address: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  label: { fontSize: 14, marginBottom: 20 },
  favoriteButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: color.brand,
    borderRadius: 10,
  },
  favoriteText: { color: color.white, fontWeight: 'bold' },
});
