import { StyleSheet } from 'react-native';
import color from '../../ui/token/colors';

export const styles = StyleSheet.create({
  flex1: { flex: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  favoriteItem: { backgroundColor: color.brandSoftBg },
  address: { fontSize: 14, fontWeight: 'bold' },
  date: { fontSize: 12, color: color.blueGray600 },
  star: { fontSize: 27, marginHorizontal: 8, color: color.brand },
  walletIcon: { fontSize: 20, marginRight: 10 },
  empty: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: color.blueGray300,
  },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyImage: { width: 120, height: 120, marginBottom: 12 },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  headerRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterLabel: { fontSize: 14, fontWeight: '600', color: color.blueGray700 },
  footerSpacer: { height: 80 },
  marginRight10: { marginRight: 10 },
});
