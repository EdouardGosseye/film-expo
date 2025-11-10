import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useMemo, useState } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import SortFilterBar from '../components/SortFilterBar';
import { applySearchSortFilter } from '../utils/filmHelpers';
import { COLORS, SPACING } from '../styling';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('alpha');
  const [filter, setFilter] = useState({ minScore: 0, director: 'ALL' });

  useEffect(() => {
    console.log('[HomeScreen] mounted');
    const ctrl = new AbortController();
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://ghibliapi.vercel.app/films', { signal: ctrl.signal });
        if (!res.ok) throw new Error('Network error ' + res.status);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
    return () => {
      ctrl.abort();
      console.log('[HomeScreen] unmounted');
    };
  }, []);

  const directors = useMemo(() => ['ALL', ...Array.from(new Set(data.map(d => d.director)))], [data]);

  const listData = useMemo(() => applySearchSortFilter(data, { search, sortKey, filter }), [data, search, sortKey, filter]);

  if (loading) return (
    <View style={styles.center}> 
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.hint}>Loading films…</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={styles.error}>Error: {error}</Text>
      <Text style={styles.hint}>Pull to refresh or check your connection.</Text>
    </View>
  );

  if (!listData.length) return (
    <View style={styles.center}>
      <SearchBar value={search} onChangeText={setSearch} />
      <Text style={styles.hint}>Geen resultaten… pas je zoekopdracht of filters aan.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />
      <SortFilterBar
        sortKey={sortKey}
        onChangeSort={setSortKey}
        directors={directors}
        filter={filter}
        onChangeFilter={setFilter}
      />

      <FlashList
        data={listData}
        keyExtractor={(item) => item.id}
        estimatedItemSize={120}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
        contentContainerStyle={{ padding: SPACING.m }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.l },
  error: { color: COLORS.error, marginTop: SPACING.s },
  hint: { color: COLORS.muted, marginTop: SPACING.s },
});