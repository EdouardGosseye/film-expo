import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from './theme';


export default StyleSheet.create({
screen: { flex: 1, backgroundColor: COLORS.bg, padding: SPACING.l },
center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});