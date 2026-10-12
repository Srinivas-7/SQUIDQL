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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1C1C1C] backdrop-blur-md border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 h-[68px] flex items-center select-none shadow-xs transition-colors duration-150">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between relative">
        
        {/* Left: Platform Logo and Wordmark */}
        <div className="flex items-center">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 group cursor-pointer"
            title="Go to Home"
          >
            <div className="w-10 h-10 bg-[#4C1D95] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 flex items-center justify-center shadow-hard-xs group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform p-1">
              <img
                src="/squidql-ink.png"
                alt="SquidQL Logo"
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
              SQUID<span className="text-[#4C1D95] dark:text-[#A78BFA]">QL</span>
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
                  ? 'bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] border-[#1C1C1C] dark:border-[#A78BFA] shadow-hard-xs -translate-y-0.5'
                  : 'bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-[#1C1C1C] dark:border-[#C9C5B9]/40 hover:bg-[#F3E8FF] hover:text-[#4C1D95] hover:border-[#4C1D95] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA]'
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
                  ? 'bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] border-[#1C1C1C] dark:border-[#A78BFA] shadow-hard-xs -translate-y-0.5'
                  : 'bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-[#1C1C1C] dark:border-[#C9C5B9]/40 hover:bg-[#F3E8FF] hover:text-[#4C1D95] hover:border-[#4C1D95] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA]'
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
                btn-press px-4 py-2 border-2 font-mono text-xs font-black uppercase tracking-wider shadow-hard-xs flex items-center gap-2
                bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] border-[#1C1C1C] dark:border-[#A78BFA] hover:bg-[#3B0764]
              `}
            >
              <svg className="w-3.5 h-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
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
                  ${currentPage === 'profile' ? 'ring-2 ring-[#4C1D95] dark:ring-[#A78BFA] ring-offset-2 ring-offset-white dark:ring-offset-[#1C1C1C]' : ''}
                  hover:-translate-x-0.5 hover:-translate-y-0.5
                `}
                title={`Profile: ${profile.username}`}
              >
                <DoodleAvatar
                  name={profile.username}
                  avatarUrl={profile.avatarUrl}
                  size="sm"
                  className={currentPage === 'profile' ? 'border-[#4C1D95]' : ''}
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#1C1C1C] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-hard-lg p-2 space-y-1 animate-in fade-in z-50">
                  <div className="px-3 py-1.5 border-b-2 border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30">
                    <div className="font-mono text-xs font-black uppercase text-[#1C1C1C] dark:text-[#F4F4F0] truncate">
                      {profile.username}
                    </div>
                    <div className="font-mono text-[10px] text-[#4A4A48] dark:text-[#C9C5B9] truncate font-bold">
                      {profile.email}
                    </div>
                  </div>
                  <a
                    href="/profile"
                    onClick={(e) => handleNavClick(e, 'profile')}
                    className="w-full px-3 py-2 text-left font-mono text-xs font-black uppercase text-[#1C1C1C] dark:text-[#F4F4F0] hover:bg-[#F3E8FF] hover:text-[#4C1D95] dark:hover:bg-[#581C87] dark:hover:text-[#F4F4F0] flex items-center gap-2 transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>MY PROFILE</span>
                  </a>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full px-3 py-2 text-left font-mono text-xs font-black uppercase text-[#71716E] dark:text-[#C9C5B9] hover:bg-[#F6F6F2] dark:hover:bg-[#242424] hover:text-[#1C1C1C] dark:hover:text-[#A78BFA] flex items-center gap-2 border-t-2 border-[#1C1C1C]/10 dark:border-[#C9C5B9]/20 transition-colors"
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
              className="btn-press-sm bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] border-2 border-[#1C1C1C] dark:border-[#A78BFA] px-2.5 py-1 text-xs font-bold"
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
            className="w-9 h-9 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9] text-[#1C1C1C] dark:text-[#F4F4F0] flex items-center justify-center shadow-hard-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[68px] left-0 right-0 bg-white dark:bg-[#1C1C1C] border-b-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-5 space-y-4 shadow-hard-lg animate-in fade-in z-50">
          <div className="flex flex-col gap-2">
            <a
              href="/questions"
              onClick={(e) => handleNavClick(e, 'questions')}
              className={`p-3 font-mono text-xs uppercase font-black border-2 ${currentPage === 'questions' ? 'bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] border-[#1C1C1C] dark:border-[#A78BFA] shadow-hard-xs' : 'bg-[#F6F6F2] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-[#1C1C1C] dark:border-[#C9C5B9]/40'}`}
            >
              PROBLEMS
            </a>
            <a
              href="/resources"
              onClick={(e) => handleNavClick(e, 'resources')}
              className={`p-3 font-mono text-xs uppercase font-black border-2 ${currentPage === 'resources' ? 'bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] border-[#1C1C1C] dark:border-[#A78BFA] shadow-hard-xs' : 'bg-[#F6F6F2] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-[#1C1C1C] dark:border-[#C9C5B9]/40'}`}
            >
              RESOURCES
            </a>
            {!profile.isGuest && (
              <a
                href="/profile"
                onClick={(e) => handleNavClick(e, 'profile')}
                className={`p-3 font-mono text-xs uppercase font-black border-2 ${currentPage === 'profile' ? 'bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] border-[#1C1C1C] dark:border-[#A78BFA] shadow-hard-xs' : 'bg-[#F6F6F2] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-[#1C1C1C] dark:border-[#C9C5B9]/40'}`}
              >
                PROFILE
              </a>
            )}
          </div>

          {/* Theme switcher inside mobile drawer */}
          <div className="pt-2 border-t-2 border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#1C1C1C] dark:text-[#C9C5B9]">THEME</span>
            <ThemeToggle />
          </div>

          {!profile.isGuest ? (
            <div className="pt-2 border-t-2 border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#1C1C1C] dark:text-[#F4F4F0]">{profile.username}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut();
                }}
                className="font-mono text-xs font-bold text-[#71716E] hover:text-[#4C1D95] dark:hover:text-[#A78BFA] uppercase"
              >
                Sign out
              </button>
            </div>
          ) : (
            <a
              href="/login"
              onClick={(e) => handleNavClick(e, 'login')}
              className="w-full py-2.5 bg-[#4C1D95] dark:bg-[#581C87] text-[#FFFFFF] font-mono text-xs font-black uppercase border-2 border-[#1C1C1C] dark:border-[#A78BFA] shadow-hard-xs text-center block hover:bg-[#3B0764]"
            >
              SIGN IN WITH GOOGLE
            </a>
          )}
        </div>
      )}
    </header>
  );
};
