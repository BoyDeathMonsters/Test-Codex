import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { User } from '../types/models';

const SESSION_KEY = 'airsix_session_token';
const USERS_KEY = 'airsix_users_demo';

type StoredUser = {
  id: string;
  email: string;
  displayName: string;
  passwordSalt: string;
  passwordHash: string;
};

const hashPassword = async (password: string, salt: string) => {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}:airsix-pepper-v1`);
};

const loadUsers = async (): Promise<StoredUser[]> => {
  const raw = await SecureStore.getItemAsync(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
};

const saveUsers = async (users: StoredUser[]) => {
  await SecureStore.setItemAsync(USERS_KEY, JSON.stringify(users));
};

const toUser = (u: StoredUser): User => ({ id: u.id, email: u.email, displayName: u.displayName });

export const authService = {
  async restoreSession(): Promise<User | null> {
    const token = await SecureStore.getItemAsync(SESSION_KEY);
    if (!token) return null;
    const users = await loadUsers();
    const sessionUser = users.find((u) => token === `token:${u.id}`);
    return sessionUser ? toUser(sessionUser) : null;
  },

  async signUp(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const users = await loadUsers();
    if (users.some((u) => u.email === normalizedEmail)) {
      throw new Error('Ce compte existe déjà.');
    }

    const salt = Crypto.randomUUID();
    const hash = await hashPassword(password, salt);
    const user: StoredUser = {
      id: Crypto.randomUUID(),
      email: normalizedEmail,
      displayName: normalizedEmail.split('@')[0],
      passwordSalt: salt,
      passwordHash: hash
    };

    users.push(user);
    await saveUsers(users);
    await SecureStore.setItemAsync(SESSION_KEY, `token:${user.id}`);
    return toUser(user);
  },

  async signIn(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const users = await loadUsers();
    const user = users.find((u) => u.email === normalizedEmail);
    if (!user) throw new Error('Identifiants invalides.');

    const hash = await hashPassword(password, user.passwordSalt);
    if (hash !== user.passwordHash) throw new Error('Identifiants invalides.');

    await SecureStore.setItemAsync(SESSION_KEY, `token:${user.id}`);
    return toUser(user);
  },

  async signOut() {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  }
};
