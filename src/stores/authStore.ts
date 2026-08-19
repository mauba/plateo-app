import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

type AuthState = {
  session: Session | null;
  loading: boolean;
  initialize: () => () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,
  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, loading: false });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
    });

    return () => subscription.unsubscribe();
  },
}));
