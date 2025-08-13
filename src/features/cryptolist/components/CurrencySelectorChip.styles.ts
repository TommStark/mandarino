import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: color.brandSoftBg,
    marginRight: 8,
    borderColor: color.brandBorder,
    borderWidth: 1,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flag: { width: 20, textAlign: 'center' },
  code: { fontWeight: '400' },
  codeActive: { fontWeight: '700' },
  name: { opacity: 0.6 },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: color.transparent6,
  },
});
