import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRobotStore } from '../store/robotStore';
import { palette } from '../theme/palette';
import { VirtualJoystick } from '../components/VirtualJoystick';

export const RobotControlScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { robotId } = route.params;
  const robot = useRobotStore((s) => s.robots.find((r) => r.id === robotId));

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  if (!robot) return null;

  return (
    <View style={styles.root}>
      <View style={styles.camera}>
        <Text style={styles.cameraText}>Flux caméra robot</Text>
      </View>

      <View style={styles.topBar}>
        <Text style={styles.badge}>Pos: ({robot.lastKnownPosition.x}, {robot.lastKnownPosition.y})</Text>
        <Text style={styles.badge}>🔋 {robot.battery}%</Text>
      </View>

      <View style={styles.bottomControls}>
        <VirtualJoystick />
        <Pressable style={styles.disconnect} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.disconnectText}>Déconnexion</Text>
        </Pressable>
        <VirtualJoystick />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#05090B', justifyContent: 'space-between' },
  camera: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cameraText: { color: '#89AEB4' },
  topBar: {
    position: 'absolute',
    width: '100%',
    top: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18
  },
  badge: {
    backgroundColor: 'rgba(12, 25, 30, 0.6)',
    color: palette.text,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border
  },
  bottomControls: {
    position: 'absolute',
    width: '100%',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20
  },
  disconnect: {
    borderWidth: 1,
    borderColor: palette.danger,
    backgroundColor: 'rgba(113, 17, 17, 0.45)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10
  },
  disconnectText: { color: '#FFD6D6', fontWeight: '700' }
});
