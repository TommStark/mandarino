import { StyleSheet, Dimensions } from 'react-native';
import color from '../../../ui/token/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  sheetContainer: {
    maxHeight: SCREEN_HEIGHT * 0.6,
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
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
  },
  code: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  listContent: {
    paddingBottom: 44,
  },
  loadingIndicator: {
    marginTop: 16,
  },
  emptyContainer: {
    paddingVertical: 16,
  },
  emptyText: {
    textAlign: 'center' as const,
    color: color.grayTrackOff,
  },
});
