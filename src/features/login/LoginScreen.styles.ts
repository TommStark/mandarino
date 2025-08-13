import { StyleSheet } from 'react-native';
import color from '../../ui/token/colors';

export const styles = StyleSheet.create({
  flex1: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  centerText: { textAlign: 'center' },

  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },

  header: { alignItems: 'center', marginBottom: 30 },
  brand: {
    fontSize: 38,
    fontWeight: '900',
    color: color.brand,
    letterSpacing: 0.3,
  },
  subtitle: { fontSize: 14, color: color.blueGray600, marginTop: 4 },

  card: { borderRadius: 16, padding: 20, backgroundColor: color.white },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },

  input: { marginTop: 8 },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 8,
  },
  o: { marginHorizontal: 6, color: color.blueGray600 },

  primaryBtn: { borderRadius: 12, marginTop: 8 },
  primaryLabel: { color: color.white, fontWeight: '700' },

  googleBtn: { borderRadius: 12 },
  googleLabel: { color: color.white, fontWeight: '700' },

  terms: {
    marginTop: 12,
    fontSize: 12,
    color: color.blueGray600,
    textAlign: 'center',
  },

  footerArt: { alignItems: 'center', marginTop: 20 },
  footerArtImg: { width: 120, height: 120, opacity: 0.15 },

  snack: { marginBottom: 12 },
});
