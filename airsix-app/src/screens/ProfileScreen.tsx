import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { palette } from '../theme/palette';

export const ProfileScreen = () => {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.line}>Utilisateur: {user?.displayName}</Text>
      <Text style={styles.line}>Email: {user?.email}</Text>
      <Pressable style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background, padding: 16 },
  title: { color: palette.text, fontSize: 25, fontWeight: '800', marginBottom: 12 },
  line: { color: palette.muted, marginBottom: 8 },
  button: {
    backgroundColor: palette.surfaceAlt,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 12,
    borderRadius: 10,
    marginTop: 16
  },
  buttonText: { color: palette.text, fontWeight: '700' }
});
