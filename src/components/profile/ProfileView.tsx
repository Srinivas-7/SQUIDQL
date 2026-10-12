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
    <div className="flex-1 bg-transparent py-12 sm:py-16 select-none text-[#1C1C1C] dark:text-[#F4F4F0] transition-colors duration-150">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-8">
        
        {/* Page Heading */}
        <div className="border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 pb-4 flex items-center justify-between">
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
            PROFILE
          </h1>
          <span className="px-3 py-1 bg-[#F3E8FF] border-2 border-[#4C1D95] text-[#4C1D95] dark:bg-[#581C87] dark:border-[#A78BFA] dark:text-white font-mono text-xs font-black shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs uppercase">
            {solvedCount}/50 SOLVED
          </span>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 sm:p-8 shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard-lg space-y-6">
          {profile.isGuest ? (
            /* Signed-out state */
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 bg-[#F3E8FF] border-2 border-[#1C1C1C] rounded-full mx-auto flex items-center justify-center font-display font-black text-2xl text-[#4C1D95] shadow-[3px_3px_0_0_#1C1C1C]">
                ?
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                  GUEST CADET SESSION
                </h2>
                <p className="font-mono text-xs sm:text-sm text-[#4A4A48] dark:text-[#C9C5B9] max-w-sm mx-auto font-bold">
                  Sign in with Google to save your solved queries permanently and keep your progress across devices.
                </p>
              </div>

              <button
                onClick={onOpenGoogleAuth}
                className="btn-press bg-[#4C1D95] dark:bg-[#581C87] text-white hover:bg-[#3B0764] px-8 py-3.5 border-3 border-[#1C1C1C] dark:border-[#A78BFA] font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0_0_#1C1C1C] inline-flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
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
                  className="shadow-[3px_3px_0_0_#1C1C1C]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-xl sm:text-2xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                      {profile.username}
                    </h2>
                    <span className="px-2 py-0.5 bg-[#F3E8FF] text-[#4C1D95] border border-[#4C1D95] dark:bg-[#581C87] dark:text-white text-[10px] font-mono font-black uppercase">
                      CADET
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[#6B7280] dark:text-[#C9C5B9] font-bold">
                    {profile.email}
                  </div>
                </div>
              </div>

              <button
                onClick={onSignOut}
                className="btn-press-sm bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#C9C5B9] hover:bg-[#FEF2F2] hover:text-[#DC2626] hover:border-[#DC2626] px-4 py-2 border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/60 font-mono text-xs font-black uppercase flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 stroke-[3]" />
                <span>SIGN OUT</span>
              </button>
            </div>
          )}

          {/* Progress Bar Section */}
          <div className="pt-4 border-t-2 border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-black uppercase">
              <span className="text-[#1C1C1C] dark:text-[#F4F4F0] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#4C1D95] dark:text-[#A78BFA] fill-current" />
                <span>PLATFORM PROGRESS</span>
              </span>
              <span className="text-[#1C1C1C] dark:text-[#F4F4F0]">
                <strong className="text-[#059669] dark:text-[#A78BFA]">{solvedCount}</strong> / {totalQuestions} ({completionPercent}%)
              </span>
            </div>

            {/* Hard-Bordered Completion Bar */}
            <div className="w-full h-4 bg-[#E5E7EB] dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-xs overflow-hidden">
              <div
                className="h-full bg-[#4C1D95] dark:bg-[#A78BFA] transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* List of solved questions */}
        <div className="space-y-4">
          <div className="font-mono text-xs font-black uppercase text-[#4A4A48] dark:text-[#C9C5B9] tracking-tracker">
            [ SOLVED QUESTIONS ({solvedChallenges.length}) ]
          </div>

          {solvedChallenges.length === 0 ? (
            <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 text-center font-mono text-xs text-[#6B7280] dark:text-[#C9C5B9] font-bold shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard-xs space-y-2">
              <p>
                {profile.isGuest
                  ? 'Guest sessions do not save progress across sessions.'
                  : 'No problems solved yet.'}
              </p>
              <div>
                {profile.isGuest ? (
                  <button
                    onClick={onOpenGoogleAuth}
                    className="text-[#4C1D95] dark:text-[#A78BFA] font-black underline uppercase hover:text-[#1C1C1C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                  >
                    Sign in to track progress →
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('questions', 1)}
                    className="text-[#4C1D95] dark:text-[#A78BFA] font-black underline uppercase hover:text-[#1C1C1C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                  >
                    Start with Question 1 →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard divide-y divide-[#1C1C1C]/10 dark:divide-[#C9C5B9]/20">
              {solvedChallenges.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('questions', c.id)}
                  className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-[#F3E8FF]/60 dark:hover:bg-[#581C87]/20 cursor-pointer font-mono text-xs font-black transition-colors group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-[#6B7280] dark:text-[#C9C5B9] shrink-0">#{c.id < 10 ? `0${c.id}` : c.id}</span>
                    <span className="text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight truncate group-hover:text-[#4C1D95] dark:group-hover:text-[#A78BFA] group-hover:translate-x-0.5 transition-transform">
                      {c.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-5 h-5 bg-[#059669] border border-[#1C1C1C] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#4C1D95] dark:group-hover:text-[#A78BFA] transition-colors" />
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
