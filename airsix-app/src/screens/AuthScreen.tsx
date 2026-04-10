import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { palette } from '../theme/palette';
import { useAuthStore } from '../store/authStore';

export const AuthScreen = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);
  const error = useAuthStore((s) => s.error);

  const submit = async () => {
    if (!email || !password || password.length < 10) return;
    setLoading(true);
    try {
      if (mode === 'signin') await signIn(email, password);
      else await signUp(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Connexion sécurisée</Text>
      <TextInput
        style={styles.input}
        placeholder="ID / Email"
        placeholderTextColor={palette.muted}
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={palette.muted}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Text style={styles.rule}>Mot de passe: 10+ caractères requis.</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Pressable style={styles.button} onPress={submit}>
        {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>{mode === 'signin' ? 'Se connecter' : "S'inscrire"}</Text>}
      </Pressable>
      <Pressable onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
        <Text style={styles.switchMode}>
          {mode === 'signin' ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background, padding: 20, justifyContent: 'center' },
  title: { color: palette.text, fontSize: 28, fontWeight: '800', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    color: palette.text,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: palette.surface
  },
  rule: { color: palette.muted, marginBottom: 8 },
  error: { color: palette.danger, marginBottom: 10 },
  button: {
    backgroundColor: palette.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: { color: '#08211B', fontWeight: '800' },
  switchMode: { color: palette.accent, marginTop: 12, textAlign: 'center' }
});
