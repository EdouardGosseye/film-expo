import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS, SPACING } from '../styling';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[DetailScreen] mounted for id', id);
    const ctrl = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error('Network error ' + res.status);
        const json = await res.json();
        setItem(json);
        setError(null);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { ctrl.abort(); console.log('[DetailScreen] unmounted'); };
  }, [id]);

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>
  );
  if (error) return (
    <View style={styles.center}><Text style={styles.error}>Error: {error}</Text></View>
  );
  if (!item) return (
    <View style={styles.center}><Text style={styles.error}>Geen data gevonden.</Text></View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!!item.image && (
        <Image source={{ uri: item.image }} style={styles.poster} resizeMode="cover" />
      )}
      <Text style={styles.title}>{item.title} <Text style={styles.muted}>({item.original_title})</Text></Text>
      <Text style={styles.meta}>Release: {item.release_date} • Rating: {item.rt_score}</Text>
      <Text style={styles.meta}>Director: {item.director}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.l, backgroundColor: COLORS.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  poster: { width: '100%', height: 260, borderRadius: 12, marginBottom: SPACING.m },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  meta: { marginTop: 6, color: COLORS.muted },
  desc: { marginTop: SPACING.m, lineHeight: 20, color: COLORS.text },
  error: { color: COLORS.error },
});