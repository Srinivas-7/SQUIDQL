import React from 'react';
import { ArrowRight, Terminal, Database, Zap } from 'lucide-react';
import type { NavPage } from '../layout/Navbar';

interface HomeViewProps {
  onNavigate: (page: NavPage) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex-1 flex flex-col justify-center items-center px-5 sm:px-8 py-20 sm:py-28 overflow-hidden select-none bg-transparent">
      
      {/* 4 Floating Neo-Brutalist Sticker Chips (Desktop only) */}
      
      {/* Chip 1: Top-Left Tilted Pink Square */}
      <div 
        onClick={() => onNavigate('questions')}
        className="hidden xl:flex absolute top-12 left-10 w-16 h-16 bg-pink border-3 border-ink items-center justify-center -rotate-6 shadow-hard transition-transform hover:rotate-0 hover:scale-110 cursor-pointer pointer-events-auto"
        title="Interactive SQL Terminal"
      >
        <Terminal className="w-8 h-8 text-paper stroke-[2.5]" />
      </div>

      {/* Chip 2: Top-Right Acid Circle */}
      <div 
        onClick={() => onNavigate('questions')}
        className="hidden xl:flex absolute top-14 right-12 w-16 h-16 bg-acid rounded-full border-3 border-ink items-center justify-center rotate-12 shadow-hard transition-transform hover:rotate-0 hover:scale-110 cursor-pointer pointer-events-auto font-display font-black text-2xl text-ink"
        title="50 Handcrafted Problems"
      >
        50
      </div>

      {/* Chip 3: Bottom-Left Sky Rectangle */}
      <div 
        onClick={() => onNavigate('questions')}
        className="hidden xl:flex absolute bottom-14 left-14 px-4 py-2.5 bg-sky border-3 border-ink items-center justify-center -rotate-3 shadow-hard transition-transform hover:rotate-0 hover:scale-110 cursor-pointer pointer-events-auto font-mono font-bold text-xs text-ink tracking-wider"
        title="WASM SQLite Sandbox"
      >
        <Database className="w-4 h-4 text-ink mr-2" />
        <span>WASM SQLITE</span>
      </div>

      {/* Chip 4: Bottom-Right Halftone Grain Square */}
      <div 
        onClick={() => onNavigate('profile')}
        className="hidden xl:flex absolute bottom-16 right-16 w-16 h-16 bg-grain border-3 border-ink items-center justify-center rotate-6 shadow-hard transition-transform hover:rotate-0 hover:scale-110 cursor-pointer pointer-events-auto"
        title="Track Your Progress"
      >
        <div className="w-7 h-7 bg-acid border-2 border-ink rotate-45 flex items-center justify-center">
          <Zap className="w-4 h-4 text-ink fill-ink" />
        </div>
      </div>

      {/* Centered Hero Content */}
      <div className="max-w-4xl w-full mx-auto text-center relative z-10 space-y-8">
        
        {/* Status Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white dark:bg-[#1c2541] border-2 border-ink shadow-hard-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-pink animate-pulse" />
          <span className="eyebrow-tracker text-[10px] sm:text-[11px] text-ink dark:text-neutral-100 font-bold">
            50 PRACTICE PROBLEMS • ZERO SETUP • PURE SQL
          </span>
        </div>

        {/* Display Headline with Rotated Acid Block */}
        <h1 className="font-display font-black text-ink dark:text-[#f0f4fc] uppercase tracking-tight leading-[0.88] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
          <span>LEARN SQL BY</span>
          <br />
          <span className="inline-block bg-acid border-3 border-ink px-4 sm:px-7 py-1 sm:py-2 -rotate-1 shadow-hard-lg mt-2 sm:mt-3 text-ink">
            SOLVING PROBLEMS.
          </span>
        </h1>

        {/* Short Description */}
        <p className="font-mono text-sm sm:text-base md:text-lg text-ink/85 dark:text-slate-200 max-w-xl mx-auto leading-relaxed font-bold">
          Practice SQL, run queries, and improve your problem-solving skills one question at a time.
        </p>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('questions')}
            className="btn-press bg-ink text-paper dark:bg-[#1c2541] dark:text-white dark:hover:bg-acid dark:hover:text-[#0b132b] h-14 sm:h-16 px-8 sm:px-10 border-3 border-ink font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-hard inline-flex items-center gap-3"
          >
            <span>EXPLORE PROBLEMS</span>
            <ArrowRight className="w-5 h-5 text-acid stroke-[3]" />
          </button>
        </div>

        {/* Subtitle / Micro Note */}
        <div className="pt-6 font-mono text-xs text-ink/70 dark:text-neutral-400 font-black uppercase tracking-tracker">
          50 SQL PRACTICE PROBLEMS • ONE EDITOR • YOUR PROGRESS
        </div>

      </div>
    </div>
  );
};
