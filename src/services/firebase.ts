import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  type User,
  type Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  type Firestore 
} from 'firebase/firestore';
import type { UserProfile, UserProgress } from '../types';

// Read from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'your-api-key' &&
    firebaseConfig.projectId !== 'your-project-id'
  );
};

// Initialize Firebase App singleton
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured()) {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

export { auth, db };

/**
 * Initiates real Google Popup Login through Firebase Auth.
 */
export async function signInWithGoogle(): Promise<{ user: UserProfile | null; error: Error | null }> {
  if (!auth || !googleProvider) {
    return {
      user: null,
      error: new Error(
        'Firebase is not configured yet. Please configure VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in your .env file.'
      ),
    };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const profile = mapFirebaseUserToProfile(result.user);
    return { user: profile, error: null };
  } catch (err: any) {
    return { user: null, error: err };
  }
}

/**
 * Signs out current user from Firebase Auth.
 */
export async function signOutUser(): Promise<{ error: Error | null }> {
  if (!auth) return { error: null };
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (err: any) {
    return { error: err };
  }
}

/**
 * Maps Firebase User to UserProfile.
 */
export function mapFirebaseUserToProfile(user: User): UserProfile {
  return {
    id: user.uid,
    username: user.displayName || user.email?.split('@')[0] || 'SQL Cadet',
    email: user.email || '',
    avatarUrl: user.photoURL || '',
    memberSince: user.metadata.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    isGuest: false,
  };
}

/**
 * Syncs user progress to Firestore `user_progress` collection.
 */
export async function syncProgressToFirebase(userId: string, progress: UserProgress): Promise<void> {
  if (!db || !userId) return;

  try {
    const userDocRef = doc(db, 'user_progress', userId);
    await setDoc(
      userDocRef,
      {
        completedChallenges: progress.completedChallenges,
        currentStreak: progress.currentStreak,
        bestStreak: progress.bestStreak,
        totalXp: progress.totalXp,
        lastActiveDate: progress.lastActiveDate,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not sync progress to Firestore cloud table:', err);
  }
}

/**
 * Loads user progress from Firestore if present.
 */
export async function loadProgressFromFirebase(userId: string): Promise<UserProgress | null> {
  if (!db || !userId) return null;

  try {
    const userDocRef = doc(db, 'user_progress', userId);
    const snap = await getDoc(userDocRef);

    if (!snap.exists()) return null;

    const data = snap.data();
    const completed: Record<number, any> = {};
    if (data.completedChallenges && typeof data.completedChallenges === 'object') {
      Object.entries(data.completedChallenges).forEach(([key, val]) => {
        const numKey = Number(key);
        if (!isNaN(numKey)) {
          completed[numKey] = val;
        }
      });
    }

    return {
      completedChallenges: completed,
      inProgressQueries: data.inProgressQueries || {},
      currentStreak: data.currentStreak || 1,
      bestStreak: data.bestStreak || 1,
      totalXp: data.totalXp || 0,
      lastActiveDate: data.lastActiveDate || new Date().toISOString().split('T')[0],
      lastSolvedId: data.lastSolvedId,
    };
  } catch {
    return null;
  }
}

/**
 * Subscribes to Firebase Auth state changes.
 */
export function subscribeToAuthState(
  callback: (user: UserProfile | null) => void
): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback(mapFirebaseUserToProfile(firebaseUser));
    } else {
      callback(null);
    }
  });
}
