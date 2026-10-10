export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ChallengeStatus = 'locked' | 'available' | 'in_progress' | 'solved';

export interface ColumnSchema {
  name: string;
  type: string;
  primaryKey?: boolean;
  foreignKey?: string;
  isNullable?: boolean;
}

export interface TableSchema {
  name: string;
  description?: string;
  columns: ColumnSchema[];
  seedData: Record<string, any>[];
  rows?: Record<string, any>[];
}

export interface TestCase {
  name: string;
  query: string;
  expectedOutput: Record<string, any>[];
}

export interface Challenge {
  id: number;
  track?: string;
  section?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  levelTitle?: string;
  title: string;
  difficulty: Difficulty;
  concepts: string[];
  description: string;
  schemaDescription?: string;
  tables: TableSchema[];
  initialQuery: string;
  solutionQuery?: string;
  testCases?: TestCase[];
  hints: string[];
  xp: number;
  orderDependent?: boolean;
}

export interface UserProgressRecord {
  solvedAt: string;
  attempts: number;
  executionTimeMs: number;
  hintsUsedCount: number;
}

export interface UserProgress {
  completedChallenges: Record<number, UserProgressRecord>;
  inProgressQueries: Record<number, string>;
  currentStreak: number;
  bestStreak: number;
  totalXp: number;
  lastActiveDate: string;
  lastSolvedId?: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  memberSince: string;
  isGuest: boolean;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
  line?: number;
  column?: number;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  expectedColumns?: string[];
  receivedColumns?: string[];
  expectedRowCount?: number;
  receivedRowCount?: number;
  rowCountDiff?: number;
  hint?: string;
  xpGained?: number;
  milestoneReached?: string;
  executionTimeMs?: number;
}

export interface ConceptMastery {
  name: string;
  completed: number;
  total: number;
  percentage: number;
  color: string;
}
