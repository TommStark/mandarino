import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.brandSolid,
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 16,
    paddingVertical: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: color.white,
    fontWeight: '600',
    paddingTop: 4,
    fontSize: 14,
  },
  balance: {
    color: color.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  green: { color: color.successSoft },
  red: { color: color.dangerSoft },
});
