import { Dimensions, StyleSheet } from 'react-native';
import color from '../../ui/token/colors';

const { width } = Dimensions.get('window');
const SIZE = Math.min(width * 0.34, 160);

export const styles = StyleSheet.create({
  absFill: { ...StyleSheet.absoluteFillObject },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circleWrapper: { marginBottom: 16, elevation: 6 },
  logo: { width: SIZE, height: SIZE },
  title: { fontSize: 28, fontWeight: '800', color: color.black },
});
