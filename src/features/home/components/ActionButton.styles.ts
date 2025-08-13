import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 7,
    elevation: 2,
    shadowColor: color.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapper: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    color: color.black,
    fontWeight: '500',
  },
});
