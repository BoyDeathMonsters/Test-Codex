import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../theme/palette';

export const SettingsScreen = () => (
  <View style={styles.root}>
    <Text style={styles.title}>Paramètres</Text>
    <Text style={styles.text}>Sécurité: chiffrement local activé.</Text>
    <Text style={styles.text}>Bluetooth: scan manuel pour appairage.</Text>
    <Text style={styles.text}>Thème: sombre tactique.</Text>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background, padding: 16 },
  title: { color: palette.text, fontSize: 25, fontWeight: '800', marginBottom: 12 },
  text: { color: palette.muted, marginBottom: 8 }
});
