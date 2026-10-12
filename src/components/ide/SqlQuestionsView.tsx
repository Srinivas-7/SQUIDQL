import React, { useState, useEffect, useRef } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import type { QueryResult, SubmissionResult, UserProgress, UserProfile, Difficulty, Challenge } from '../../types';
import { CHALLENGES, ALL_CHALLENGES } from '../../data/challenges';
import { executeQuery, submitChallengeQuery } from '../../services/sqlEngine';
import { recordChallengeSolved, saveQueryDraft, getQueryDraft } from '../../services/storage';
import { syncProgressToFirebase } from '../../services/firebase';
import { useTheme } from '../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  Zap,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Terminal,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';

interface SqlQuestionsViewProps {
  initialQuestionId?: number | null;
  initialTrackId?: string | null;
  progress: UserProgress;
  profile: UserProfile;
  onNavigate?: (page: any, questionId?: number, trackId?: string) => void;
  onProgressUpdated: (updated: UserProgress) => void;
  onOpenGoogleAuth?: () => void;
}

export const SqlQuestionsView: React.FC<SqlQuestionsViewProps> = ({
  initialQuestionId = null,
  initialTrackId: _initialTrackId = null,
  progress,
  profile,
  onNavigate,
  onProgressUpdated,
}) => {
  const { theme } = useTheme();

  // Active selected question ID: if null, shows the problem list!
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(initialQuestionId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | Difficulty>('All');

  useEffect(() => {
    if (initialQuestionId) {
      setActiveQuestionId(initialQuestionId);
    }
  }, [initialQuestionId]);

  // Active question object from all challenges
  const activeQuestion = activeQuestionId
    ? ALL_CHALLENGES.find((c) => c.id === activeQuestionId) || CHALLENGES[0]
    : null;

  // Editor code state
  const [code, setCode] = useState<string>('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintsUnlocked, setHintsUnlocked] = useState(0);
  const [mobileWorkspaceTab, setMobileWorkspaceTab] = useState<'problem' | 'editor'>('editor');

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Dynamically update Monaco theme when global light/dark theme switches
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme === 'dark' ? 'squidql-dark-theme' : 'squidql-light-theme');
    }
  }, [theme]);

  // Sync draft when active question changes
  useEffect(() => {
    if (activeQuestion) {
      const draft = getQueryDraft(activeQuestion.id, profile.isGuest);
      setCode(draft || activeQuestion.initialQuery);
      setQueryResult(null);
      setSubmissionResult(null);
      setShowHints(false);
      setHintsUnlocked(0);
    }
  }, [activeQuestionId, profile.isGuest]);

  const handleSelectQuestion = (id: number) => {
    setActiveQuestionId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    if (activeQuestion?.track && activeQuestion.track !== 'workout-50' && onNavigate) {
      onNavigate('resources', undefined, activeQuestion.track);
    } else {
      setActiveQuestionId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditorChange = (value: string | undefined) => {
    const val = value || '';
    setCode(val);
    if (activeQuestion) {
      saveQueryDraft(activeQuestion.id, val, profile.isGuest);
    }
  };

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define Dark Monaco Theme (#1C1C1C base, #A78BFA / #A855F7 syntax)
    monaco.editor.defineTheme('squidql-dark-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'A78BFA', fontStyle: 'bold' },
        { token: 'string', foreground: 'F4F4F0' },
        { token: 'number', foreground: 'A78BFA', fontStyle: 'bold' },
        { token: 'comment', foreground: 'C9C5B9', fontStyle: 'italic' },
        { token: 'operator', foreground: 'A855F7', fontStyle: 'bold' },
        { token: 'identifier', foreground: 'F4F4F0' },
      ],
      colors: {
        'editor.background': '#1C1C1C',
        'editor.foreground': '#F4F4F0',
        'editorCursor.foreground': '#A78BFA',
        'editor.lineHighlightBackground': '#242424',
        'editorLineNumber.foreground': '#C9C5B980',
        'editorLineNumber.activeForeground': '#A78BFA',
        'editor.selectionBackground': '#4C1D9540',
        'editorGutter.background': '#1C1C1C',
      },
    });

    // Define Vibrant, Professional Light Monaco Theme (#FFFFFF base, #4C1D95 syntax)
    monaco.editor.defineTheme('squidql-light-theme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '4C1D95', fontStyle: 'bold' },
        { token: 'string', foreground: '059669' },
        { token: 'number', foreground: '7C3AED', fontStyle: 'bold' },
        { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
        { token: 'operator', foreground: '4C1D95', fontStyle: 'bold' },
        { token: 'identifier', foreground: '1C1C1C' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#1C1C1C',
        'editorCursor.foreground': '#4C1D95',
        'editor.lineHighlightBackground': '#F8FAFC',
        'editorLineNumber.foreground': '#9CA3AF',
        'editorLineNumber.activeForeground': '#4C1D95',
        'editor.selectionBackground': '#F3E8FF',
        'editorGutter.background': '#FFFFFF',
      },
    });

    monaco.editor.setTheme(theme === 'dark' ? 'squidql-dark-theme' : 'squidql-light-theme');
  };

  const handleRunQuery = async () => {
    if (!activeQuestion) return;
    setIsExecuting(true);
    try {
      const res = await executeQuery(code, activeQuestion.tables);
      setQueryResult(res);
      setSubmissionResult(null);
    } catch (err: any) {
      setQueryResult({
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: err.message || 'Execution error.',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmitQuery = async () => {
    if (!activeQuestion) return;
    setIsSubmitting(true);
    try {
      const subResult = await submitChallengeQuery(code, activeQuestion);
      setSubmissionResult(subResult);

      if (subResult.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4C1D95', '#059669', '#7C3AED', '#F59E0B'],
        });

        const { progress: updated } = recordChallengeSolved(
          activeQuestion.id,
          subResult.executionTimeMs || 0,
          hintsUnlocked,
          progress
        );

        onProgressUpdated(updated);

        if (profile.id && !profile.isGuest) {
          syncProgressToFirebase(profile.id, updated);
        }
      }
    } catch (err: any) {
      setSubmissionResult({
        success: false,
        message: err.message || 'Submission error.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (!activeQuestion) return;
    setCode(activeQuestion.initialQuery);
    saveQueryDraft(activeQuestion.id, activeQuestion.initialQuery, profile.isGuest);
    setQueryResult(null);
    setSubmissionResult(null);
  };

  // Filter 50 challenges by search and difficulty
  const filteredQuestions = CHALLENGES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.section || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // Group filtered questions by section
  const sectionsMap = React.useMemo(() => {
    const map: Record<string, Challenge[]> = {};
    filteredQuestions.forEach((q) => {
      const sec = q.section || 'General';
      if (!map[sec]) map[sec] = [];
      map[sec].push(q);
    });
    return map;
  }, [filteredQuestions]);

  const solvedCount = Object.keys(progress.completedChallenges || {}).length;
  const totalCount = CHALLENGES.length;

  // -------------------------------------------------------------
  // VIEW 1: BRUTALIST PROBLEM LIST (When no problem is active)
  // -------------------------------------------------------------
  if (!activeQuestion) {
    return (
      <div className="flex-1 bg-transparent py-8 sm:py-12 select-none">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          
          {/* Header & Solved Count */}
          <div className="border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 pb-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                    SQL 50
                  </h1>
                  <span className="px-2.5 py-0.5 bg-[#F3E8FF] dark:bg-[#581C87] border-2 border-[#1C1C1C] dark:border-[#A78BFA] font-mono text-xs font-black shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs text-[#4C1D95] dark:text-[#F4F4F0] uppercase">
                    IMPLEMENTATION WORKOUT
                  </span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#4A4A48] dark:text-[#C9C5B9] font-bold max-w-xl">
                  Stop knowing SQL only in theory. Start recognizing the right approach and writing it.
                </p>
              </div>

              <div className="px-3.5 py-1.5 bg-white dark:bg-[#1C1C1C] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9]/60 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs font-mono text-xs font-black text-[#1C1C1C] dark:text-[#F4F4F0] uppercase self-start sm:self-auto">
                <span className="text-[#059669] dark:text-[#A78BFA]">{solvedCount}</span> / {totalCount} SOLVED
              </div>
            </div>

            {/* Workout Highlights */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] font-black uppercase text-[#1C1C1C] dark:text-[#F4F4F0]">
              <span className="px-2.5 py-1 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#4C1D95] dark:text-[#A78BFA]" />
                <span>50 PROBLEMS</span>
              </span>
              <span className="px-2.5 py-1 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A78BFA]" />
                <span>5 LEVELS</span>
              </span>
              <span className="px-2.5 py-1 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs">
                INTERVIEW PREP EDITION
              </span>
              <span className="px-2.5 py-1 bg-[#F3E8FF] text-[#4C1D95] dark:bg-[#581C87] dark:text-white border-2 border-[#1C1C1C] dark:border-[#A78BFA] shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs font-black">
                SAMPLE DATA INCLUDED
              </span>
            </div>
          </div>

          {/* Search & Difficulty Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-[#6B7280] dark:text-[#C9C5B9] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${totalCount} problems...`}
                className="w-full pl-10 pr-3 py-2 bg-white dark:bg-[#1C1C1C] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9]/60 font-mono text-xs text-[#1C1C1C] dark:text-[#F4F4F0] placeholder:text-[#9CA3AF] dark:placeholder:text-[#C9C5B9]/60 font-bold focus:outline-none focus:border-[#4C1D95] dark:focus:border-[#A78BFA] shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`
                    px-3 py-1.5 text-xs font-mono font-black uppercase border-2 transition-all cursor-pointer
                    ${
                      selectedDifficulty === diff
                        ? 'bg-[#4C1D95] dark:bg-[#581C87] text-white border-[#1C1C1C] dark:border-[#A78BFA] shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs -translate-y-0.5'
                        : 'bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#C9C5B9] border-[#1C1C1C] dark:border-[#C9C5B9]/40 hover:bg-[#F3E8FF] hover:text-[#4C1D95] dark:hover:text-[#A78BFA]'
                    }
                  `}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped Problems by Section */}
          <div className="space-y-6">
            {Object.keys(sectionsMap).length === 0 ? (
              <div className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-8 text-center font-mono text-xs font-bold text-[#6B7280] dark:text-[#C9C5B9] shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard">
                No problems match your search filter.
              </div>
            ) : (
              Object.entries(sectionsMap).map(([sectionTitle, questions]) => (
                <div key={sectionTitle} className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard overflow-hidden">
                  {/* Section Title Header */}
                  <div className="bg-[#F3E8FF] dark:bg-[#1C1C1C] text-[#3B0764] dark:text-[#F4F4F0] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40">
                    <span className="font-display font-black text-sm uppercase tracking-wide text-[#4C1D95] dark:text-[#A78BFA]">
                      {sectionTitle}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#6B7280] dark:text-[#C9C5B9] uppercase">
                      {questions.filter((q) => !!progress.completedChallenges[q.id]).length} / {questions.length} Solved
                    </span>
                  </div>

                  {/* Section Questions */}
                  <div className="divide-y divide-[#1C1C1C]/15 dark:divide-[#C9C5B9]/20">
                    {questions.map((c) => {
                      const isSolved = !!progress.completedChallenges[c.id];

                      return (
                        <div
                          key={c.id}
                          onClick={() => handleSelectQuestion(c.id)}
                          className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[#F3E8FF]/60 dark:hover:bg-[#581C87]/20 transition-all cursor-pointer group"
                        >
                          {/* Left: Checkmark + Title */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                              {isSolved ? (
                                <div className="w-5 h-5 bg-[#059669] border-2 border-[#1C1C1C] flex items-center justify-center shadow-[1px_1px_0_0_#1C1C1C] dark:shadow-hard-xs">
                                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 border-2 border-[#1C1C1C]/40 dark:border-[#C9C5B9]/40 rounded-full group-hover:border-[#4C1D95] dark:group-hover:border-[#A78BFA]" />
                              )}
                            </div>

                            <span className="font-display font-black text-xs sm:text-sm text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight truncate group-hover:text-[#4C1D95] dark:group-hover:text-[#A78BFA] group-hover:translate-x-0.5 transition-transform">
                              {c.title}
                            </span>
                          </div>

                          {/* Right: Difficulty */}
                          <div className="flex items-center gap-2.5 shrink-0">
                            <span
                              className={`
                                px-2.5 py-0.5 text-[10px] font-mono font-black uppercase border-2 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs
                                ${
                                  c.difficulty === 'Easy'
                                    ? 'bg-[#DCFCE7] text-[#15803D] border-[#15803D]'
                                    : c.difficulty === 'Medium'
                                    ? 'bg-[#F3E8FF] text-[#4C1D95] border-[#4C1D95]'
                                    : 'bg-[#F3E8FF] text-[#7E22CE] border-[#7E22CE]'
                                }
                              `}
                            >
                              {c.difficulty}
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

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: TWO-PANEL PROBLEM-SOLVING WORKSPACE
  // -------------------------------------------------------------
  const currentTrackList = activeQuestion.track
    ? ALL_CHALLENGES.filter((c) => c.track === activeQuestion.track)
    : CHALLENGES;

  const currentIndex = currentTrackList.findIndex((c) => c.id === activeQuestion.id);
  const prevQuestion = currentIndex > 0 ? currentTrackList[currentIndex - 1] : null;
  const nextQuestion = currentIndex >= 0 && currentIndex < currentTrackList.length - 1 ? currentTrackList[currentIndex + 1] : null;
  const isCurrentSolved = !!progress.completedChallenges[activeQuestion.id];

  const trackBadgeName = activeQuestion.levelTitle || (
    activeQuestion.track === 'leetcode-50'
      ? 'LEETCODE SQL 50'
      : activeQuestion.track === 'hackerrank-sql'
      ? 'HACKERRANK SQL'
      : activeQuestion.track === 'datalemur-sql'
      ? 'DATALEMUR SQL'
      : activeQuestion.track === 'stratascratch'
      ? 'STRATASCRATCH'
      : activeQuestion.track === 'sqlzoo'
      ? 'SQLZOO'
      : activeQuestion.track === 'w3schools-sql'
      ? 'W3SCHOOLS'
      : 'SQL 50 WORKOUT'
  );

  return (
    <div className="flex-1 bg-transparent flex flex-col min-h-[calc(100vh-68px)]">
      
      {/* Workspace Navigation Bar */}
      <div className="bg-white dark:bg-[#1C1C1C] border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 transition-colors duration-150">
        {/* Back to all problems */}
        <button
          onClick={handleBackToList}
          className="btn-press-sm px-3 py-1.5 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/60 font-mono text-xs font-black text-[#1C1C1C] dark:text-[#F4F4F0] uppercase flex items-center gap-1.5 hover:bg-[#F3E8FF] hover:text-[#4C1D95] shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{activeQuestion.track && activeQuestion.track !== 'workout-50' ? 'BACK TO STUDY PLAN LIST' : 'ALL PROBLEMS'}</span>
        </button>

        {/* Center: Question Title */}
        <div className="flex items-center gap-2 truncate max-w-md">
          <span className="px-2 py-0.5 bg-[#F3E8FF] text-[#4C1D95] dark:bg-[#581C87] dark:text-white border border-[#4C1D95] dark:border-[#A78BFA] text-xs font-mono font-black uppercase shrink-0">
            {trackBadgeName}
          </span>
          <span className="font-display font-black text-xs sm:text-base text-[#1C1C1C] dark:text-[#F4F4F0] uppercase truncate">
            {activeQuestion.title}
          </span>
          {isCurrentSolved && (
            <span className="px-2 py-0.5 bg-[#059669] text-white border border-[#1C1C1C] text-[10px] font-mono font-black uppercase flex items-center gap-1 shadow-xs shrink-0">
              <Check className="w-3 h-3 stroke-[3]" /> SOLVED
            </span>
          )}
        </div>

        {/* Prev / Next Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => prevQuestion && handleSelectQuestion(prevQuestion.id)}
            disabled={!prevQuestion}
            className="p-1.5 bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/60 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs hover:bg-[#F3E8FF] hover:text-[#4C1D95] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Problem"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          </button>
          <span className="font-mono text-xs font-black px-1 text-[#6B7280] dark:text-[#C9C5B9] shrink-0">
            {currentIndex >= 0 ? currentIndex + 1 : 1}/{currentTrackList.length}
          </span>
          <button
            onClick={() => nextQuestion && handleSelectQuestion(nextQuestion.id)}
            disabled={!nextQuestion}
            className="p-1.5 bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/60 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs hover:bg-[#F3E8FF] hover:text-[#4C1D95] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Problem"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Mobile Workspace Panel Switcher */}
      <div className="flex md:hidden border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 bg-white dark:bg-[#1C1C1C]">
        <button
          onClick={() => setMobileWorkspaceTab('problem')}
          className={`flex-1 py-2.5 font-mono text-xs font-black uppercase text-center border-r-2 border-[#1C1C1C]/20 ${mobileWorkspaceTab === 'problem' ? 'bg-[#4C1D95] dark:bg-[#581C87] text-white' : 'text-[#6B7280] dark:text-[#C9C5B9]'}`}
        >
          PROBLEM
        </button>
        <button
          onClick={() => setMobileWorkspaceTab('editor')}
          className={`flex-1 py-2.5 font-mono text-xs font-black uppercase text-center ${mobileWorkspaceTab === 'editor' ? 'bg-[#4C1D95] dark:bg-[#581C87] text-white' : 'text-[#6B7280] dark:text-[#C9C5B9]'}`}
        >
          SQL EDITOR
        </button>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT SIDE: Question Description & Schema */}
        <div
          className={`
            w-full md:w-1/2 bg-white dark:bg-[#1C1C1C] md:border-r-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-120px)] space-y-6
            ${mobileWorkspaceTab === 'editor' ? 'hidden md:block' : 'block'}
          `}
        >
          {/* Title & Difficulty */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`
                  px-2.5 py-1 text-xs font-mono font-black uppercase border-2 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs
                  ${
                    activeQuestion.difficulty === 'Easy'
                      ? 'bg-[#DCFCE7] text-[#15803D] border-[#15803D]'
                      : activeQuestion.difficulty === 'Medium'
                      ? 'bg-[#F3E8FF] text-[#4C1D95] border-[#4C1D95]'
                      : 'bg-[#F3E8FF] text-[#7E22CE] border-[#7E22CE]'
                  }
                `}
              >
                {activeQuestion.difficulty}
              </span>
              <span className="font-mono text-xs font-bold text-[#6B7280] dark:text-[#C9C5B9] uppercase">
                LEVEL {activeQuestion.level} // {activeQuestion.levelTitle}
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
              {activeQuestion.title}
            </h2>
          </div>

          {/* Problem Statement Box */}
          <div className="bg-[#FAFAF8] dark:bg-[#1C1C1C] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-4 sm:p-5 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs space-y-2">
            <div className="font-mono text-xs font-black uppercase text-[#4C1D95] dark:text-[#A78BFA] pb-2 border-b border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30">
              PROBLEM STATEMENT
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#1C1C1C] dark:text-[#F4F4F0] leading-relaxed font-bold">
              {activeQuestion.description}
            </p>
          </div>

          {/* Table Schemas and Sample Data */}
          <div className="space-y-4 pt-1">
            <div className="font-mono text-xs font-black uppercase text-[#1C1C1C] dark:text-[#F4F4F0] flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#4C1D95] dark:text-[#A78BFA]" />
              <span>DATABASE SCHEMAS & SAMPLE DATA</span>
            </div>

            {activeQuestion.tables.map((table) => (
              <div key={table.name} className="border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9] bg-white dark:bg-[#1C1C1C] overflow-hidden shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
                <div className="bg-[#F3E8FF] dark:bg-[#1C1C1C] text-[#3B0764] dark:text-[#F4F4F0] border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 px-3.5 py-2 font-mono text-xs font-black uppercase flex items-center justify-between">
                  <span>TABLE: {table.name}</span>
                  <span className="text-[#4C1D95] dark:text-[#A78BFA] text-[10px] font-bold">{table.columns.length} COLUMNS</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead className="bg-[#FAFAF8] dark:bg-[#1C1C1C] border-b border-[#1C1C1C]/20 dark:border-[#C9C5B9]/30 text-[#1C1C1C] dark:text-[#F4F4F0] font-black">
                      <tr>
                        {table.columns.map((col) => (
                          <th key={col.name} className="p-2 border-r border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30">
                            {col.name}
                            <span className="text-[9px] block text-[#6B7280] dark:text-[#C9C5B9] font-bold">{col.type}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1C1C]/10 dark:divide-[#C9C5B9]/20 font-bold">
                      {table.seedData.slice(0, 4).map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#F3E8FF]/60 dark:hover:bg-[#581C87]/20">
                          {table.columns.map((col) => (
                            <td key={col.name} className="p-2 border-r border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30 text-[#1C1C1C] dark:text-[#F4F4F0]">
                              {String(row[col.name] ?? 'NULL')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Hints Section */}
          <div className="pt-2">
            <button
              onClick={() => setShowHints(!showHints)}
              className="px-3 py-1.5 bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/60 font-mono text-xs font-black uppercase shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs flex items-center gap-2 hover:bg-[#F3E8FF] hover:text-[#4C1D95] transition-colors cursor-pointer"
            >
              {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showHints ? 'HIDE HINTS' : 'NEED A HINT?'}</span>
            </button>

            {showHints && (
              <div className="mt-3 space-y-2">
                {activeQuestion.hints.map((hint, idx) => (
                  <div key={idx} className="p-3.5 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9] text-xs font-mono text-[#1C1C1C] dark:text-[#F4F4F0] leading-relaxed shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs font-bold">
                    <span className="text-[#4C1D95] dark:text-[#A78BFA] font-black uppercase">HINT {idx + 1}: </span>
                    {hint}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: SQL Editor & Output */}
        <div
          className={`
            w-full md:w-1/2 bg-white dark:bg-[#1C1C1C] flex flex-col justify-between overflow-hidden max-h-[calc(100vh-120px)]
            ${mobileWorkspaceTab === 'problem' ? 'hidden md:flex' : 'flex'}
          `}
        >
          {/* Editor Header */}
          <div className="bg-[#F3E8FF] dark:bg-[#1C1C1C] text-[#3B0764] dark:text-[#F4F4F0] px-4 py-2.5 border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 flex items-center justify-between text-xs font-mono font-bold">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#4C1D95] dark:text-[#A78BFA]" />
              <span className="text-[#4C1D95] dark:text-[#A78BFA] font-black uppercase">query.sql</span>
            </div>
            <button
              onClick={handleReset}
              className="text-[#6B7280] dark:text-[#C9C5B9] hover:text-[#4C1D95] dark:hover:text-[#A78BFA] text-xs flex items-center gap-1 font-bold transition-colors cursor-pointer"
              title="Reset query"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[240px]">
            <Editor
              height="100%"
              defaultLanguage="sql"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorMount}
              theme={theme === 'dark' ? 'squidql-dark-theme' : 'squidql-light-theme'}
              options={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                automaticLayout: true,
                tabSize: 2,
                padding: { top: 10, bottom: 10 },
                wordWrap: 'on',
              }}
            />
          </div>

          {/* Run / Submit Action Bar */}
          <div className="bg-[#FAFAF8] dark:bg-[#1C1C1C] border-t-2 border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 p-3 flex items-center justify-end gap-2.5">
            <button
              onClick={handleRunQuery}
              disabled={isExecuting}
              className="btn-press px-5 py-2 bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#C9C5B9]/60 hover:bg-[#F3E8FF] hover:text-[#4C1D95] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA] font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs disabled:opacity-50 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isExecuting ? 'RUNNING...' : 'RUN'}</span>
            </button>

            <button
              onClick={handleSubmitQuery}
              disabled={isSubmitting}
              className="btn-press px-6 py-2 bg-[#4C1D95] dark:bg-[#581C87] text-white hover:bg-[#3B0764] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#A78BFA] font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard disabled:opacity-50 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{isSubmitting ? 'EVALUATING...' : 'SUBMIT'}</span>
            </button>
          </div>

          {/* Output / Results Panel */}
          <div className="h-60 sm:h-72 bg-white dark:bg-[#1C1C1C] overflow-y-auto p-4 font-mono text-xs border-t border-[#1C1C1C]/15 dark:border-[#C9C5B9]/30">
            {submissionResult ? (
              submissionResult.success ? (
                <div className="p-5 bg-[#DCFCE7] dark:bg-[#581C87] border-3 border-[#059669] dark:border-[#1C1C1C] text-[#065F46] dark:text-[#F4F4F0] space-y-3 shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard">
                  <div className="flex items-center gap-2.5 font-display font-black text-lg uppercase">
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>ACCEPTED! CORRECT SOLUTION.</span>
                  </div>
                  <div className="text-xs font-bold text-[#065F46]/85 dark:text-[#F4F4F0]/85">
                    Execution time: {submissionResult.executionTimeMs?.toFixed(1)}ms • +{activeQuestion.xp} XP
                  </div>
                  {nextQuestion && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleSelectQuestion(nextQuestion.id)}
                        className="btn-press-sm px-4 py-1.5 bg-[#059669] text-white dark:bg-[#1C1C1C] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] text-xs font-black uppercase hover:bg-[#047857]"
                      >
                        NEXT PROBLEM (Q{nextQuestion.id}) →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 bg-[#FEF2F2] dark:bg-[#1C1C1C] border-3 border-[#EF4444] dark:border-[#A78BFA] text-[#991B1B] dark:text-[#F4F4F0] space-y-2 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
                  <div className="flex items-center gap-2 font-display font-black text-base uppercase">
                    <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                    <span>WRONG ANSWER</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">
                    {submissionResult.message}
                  </p>
                </div>
              )
            ) : queryResult ? (
              queryResult.error ? (
                <div className="p-4 bg-[#FEF2F2] dark:bg-[#1C1C1C] border-3 border-[#EF4444] dark:border-[#C9C5B9] text-[#991B1B] dark:text-[#F4F4F0] space-y-1 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
                  <div className="font-black uppercase">SQL ERROR:</div>
                  <pre className="text-xs font-bold whitespace-pre-wrap">
                    {queryResult.error}
                  </pre>
                </div>
              ) : queryResult.rowCount === 0 ? (
                <div className="p-4 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9] text-[#6B7280] dark:text-[#C9C5B9] font-bold">
                  Query returned 0 rows.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-[#6B7280] dark:text-[#C9C5B9] font-black uppercase">
                    RESULT: {queryResult.rowCount} ROWS ({queryResult.executionTimeMs.toFixed(1)}ms)
                  </div>
                  <div className="border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 overflow-x-auto shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead className="bg-[#F3E8FF] dark:bg-[#1C1C1C] text-[#3B0764] dark:text-[#F4F4F0] uppercase font-black border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40">
                        <tr>
                          {queryResult.columns.map((col) => (
                            <th key={col} className="p-2 border-r border-[#1C1C1C]/15 dark:border-[#C9C5B9]/20 last:border-r-0">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C1C1C]/10 dark:divide-[#C9C5B9]/20 font-bold bg-white dark:bg-[#1C1C1C]">
                        {queryResult.values.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#F3E8FF]/60 dark:hover:bg-[#581C87]/20">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-2 border-r border-[#1C1C1C]/15 dark:border-[#C9C5B9]/20 last:border-r-0 text-[#1C1C1C] dark:text-[#F4F4F0]">
                                {val === null ? <span className="text-[#9CA3AF] dark:text-[#C9C5B9] italic">NULL</span> : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ) : (
              <div className="h-full flex items-center justify-center text-[#9CA3AF] dark:text-[#C9C5B9]/60 text-xs font-bold uppercase text-center">
                Click "Run" to test query or "Submit" to evaluate solution.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
