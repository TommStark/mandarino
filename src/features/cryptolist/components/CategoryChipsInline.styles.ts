import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  row: { paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  chip: {
    height: 38,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.blueGray300,
    backgroundColor: 'white',
    marginVertical: 8,
    justifyContent: 'center',
    alignContent: 'center',
  },
  chipActive: {
    backgroundColor: color.brandSoftBg,
    borderColor: color.brandBorder,
  },
  chipText: { color: color.blueGray700, fontSize: 14 },
  chipTextActive: { color: color.brandBorder, fontWeight: '600' },
});
