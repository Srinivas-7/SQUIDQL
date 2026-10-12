import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`
        btn-press w-9 h-9 flex items-center justify-center border-2 sm:border-3
        bg-[#F3E8FF] text-[#4C1D95] border-[#1C1C1C] hover:bg-[#4C1D95] hover:text-white hover:border-[#1C1C1C]
        dark:bg-[#1C1C1C] dark:text-[#A78BFA] dark:border-[#C9C5B9]/40 dark:hover:bg-[#581C87] dark:hover:text-[#F4F4F0] dark:hover:border-[#A78BFA]
        transition-colors cursor-pointer select-none
        ${className}
      `}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 stroke-[2.5] text-[#A78BFA]" />
      ) : (
        <Moon className="w-4 h-4 stroke-[2.5] text-[#4C1D95] fill-[#4C1D95]/20" />
      )}
    </button>
  );
};
