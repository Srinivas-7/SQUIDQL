import React, { useState } from 'react';
import { signInWithGoogle, isFirebaseConfigured } from '../../services/firebase';
import type { NavPage } from '../layout/Navbar';
import { AlertCircle } from 'lucide-react';

interface LoginViewProps {
  onNavigate: (page: NavPage, questionId?: number, trackId?: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isConfigured = isFirebaseConfigured();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const { user, error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
      } else if (user) {
        setLoading(false);
        // Automatically redirect to Profile upon successful sign in
        onNavigate('profile');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during Google Sign In.');
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-transparent flex items-center justify-center p-6 sm:p-12 select-none min-h-[calc(100vh-68px)] text-[#1C1C1C] dark:text-[#F4F4F0] transition-colors duration-150">
      <div className="w-full max-w-xl mx-auto">
        
        {/* Simple Neo-Brutalist Card */}
        <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-8 sm:p-12 shadow-[6px_6px_0_0_#1C1C1C] dark:shadow-hard-lg space-y-8">
          
          {/* Welcome Tag & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4C1D95] border-2 border-[#1C1C1C] flex items-center justify-center shadow-[3px_3px_0_0_#1C1C1C] p-1.5">
                <img
                  src="/squidql-ink.png"
                  alt="SquidQL Logo"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="inline-block bg-[#F3E8FF] text-[#4C1D95] dark:bg-[#581C87] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#A78BFA] px-3 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs">
                ✦ HEY THERE, WELCOME
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight leading-tight">
                THE DATABASE DOESN'T LIE.
              </h1>
              <div>
                <span className="inline-block bg-[#4C1D95] dark:bg-[#581C87] text-white font-display font-black text-2xl sm:text-3xl uppercase tracking-tight px-3 py-1 border-3 border-[#1C1C1C] dark:border-[#A78BFA] shadow-[3px_3px_0_0_#1C1C1C]">
                  YOUR QUERY MIGHT.
                </span>
              </div>
            </div>

            {/* Subtext */}
            <p className="font-mono text-sm sm:text-base text-[#4A4A48] dark:text-[#C9C5B9] font-bold tracking-tight pt-1">
              Write it. Run it. Prove it.
            </p>
          </div>

          {/* Error Notice */}
          {!isConfigured && (
            <div className="p-3 bg-[#F3E8FF] dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#A78BFA]/60 text-[#4C1D95] dark:text-[#C9C5B9] flex items-start gap-2 text-xs font-mono font-bold">
              <AlertCircle className="w-4 h-4 text-[#4C1D95] dark:text-[#A78BFA] shrink-0 mt-0.5" />
              <span>Firebase credentials not detected in .env</span>
            </div>
          )}
          {errorMessage && (
            <div className="p-3 bg-[#FEF2F2] dark:bg-[#1C1C1C] border-2 border-[#EF4444] text-[#991B1B] dark:text-[#F4F4F0] flex items-start gap-2 text-xs font-mono font-bold">
              <AlertCircle className="w-4 h-4 text-[#EF4444] dark:text-[#A78BFA] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn-press w-full py-4 px-6 bg-[#4C1D95] dark:bg-[#581C87] text-white hover:bg-[#3B0764] dark:hover:bg-[#4C1D95] border-3 border-[#1C1C1C] dark:border-[#A78BFA] flex items-center justify-center gap-3 font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-[4px_4px_0_0_#1C1C1C] disabled:opacity-50 cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? 'CONNECTING...' : 'CONTINUE WITH GOOGLE'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
