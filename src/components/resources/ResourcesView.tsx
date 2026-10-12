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
      <div className="flex-1 bg-transparent py-8 sm:py-12 select-none min-h-screen text-[#1C1C1C] dark:text-[#F4F4F0] transition-colors duration-150">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
          
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setSelectedResourceId(null);
                setResourceSearchQuery('');
              }}
              className="btn-press bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] px-4 py-2 border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9] font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs inline-flex items-center gap-2 hover:bg-[#F3E8FF] hover:text-[#4C1D95] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>BACK TO ALL RESOURCES</span>
            </button>

            <a
              href={selectedResource.destination}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold text-[#4C1D95] dark:text-[#A78BFA] hover:underline flex items-center gap-1.5 underline decoration-2 underline-offset-4 transition-colors"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Header Banner */}
          <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard-lg p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#F3E8FF] border-2 border-[#4C1D95] text-xs font-mono font-black uppercase text-[#4C1D95] dark:bg-[#1C1C1C] dark:text-[#C9C5B9] shadow-xs">
                  {selectedResource.category}
                </span>
                <span className="px-3 py-1 bg-[#4C1D95] dark:bg-[#581C87] text-white border-2 border-[#1C1C1C] dark:border-[#A78BFA] text-xs font-mono font-black uppercase shadow-xs">
                  {selectedResource.level}
                </span>
                {selectedResource.tagline && (
                  <span className="bg-[#F3E8FF] text-[#7E22CE] border-2 border-[#7E22CE] px-3 py-1 font-mono text-xs font-black uppercase shadow-xs">
                    {selectedResource.tagline}
                  </span>
                )}
              </div>

              {/* Solved Progress Metric */}
              <div className="flex items-center gap-3 bg-[#ECFDF5] border-2 border-[#059669] px-3.5 py-1.5 shadow-xs dark:bg-[#1C1C1C] dark:border-[#C9C5B9]/40">
                <Award className="w-4 h-4 text-[#059669] dark:text-[#A78BFA] stroke-[2.5]" />
                <span className="font-mono text-xs font-black text-[#065F46] dark:text-[#F4F4F0]">
                  <span>{solvedCount}</span> / {totalCount} SOLVED ({progressPct}%)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                {selectedResource.title}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-[#4A4A48] dark:text-[#C9C5B9] font-bold max-w-3xl leading-relaxed">
                {selectedResource.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#E5E7EB] dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 h-3 overflow-hidden">
              <div 
                className="bg-[#4C1D95] dark:bg-[#A78BFA] h-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Search Questions inside Track */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#6B7280] dark:text-[#C9C5B9] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={resourceSearchQuery}
              onChange={(e) => setResourceSearchQuery(e.target.value)}
              placeholder={`Search ${selectedResource.title} questions...`}
              className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#1C1C1C] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9]/60 font-mono text-xs text-[#1C1C1C] dark:text-[#F4F4F0] placeholder:text-[#9CA3AF] dark:placeholder:text-[#C9C5B9]/60 font-bold focus:outline-none focus:border-[#4C1D95] dark:focus:border-[#A78BFA] shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs"
            />
            {resourceSearchQuery && (
              <button
                onClick={() => setResourceSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#4C1D95]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>

          {/* Specified List of Problems */}
          <div className="space-y-6">
            {Object.keys(groupedSections).length === 0 ? (
              <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-8 text-center shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard space-y-2">
                <p className="font-display font-black text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">NO QUESTIONS FOUND</p>
                <p className="font-mono text-xs text-[#6B7280] dark:text-[#C9C5B9]">Try changing your search query</p>
              </div>
            ) : (
              Object.entries(groupedSections).map(([sectionName, sectionProblems]) => (
                <div 
                  key={sectionName} 
                  className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard overflow-hidden"
                >
                  {/* Section Header Bar */}
                  <div className="px-5 py-3 bg-[#F3E8FF] dark:bg-[#1C1C1C] border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 flex items-center justify-between">
                    <h3 className="font-display font-black text-sm sm:text-base text-[#4C1D95] dark:text-[#A78BFA] tracking-wide uppercase">
                      {sectionName}
                    </h3>
                    <span className="text-xs font-mono text-[#6B7280] dark:text-[#C9C5B9] font-bold">
                      {sectionProblems.length} {sectionProblems.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>

                  {/* Problem Rows */}
                  <div className="divide-y divide-[#1C1C1C]/10 dark:divide-[#C9C5B9]/15">
                    {sectionProblems.map((problem) => {
                      const isSolved = !!userProgress.completedChallenges[problem.id];
                      return (
                        <div
                          key={problem.id}
                          className="px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-[#F3E8FF]/60 dark:hover:bg-[#581C87]/20 transition-colors cursor-pointer group"
                          onClick={() => onNavigate && onNavigate('questions', problem.id, selectedResource.id)}
                        >
                          {/* Left: Checkmark / Circle Status & Title */}
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            {isSolved ? (
                              <CheckCircle2 className="w-5 h-5 text-[#059669] dark:text-[#A78BFA] shrink-0 stroke-[2.5]" />
                            ) : (
                              <Circle className="w-5 h-5 text-[#9CA3AF] shrink-0 group-hover:text-[#4C1D95] transition-colors" />
                            )}
                            <span className="font-mono font-bold text-xs sm:text-sm text-[#1C1C1C] dark:text-[#F4F4F0] group-hover:text-[#4C1D95] dark:group-hover:text-[#A78BFA] group-hover:translate-x-0.5 transition-transform truncate">
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
                              className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#4C1D95] dark:hover:text-[#A78BFA] transition-colors font-mono font-bold cursor-pointer"
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
                                    ? 'text-[#059669]'
                                    : problem.difficulty === 'Medium'
                                    ? 'text-[#4C1D95] dark:text-[#A78BFA]'
                                    : 'text-[#7C3AED] dark:text-[#F4F4F0]'
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[6px_6px_0_0_#1C1C1C] dark:shadow-hard-xl max-w-2xl w-full p-6 space-y-5 animate-in zoom-in-95 text-[#1C1C1C] dark:text-[#F4F4F0]">
                <div className="flex items-center justify-between border-b-2 border-[#1C1C1C]/15 dark:border-[#C9C5B9]/40 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#4C1D95] dark:text-[#A78BFA]" />
                    <h3 className="font-display font-black text-lg text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                      {solutionModalProblem.title} • Reference Solution
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSolutionModalProblem(null)}
                    className="w-8 h-8 bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#C9C5B9] hover:bg-[#F3E8FF] hover:text-[#4C1D95] border-2 border-[#1C1C1C] dark:border-[#C9C5B9] flex items-center justify-center font-bold transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9] font-bold">
                    {solutionModalProblem.description}
                  </p>
                  <div className="relative bg-[#FAFAF8] dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 p-4 text-left overflow-x-auto">
                    <pre className="font-mono text-sm text-[#4C1D95] dark:text-[#A78BFA] font-bold">
                      {solutionModalProblem.solutionQuery || '-- Solution query available inside IDE'}
                    </pre>
                    {solutionModalProblem.solutionQuery && (
                      <button
                        onClick={() => handleCopySolution(solutionModalProblem.solutionQuery || '')}
                        className="absolute top-3 right-3 px-2.5 py-1 bg-white dark:bg-[#1C1C1C] border border-[#1C1C1C] dark:border-[#C9C5B9] text-[#1C1C1C] dark:text-[#C9C5B9] hover:text-[#4C1D95] dark:hover:text-[#A78BFA] font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedQuery ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedQuery ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setSolutionModalProblem(null)}
                    className="px-4 py-2 bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/60 font-mono text-xs font-bold uppercase hover:bg-[#F0EFEA] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const pid = solutionModalProblem.id;
                      setSolutionModalProblem(null);
                      if (onNavigate) onNavigate('questions', pid, selectedResource.id);
                    }}
                    className="px-5 py-2 bg-[#4C1D95] dark:bg-[#581C87] text-white border-2 border-[#1C1C1C] dark:border-[#A78BFA] font-mono text-xs font-black uppercase shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs flex items-center gap-2 hover:bg-[#3B0764] transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
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
    <div className="flex-1 bg-transparent py-10 sm:py-14 select-none min-h-screen text-[#1C1C1C] dark:text-[#F4F4F0] transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-8">
        
        {/* Top Header Section */}
        <div className="border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 pb-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4C1D95] dark:bg-[#581C87] border-2 border-[#1C1C1C] dark:border-[#A78BFA] flex items-center justify-center font-black shadow-[3px_3px_0_0_#1C1C1C] text-white">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
              SQL RESOURCES
            </h1>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#4A4A48] dark:text-[#C9C5B9] max-w-2xl font-bold leading-relaxed">
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
                    bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard hover:shadow-[7px_7px_0_0_#4C1D95] hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:-translate-y-1.5
                    transition-all duration-200 cursor-pointer flex flex-col justify-between p-6
                    aspect-square group relative overflow-hidden
                    ${isFeatured ? 'ring-2 ring-[#4C1D95] dark:ring-[#A78BFA]' : ''}
                  `}
                >
                  {/* Top Header Tags */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 bg-[#F3E8FF] border border-[#4C1D95] text-[10px] font-mono font-black uppercase text-[#4C1D95] dark:bg-[#1C1C1C] dark:border-[#C9C5B9]/40 dark:text-[#C9C5B9] shadow-xs">
                        {resource.category}
                      </span>
                      <span className="px-2 py-0.5 bg-[#4C1D95] dark:bg-[#581C87] text-white border border-[#1C1C1C] dark:border-[#A78BFA] text-[10px] font-mono font-black uppercase">
                        {problems.length} Qs
                      </span>
                    </div>

                    {resource.tagline && (
                      <span className="inline-block bg-[#F3E8FF] text-[#7E22CE] border border-[#7E22CE] px-2 py-0.5 font-mono text-[9px] font-black uppercase shadow-xs">
                        {resource.tagline}
                      </span>
                    )}
                  </div>

                  {/* Center Content */}
                  <div className="space-y-2.5 my-auto">
                    <div className="w-10 h-10 bg-[#F3E8FF] dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 flex items-center justify-center shadow-[2px_2px_0_0_#1C1C1C] group-hover:bg-[#4C1D95] group-hover:border-[#1C1C1C] transition-colors">
                      {resource.id === 'leetcode-50' ? (
                        <Sparkles className="w-5 h-5 text-[#4C1D95] dark:text-[#A78BFA] group-hover:text-white transition-colors" />
                      ) : resource.id === 'hackerrank-sql' ? (
                        <Database className="w-5 h-5 text-[#4C1D95] dark:text-[#A78BFA] group-hover:text-white transition-colors" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-[#4C1D95] dark:text-[#A78BFA] group-hover:text-white transition-colors" />
                      )}
                    </div>
                    
                    <h2 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight group-hover:text-[#4C1D95] dark:group-hover:text-[#A78BFA] transition-colors leading-tight">
                      {resource.title}
                    </h2>
                    
                    <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9] font-bold line-clamp-3 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t-2 border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#6B7280] dark:text-[#C9C5B9] font-black uppercase">
                      {resource.level}
                    </span>
                    
                    <div className="btn-press-sm bg-[#4C1D95] dark:bg-[#581C87] text-white group-hover:bg-[#3B0764] px-3 py-1.5 border-2 border-[#1C1C1C] font-mono text-[11px] font-black uppercase inline-flex items-center gap-1.5 shadow-[2px_2px_0_0_#1C1C1C] transition-colors">
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
