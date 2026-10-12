import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Database, 
  Zap, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Cpu, 
  Check, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import type { NavPage } from '../layout/Navbar';

interface HomeViewProps {
  onNavigate: (page: NavPage, questionId?: number, trackId?: string) => void;
}

interface DemoQuery {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  sql: string;
  targetQuestionId: number;
  columns: string[];
  rows: (string | number)[][];
  executionTime: string;
}

const DEMO_QUERIES: DemoQuery[] = [
  {
    id: 'window-functions',
    tabLabel: '01. Window Functions',
    title: 'Top Earners per Department',
    description: 'Calculate salary rankings per department using analytical DENSE_RANK() partition.',
    sql: `SELECT 
  employee_name, 
  department, 
  salary, 
  DENSE_RANK() OVER (
    PARTITION BY department 
    ORDER BY salary DESC
  ) AS dept_rank
FROM employees
ORDER BY department, dept_rank;`,
    targetQuestionId: 1,
    columns: ['employee_name', 'department', 'salary', 'dept_rank'],
    rows: [
      ['Alex Rivera', 'Engineering', '$145,000', 1],
      ['Priya Sharma', 'Engineering', '$138,000', 2],
      ['Marcus Vance', 'Analytics', '$120,000', 1],
      ['Sarah Chen', 'Analytics', '$115,000', 2],
      ['Elena Rostova', 'Product', '$130,000', 1],
    ],
    executionTime: '1.2ms',
  },
  {
    id: 'aggregations',
    tabLabel: '02. Aggregations & Grouping',
    title: 'High-Volume Revenue Streams',
    description: 'Filter grouped order aggregates with HAVING to uncover enterprise revenue tiers.',
    sql: `SELECT 
  category, 
  COUNT(order_id) AS total_orders, 
  ROUND(AVG(unit_price), 2) AS avg_price,
  ROUND(SUM(amount), 2) AS total_revenue
FROM sales_records
GROUP BY category
HAVING total_revenue > 75000
ORDER BY total_revenue DESC;`,
    targetQuestionId: 10,
    columns: ['category', 'total_orders', 'avg_price', 'total_revenue'],
    rows: [
      ['Cloud Infrastructure', 1420, '$185.50', '$263,410.00'],
      ['Developer Tooling', 890, '$140.00', '$124,600.00'],
      ['Enterprise Support', 310, '$280.00', '$86,800.00'],
    ],
    executionTime: '0.9ms',
  },
  {
    id: 'joins',
    tabLabel: '03. Relational Joins',
    title: 'Active Customer Retention',
    description: 'Relate user profiles to session logs via LEFT JOIN to isolate active retention.',
    sql: `SELECT 
  u.username, 
  u.tier,
  COUNT(DISTINCT s.session_id) AS active_days,
  MAX(s.login_date) AS last_active
FROM users u
LEFT JOIN user_sessions s ON u.id = s.user_id
GROUP BY u.id, u.username, u.tier
ORDER BY active_days DESC;`,
    targetQuestionId: 21,
    columns: ['username', 'tier', 'active_days', 'last_active'],
    rows: [
      ['sql_ninja', 'PRO', 28, '2026-10-11'],
      ['byte_master', 'PRO', 24, '2026-10-10'],
      ['dev_sam', 'FREE', 19, '2026-10-09'],
      ['query_queen', 'ENTERPRISE', 17, '2026-10-08'],
    ],
    executionTime: '1.5ms',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('window-functions');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runKey, setRunKey] = useState<number>(0);

  const activeDemo = DEMO_QUERIES.find((q) => q.id === activeTab) || DEMO_QUERIES[0];

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setRunKey((prev) => prev + 1);
    }, 240);
  };

  return (
    <div className="w-full flex flex-col select-none overflow-x-hidden bg-[#F6F6F2] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] transition-colors duration-150">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="relative px-4 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 overflow-hidden bg-grain">
        
        {/* Floating Neo-Brutalist Sticker Chips (Desktop only) */}
        <div 
          onClick={() => onNavigate('questions')}
          className="hidden xl:flex absolute top-12 left-10 px-4 py-2 bg-[#4C1D95] dark:bg-[#581C87] border-2 sm:border-3 border-[#1C1C1C] dark:border-[#A78BFA] items-center justify-center -rotate-6 shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard transition-transform hover:rotate-0 hover:scale-105 cursor-pointer z-10 font-mono text-xs font-black text-white"
          title="Interactive SQL Terminal"
        >
          <Terminal className="w-4 h-4 mr-2 stroke-[2.5]" />
          <span>WASM SQLITE</span>
        </div>

        <div 
          onClick={() => onNavigate('questions')}
          className="hidden xl:flex absolute top-14 right-12 w-20 h-20 bg-white dark:bg-[#1C1C1C] rounded-full border-2 sm:border-3 border-[#4C1D95] dark:border-[#A78BFA] items-center justify-center rotate-12 shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard transition-transform hover:rotate-0 hover:scale-105 cursor-pointer z-10 font-display font-black text-2xl text-[#4C1D95] dark:text-[#A78BFA] text-center leading-none"
          title="50+ Curated Problems"
        >
          <div>
            <div className="text-xl">50+</div>
            <div className="text-[9px] font-mono font-bold tracking-tight text-[#1C1C1C] dark:text-[#C9C5B9]">PROBLEMS</div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          
          {/* Eyebrow Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/50 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669] dark:bg-[#A78BFA] border border-[#1C1C1C] animate-pulse" />
            <span className="eyebrow-tracker text-[10px] sm:text-xs font-black text-[#1C1C1C] dark:text-[#F4F4F0]">
              IN-MEMORY SQLITE ENGINE • 0MS LATENCY • 100% HANDS-ON
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display font-black text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight leading-[0.88] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span>MASTER SQL BY</span>
            <br />
            <span 
              className="inline-block bg-[#4C1D95] dark:bg-[#581C87] text-white border-3 sm:border-4 border-[#1C1C1C] dark:border-[#A78BFA] px-4 sm:px-8 py-1.5 sm:py-2.5 -rotate-1 shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard-lg mt-3"
            >
              SOLVING REAL PROBLEMS.
            </span>
          </h1>

          {/* Explanatory Subtitle */}
          <p className="font-mono text-sm sm:text-lg md:text-xl text-[#4A4A48] dark:text-[#C9C5B9] max-w-2xl mx-auto leading-relaxed font-bold">
            Write queries, inspect real-time table diffs, and conquer database interviews with 50+ curated problems running directly inside your browser.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('questions')}
              className="btn-press w-full sm:w-auto bg-[#4C1D95] dark:bg-[#581C87] text-white hover:bg-[#3B0764] h-14 sm:h-16 px-8 sm:px-10 border-3 border-[#1C1C1C] dark:border-[#A78BFA] font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard inline-flex items-center justify-center gap-3 cursor-pointer transition-colors"
            >
              <span>EXPLORE PROBLEMS (50+)</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              onClick={() => onNavigate('resources')}
              className="btn-press w-full sm:w-auto bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:text-[#4C1D95] dark:hover:text-[#A78BFA] h-14 sm:h-16 px-8 sm:px-10 border-3 border-[#1C1C1C] dark:border-[#C9C5B9]/60 font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard inline-flex items-center justify-center gap-3 cursor-pointer transition-colors"
            >
              <span>VIEW CURRICULUM</span>
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 sm:pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            <div className="p-3 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-center">
              <div className="font-display font-black text-xl sm:text-2xl text-[#4C1D95] dark:text-[#F4F4F0]">50+</div>
              <div className="font-mono text-[10px] sm:text-xs text-[#6B7280] dark:text-[#C9C5B9] font-bold uppercase">Curated Queries</div>
            </div>
            <div className="p-3 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-center">
              <div className="font-display font-black text-xl sm:text-2xl text-[#059669] dark:text-[#A78BFA]">0ms</div>
              <div className="font-mono text-[10px] sm:text-xs text-[#6B7280] dark:text-[#C9C5B9] font-bold uppercase">Server Latency</div>
            </div>
            <div className="p-3 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-center">
              <div className="font-display font-black text-xl sm:text-2xl text-[#7C3AED] dark:text-[#A78BFA]">WASM</div>
              <div className="font-mono text-[10px] sm:text-xs text-[#6B7280] dark:text-[#C9C5B9] font-bold uppercase">Real SQLite Engine</div>
            </div>
            <div className="p-3 bg-white dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-center">
              <div className="font-display font-black text-xl sm:text-2xl text-[#1C1C1C] dark:text-[#F4F4F0]">100%</div>
              <div className="font-mono text-[10px] sm:text-xs text-[#6B7280] dark:text-[#C9C5B9] font-bold uppercase">Free & Open Access</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE LIVE SQL TERMINAL PLAYGROUND
          ========================================================================= */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 max-w-6xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-block bg-[#F3E8FF] text-[#4C1D95] dark:bg-[#581C87] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#A78BFA] px-3.5 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
            ✦ LIVE IN-BROWSER SANDBOX PREVIEW
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
            SEE IT IN ACTION RIGHT HERE.
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#4A4A48] dark:text-[#C9C5B9] max-w-xl mx-auto font-bold">
            Select a problem type below and hit run to execute genuine SQL queries against the WebAssembly SQLite engine.
          </p>
        </div>

        {/* The Interactive Window Card */}
        <div className="bg-white dark:bg-[#1C1C1C] border-3 sm:border-4 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[6px_6px_0_0_#1C1C1C] dark:shadow-hard-lg overflow-hidden">
          
          {/* Terminal Titlebar */}
          <div className="bg-[#EDE9FE] dark:bg-[#1C1C1C] border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-[#1C1C1C]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-[#1C1C1C]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#1C1C1C]" />
              <span className="ml-2 font-mono text-xs font-black text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-wider hidden sm:inline">
                SQUIDQL_PLAYGROUND.SQL
              </span>
            </div>

            {/* Tab Selectors */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {DEMO_QUERIES.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveTab(demo.id)}
                  className={`px-3 py-1 font-mono text-xs font-bold border-2 cursor-pointer transition-all ${
                    activeTab === demo.id
                      ? 'bg-[#4C1D95] dark:bg-[#581C87] text-white border-[#1C1C1C] dark:border-[#A78BFA] shadow-[2px_2px_0_0_#1C1C1C] dark:shadow-hard-xs -translate-y-0.5'
                      : 'bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#C9C5B9] border-[#1C1C1C] dark:border-[#C9C5B9]/40 hover:bg-[#F3E8FF] hover:text-[#4C1D95] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  {demo.tabLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Playground Body: Query Code + Results Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#1C1C1C] dark:divide-[#C9C5B9]/40">
            
            {/* Left Column: SQL Editor Preview (7 Cols) */}
            <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between bg-white dark:bg-[#1C1C1C]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-lg sm:text-xl text-[#1C1C1C] dark:text-[#F4F4F0]">
                      {activeDemo.title}
                    </h3>
                    <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9]">
                      {activeDemo.description}
                    </p>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3E8FF] dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 text-[10px] font-mono font-bold text-[#4C1D95] dark:text-[#A78BFA]">
                    <Cpu className="w-3 h-3 text-[#4C1D95] dark:text-[#A78BFA]" />
                    <span>SQLITE 3.45</span>
                  </div>
                </div>

                {/* Code Block */}
                <div className="relative bg-[#FAFAF8] dark:bg-[#1C1C1C] border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 p-4 rounded-none overflow-x-auto shadow-inner text-xs sm:text-sm font-mono text-[#1C1C1C] dark:text-[#F4F4F0]">
                  <pre className="font-mono leading-relaxed whitespace-pre font-bold">
                    <code>
                      {activeDemo.sql.split('\n').map((line, idx) => (
                        <div key={idx} className="table-row">
                          <span className="table-cell pr-4 select-none text-[#9CA3AF] dark:text-[#C9C5B9]/50 text-right text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="table-cell text-[#1C1C1C] dark:text-[#F4F4F0]">
                            {line.includes('SELECT') || line.includes('FROM') || line.includes('GROUP BY') || line.includes('ORDER BY') || line.includes('LEFT JOIN') || line.includes('HAVING') ? (
                              <span className="text-[#4C1D95] dark:text-[#A78BFA] font-black">{line}</span>
                            ) : line.includes('OVER') || line.includes('PARTITION') || line.includes('DENSE_RANK') ? (
                              <span className="text-[#7C3AED] dark:text-[#C9C5B9] font-bold">{line}</span>
                            ) : (
                              <span>{line}</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Action Buttons for Code Block */}
              <div className="pt-5 flex items-center justify-between gap-3">
                <button
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  className="btn-press bg-[#4C1D95] dark:bg-[#581C87] text-white px-6 py-2.5 border-2 sm:border-3 border-[#1C1C1C] dark:border-[#A78BFA] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 hover:bg-[#3B0764]"
                >
                  <Play className={`w-4 h-4 fill-current stroke-current ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'EXECUTING...' : 'RUN QUERY'}</span>
                </button>

                <button
                  onClick={() => onNavigate('questions', activeDemo.targetQuestionId)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-[#4C1D95] dark:text-[#A78BFA] hover:underline cursor-pointer"
                >
                  <span>Open in IDE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Execution Output Table (5 Cols) */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-white dark:bg-[#1C1C1C] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#A78BFA] stroke-[2.5]" />
                    <span className="font-mono text-xs font-black text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                      QUERY RESULT ({activeDemo.rows.length} ROWS)
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#DCFCE7] text-[#065F46] dark:bg-[#581C87] dark:text-[#F4F4F0] border border-[#059669] dark:border-[#1C1C1C]">
                    ⚡ {activeDemo.executionTime}
                  </span>
                </div>

                {/* Table Preview */}
                <div className="overflow-x-auto border-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40 bg-white dark:bg-[#1C1C1C]">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F3E8FF] dark:bg-[#1C1C1C] text-[#3B0764] dark:text-[#F4F4F0] border-b-2 border-[#1C1C1C] dark:border-[#C9C5B9]/40">
                        {activeDemo.columns.map((col, idx) => (
                          <th key={idx} className="p-2 font-bold uppercase tracking-wider text-[10px] border-r border-[#1C1C1C]/20 dark:border-[#C9C5B9]/20 last:border-r-0">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody key={runKey} className="divide-y divide-[#1C1C1C]/10 dark:divide-[#C9C5B9]/20">
                      {activeDemo.rows.map((row, rIdx) => (
                        <tr 
                          key={rIdx} 
                          className="hover:bg-[#F3E8FF] dark:hover:bg-[#581C87]/20 transition-colors"
                        >
                          {row.map((val, cIdx) => (
                            <td key={cIdx} className="p-2 text-[#1C1C1C] dark:text-[#F4F4F0] font-semibold border-r border-[#1C1C1C]/10 dark:border-[#C9C5B9]/15 last:border-r-0 whitespace-nowrap">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Validation Status Banner */}
              <div className="mt-4 p-2.5 bg-[#ECFDF5] dark:bg-[#1C1C1C] border-2 border-[#059669] dark:border-[#A78BFA] flex items-center justify-between text-xs font-mono font-bold text-[#065F46] dark:text-[#A78BFA]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>OUTPUT MATCHES TARGET SCHEMA</span>
                </div>
                <span className="text-[10px] uppercase font-black bg-[#059669] text-white px-1.5 py-0.5">VALIDATED</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: WHY SQUIDQL - 4 CORE CAPABILITY BENTO CARDS
          ========================================================================= */}
      <section className="px-4 sm:px-8 py-16 sm:py-20 border-t-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 bg-[#F6F6F2] dark:bg-[#1C1C1C]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-block bg-[#F3E8FF] text-[#4C1D95] dark:bg-[#581C87] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#A78BFA] px-3.5 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
              ✦ BUILT FOR DEVELOPERS & ANALYSTS
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
              WHY PRACTICE WITH SQUIDQL?
            </h2>
            <p className="font-mono text-sm sm:text-base text-[#4A4A48] dark:text-[#C9C5B9] max-w-xl mx-auto font-bold">
              We stripped away all the bloated setups and subscription walls so you can focus on pure SQL mastery.
            </p>
          </div>

          {/* 4 Bento Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Card 1: WASM Engine */}
            <div className="bg-white dark:bg-[#1C1C1C] border-3 sm:border-4 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 sm:p-8 shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all space-y-4">
              <div className="w-12 h-12 bg-[#F3E8FF] dark:bg-[#581C87] border-2 border-[#1C1C1C] flex items-center justify-center shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-[#4C1D95] dark:text-[#F4F4F0]">
                <Cpu className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-2xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                01. Client-Side SQLite WASM Engine
              </h3>
              <p className="font-mono text-sm text-[#4A4A48] dark:text-[#C9C5B9] leading-relaxed font-bold">
                Run true database transactions directly in your browser. No server downtime, no rate limits, zero latency, and fully capable of operating offline.
              </p>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-[#059669] dark:text-[#A78BFA]">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Zero backend dependency</span>
              </div>
            </div>

            {/* Card 2: Curated Problems */}
            <div className="bg-white dark:bg-[#1C1C1C] border-3 sm:border-4 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 sm:p-8 shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all space-y-4">
              <div className="w-12 h-12 bg-[#F5F3FF] dark:bg-[#A78BFA] border-2 border-[#1C1C1C] flex items-center justify-center shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-[#7C3AED] dark:text-[#1C1C1C]">
                <Award className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-2xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                02. Real Tech Interview Curations
              </h3>
              <p className="font-mono text-sm text-[#4A4A48] dark:text-[#C9C5B9] leading-relaxed font-bold">
                Handcrafted problems mapped to LeetCode SQL 50, DataLemur, and StrataScratch assessments, covering real questions asked by FAANG teams.
              </p>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-[#059669] dark:text-[#A78BFA]">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Categorized by Easy, Medium & Hard</span>
              </div>
            </div>

            {/* Card 3: Instant Table Diff */}
            <div className="bg-white dark:bg-[#1C1C1C] border-3 sm:border-4 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 sm:p-8 shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all space-y-4">
              <div className="w-12 h-12 bg-[#ECFDF5] dark:bg-[#C9C5B9] border-2 border-[#1C1C1C] flex items-center justify-center shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-[#059669] dark:text-[#1C1C1C]">
                <Code2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-2xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                03. Real-Time Table Diff Verification
              </h3>
              <p className="font-mono text-sm text-[#4A4A48] dark:text-[#C9C5B9] leading-relaxed font-bold">
                Submit queries and see instant, row-by-row comparisons against verified test cases. Catch subtle ordering or rounding errors immediately.
              </p>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-[#059669] dark:text-[#A78BFA]">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Pixel-perfect expected vs actual outputs</span>
              </div>
            </div>

            {/* Card 4: Progress & Privacy */}
            <div className="bg-white dark:bg-[#1C1C1C] border-3 sm:border-4 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 sm:p-8 shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all space-y-4">
              <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#581C87] border-2 border-[#1C1C1C] flex items-center justify-center shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs text-[#D97706] dark:text-[#F4F4F0]">
                <Zap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-2xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                04. Local Drafts & Cloud Sync
              </h3>
              <p className="font-mono text-sm text-[#4A4A48] dark:text-[#C9C5B9] leading-relaxed font-bold">
                Start immediately without an account—every query draft is auto-saved locally. Connect Google Auth anytime to sync progress across devices.
              </p>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-[#059669] dark:text-[#A78BFA]">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Zero login barrier to start practicing</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PROBLEM CURRICULUM TRACKS
          ========================================================================= */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-t-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 bg-grain">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-block bg-[#F3E8FF] text-[#4C1D95] dark:bg-[#581C87] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#A78BFA] px-3.5 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs">
                ✦ STRUCTURED LEARNING PATHS
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
                EXPLORE BY SQL TOPIC.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center gap-2 font-mono text-sm font-black text-[#4C1D95] dark:text-[#A78BFA] hover:underline cursor-pointer"
            >
              <span>View All Tracks & Curriculums</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* 4 Topic Track Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Track 1: Basics & Filtering */}
            <div 
              onClick={() => onNavigate('questions', 1)}
              className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] border border-[#15803D] dark:bg-[#1C1C1C] dark:text-[#C9C5B9] dark:border-[#C9C5B9]/40">
                    EASY • 10 PROBLEMS
                  </span>
                  <Database className="w-4 h-4 text-[#4C1D95] dark:text-[#A78BFA]" />
                </div>
                <h3 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                  Basics & Filtering
                </h3>
                <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9]">
                  Master SELECT, WHERE, LIKE, ORDER BY, and LIMIT queries.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between font-mono text-xs font-black text-[#4C1D95] dark:text-[#A78BFA]">
                <span>Start Track</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Track 2: Aggregations */}
            <div 
              onClick={() => onNavigate('questions', 10)}
              className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#F3E8FF] text-[#4C1D95] border border-[#4C1D95] dark:bg-[#1C1C1C] dark:text-[#C9C5B9] dark:border-[#C9C5B9]/40">
                    MED • 12 PROBLEMS
                  </span>
                  <TrendingUp className="w-4 h-4 text-[#4C1D95] dark:text-[#A78BFA]" />
                </div>
                <h3 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                  Aggregations & Stats
                </h3>
                <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9]">
                  Aggregate with GROUP BY, HAVING, COUNT, SUM, and AVG.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between font-mono text-xs font-black text-[#4C1D95] dark:text-[#A78BFA]">
                <span>Start Track</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Track 3: Joins */}
            <div 
              onClick={() => onNavigate('questions', 21)}
              className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#F3E8FF] text-[#4C1D95] border border-[#4C1D95] dark:bg-[#1C1C1C] dark:text-[#C9C5B9] dark:border-[#C9C5B9]/40">
                    MED • 14 PROBLEMS
                  </span>
                  <Layers className="w-4 h-4 text-[#4C1D95] dark:text-[#A78BFA]" />
                </div>
                <h3 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                  Relational Joins
                </h3>
                <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9]">
                  Connect multiple tables with INNER, LEFT, CROSS & SELF JOINs.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between font-mono text-xs font-black text-[#4C1D95] dark:text-[#A78BFA]">
                <span>Start Track</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Track 4: Window Functions */}
            <div 
              onClick={() => onNavigate('questions', 35)}
              className="bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] p-6 shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#F3E8FF] text-[#7E22CE] border border-[#7E22CE] dark:bg-[#1C1C1C] dark:text-[#C9C5B9] dark:border-[#C9C5B9]/40">
                    HARD • 14 PROBLEMS
                  </span>
                  <Sparkles className="w-4 h-4 text-[#7C3AED] dark:text-[#A78BFA]" />
                </div>
                <h3 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                  Window Functions & CTEs
                </h3>
                <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9]">
                  Analytical RANK, DENSE_RANK, LEAD/LAG, and Common Table Expressions.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between font-mono text-xs font-black text-[#4C1D95] dark:text-[#A78BFA]">
                <span>Start Track</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HOW IT WORKS (3-STEP WORKFLOW)
          ========================================================================= */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-t-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 bg-[#F6F6F2] dark:bg-[#1C1C1C]">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase tracking-tight">
              HOW SQUIDQL WORKS
            </h2>
            <p className="font-mono text-sm sm:text-base text-[#4A4A48] dark:text-[#C9C5B9] max-w-lg mx-auto font-bold">
              Three seamless steps from opening the site to mastering interview queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] transition-colors space-y-3">
              <div className="font-display font-black text-4xl text-[#4C1D95] dark:text-[#A78BFA]">01</div>
              <h3 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                Pick a Challenge
              </h3>
              <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9] leading-relaxed font-bold">
                Select from 50+ real-world database problem prompts with explicit business criteria and schema descriptions.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] transition-colors space-y-3">
              <div className="font-display font-black text-4xl text-[#7C3AED] dark:text-[#C9C5B9]">02</div>
              <h3 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                Write in Monaco IDE
              </h3>
              <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9] leading-relaxed font-bold">
                Full-featured SQL editor with syntax coloring, autocompletion, shortcuts, and instant schema viewers.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#1C1C1C] border-3 border-[#1C1C1C] dark:border-[#C9C5B9] shadow-[4px_4px_0_0_#1C1C1C] dark:shadow-hard hover:border-[#4C1D95] dark:hover:border-[#A78BFA] transition-colors space-y-3">
              <div className="font-display font-black text-4xl text-[#059669] dark:text-[#A78BFA]">03</div>
              <h3 className="font-display font-black text-xl text-[#1C1C1C] dark:text-[#F4F4F0] uppercase">
                Validate & Level Up
              </h3>
              <p className="font-mono text-xs text-[#4A4A48] dark:text-[#C9C5B9] leading-relaxed font-bold">
                Compare row-level diffs with test cases, confirm your solution, and build up your problem-solving streak.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BOTTOM CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-t-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 bg-grain">
        <div className="max-w-4xl mx-auto">
          
          <div className="relative bg-white dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F4F4F0] border-3 sm:border-4 border-[#1C1C1C] dark:border-[#C9C5B9] p-8 sm:p-14 shadow-[8px_8px_0_0_#4C1D95] dark:shadow-[8px_8px_0_0_#A78BFA] text-center space-y-6 overflow-hidden">
            
            {/* Corner Decorative Grid Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#4C1D95]/10 dark:bg-[#A78BFA]/10 border-b-2 border-l-2 border-[#1C1C1C]/20 dark:border-[#C9C5B9]/20 transform rotate-45 translate-x-12 -translate-y-12 pointer-events-none" />

            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 bg-[#F3E8FF] text-[#4C1D95] dark:bg-[#581C87] dark:text-[#F4F4F0] border-2 border-[#1C1C1C] dark:border-[#A78BFA] px-3.5 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#1C1C1C] dark:shadow-hard-xs"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current stroke-current" />
              <span>ZERO SETUP REQUIRED</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-tight text-[#1C1C1C] dark:text-[#F4F4F0]">
              <span>STOP READING ABOUT SQL.</span>
              <br />
              <span className="inline-block text-[#4C1D95] dark:text-[#A78BFA] underline decoration-4 decoration-[#4C1D95]/60 dark:decoration-[#A78BFA]/60 mt-1">
                START WRITING IT.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="font-mono text-sm sm:text-base text-[#4A4A48] dark:text-[#C9C5B9] max-w-xl mx-auto font-bold leading-relaxed">
              Open the editor, run queries against real tables in milliseconds, and build the problem-solving reflexes needed for technical interviews.
            </p>

            {/* High-Contrast Action Button */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('questions')}
                className="btn-press bg-[#4C1D95] dark:bg-[#581C87] text-white hover:bg-[#3B0764] h-14 sm:h-16 px-8 sm:px-12 border-3 border-[#1C1C1C] dark:border-[#A78BFA] font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-[5px_5px_0_0_#1C1C1C] dark:shadow-hard inline-flex items-center gap-3 cursor-pointer transition-colors"
              >
                <span>OPEN SQL IDE NOW</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            <div className="font-mono text-[11px] text-[#6B7280] dark:text-[#C9C5B9] font-bold uppercase tracking-wider pt-2">
              50 PROBLEMS • ONE EDITOR • NO ACCOUNT NEEDED TO PRACTICE
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: MINIMAL FOOTER
          ========================================================================= */}
      <footer className="px-4 sm:px-8 py-8 border-t-2 border-[#1C1C1C] dark:border-[#C9C5B9]/30 bg-white dark:bg-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold text-[#4A4A48] dark:text-[#C9C5B9]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#4C1D95] dark:bg-[#A78BFA] border border-[#1C1C1C]" />
          <span className="font-black text-[#1C1C1C] dark:text-[#F4F4F0]">SQUIDQL</span>
          <span>— Write it. Run it. Prove it.</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('questions')} 
            className="hover:text-[#4C1D95] dark:hover:text-[#A78BFA] transition-colors cursor-pointer"
          >
            Problems
          </button>
          <button 
            onClick={() => onNavigate('resources')} 
            className="hover:text-[#4C1D95] dark:hover:text-[#A78BFA] transition-colors cursor-pointer"
          >
            Curriculum
          </button>
          <button 
            onClick={() => onNavigate('profile')} 
            className="hover:text-[#4C1D95] dark:hover:text-[#A78BFA] transition-colors cursor-pointer"
          >
            Profile
          </button>
        </div>
      </footer>

    </div>
  );
};
