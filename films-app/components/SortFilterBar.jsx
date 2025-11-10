import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../styling/theme';

function Chip({ active, children, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}>
      <Text style={styles.chipText}>{children}</Text>
    </Pressable>
  );
}

export default function SortFilterBar({ sortKey, onChangeSort, directors, filter, onChangeFilter }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Chip active={sortKey==='alpha'} onPress={() => onChangeSort('alpha')}>A-Z</Chip>
        <Chip active={sortKey==='year'} onPress={() => onChangeSort('year')}>Year</Chip>
        <Chip active={sortKey==='rating'} onPress={() => onChangeSort('rating')}>Rating</Chip>
        <Text style={styles.badge}>Sort: {sortKey}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Min score:</Text>
        <Pressable onPress={() => onChangeFilter({ ...filter, minScore: Math.max(0, filter.minScore - 10) })} style={styles.btn}><Text>-10</Text></Pressable>
        <Text style={styles.value}>{filter.minScore}</Text>
        <Pressable onPress={() => onChangeFilter({ ...filter, minScore: Math.min(100, filter.minScore + 10) })} style={styles.btn}><Text>+10</Text></Pressable>
      </View>

      {!!directors?.length && (
        <View style={styles.row}>
          <Text style={styles.label}>Director:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {directors.map((d) => (
              <Chip key={d} active={filter.director===d} onPress={() => onChangeFilter({ ...filter, director: d })}>{d}</Chip>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: SPACING.m, paddingBottom: SPACING.s },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 },
  chip: { backgroundColor: COLORS.card, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginRight: 8, borderWidth: 1, borderColor: '#e6e6e6' },
  active: { backgroundColor: '#eef5ff', borderColor: COLORS.primary },
  chipText: { color: COLORS.text },
  badge: { marginLeft: 8, color: COLORS.muted },
  label: { color: COLORS.muted, marginRight: 6 },
  value: { minWidth: 28, textAlign: 'center' },
  btn: { backgroundColor: COLORS.card, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#e6e6e6', marginHorizontal: 4 },
});