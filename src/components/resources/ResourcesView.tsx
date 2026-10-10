import React, { useState, useMemo } from 'react';
import { SQL_RESOURCES } from '../../data/resources';
import { LEETCODE_50_CHALLENGES, OTHER_TRACK_CHALLENGES } from '../../data/challenges';
import type { Challenge, UserProgress } from '../../types';
import { loadUserProgress } from '../../services/storage';
import { 
  Search, 
  ExternalLink, 
  X, 
  Compass, 
  CheckCircle2, 
  Circle, 
  FileText,
  Copy,
  Check,
  Play,
  ArrowLeft,
  ArrowRight,
  Database,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import type { NavPage } from '../layout/Navbar';

interface ResourcesViewProps {
  initialResourceId?: string | null;
  onNavigate?: (page: NavPage, questionId?: number, trackId?: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ 
  initialResourceId = null,
  onNavigate 
}) => {
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(initialResourceId);
  const [resourceSearchQuery, setResourceSearchQuery] = useState('');
  const [solutionModalProblem, setSolutionModalProblem] = useState<Challenge | null>(null);
  const [copiedQuery, setCopiedQuery] = useState(false);
  const [userProgress, _setUserProgress] = useState<UserProgress>(() => loadUserProgress());

  const filteredResources = SQL_RESOURCES;

  // Map each resource to its complete problems list
  const getProblemsForResource = (resourceId: string): Challenge[] => {
    if (resourceId === 'leetcode-50') {
      return LEETCODE_50_CHALLENGES;
    }
    return OTHER_TRACK_CHALLENGES.filter((c) => (c.track || '') === resourceId);
  };

  const handleCopySolution = (query: string) => {
    navigator.clipboard.writeText(query);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  const selectedResource = useMemo(() => {
    if (!selectedResourceId) return null;
    return SQL_RESOURCES.find((r) => r.id === selectedResourceId) || null;
  }, [selectedResourceId]);

  const selectedResourceProblems = useMemo(() => {
    if (!selectedResourceId) return [];
    return getProblemsForResource(selectedResourceId);
  }, [selectedResourceId]);

  // Filter problems within selected resource view
  const filteredResourceProblems = useMemo(() => {
    if (!resourceSearchQuery.trim()) return selectedResourceProblems;
    const q = resourceSearchQuery.toLowerCase();
    return selectedResourceProblems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.section && p.section.toLowerCase().includes(q)) ||
        p.difficulty.toLowerCase().includes(q)
    );
  }, [selectedResourceProblems, resourceSearchQuery]);

  // Group filtered problems by section
  const groupedSections = useMemo(() => {
    const groups: { [key: string]: Challenge[] } = {};
    filteredResourceProblems.forEach((prob) => {
      const sec = prob.section || 'General Practice';
      if (!groups[sec]) {
        groups[sec] = [];
      }
      groups[sec].push(prob);
    });
    return groups;
  }, [filteredResourceProblems]);

  // =========================================================================
  // VIEW 2: INDEPENDENT DEDICATED RESOURCE PAGE
  // =========================================================================
  if (selectedResource) {
    const totalCount = selectedResourceProblems.length;
    const solvedCount = selectedResourceProblems.filter(
      (p) => !!userProgress.completedChallenges[p.id]
    ).length;
    const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

    return (
      <div className="flex-1 bg-transparent py-8 sm:py-12 select-none min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
          
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setSelectedResourceId(null);
                setResourceSearchQuery('');
              }}
              className="btn-press bg-white text-ink px-4 py-2 border-3 border-ink font-mono text-xs font-black uppercase shadow-hard-xs inline-flex items-center gap-2 hover:bg-acid transition-colors"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>BACK TO ALL RESOURCES</span>
            </button>

            <a
              href={selectedResource.destination}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold text-ink/80 hover:text-ink flex items-center gap-1.5 underline decoration-2 underline-offset-4"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Header Banner */}
          <div className="bg-white dark:bg-[#12141c] border-3 border-ink shadow-hard-lg p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-paper dark:bg-[#181b26] border-2 border-ink text-xs font-mono font-black uppercase text-ink dark:text-neutral-100 shadow-hard-xs">
                  {selectedResource.category}
                </span>
                <span className="px-3 py-1 bg-ink text-paper border-2 border-ink text-xs font-mono font-black uppercase shadow-hard-xs">
                  {selectedResource.level}
                </span>
                {selectedResource.tagline && (
                  <span className="bg-acid text-ink border-2 border-ink px-3 py-1 font-mono text-xs font-black uppercase shadow-hard-xs">
                    {selectedResource.tagline}
                  </span>
                )}
              </div>

              {/* Solved Progress Metric */}
              <div className="flex items-center gap-3 bg-paper dark:bg-[#181b26] border-2 border-ink px-3.5 py-1.5 shadow-hard-xs">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                <span className="font-mono text-xs font-black text-ink dark:text-neutral-100">
                  {solvedCount} / {totalCount} SOLVED ({progressPct}%)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-ink dark:text-neutral-100 uppercase tracking-tight">
                {selectedResource.title}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-ink/80 dark:text-neutral-200 font-bold max-w-3xl leading-relaxed">
                {selectedResource.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-paper dark:bg-[#181b26] border-2 border-ink h-3 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Search Questions inside Track */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-ink/60 dark:text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={resourceSearchQuery}
              onChange={(e) => setResourceSearchQuery(e.target.value)}
              placeholder={`Search ${selectedResource.title} questions...`}
              className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#161924] border-3 border-ink font-mono text-xs text-ink dark:text-neutral-100 placeholder:text-ink/60 dark:placeholder:text-neutral-400 font-bold focus:outline-none shadow-hard-xs"
            />
            {resourceSearchQuery && (
              <button
                onClick={() => setResourceSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>

          {/* Specified List of Problems */}
          <div className="space-y-6">
            {Object.keys(groupedSections).length === 0 ? (
              <div className="bg-white dark:bg-[#12141c] border-3 border-ink p-8 text-center shadow-hard space-y-2">
                <p className="font-display font-black text-ink dark:text-white uppercase">NO QUESTIONS FOUND</p>
                <p className="font-mono text-xs text-ink/70 dark:text-neutral-300">Try changing your search query</p>
              </div>
            ) : (
              Object.entries(groupedSections).map(([sectionName, sectionProblems]) => (
                <div 
                  key={sectionName} 
                  className="bg-white dark:bg-[#12141c] border-3 border-ink shadow-hard overflow-hidden"
                >
                  {/* Section Header Bar */}
                  <div className="px-5 py-3 bg-paper dark:bg-[#0c0e14] border-b-3 border-ink flex items-center justify-between">
                    <h3 className="font-display font-black text-sm sm:text-base text-ink dark:text-neutral-200 tracking-wide uppercase">
                      {sectionName}
                    </h3>
                    <span className="text-xs font-mono text-ink/70 dark:text-neutral-400 font-bold">
                      {sectionProblems.length} {sectionProblems.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>

                  {/* Problem Rows */}
                  <div className="divide-y-2 divide-ink/10 dark:divide-neutral-800">
                    {sectionProblems.map((problem) => {
                      const isSolved = !!userProgress.completedChallenges[problem.id];
                      return (
                        <div
                          key={problem.id}
                          className="px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-acid/20 dark:hover:bg-[#1c202d] transition-colors cursor-pointer group"
                          onClick={() => onNavigate && onNavigate('questions', problem.id, selectedResource.id)}
                        >
                          {/* Left: Checkmark / Circle Status & Title */}
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            {isSolved ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
                            ) : (
                              <Circle className="w-5 h-5 text-ink/40 dark:text-neutral-500 shrink-0 group-hover:text-ink dark:group-hover:text-emerald-400 transition-colors" />
                            )}
                            <span className="font-mono font-bold text-xs sm:text-sm text-ink dark:text-neutral-100 group-hover:translate-x-0.5 transition-transform truncate">
                              {problem.title}
                            </span>
                          </div>

                          {/* Middle & Right: Solution Link and Difficulty */}
                          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSolutionModalProblem(problem);
                              }}
                              className="flex items-center gap-1.5 text-xs text-ink/60 hover:text-ink dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors font-mono font-bold cursor-pointer"
                              title="View Solution"
                            >
                              <FileText className="w-3.5 h-3.5 stroke-[2]" />
                              <span className="hidden sm:inline">Solution</span>
                            </button>

                            <span
                              className={`
                                font-mono text-xs sm:text-sm font-black text-right min-w-[50px] uppercase
                                ${
                                  problem.difficulty === 'Easy'
                                    ? 'text-emerald-700 dark:text-emerald-400'
                                    : problem.difficulty === 'Medium'
                                    ? 'text-amber-700 dark:text-amber-400'
                                    : 'text-rose-700 dark:text-rose-400'
                                }
                              `}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Solution Modal */}
          {solutionModalProblem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white border-3 border-ink shadow-hard-xl max-w-2xl w-full p-6 space-y-5 animate-in zoom-in-95">
                <div className="flex items-center justify-between border-b-3 border-ink pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-ink" />
                    <h3 className="font-display font-black text-lg text-ink uppercase">
                      {solutionModalProblem.title} • Reference Solution
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSolutionModalProblem(null)}
                    className="w-8 h-8 bg-paper hover:bg-pink border-2 border-ink flex items-center justify-center font-bold"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="font-mono text-xs text-ink/80 font-bold">
                    {solutionModalProblem.description}
                  </p>
                  <div className="relative bg-[#1a1d24] border-2 border-ink p-4 rounded text-left overflow-x-auto">
                    <pre className="font-mono text-sm text-emerald-400">
                      {solutionModalProblem.solutionQuery || '-- Solution query available inside IDE'}
                    </pre>
                    {solutionModalProblem.solutionQuery && (
                      <button
                        onClick={() => handleCopySolution(solutionModalProblem.solutionQuery || '')}
                        className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] font-bold rounded flex items-center gap-1.5 transition-colors"
                      >
                        {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedQuery ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setSolutionModalProblem(null)}
                    className="px-4 py-2 bg-paper border-2 border-ink font-mono text-xs font-bold uppercase hover:bg-neutral-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const pid = solutionModalProblem.id;
                      setSolutionModalProblem(null);
                      if (onNavigate) onNavigate('questions', pid, selectedResource.id);
                    }}
                    className="px-5 py-2 bg-acid text-ink border-2 border-ink font-mono text-xs font-black uppercase shadow-hard-xs flex items-center gap-2 hover:bg-acid/90"
                  >
                    <Play className="w-3.5 h-3.5 fill-ink" />
                    <span>Open in SQL Editor</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: SQUARE RESOURCES GRID
  // =========================================================================
  return (
    <div className="flex-1 bg-transparent py-10 sm:py-14 select-none min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-8">
        
        {/* Top Header Section */}
        <div className="border-b-3 border-ink pb-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-acid border-3 border-ink flex items-center justify-center font-black shadow-hard-xs">
              <Compass className="w-5 h-5 text-ink stroke-[2.5]" />
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-ink uppercase tracking-tight">
              SQL RESOURCES
            </h1>
          </div>
          <p className="font-mono text-xs sm:text-sm text-ink/80 max-w-2xl font-bold leading-relaxed">
            Choose any SQL track below to open its dedicated study plan and practice problems directly in the interactive SQL IDE.
          </p>
        </div>



        {/* Square Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
              const problems = getProblemsForResource(resource.id);
              const isFeatured = resource.id === 'leetcode-50';

              return (
                <div
                  key={resource.id}
                  onClick={() => setSelectedResourceId(resource.id)}
                  className={`
                    bg-white dark:bg-[#1c2541] border-3 border-ink shadow-hard hover:shadow-hard-lg hover:-translate-y-1.5
                    transition-all duration-200 cursor-pointer flex flex-col justify-between p-6
                    aspect-square group relative overflow-hidden
                    ${isFeatured ? 'ring-2 ring-acid' : ''}
                  `}
                >
                  {/* Top Header Tags */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 bg-paper dark:bg-[#263354] border-2 border-ink text-[10px] font-mono font-black uppercase text-ink dark:text-neutral-100 shadow-hard-xs">
                        {resource.category}
                      </span>
                      <span className="px-2 py-0.5 bg-ink text-paper border border-ink text-[10px] font-mono font-black uppercase">
                        {problems.length} Qs
                      </span>
                    </div>

                    {resource.tagline && (
                      <span className="inline-block bg-acid text-ink border-2 border-ink px-2 py-0.5 font-mono text-[9px] font-black uppercase shadow-hard-xs">
                        {resource.tagline}
                      </span>
                    )}
                  </div>

                  {/* Center Content */}
                  <div className="space-y-2.5 my-auto">
                    <div className="w-10 h-10 bg-paper dark:bg-[#263354] border-2 border-ink flex items-center justify-center shadow-hard-xs group-hover:bg-acid transition-colors">
                      {resource.id === 'leetcode-50' ? (
                        <Sparkles className="w-5 h-5 text-ink dark:text-acid" />
                      ) : resource.id === 'hackerrank-sql' ? (
                        <Database className="w-5 h-5 text-ink dark:text-acid" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-ink dark:text-acid" />
                      )}
                    </div>
                    
                    <h2 className="font-display font-black text-xl text-ink dark:text-[#f0f4fc] uppercase tracking-tight group-hover:text-pink transition-colors leading-tight">
                      {resource.title}
                    </h2>
                    
                    <p className="font-mono text-xs text-ink/80 dark:text-slate-300 font-bold line-clamp-3 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t-2 border-ink/15 dark:border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-ink/70 dark:text-slate-300 font-black uppercase">
                      {resource.level}
                    </span>
                    
                    <div className="btn-press-sm bg-ink text-paper dark:bg-[#0b132b] dark:text-acid group-hover:bg-acid group-hover:text-ink px-3 py-1.5 border-2 border-ink font-mono text-[11px] font-black uppercase inline-flex items-center gap-1.5 shadow-hard-xs transition-colors">
                      <span>OPEN LIST</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

      </div>
    </div>
  );
};
