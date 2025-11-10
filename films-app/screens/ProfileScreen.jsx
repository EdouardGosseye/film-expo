import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../styling';

const AVATAR_URI = '';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {AVATAR_URI ? (
        <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarFallback]} />
      )}
      <Text style={styles.name}>Jouw Naam</Text>
      <Text style={styles.bio}>Student / Developer. Bereikbaar via naam@example.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.bg, padding: SPACING.l },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: SPACING.m },
  avatarFallback: { backgroundColor: '#ddd' },
  name: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  bio: { marginTop: 6, color: COLORS.muted, textAlign: 'center' },
});