import React, { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';
import { palette } from './src/theme/palette';

const SplashTransition = ({ onFinish }: { onFinish: () => void }) => {
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.85);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp)
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp)
        })
      ]),
      Animated.delay(700),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad)
      })
    ]).start(onFinish);
  }, [onFinish, opacity, scale]);

  return (
    <View style={styles.splashRoot}>
      <Animated.View style={[styles.logoContainer, { opacity, transform: [{ scale }] }]}>
        <Text style={styles.logoText}>AirSix</Text>
        <Text style={styles.logoTag}>Tactical Robotics Control</Text>
      </Animated.View>
    </View>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const bootstrap = useAuthStore((s) => s.bootstrapSession);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: palette.background,
            card: palette.surface,
            text: palette.text,
            border: palette.border,
            primary: palette.primary
          }
        }}
      >
        <StatusBar style="light" />
        {showSplash ? <SplashTransition onFinish={() => setShowSplash(false)} /> : <RootNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splashRoot: {
    flex: 1,
    backgroundColor: palette.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101B20'
  },
  logoText: {
    color: palette.primary,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 1
  },
  logoTag: {
    color: palette.muted,
    marginTop: 10,
    letterSpacing: 0.5
  }
});
