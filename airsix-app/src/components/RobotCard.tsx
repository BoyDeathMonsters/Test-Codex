import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Robot } from '../types/models';
import { palette } from '../theme/palette';

export const RobotCard = ({ robot, onPress }: { robot: Robot; onPress: () => void }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.preview}>{robot.model3DPreview}</Text>
      <Text style={styles.name}>{robot.name}</Text>
      <Text style={styles.meta}>Batterie: {robot.battery}%</Text>
      <Text style={[styles.meta, robot.isOnline ? styles.online : styles.offline]}>
        {robot.isOnline ? 'Allumé' : 'Éteint'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    padding: 14,
    marginBottom: 12
  },
  preview: { fontSize: 40, textAlign: 'center', marginBottom: 8 },
  name: { color: palette.text, fontWeight: '700', marginBottom: 6 },
  meta: { color: palette.muted, fontSize: 12 },
  online: { color: palette.primary },
  offline: { color: palette.danger }
});
