import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: color.brandSoftBg2,
    marginRight: 8,
    borderColor: color.brandBorder,
    borderWidth: 1,
  },
});
