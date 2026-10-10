import React from 'react';
import type { UserProfile, UserProgress } from '../../types';
import { CHALLENGES } from '../../data/challenges';
import { Check, LogOut, ArrowRight, Zap } from 'lucide-react';
import { DoodleAvatar } from '../common/DoodleAvatar';
import type { NavPage } from '../layout/Navbar';

interface ProfileViewProps {
  profile: UserProfile;
  progress: UserProgress;
  onNavigate: (page: NavPage, questionId?: number) => void;
  onOpenGoogleAuth: () => void;
  onSignOut: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  progress,
  onNavigate,
  onOpenGoogleAuth,
  onSignOut,
}) => {
  const totalQuestions = CHALLENGES.length;
  const solvedChallenges = CHALLENGES.filter((c) => !!progress.completedChallenges[c.id]);
  const solvedCount = solvedChallenges.length;
  const completionPercent = Math.round((solvedCount / totalQuestions) * 100);

  return (
    <div className="flex-1 bg-transparent py-12 sm:py-16 select-none">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-8">
        
        {/* Page Heading */}
        <div className="border-b-3 border-ink pb-4 flex items-center justify-between">
          <h1 className="font-display font-black text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            PROFILE
          </h1>
          <span className="px-3 py-1 bg-acid border-2 border-ink font-mono text-xs font-black shadow-hard-xs uppercase">
            {solvedCount}/50 SOLVED
          </span>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-white border-3 border-ink p-6 sm:p-8 shadow-hard-lg space-y-6">
          {profile.isGuest ? (
            /* Signed-out state */
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 bg-acid border-3 border-ink rounded-full mx-auto flex items-center justify-center font-display font-black text-2xl text-ink shadow-hard-xs">
                ?
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display font-black text-xl text-ink uppercase tracking-tight">
                  GUEST CADET SESSION
                </h2>
                <p className="font-mono text-xs sm:text-sm text-ink/80 max-w-sm mx-auto font-bold">
                  Sign in with Google to save your solved queries permanently and keep your progress across devices.
                </p>
              </div>

              <button
                onClick={onOpenGoogleAuth}
                className="btn-press bg-ink text-paper px-8 py-3.5 border-3 border-ink font-mono text-xs font-black uppercase tracking-wider shadow-hard inline-flex items-center gap-2.5"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
              </button>
            </div>
          ) : (
            /* Signed-in user details */
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <DoodleAvatar
                  name={profile.username}
                  avatarUrl={profile.avatarUrl}
                  size="lg"
                  className="shadow-hard-xs"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-xl sm:text-2xl text-ink uppercase tracking-tight">
                      {profile.username}
                    </h2>
                    <span className="px-2 py-0.5 bg-acid text-ink border border-ink text-[10px] font-mono font-black uppercase">
                      GOOGLE AUTH
                    </span>
                  </div>
                  <div className="font-mono text-xs text-ink/70 font-bold">
                    {profile.email}
                  </div>
                </div>
              </div>

              <button
                onClick={onSignOut}
                className="btn-press-sm bg-white text-pink px-4 py-2 border-2 border-ink font-mono text-xs font-black uppercase hover:bg-pink/10 flex items-center gap-2 self-start sm:self-auto"
              >
                <LogOut className="w-3.5 h-3.5 stroke-[3]" />
                <span>SIGN OUT</span>
              </button>
            </div>
          )}

          {/* Progress Bar Section */}
          <div className="pt-4 border-t-2 border-ink/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-black uppercase">
              <span className="text-ink flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-ink fill-acid" />
                <span>PLATFORM PROGRESS</span>
              </span>
              <span className="text-ink">
                <strong>{solvedCount}</strong> / {totalQuestions} ({completionPercent}%)
              </span>
            </div>

            {/* Hard-Bordered Completion Bar */}
            <div className="w-full h-4 bg-paper border-2 border-ink shadow-hard-xs overflow-hidden">
              <div
                className="h-full bg-acid transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* List of solved questions */}
        <div className="space-y-4">
          <div className="font-mono text-xs font-black uppercase text-ink tracking-tracker">
            [ SOLVED QUESTIONS ({solvedChallenges.length}) ]
          </div>

          {solvedChallenges.length === 0 ? (
            <div className="bg-white border-3 border-ink p-6 text-center font-mono text-xs text-ink/70 font-bold shadow-hard-xs space-y-2">
              <p>
                {profile.isGuest
                  ? 'Guest sessions do not save progress across sessions.'
                  : 'No problems solved yet.'}
              </p>
              <div>
                {profile.isGuest ? (
                  <button
                    onClick={onOpenGoogleAuth}
                    className="text-pink font-black underline uppercase"
                  >
                    Sign in to track progress →
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('questions', 1)}
                    className="text-pink font-black underline uppercase"
                  >
                    Start with Question 1 →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border-3 border-ink shadow-hard divide-y-2 divide-ink/20">
              {solvedChallenges.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('questions', c.id)}
                  className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-acid/20 cursor-pointer font-mono text-xs font-black transition-colors group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-ink/60 shrink-0">#{c.id < 10 ? `0${c.id}` : c.id}</span>
                    <span className="text-ink uppercase tracking-tight truncate group-hover:translate-x-0.5 transition-transform">
                      {c.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-5 h-5 bg-acid border border-ink flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-ink stroke-[3]" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
