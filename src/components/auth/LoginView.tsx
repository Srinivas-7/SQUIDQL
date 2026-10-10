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
    <div className="flex-1 bg-transparent flex items-center justify-center p-6 sm:p-12 select-none min-h-[calc(100vh-68px)]">
      <div className="w-full max-w-xl mx-auto">
        
        {/* Simple Neo-Brutalist Card */}
        <div className="bg-white border-3 border-ink p-8 sm:p-12 shadow-hard-lg space-y-8">
          
          {/* Welcome Tag & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-acid border-3 border-ink flex items-center justify-center shadow-hard-xs p-1.5">
                <img
                  src="/squidql-ink.png"
                  alt="SquidQL Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="inline-block bg-acid border-2 border-ink px-3 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-hard-xs">
                ✦ HEY THERE, WELCOME
              </div>
            </div>

            {/* Main Headline from User Image */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-ink uppercase tracking-tight leading-tight">
                THE DATABASE DOESN'T LIE.
              </h1>
              <div>
                <span className="inline-block bg-acid text-ink font-display font-black text-2xl sm:text-3xl uppercase tracking-tight px-3 py-1 border-3 border-ink shadow-hard-xs">
                  YOUR QUERY MIGHT.
                </span>
              </div>
            </div>

            {/* Subtext */}
            <p className="font-mono text-sm sm:text-base text-ink/80 font-bold tracking-tight pt-1">
              Write it. Run it. Prove it.
            </p>
          </div>

          {/* Error Notice */}
          {!isConfigured && (
            <div className="p-3 bg-acid/40 border-2 border-ink text-ink flex items-start gap-2 text-xs font-mono font-bold">
              <AlertCircle className="w-4 h-4 text-ink shrink-0 mt-0.5" />
              <span>Firebase credentials not detected in .env</span>
            </div>
          )}
          {errorMessage && (
            <div className="p-3 bg-pink/20 border-2 border-pink text-ink flex items-start gap-2 text-xs font-mono font-bold">
              <AlertCircle className="w-4 h-4 text-pink shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn-press w-full py-4 px-6 bg-white text-ink border-3 border-ink flex items-center justify-center gap-3 font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-hard hover:bg-acid hover:text-ink disabled:opacity-50 cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{loading ? 'CONNECTING...' : 'CONTINUE WITH GOOGLE'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
