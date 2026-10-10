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
        btn-press w-9 h-9 flex items-center justify-center border-3 border-ink
        ${isDark ? 'bg-acid text-ink hover:bg-white' : 'bg-white text-ink hover:bg-acid'}
        transition-colors cursor-pointer select-none shadow-hard-xs
        ${className}
      `}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 stroke-[2.5] text-ink fill-acid/40" />
      ) : (
        <Moon className="w-4 h-4 stroke-[2.5] text-ink fill-ink/20" />
      )}
    </button>
  );
};
