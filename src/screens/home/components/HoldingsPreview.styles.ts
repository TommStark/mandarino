import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 12,
    marginBottom: 24,
  },
  headerRow: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: color.black,
  },
  viewAll: {
    fontSize: 14,
    color: color.brand,
  },
  separator: {
    height: 4,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
});
