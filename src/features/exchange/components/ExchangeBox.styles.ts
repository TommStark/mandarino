import { StyleSheet } from 'react-native';
import color from '../../../ui/token/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currencyLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 72,
  },
  emoji: {
    fontSize: 18,
  },
  iconImg: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  acronym: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: color.black,
    letterSpacing: 0.25,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 28,
    lineHeight: 34,
    paddingVertical: 6,
    paddingHorizontal: 0,
    textAlign: 'right' as const,
  },
});
