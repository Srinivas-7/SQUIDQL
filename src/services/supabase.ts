import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';
import type { UserProfile, UserProgress } from '../types';

// Read from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://your-project.supabase.co' && 
    supabaseAnonKey !== 'your-anon-key'
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Initiates real Google OAuth login through Supabase.
 */
export async function signInWithGoogle(): Promise<{ error: Error | null; url?: string }> {
  if (!supabase) {
    return {
      error: new Error(
        'Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
      ),
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
    return { error: null, url: data.url };
  } catch (err: any) {
    return { error: err };
  }
}

/**
 * Signs out the current authenticated user.
 */
export async function signOutUser(): Promise<{ error: Error | null }> {
  if (!supabase) return { error: null };
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err: any) {
    return { error: err };
  }
}

/**
 * Maps Supabase User to UserProfile.
 */
export function mapSupabaseUserToProfile(user: User): UserProfile {
  const metadata = user.user_metadata || {};
  return {
    id: user.id,
    username: metadata.full_name || metadata.name || user.email?.split('@')[0] || 'SQL Developer',
    email: user.email || '',
    avatarUrl: metadata.avatar_url || metadata.picture || '',
    memberSince: new Date(user.created_at).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    isGuest: false,
  };
}

/**
 * Syncs user progress to Supabase `user_progress` table if configured.
 */
export async function syncProgressToSupabase(userId: string, progress: UserProgress): Promise<void> {
  if (!supabase || !userId) return;

  try {
    await supabase.from('user_progress').upsert(
      {
        user_id: userId,
        completed_challenges: progress.completedChallenges,
        current_streak: progress.currentStreak,
        best_streak: progress.bestStreak,
        total_xp: progress.totalXp,
        last_active_date: progress.lastActiveDate,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
  } catch (err) {
    console.warn('Could not sync progress to Supabase cloud table:', err);
  }
}

/**
 * Loads user progress from Supabase if present.
 */
export async function loadProgressFromSupabase(userId: string): Promise<UserProgress | null> {
  if (!supabase || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) return null;

    return {
      completedChallenges: data.completed_challenges || {},
      inProgressQueries: {},
      currentStreak: data.current_streak || 1,
      bestStreak: data.best_streak || 1,
      totalXp: data.total_xp || 0,
      lastActiveDate: data.last_active_date || new Date().toISOString().split('T')[0],
      lastSolvedId: undefined,
    };
  } catch {
    return null;
  }
}
