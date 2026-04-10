import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuthStore } from '../store/authStore';
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { RobotControlScreen } from '../screens/RobotControlScreen';
import { BluetoothScanScreen } from '../screens/BluetoothScanScreen';
import { PairRobotScreen } from '../screens/PairRobotScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  RobotControl: { robotId: string };
  BluetoothScan: undefined;
  PairRobot: { deviceId: string; defaultName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const MainDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="AirSix" component={HomeScreen} />
    <Drawer.Screen name="Profil" component={ProfileScreen} />
    <Drawer.Screen name="Paramètres" component={SettingsScreen} />
  </Drawer.Navigator>
);

export const RootNavigator = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainDrawer} />
          <Stack.Screen name="BluetoothScan" component={BluetoothScanScreen} />
          <Stack.Screen name="PairRobot" component={PairRobotScreen} />
          <Stack.Screen name="RobotControl" component={RobotControlScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
