import { StyleSheet } from 'react-native';
import color from '../../ui/token/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  swapButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: color.grayThumbOff,
  },
  swapText: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  hint: {
    textAlign: 'left' as const,
    fontSize: 13,
    color: color.blueGray700,
  },
  motto: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: color.grayThumbOff,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.blueGray300,
    gap: 2,
  },
  mottoTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: color.black,
  },
  mottoSub: {
    fontSize: 12,
    color: color.blueGray600,
  },
  mottoMeta: {
    marginTop: 2,
    fontSize: 11,
    color: color.blueGray300,
  },
});
