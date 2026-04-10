import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RobotCard } from '../components/RobotCard';
import { useRobotStore } from '../store/robotStore';
import { palette } from '../theme/palette';

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const robots = useRobotStore((s) => s.robots);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>AirSix</Text>
      <Text style={styles.subtitle}>Robots connectés</Text>

      <FlatList
        data={robots}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={
          <Pressable style={styles.addCard} onPress={() => navigation.navigate('BluetoothScan')}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.addLabel}>Ajouter un robot</Text>
          </Pressable>
        }
        renderItem={({ item }) => (
          <RobotCard
            robot={item}
            onPress={() => {
              if (!item.isOnline) {
                Alert.alert('Robot hors tension !');
                return;
              }
              navigation.navigate('RobotControl', { robotId: item.id });
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background, padding: 16 },
  title: { color: palette.text, fontWeight: '800', fontSize: 26 },
  subtitle: { color: palette.muted, marginBottom: 14 },
  addCard: {
    height: 140,
    borderRadius: 16,
    borderColor: palette.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#0E181B'
  },
  plus: { color: palette.primary, fontSize: 48, lineHeight: 50 },
  addLabel: { color: palette.text, marginTop: 8 }
});
