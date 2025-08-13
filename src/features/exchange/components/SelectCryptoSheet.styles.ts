import { StyleSheet, Dimensions } from 'react-native';
import color from '../../../ui/token/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  sheetContainer: {
    height: SCREEN_HEIGHT * 0.6,
    maxHeight: '85%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginBottom: 16,
    textAlign: 'center' as const,
  },
  listContent: {
    paddingBottom: 44,
  },
  item: {
    paddingVertical: 12,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  left: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  symbol: {
    fontSize: 12,
    color: color.grayTrackOff,
  },
  price: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  loadingIndicator: {
    marginTop: 16,
  },
});
