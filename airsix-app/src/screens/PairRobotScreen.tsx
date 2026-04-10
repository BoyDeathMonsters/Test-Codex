import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { bluetoothService } from '../services/bluetoothService';
import { useRobotStore } from '../store/robotStore';
import { palette } from '../theme/palette';

export const PairRobotScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { deviceId, defaultName } = route.params;
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const addRobot = useRobotStore((s) => s.addRobot);

  const submit = async () => {
    setSaving(true);
    const robot = await bluetoothService.pairDevice({ id: deviceId, name: defaultName, signal: -50 }, name, description);
    addRobot(robot);
    setSaving(false);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Appairage robot</Text>
      <Text style={styles.hint}>ID appareil: {deviceId}</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom du robot" placeholderTextColor={palette.muted} />
      <TextInput
        style={[styles.input, { minHeight: 90, textAlignVertical: 'top' }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor={palette.muted}
        multiline
      />
      <Pressable style={styles.button} onPress={submit}>
        {saving ? <ActivityIndicator /> : <Text style={styles.buttonText}>Connecter</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background, padding: 16 },
  title: { color: palette.text, fontSize: 25, fontWeight: '800', marginBottom: 10 },
  hint: { color: palette.muted, marginBottom: 14 },
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 12,
    padding: 12,
    color: palette.text,
    backgroundColor: palette.surface,
    marginBottom: 12
  },
  button: { backgroundColor: palette.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
  buttonText: { color: '#0A201A', fontWeight: '800' }
});
