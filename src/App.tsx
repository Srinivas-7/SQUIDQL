import { useState, useEffect } from 'react';
import { Navbar, type NavPage } from './components/layout/Navbar';
import { HomeView } from './components/home/HomeView';
import { SqlQuestionsView } from './components/ide/SqlQuestionsView';
import { ResourcesView } from './components/resources/ResourcesView';
import { ProfileView } from './components/profile/ProfileView';
import { LoginView } from './components/auth/LoginView';
import { 
  loadUserProfile, 
  saveUserProfile, 
  loadUserProgress, 
  saveUserProgress,
  createEmptyProgress,
  clearStoredProgress
} from './services/storage';
import { 
  subscribeToAuthState, 
  loadProgressFromFirebase, 
  signOutUser 
} from './services/firebase';
import { getSqlEngine } from './services/sqlEngine';
import type { UserProfile, UserProgress } from './types';


export function App() {
  // Determine initial page from URL pathname
  const getInitialPage = (): NavPage => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/questions' || path.startsWith('/questions')) return 'questions';
    if (path === '/resources' || path.startsWith('/resources')) return 'resources';
    if (path === '/profile' || path.startsWith('/profile')) return 'profile';
    if (path === '/login' || path.startsWith('/login')) return 'login';
    return 'home';
  };

  const initialProfile = loadUserProfile();
  const [currentPage, setCurrentPage] = useState<NavPage>(getInitialPage);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => 
    initialProfile.isGuest ? createEmptyProgress() : loadUserProgress(false)
  );

  // Preload SQLite WebAssembly engine in background on launch
  useEffect(() => {
    getSqlEngine().catch((err) => {
      console.warn('SQLite engine background preloading:', err);
    });
  }, []);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (profile) => {
      if (profile && !profile.isGuest) {
        setUserProfile(profile);
        saveUserProfile(profile);

        // Load progress from Firestore if available
        const cloudProgress = await loadProgressFromFirebase(profile.id);
        if (cloudProgress) {
          setUserProgress(cloudProgress);
          saveUserProgress(cloudProgress, false);
        } else {
          const localProgress = loadUserProgress(false);
          setUserProgress(localProgress);
        }
      } else {
        const guest = loadUserProfile();
        setUserProfile(guest);
        // Guests do not keep progress
        setUserProgress(createEmptyProgress());
        clearStoredProgress();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (page: NavPage, questionId?: number, trackId?: string) => {
    if (page === 'resources' && !trackId) {
      // Direct click on "RESOURCES" opens the SQL Resources overview grid
      setActiveTrackId(null);
    } else if (trackId) {
      setActiveTrackId(trackId);
    }

    if (typeof questionId === 'number') {
      setActiveQuestionId(questionId);
    } else if (page === 'questions' && !questionId) {
      // If clicking "Problems" directly, open the problems list
      setActiveQuestionId(null);
    }

    setCurrentPage(page);

    // Update browser URL without reload (keeps strictly to the 3 permitted routes)
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    await signOutUser();
    const guest: UserProfile = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      username: 'Guest',
      email: 'guest@squidql.dev',
      avatarUrl: '',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      isGuest: true,
    };
    setUserProfile(guest);
    saveUserProfile(guest);
    setUserProgress(createEmptyProgress());
    clearStoredProgress();
  };

  const handleOpenAuth = () => {
    handleNavigate('login');
  };

  return (
    <div className="min-h-screen text-ink font-mono selection:bg-acid selection:text-ink antialiased flex flex-col relative overflow-x-hidden bg-paper dark:bg-[#0b132b]">
      {/* Shared Minimal Navigation */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          profile={userProfile}
          onSignOut={handleSignOut}
        />

      {/* Main Pages */}
      <main className="flex-1 w-full flex flex-col">
        {/* Page 1: Home (/) */}
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
          />
        )}

        {/* Page 2: SQL Questions (/questions) */}
        {currentPage === 'questions' && (
          <SqlQuestionsView
            initialQuestionId={activeQuestionId}
            initialTrackId={activeTrackId}
            progress={userProgress}
            profile={userProfile}
            onNavigate={handleNavigate}
            onProgressUpdated={(updated) => {
              setUserProgress(updated);
              saveUserProgress(updated);
            }}
            onOpenGoogleAuth={() => handleOpenAuth()}
          />
        )}

        {/* Page 3: SQL Resources (/resources) */}
        {currentPage === 'resources' && (
          <ResourcesView 
            initialResourceId={activeTrackId} 
            onNavigate={handleNavigate} 
          />
        )}

        {/* Page 4: Profile (/profile) */}
        {currentPage === 'profile' && (
          <ProfileView
            profile={userProfile}
            progress={userProgress}
            onNavigate={handleNavigate}
            onOpenGoogleAuth={() => handleOpenAuth()}
            onSignOut={handleSignOut}
          />
        )}

        {/* Page 5: Dedicated Login Page (/login) */}
        {currentPage === 'login' && (
          <LoginView onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}

export default App;
