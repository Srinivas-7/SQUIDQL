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
        ${isDark ? 'bg-acid hover:bg-white !text-[#0a0a0a]' : 'bg-white text-ink hover:bg-acid'}
        transition-colors cursor-pointer select-none shadow-hard-xs
        ${className}
      `}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle Theme"
      style={isDark ? { backgroundColor: '#e8ff00', color: '#0a0a0a' } : undefined}
    >
      {isDark ? (
        <Sun 
          className="w-4 h-4 stroke-[2.5] !text-[#0a0a0a] !stroke-[#0a0a0a]" 
          style={{ color: '#0a0a0a', stroke: '#0a0a0a' }} 
        />
      ) : (
        <Moon className="w-4 h-4 stroke-[2.5] text-ink fill-ink/20" />
      )}
    </button>
  );
};
