import React, { useState, useEffect, useRef } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import type { QueryResult, SubmissionResult, UserProgress, UserProfile, Difficulty, Challenge } from '../../types';
import { CHALLENGES, ALL_CHALLENGES } from '../../data/challenges';
import { executeQuery, submitChallengeQuery } from '../../services/sqlEngine';
import { recordChallengeSolved, saveQueryDraft, getQueryDraft } from '../../services/storage';
import { syncProgressToFirebase } from '../../services/firebase';
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

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme('neo-brutalist-black');
    }
  }, []);

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

    monaco.editor.defineTheme('neo-brutalist-black', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'e8ff00', fontStyle: 'bold' },
        { token: 'string', foreground: '5ec8ff' },
        { token: 'number', foreground: 'ff5e8a', fontStyle: 'bold' },
        { token: 'comment', foreground: '888888', fontStyle: 'italic' },
        { token: 'operator', foreground: 'ff5e8a', fontStyle: 'bold' },
        { token: 'identifier', foreground: 'f4f3ec' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#f4f3ec',
        'editorCursor.foreground': '#e8ff00',
        'editor.lineHighlightBackground': '#171922',
        'editorLineNumber.foreground': '#6b7280',
        'editorLineNumber.activeForeground': '#e8ff00',
        'editor.selectionBackground': '#e8ff0044',
        'editorGutter.background': '#0a0a0a',
      },
    });

    monaco.editor.setTheme('neo-brutalist-black');
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
          colors: ['#e8ff00', '#ff5e8a', '#5ec8ff', '#0a0a0a'],
        });

        if (!profile.isGuest) {
          const { progress: updated } = recordChallengeSolved(
            activeQuestion.id,
            subResult.executionTimeMs || 0,
            hintsUnlocked,
            false
          );

          onProgressUpdated(updated);

          if (profile.id) {
            syncProgressToFirebase(profile.id, updated);
          }
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

  const solvedCount = CHALLENGES.filter((c) => !!progress.completedChallenges[c.id]).length;
  const totalCount = CHALLENGES.length;

  // -------------------------------------------------------------
  // VIEW 1: BRUTALIST PROBLEM LIST (When no problem is active)
  // -------------------------------------------------------------
  if (!activeQuestion) {
    return (
      <div className="flex-1 bg-transparent py-8 sm:py-12 select-none">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          
          {/* Header & Solved Count */}
          <div className="border-b-3 border-ink pb-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display font-black text-3xl sm:text-4xl text-ink uppercase tracking-tight">
                    SQL 50
                  </h1>
                  <span className="px-2.5 py-0.5 bg-acid border-2 border-ink font-mono text-xs font-black shadow-hard-xs text-ink uppercase">
                    IMPLEMENTATION WORKOUT
                  </span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-ink/80 font-bold max-w-xl">
                  Stop knowing SQL only in theory. Start recognizing the right approach and writing it.
                </p>
              </div>

              <div className="px-3.5 py-1.5 bg-white border-3 border-ink shadow-hard-xs font-mono text-xs font-black text-ink uppercase self-start sm:self-auto">
                {solvedCount} / {totalCount} SOLVED
              </div>
            </div>

            {/* Workout Highlights */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] font-black uppercase text-ink">
              <span className="px-2.5 py-1 bg-white border-2 border-ink shadow-hard-xs flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-ink" />
                <span>50 PROBLEMS</span>
              </span>
              <span className="px-2.5 py-1 bg-white border-2 border-ink shadow-hard-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink" />
                <span>5 LEVELS</span>
              </span>
              <span className="px-2.5 py-1 bg-white border-2 border-ink shadow-hard-xs">
                INTERVIEW PREP EDITION
              </span>
              <span className="px-2.5 py-1 bg-acid text-ink border-2 border-ink shadow-hard-xs">
                SAMPLE DATA INCLUDED
              </span>
            </div>
          </div>



          {/* Search & Difficulty Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-ink/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${totalCount} problems...`}
                className="w-full pl-10 pr-3 py-2 bg-white border-3 border-ink font-mono text-xs text-ink placeholder:text-ink/60 font-bold focus:outline-none shadow-hard-xs"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`
                    px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-ink transition-all
                    ${
                      selectedDifficulty === diff
                        ? 'bg-ink text-acid shadow-hard-xs -translate-y-0.5'
                        : 'bg-white text-ink hover:bg-acid'
                    }
                  `}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped Problems by Section (Like the LeetCode SQL 50 Study Plan) */}
          <div className="space-y-6">
            {Object.keys(sectionsMap).length === 0 ? (
              <div className="bg-white border-3 border-ink p-8 text-center font-mono text-xs font-bold text-ink/60 shadow-hard">
                No problems match your search filter.
              </div>
            ) : (
              Object.entries(sectionsMap).map(([sectionTitle, questions]) => (
                <div key={sectionTitle} className="bg-white border-3 border-ink shadow-hard overflow-hidden">
                  {/* Section Title Header */}
                  <div className="bg-ink text-paper px-4 py-2.5 flex items-center justify-between border-b-2 border-ink">
                    <span className="font-display font-black text-sm uppercase tracking-wide text-acid">
                      {sectionTitle}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-paper/80 uppercase">
                      {questions.filter((q) => !!progress.completedChallenges[q.id]).length} / {questions.length} Solved
                    </span>
                  </div>

                  {/* Section Questions */}
                  <div className="divide-y-2 divide-ink/15">
                    {questions.map((c) => {
                      const isSolved = !!progress.completedChallenges[c.id];

                      return (
                        <div
                          key={c.id}
                          onClick={() => handleSelectQuestion(c.id)}
                          className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-acid/20 transition-all cursor-pointer group"
                        >
                          {/* Left: Checkmark + Title */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                              {isSolved ? (
                                <div className="w-5 h-5 bg-acid border-2 border-ink flex items-center justify-center shadow-hard-xs">
                                  <Check className="w-3.5 h-3.5 text-ink stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 border-2 border-ink/40 rounded-full group-hover:border-ink" />
                              )}
                            </div>

                            <span className="font-display font-black text-xs sm:text-sm text-ink uppercase tracking-tight truncate group-hover:translate-x-0.5 transition-transform">
                              {c.title}
                            </span>
                          </div>

                          {/* Right: Difficulty */}
                          <div className="flex items-center gap-2.5 shrink-0">
                            <span
                              className={`
                                px-2.5 py-0.5 text-[10px] font-mono font-black uppercase border-2 border-ink shadow-hard-xs
                                ${
                                  c.difficulty === 'Easy'
                                    ? 'bg-sky text-ink'
                                    : c.difficulty === 'Medium'
                                    ? 'bg-acid text-ink'
                                    : 'bg-pink text-paper'
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
      <div className="bg-white border-b-3 border-ink px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Back to all problems */}
        <button
          onClick={handleBackToList}
          className="btn-press-sm px-3 py-1.5 bg-paper border-2 border-ink font-mono text-xs font-black text-ink uppercase flex items-center gap-1.5 hover:bg-white shadow-hard-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{activeQuestion.track && activeQuestion.track !== 'workout-50' ? 'BACK TO STUDY PLAN LIST' : 'ALL PROBLEMS'}</span>
        </button>

        {/* Center: Question Title */}
        <div className="flex items-center gap-2 truncate max-w-md">
          <span className="px-2 py-0.5 bg-ink text-acid border border-ink text-xs font-mono font-black uppercase shrink-0">
            {trackBadgeName}
          </span>
          <span className="font-display font-black text-xs sm:text-base text-ink uppercase truncate">
            {activeQuestion.title}
          </span>
          {isCurrentSolved && (
            <span className="px-2 py-0.5 bg-acid text-ink border border-ink text-[10px] font-mono font-black uppercase flex items-center gap-1 shadow-hard-xs shrink-0">
              <Check className="w-3 h-3 stroke-[3]" /> SOLVED
            </span>
          )}
        </div>

        {/* Prev / Next Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => prevQuestion && handleSelectQuestion(prevQuestion.id)}
            disabled={!prevQuestion}
            className="p-1.5 bg-white border-2 border-ink shadow-hard-xs hover:bg-acid disabled:opacity-30 disabled:pointer-events-none"
            title="Previous Problem"
          >
            <ChevronLeft className="w-4 h-4 text-ink stroke-[3]" />
          </button>
          <span className="font-mono text-xs font-black px-1 text-ink shrink-0">
            {currentIndex >= 0 ? currentIndex + 1 : 1}/{currentTrackList.length}
          </span>
          <button
            onClick={() => nextQuestion && handleSelectQuestion(nextQuestion.id)}
            disabled={!nextQuestion}
            className="p-1.5 bg-white border-2 border-ink shadow-hard-xs hover:bg-acid disabled:opacity-30 disabled:pointer-events-none"
            title="Next Problem"
          >
            <ChevronRight className="w-4 h-4 text-ink stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Mobile Workspace Panel Switcher */}
      <div className="flex md:hidden border-b-3 border-ink bg-paper">
        <button
          onClick={() => setMobileWorkspaceTab('problem')}
          className={`flex-1 py-2.5 font-mono text-xs font-black uppercase text-center border-r-2 border-ink ${mobileWorkspaceTab === 'problem' ? 'bg-acid text-ink' : 'text-ink/70'}`}
        >
          PROBLEM
        </button>
        <button
          onClick={() => setMobileWorkspaceTab('editor')}
          className={`flex-1 py-2.5 font-mono text-xs font-black uppercase text-center ${mobileWorkspaceTab === 'editor' ? 'bg-acid text-ink' : 'text-ink/70'}`}
        >
          SQL EDITOR
        </button>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT SIDE: Question Description & Schema */}
        <div
          className={`
            w-full md:w-1/2 bg-paper md:border-r-3 border-ink p-5 sm:p-7 overflow-y-auto max-h-[calc(100vh-120px)] space-y-6
            ${mobileWorkspaceTab === 'editor' ? 'hidden md:block' : 'block'}
          `}
        >
          {/* Title & Difficulty */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`
                  px-2.5 py-1 text-xs font-mono font-black uppercase border-2 border-ink shadow-hard-xs
                  ${
                    activeQuestion.difficulty === 'Easy'
                      ? 'bg-sky text-ink'
                      : activeQuestion.difficulty === 'Medium'
                      ? 'bg-acid text-ink'
                      : 'bg-pink text-paper'
                  }
                `}
              >
                {activeQuestion.difficulty}
              </span>
              <span className="font-mono text-xs font-bold text-ink/70 uppercase">
                LEVEL {activeQuestion.level} // {activeQuestion.levelTitle}
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-ink uppercase tracking-tight">
              {activeQuestion.title}
            </h2>
          </div>

          {/* Problem Statement Box */}
          <div className="bg-white border-3 border-ink p-4 sm:p-5 shadow-hard-xs space-y-2">
            <div className="font-mono text-xs font-black uppercase text-ink pb-2 border-b-2 border-ink/20">
              PROBLEM STATEMENT
            </div>
            <p className="font-mono text-xs sm:text-sm text-ink leading-relaxed font-bold">
              {activeQuestion.description}
            </p>
          </div>

          {/* Table Schemas and Sample Data */}
          <div className="space-y-4 pt-1">
            <div className="font-mono text-xs font-black uppercase text-ink flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              <span>DATABASE SCHEMAS & SAMPLE DATA</span>
            </div>

            {activeQuestion.tables.map((table) => (
              <div key={table.name} className="border-3 border-ink bg-white overflow-hidden shadow-hard-xs">
                <div className="bg-ink text-paper px-3.5 py-2 font-mono text-xs font-black uppercase flex items-center justify-between">
                  <span>TABLE: {table.name}</span>
                  <span className="text-acid text-[10px] font-bold">{table.columns.length} COLUMNS</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead className="bg-paper border-b-2 border-ink text-ink font-black">
                      <tr>
                        {table.columns.map((col) => (
                          <th key={col.name} className="p-2 border-r border-ink/20">
                            {col.name}
                            <span className="text-[9px] block text-ink/60 font-bold">{col.type}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/20 font-bold">
                      {table.seedData.slice(0, 4).map((row, idx) => (
                        <tr key={idx} className="hover:bg-acid/10">
                          {table.columns.map((col) => (
                            <td key={col.name} className="p-2 border-r border-ink/20 text-ink">
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
              className="px-3 py-1.5 bg-white border-2 border-ink font-mono text-xs font-black uppercase text-ink shadow-hard-xs flex items-center gap-2 hover:bg-acid"
            >
              {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showHints ? 'HIDE HINTS' : 'NEED A HINT?'}</span>
            </button>

            {showHints && (
              <div className="mt-3 space-y-2">
                {activeQuestion.hints.map((hint, idx) => (
                  <div key={idx} className="p-3.5 bg-white border-2 border-ink text-xs font-mono text-ink leading-relaxed shadow-hard-xs font-bold">
                    <span className="text-pink font-black uppercase">HINT {idx + 1}: </span>
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
            w-full md:w-1/2 bg-ink flex flex-col justify-between overflow-hidden max-h-[calc(100vh-120px)]
            ${mobileWorkspaceTab === 'problem' ? 'hidden md:flex' : 'flex'}
          `}
        >
          {/* Editor Header */}
          <div className="bg-ink text-paper px-4 py-2.5 border-b-2 border-paper/20 flex items-center justify-between text-xs font-mono font-bold">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-acid" />
              <span className="text-acid font-black uppercase">query.sql</span>
            </div>
            <button
              onClick={handleReset}
              className="text-paper/70 hover:text-paper text-xs flex items-center gap-1 font-bold"
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
              theme="neo-brutalist-black"
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
          <div className="bg-paper border-t-3 border-b-3 border-ink p-3 flex items-center justify-end gap-2.5">
            <button
              onClick={handleRunQuery}
              disabled={isExecuting}
              className="btn-press px-5 py-2 bg-white text-ink border-3 border-ink font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-hard-xs disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-ink" />
              <span>{isExecuting ? 'RUNNING...' : 'RUN'}</span>
            </button>

            <button
              onClick={handleSubmitQuery}
              disabled={isSubmitting}
              className="btn-press px-6 py-2 bg-acid text-ink border-3 border-ink font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-hard disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 fill-ink" />
              <span>{isSubmitting ? 'EVALUATING...' : 'SUBMIT'}</span>
            </button>
          </div>

          {/* Output / Results Panel */}
          <div className="h-60 sm:h-72 bg-white overflow-y-auto p-4 font-mono text-xs">
            {submissionResult ? (
              submissionResult.success ? (
                <div className="p-5 bg-acid border-3 border-ink text-ink space-y-3 shadow-hard">
                  <div className="flex items-center gap-2.5 font-display font-black text-lg uppercase">
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>ACCEPTED! CORRECT SOLUTION.</span>
                  </div>
                  <div className="text-xs font-bold text-ink/80">
                    Execution time: {submissionResult.executionTimeMs?.toFixed(1)}ms • +{activeQuestion.xp} XP
                  </div>
                  {nextQuestion && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleSelectQuestion(nextQuestion.id)}
                        className="btn-press-sm px-4 py-1.5 bg-ink text-paper border-2 border-ink text-xs font-black uppercase"
                      >
                        NEXT PROBLEM (Q{nextQuestion.id}) →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 bg-pink/20 border-3 border-pink text-ink space-y-2 shadow-hard-xs">
                  <div className="flex items-center gap-2 font-display font-black text-base text-pink uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>WRONG ANSWER</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">
                    {submissionResult.message}
                  </p>
                </div>
              )
            ) : queryResult ? (
              queryResult.error ? (
                <div className="p-4 bg-pink/20 border-3 border-pink text-ink space-y-1 shadow-hard-xs">
                  <div className="font-black text-pink uppercase">SQL ERROR:</div>
                  <pre className="text-xs font-bold whitespace-pre-wrap">
                    {queryResult.error}
                  </pre>
                </div>
              ) : queryResult.rowCount === 0 ? (
                <div className="p-4 bg-paper border-2 border-ink text-ink/70 font-bold">
                  Query returned 0 rows.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-ink/70 font-black uppercase">
                    RESULT: {queryResult.rowCount} ROWS ({queryResult.executionTimeMs.toFixed(1)}ms)
                  </div>
                  <div className="border-2 border-ink overflow-x-auto shadow-hard-xs">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead className="bg-ink text-paper uppercase font-black">
                        <tr>
                          {queryResult.columns.map((col) => (
                            <th key={col} className="p-2 border-r border-paper/20">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/20 font-bold">
                        {queryResult.values.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-acid/20">
                            {row.map((val, cIdx) => (
                              <td key={cIdx} className="p-2 border-r border-ink/20">
                                {val === null ? <span className="text-pink italic">NULL</span> : String(val)}
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
              <div className="h-full flex items-center justify-center text-ink/50 text-xs font-bold uppercase text-center">
                Click "Run" to test query or "Submit" to evaluate solution.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
