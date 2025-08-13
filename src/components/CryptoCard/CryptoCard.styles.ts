import { StyleSheet } from 'react-native';
import color from '../../ui/token/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: color.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '58%',
  },
  iconWrapper: {
    backgroundColor: color.brandSoftBg2,
    borderRadius: 999,
    width: 40,
    height: 40,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: color.black,
    maxWidth: 170,
  },
  amount: {
    fontSize: 12,
    color: color.blueGray600,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    maxWidth: '40%',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: color.black,
    maxWidth: 140,
  },
  priceSmall: { fontSize: 14 },
  priceXSmall: { fontSize: 12 },
  change: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  green: { color: color.success },
  red: { color: color.danger },
  neutral: { color: color.blueGray600 },
});
