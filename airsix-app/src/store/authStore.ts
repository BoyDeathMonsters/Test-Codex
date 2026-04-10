import { create } from 'zustand';
import { authService } from '../services/authService';
import { User } from '../types/models';

type AuthState = {
  user: User | null;
  isBootstrapping: boolean;
  error: string | null;
  bootstrapSession: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isBootstrapping: true,
  error: null,

  bootstrapSession: async () => {
    const user = await authService.restoreSession();
    set({ user, isBootstrapping: false });
  },

  signIn: async (email, password) => {
    try {
      const user = await authService.signIn(email, password);
      set({ user, error: null });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Erreur de connexion.' });
      throw e;
    }
  },

  signUp: async (email, password) => {
    try {
      const user = await authService.signUp(email, password);
      set({ user, error: null });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Erreur d'inscription." });
      throw e;
    }
  },

  signOut: async () => {
    await authService.signOut();
    set({ user: null });
  }
}));
