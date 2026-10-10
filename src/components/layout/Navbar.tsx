import React, { useState, useRef, useEffect } from 'react';
import type { UserProfile } from '../../types';
import { DoodleAvatar } from '../common/DoodleAvatar';
import { ThemeToggle } from '../common/ThemeToggle';
import { LogOut, User as UserIcon, Menu, X } from 'lucide-react';

export type NavPage = 'home' | 'questions' | 'resources' | 'profile' | 'login';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage, questionId?: number, trackId?: string) => void;
  profile: UserProfile;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  profile,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent, page: NavPage) => {
    e.preventDefault();
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-paper border-b-3 border-ink h-[68px] flex items-center select-none shadow-xs">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between relative">
        
        {/* Left: Platform Logo and Wordmark (Navigates to Home Page) */}
        <div className="flex items-center">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 group cursor-pointer"
            title="Go to Home"
          >
            <div className="w-10 h-10 bg-acid border-3 border-ink flex items-center justify-center shadow-hard-xs group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform p-1">
              <img
                src="/squidql-ink.png"
                alt="SquidQL Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-ink uppercase">
              SQUID<span className="text-pink">QL</span>
            </span>
          </a>
        </div>

        {/* Center / Middle: PROBLEMS & RESOURCES Links */}
        <nav className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          <a
            href="/questions"
            onClick={(e) => handleNavClick(e, 'questions')}
            className={`
              font-mono text-xs font-black uppercase tracking-tracker transition-all py-1.5 px-3.5 border-2
              ${
                currentPage === 'questions'
                  ? 'bg-acid text-ink border-ink shadow-hard-xs -translate-y-0.5'
                  : 'bg-white text-ink border-ink hover:bg-acid'
              }
            `}
          >
            PROBLEMS
          </a>
          <a
            href="/resources"
            onClick={(e) => handleNavClick(e, 'resources')}
            className={`
              font-mono text-xs font-black uppercase tracking-tracker transition-all py-1.5 px-3.5 border-2
              ${
                currentPage === 'resources'
                  ? 'bg-acid text-ink border-ink shadow-hard-xs -translate-y-0.5'
                  : 'bg-white text-ink border-ink hover:bg-acid'
              }
            `}
          >
            RESOURCES
          </a>
        </nav>

        {/* Right: Theme Toggle & Merged Auth / Doodle Profile Avatar */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {profile.isGuest ? (
            /* Not logged in: Show SIGN IN button which opens separate /login page */
            <a
              href="/login"
              onClick={(e) => handleNavClick(e, 'login')}
              className={`
                btn-press px-4 py-2 border-3 border-ink font-mono text-xs font-black uppercase tracking-wider shadow-hard-xs flex items-center gap-2
                ${currentPage === 'login' ? 'bg-acid text-ink' : 'bg-ink text-paper hover:bg-acid hover:text-ink'}
              `}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
              <span>SIGN IN</span>
            </a>
          ) : (
            /* Logged in: Show Doodle Profile Icon instead of text */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`
                  p-0.5 rounded-none transition-all flex items-center justify-center
                  ${currentPage === 'profile' ? 'ring-2 ring-ink ring-offset-2 ring-offset-paper' : ''}
                  hover:-translate-x-0.5 hover:-translate-y-0.5
                `}
                title={`Profile: ${profile.username}`}
              >
                <DoodleAvatar
                  name={profile.username}
                  avatarUrl={profile.avatarUrl}
                  size="sm"
                  className={currentPage === 'profile' ? 'border-ink bg-acid' : ''}
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-paper border-3 border-ink shadow-hard p-2 space-y-1 animate-in fade-in z-50">
                  <div className="px-3 py-1.5 border-b-2 border-ink/20">
                    <div className="font-mono text-xs font-black uppercase text-ink truncate">
                      {profile.username}
                    </div>
                    <div className="font-mono text-[10px] text-ink/70 truncate font-bold">
                      {profile.email}
                    </div>
                  </div>
                  <a
                    href="/profile"
                    onClick={(e) => handleNavClick(e, 'profile')}
                    className="w-full px-3 py-2 text-left font-mono text-xs font-black uppercase text-ink hover:bg-acid flex items-center gap-2"
                  >
                    <UserIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>MY PROFILE</span>
                  </a>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full px-3 py-2 text-left font-mono text-xs font-black uppercase text-pink hover:bg-pink/20 flex items-center gap-2 border-t-2 border-ink/10"
                  >
                    <LogOut className="w-3.5 h-3.5 stroke-[3]" />
                    <span>SIGN OUT</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          {profile.isGuest ? (
            <a
              href="/login"
              onClick={(e) => handleNavClick(e, 'login')}
              className="btn-press-sm bg-acid text-ink px-2.5 py-1 text-xs font-bold"
            >
              Sign in
            </a>
          ) : (
            <button
              onClick={(e) => handleNavClick(e, 'profile')}
              className="focus:outline-none"
            >
              <DoodleAvatar
                name={profile.username}
                avatarUrl={profile.avatarUrl}
                size="sm"
              />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 bg-paper border-2 border-ink flex items-center justify-center shadow-hard-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[68px] left-0 right-0 bg-paper border-b-3 border-ink p-5 space-y-4 shadow-hard-lg animate-in fade-in">
          <div className="flex flex-col gap-2">
            <a
              href="/questions"
              onClick={(e) => handleNavClick(e, 'questions')}
              className={`p-3 font-mono text-xs uppercase font-black border-2 border-ink ${currentPage === 'questions' ? 'bg-acid text-ink shadow-hard-xs' : 'bg-white'}`}
            >
              PROBLEMS
            </a>
            <a
              href="/resources"
              onClick={(e) => handleNavClick(e, 'resources')}
              className={`p-3 font-mono text-xs uppercase font-black border-2 border-ink ${currentPage === 'resources' ? 'bg-acid text-ink shadow-hard-xs' : 'bg-white'}`}
            >
              RESOURCES
            </a>
            {!profile.isGuest && (
              <a
                href="/profile"
                onClick={(e) => handleNavClick(e, 'profile')}
                className={`p-3 font-mono text-xs uppercase font-black border-2 border-ink ${currentPage === 'profile' ? 'bg-acid text-ink shadow-hard-xs' : 'bg-white'}`}
              >
                PROFILE
              </a>
            )}
          </div>

          {/* Theme switcher inside mobile drawer */}
          <div className="pt-2 border-t-2 border-ink/20 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-ink">THEME MODE</span>
            <ThemeToggle />
          </div>

          {!profile.isGuest ? (
            <div className="pt-2 border-t-2 border-ink/20 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-ink">{profile.username}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut();
                }}
                className="font-mono text-xs font-bold text-pink uppercase"
              >
                Sign out
              </button>
            </div>
          ) : (
            <a
              href="/login"
              onClick={(e) => handleNavClick(e, 'login')}
              className="w-full py-2.5 bg-ink text-paper font-mono text-xs font-black uppercase border-2 border-ink shadow-hard-xs text-center block"
            >
              SIGN IN WITH GOOGLE
            </a>
          )}
        </div>
      )}
    </header>
  );
};
