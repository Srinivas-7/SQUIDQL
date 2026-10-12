import type { UserProgress, UserProfile, ConceptMastery } from '../types';
import { CHALLENGES, ALL_CHALLENGES } from '../data/challenges';

const PROGRESS_KEY = 'sqlquest_user_progress_v1';
const PROFILE_KEY = 'sqlquest_user_profile_v1';

const defaultProfile: UserProfile = {
  id: 'cadet_' + Math.random().toString(36).substring(2, 9),
  username: 'SQL Cadet',
  email: 'cadet@squidql.dev',
  avatarUrl: '🐙',
  memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  isGuest: true
};

export const createEmptyProgress = (): UserProgress => ({
  completedChallenges: {},
  inProgressQueries: {},
  currentStreak: 0,
  bestStreak: 0,
  totalXp: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  lastSolvedId: undefined
});

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return defaultProfile;
    return JSON.parse(raw);
  } catch {
    return defaultProfile;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

/**
 * Loads user progress from localStorage.
 * Always persists and retrieves progress for both guests and authenticated cadets.
 */
export function loadUserProgress(_deprecatedIsGuest?: boolean): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return createEmptyProgress();
    const data: UserProgress = JSON.parse(raw);
    
    // Ensure completedChallenges is an initialized object
    if (!data.completedChallenges || typeof data.completedChallenges !== 'object') {
      data.completedChallenges = {};
    }
    if (!data.inProgressQueries || typeof data.inProgressQueries !== 'object') {
      data.inProgressQueries = {};
    }

    // Check and update streak based on date
    const today = new Date().toISOString().split('T')[0];
    const lastActive = data.lastActiveDate;
    
    if (lastActive && lastActive !== today) {
      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        // Continuous day streak
        data.currentStreak = (data.currentStreak || 0) + 1;
        if (data.currentStreak > (data.bestStreak || 0)) {
          data.bestStreak = data.currentStreak;
        }
      } else if (diffDays > 1) {
        // Streak reset
        data.currentStreak = 1;
      }
      data.lastActiveDate = today;
      saveUserProgress(data);
    }
    
    return data;
  } catch {
    return createEmptyProgress();
  }
}

/**
 * Saves user progress to localStorage.
 * Persists for all users so solved questions are never lost.
 */
export function saveUserProgress(progress: UserProgress, _deprecatedIsGuest?: boolean): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function clearStoredProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (err) {
    console.error('Failed to clear progress', err);
  }
}

/**
 * Merges local and remote progress objects without losing any solved challenge.
 */
export function mergeProgress(local: UserProgress, remote?: UserProgress | null): UserProgress {
  if (!remote) return local;

  const mergedCompleted = {
    ...(local.completedChallenges || {}),
    ...(remote.completedChallenges || {})
  };

  const mergedDrafts = {
    ...(local.inProgressQueries || {}),
    ...(remote.inProgressQueries || {})
  };

  return {
    completedChallenges: mergedCompleted,
    inProgressQueries: mergedDrafts,
    currentStreak: Math.max(local.currentStreak || 0, remote.currentStreak || 0),
    bestStreak: Math.max(local.bestStreak || 0, remote.bestStreak || 0),
    totalXp: Math.max(local.totalXp || 0, remote.totalXp || 0),
    lastActiveDate: remote.lastActiveDate || local.lastActiveDate || new Date().toISOString().split('T')[0],
    lastSolvedId: remote.lastSolvedId ?? local.lastSolvedId,
  };
}

/**
 * Records a challenge as solved.
 * Supports challenges from ALL tracks (Workout 50, LeetCode 50, HackerRank, etc.)
 * Saves progress immediately to localStorage and updates total XP and streaks.
 */
export function recordChallengeSolved(
  challengeId: number,
  executionTimeMs: number,
  hintsUsedCount: number,
  currentProgress?: UserProgress
): { progress: UserProgress; isFirstTime: boolean; totalSolved: number; milestone?: string } {
  // Use passed in-memory progress if provided; otherwise load latest from storage
  const baseProgress = currentProgress || loadUserProgress();
  
  // Clone progress to avoid accidental mutations
  const progress: UserProgress = {
    ...baseProgress,
    completedChallenges: { ...(baseProgress.completedChallenges || {}) },
    inProgressQueries: { ...(baseProgress.inProgressQueries || {}) }
  };

  // Find challenge across ALL available tracks
  const challenge = ALL_CHALLENGES.find((c) => c.id === challengeId);
  const isFirstTime = !progress.completedChallenges[challengeId];

  const existing = progress.completedChallenges[challengeId];
  progress.completedChallenges[challengeId] = {
    solvedAt: new Date().toISOString(),
    attempts: (existing?.attempts || 0) + 1,
    executionTimeMs,
    hintsUsedCount
  };

  if (isFirstTime) {
    const xpToAdd = challenge?.xp || 100;
    progress.totalXp = (progress.totalXp || 0) + xpToAdd;
  }

  progress.lastSolvedId = challengeId;
  progress.lastActiveDate = new Date().toISOString().split('T')[0];

  const totalSolved = Object.keys(progress.completedChallenges).length;
  let milestone: string | undefined = undefined;

  if (totalSolved > 0 && totalSolved % 5 === 0 && isFirstTime) {
    milestone = `${totalSolved} QUERIES DOWN. THE OCEAN GETS DEEPER.`;
  }

  // Persist to storage immediately
  saveUserProgress(progress);
  return { progress, isFirstTime, totalSolved, milestone };
}

export function saveQueryDraft(challengeId: number, queryText: string, _isGuest?: boolean): void {
  const progress = loadUserProgress();
  if (!progress.inProgressQueries) progress.inProgressQueries = {};
  progress.inProgressQueries[challengeId] = queryText;
  saveUserProgress(progress);
}

export function getQueryDraft(challengeId: number, _isGuest?: boolean): string | undefined {
  const progress = loadUserProgress();
  return progress.inProgressQueries?.[challengeId];
}

export function calculateConceptMastery(progress: UserProgress): ConceptMastery[] {
  const conceptsMap: Record<string, { total: number; completed: number; color: string }> = {
    'AGGREGATIONS': { total: 0, completed: 0, color: '#4C1D95' },
    'GROUP BY & HAVING': { total: 0, completed: 0, color: '#A78BFA' },
    'JOINS & RELATIONS': { total: 0, completed: 0, color: '#4C1D95' },
    'SUBQUERIES': { total: 0, completed: 0, color: '#C9C5B9' },
    'RANKING & ADVANCED': { total: 0, completed: 0, color: '#A78BFA' },
  };

  CHALLENGES.forEach((c) => {
    const isSolved = !!progress.completedChallenges[c.id];
    
    // Categorize
    if (c.concepts.some(tag => ['AVG()', 'MAX()', 'SUM()', 'COUNT()', 'Aggregations'].includes(tag))) {
      conceptsMap['AGGREGATIONS'].total++;
      if (isSolved) conceptsMap['AGGREGATIONS'].completed++;
    }
    if (c.concepts.some(tag => ['GROUP BY', 'HAVING'].includes(tag))) {
      conceptsMap['GROUP BY & HAVING'].total++;
      if (isSolved) conceptsMap['GROUP BY & HAVING'].completed++;
    }
    if (c.concepts.some(tag => ['INNER JOIN', 'LEFT JOIN', 'Self Join', 'JOIN'].includes(tag))) {
      conceptsMap['JOINS & RELATIONS'].total++;
      if (isSolved) conceptsMap['JOINS & RELATIONS'].completed++;
    }
    if (c.concepts.some(tag => ['Subquery', 'Scalar Subquery', 'Correlated Subquery', 'Nested Subqueries', 'EXISTS / IN Subquery'].includes(tag))) {
      conceptsMap['SUBQUERIES'].total++;
      if (isSolved) conceptsMap['SUBQUERIES'].completed++;
    }
    if (c.level === 5 || c.concepts.some(tag => ['DENSE_RANK()', 'Relational Division', 'Date Difference'].includes(tag))) {
      conceptsMap['RANKING & ADVANCED'].total++;
      if (isSolved) conceptsMap['RANKING & ADVANCED'].completed++;
    }
  });

  return Object.entries(conceptsMap).map(([name, data]) => ({
    name,
    completed: data.completed,
    total: data.total || 1,
    percentage: Math.round((data.completed / (data.total || 1)) * 100),
    color: data.color
  }));
}
