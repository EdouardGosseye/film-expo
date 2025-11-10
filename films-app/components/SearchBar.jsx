import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../styling/theme';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Zoek op titel…"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: SPACING.m, paddingVertical: SPACING.s },
  input: { backgroundColor: COLORS.card, color: COLORS.text, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e6e6e6' },
});