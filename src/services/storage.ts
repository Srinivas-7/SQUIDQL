import type { UserProgress, UserProfile, ConceptMastery } from '../types';
import { CHALLENGES } from '../data/challenges';

const PROGRESS_KEY = 'sqlquest_user_progress_v1';
const PROFILE_KEY = 'sqlquest_user_profile_v1';

const defaultProfile: UserProfile = {
  id: 'diver_' + Math.random().toString(36).substring(2, 9),
  username: 'AbyssalDiver',
  email: 'cadet@sqlquest.ocean',
  avatarUrl: '🌊',
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

export function loadUserProgress(isGuest = false): UserProgress {
  if (isGuest) {
    return createEmptyProgress();
  }
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return createEmptyProgress();
    const data: UserProgress = JSON.parse(raw);
    
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
      saveUserProgress(data, false);
    }
    
    return data;
  } catch {
    return createEmptyProgress();
  }
}

export function saveUserProgress(progress: UserProgress, isGuest = false): void {
  // If not logged in (guest), do NOT save or keep progress in storage
  if (isGuest) {
    return;
  }
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress', err);
  }
}

export function clearStoredProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (err) {
    console.error('Failed to clear progress', err);
  }
}

export function recordChallengeSolved(
  challengeId: number,
  executionTimeMs: number,
  hintsUsedCount: number,
  isGuest = false
): { progress: UserProgress; isFirstTime: boolean; totalSolved: number; milestone?: string } {
  // If guest, do not persist progress
  if (isGuest) {
    return {
      progress: createEmptyProgress(),
      isFirstTime: false,
      totalSolved: 0,
      milestone: undefined
    };
  }

  const progress = loadUserProgress(false);
  const challenge = CHALLENGES.find((c) => c.id === challengeId);
  const isFirstTime = !progress.completedChallenges[challengeId];

  const existing = progress.completedChallenges[challengeId];
  progress.completedChallenges[challengeId] = {
    solvedAt: new Date().toISOString(),
    attempts: (existing?.attempts || 0) + 1,
    executionTimeMs,
    hintsUsedCount
  };

  if (isFirstTime && challenge) {
    progress.totalXp += challenge.xp;
  }

  progress.lastSolvedId = challengeId;
  progress.lastActiveDate = new Date().toISOString().split('T')[0];

  const totalSolved = Object.keys(progress.completedChallenges).length;
  let milestone: string | undefined = undefined;

  if (totalSolved > 0 && totalSolved % 5 === 0 && isFirstTime) {
    milestone = `${totalSolved} QUERIES DOWN. THE OCEAN GETS DEEPER.`;
  }

  saveUserProgress(progress, false);
  return { progress, isFirstTime, totalSolved, milestone };
}

export function saveQueryDraft(challengeId: number, queryText: string, isGuest = false): void {
  if (isGuest) return;
  const progress = loadUserProgress(false);
  progress.inProgressQueries[challengeId] = queryText;
  saveUserProgress(progress, false);
}

export function getQueryDraft(challengeId: number, isGuest = false): string | undefined {
  if (isGuest) return undefined;
  const progress = loadUserProgress(false);
  return progress.inProgressQueries[challengeId];
}

export function calculateConceptMastery(progress: UserProgress): ConceptMastery[] {
  const conceptsMap: Record<string, { total: number; completed: number; color: string }> = {
    'AGGREGATIONS': { total: 0, completed: 0, color: '#06B6D4' },
    'GROUP BY & HAVING': { total: 0, completed: 0, color: '#38BDF8' },
    'JOINS & RELATIONS': { total: 0, completed: 0, color: '#818CF8' },
    'SUBQUERIES': { total: 0, completed: 0, color: '#A855F7' },
    'RANKING & ADVANCED': { total: 0, completed: 0, color: '#EC4899' },
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
