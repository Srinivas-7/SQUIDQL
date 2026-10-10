import type { Challenge } from '../types';
import { WORKOUT_50_CHALLENGES } from './workout50';
import { LEETCODE_50_CHALLENGES as RAW_LEETCODE_50_CHALLENGES } from './leetcode50';
import { HACKERRANK_SQL_CHALLENGES } from './hackerrankSql';
import { DATALEMUR_SQL_CHALLENGES } from './datalemurSql';
import { STRATASCRATCH_SQL_CHALLENGES } from './stratascratchSql';
import { SQLZOO_SQL_CHALLENGES } from './sqlzooSql';
import { W3SCHOOLS_SQL_CHALLENGES } from './w3schoolsSql';

// Main 50 Personalized Implementation Workout Challenges (IDs 1 - 50)
export const CHALLENGES: Challenge[] = WORKOUT_50_CHALLENGES;

// Ensure LeetCode 50 challenges have distinct unique IDs (1001 - 1050)
export const LEETCODE_50_CHALLENGES: Challenge[] = RAW_LEETCODE_50_CHALLENGES.map((c, idx) => ({
  ...c,
  id: c.id >= 1000 ? c.id : 1000 + (c.id || idx + 1)
}));

// Combined Other Resource Tracks (101 - 599)
export const OTHER_TRACK_CHALLENGES: Challenge[] = [
  ...HACKERRANK_SQL_CHALLENGES,
  ...DATALEMUR_SQL_CHALLENGES,
  ...STRATASCRATCH_SQL_CHALLENGES,
  ...SQLZOO_SQL_CHALLENGES,
  ...W3SCHOOLS_SQL_CHALLENGES
];

// All challenges combined (for global editor sandbox lookup)
export const ALL_CHALLENGES: Challenge[] = [
  ...WORKOUT_50_CHALLENGES,
  ...LEETCODE_50_CHALLENGES,
  ...OTHER_TRACK_CHALLENGES
];

export {
  WORKOUT_50_CHALLENGES,
  HACKERRANK_SQL_CHALLENGES,
  DATALEMUR_SQL_CHALLENGES,
  STRATASCRATCH_SQL_CHALLENGES,
  SQLZOO_SQL_CHALLENGES,
  W3SCHOOLS_SQL_CHALLENGES
};
