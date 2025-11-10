import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../styling/theme';

export default function MovieCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.thumb} />}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>Year: {item.release_date} • Rating: {item.rt_score}</Text>
        <Text style={styles.meta}>Director: {item.director}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 12, padding: SPACING.m, marginBottom: SPACING.m },
  thumb: { width: 72, height: 72, borderRadius: 8, marginRight: SPACING.m, backgroundColor: '#ddd' },
  info: { flex: 1 },
  title: { fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  meta: { color: COLORS.muted, fontSize: 12 },
});