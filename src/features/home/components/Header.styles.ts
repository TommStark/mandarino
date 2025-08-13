import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: color.brand,
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: color.brandBorder,
    marginTop: 2,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
  },
});
