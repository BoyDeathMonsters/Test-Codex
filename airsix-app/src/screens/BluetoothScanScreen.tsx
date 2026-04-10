import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { bluetoothService } from '../services/bluetoothService';
import { BluetoothDevice } from '../types/models';
import { palette } from '../theme/palette';

export const BluetoothScanScreen = ({ navigation }: { navigation: any }) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bluetoothService.scan().then((result) => {
      setDevices(result);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Connexions Bluetooth</Text>
      {loading && <ActivityIndicator color={palette.primary} />}
      {devices.map((d) => (
        <Pressable
          key={d.id}
          style={styles.device}
          onPress={() => navigation.navigate('PairRobot', { deviceId: d.id, defaultName: d.name })}
        >
          <Text style={styles.name}>{d.name}</Text>
          <Text style={styles.meta}>Signal: {d.signal} dBm</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background, padding: 16 },
  title: { color: palette.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
  device: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 14,
    backgroundColor: palette.surface,
    marginBottom: 10
  },
  name: { color: palette.text, fontWeight: '700' },
  meta: { color: palette.muted, marginTop: 6 }
});
