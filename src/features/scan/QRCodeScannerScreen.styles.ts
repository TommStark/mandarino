import { StyleSheet } from 'react-native';
import color from '../../ui/token/colors.ts';

export const styles = StyleSheet.create({
  container: { flex: 1 },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
    textAlign: 'center',
  },

  action: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: color.brand,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionSecondary: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: color.brandTrackOn,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionText: { color: color.black, fontWeight: '700' },

  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },

  maskContainer: { ...StyleSheet.absoluteFillObject, flexDirection: 'column' },
  maskRow: { flex: 3, backgroundColor: 'rgba(0,0,0,0.5)' },
  qrRow: { flex: 4, flexDirection: 'row' },
  maskSide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  qrBox: {
    flex: 7,
    borderColor: color.white,
    borderWidth: 3,
    borderRadius: 12,
  },

  caption: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 16,
  },

  primary: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: color.brand,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryText: { color: color.black, fontWeight: '700' },

  secondary: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: color.brandTrackOn,
    alignItems: 'center',
  },
  secondaryText: { color: color.black, fontWeight: '700' },

  link: { marginTop: 16, padding: 8 },
  linkText: { textDecorationLine: 'underline', opacity: 0.8 },
});
