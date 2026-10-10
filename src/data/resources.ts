export interface SqlResource {
  id: string;
  title: string;
  description: string;
  category: 'Structured Study Plan' | 'SQL Practice' | 'Interview Preparation' | 'Interactive Learning' | 'Practice and Fundamentals';
  level: 'Beginner' | 'Beginner to Intermediate' | 'Beginner to Advanced' | 'Intermediate to Advanced';
  action: string;
  destination: string;
  startingQuestionId?: number;
  tagline?: string;
  badgeColor?: string;
}

export const SQL_RESOURCES: SqlResource[] = [
  {
    id: 'leetcode-50',
    title: 'LeetCode SQL 50 Study Plan',
    description: 'A structured collection of 50 SQL questions covering essential SQL concepts for interview preparation.',
    category: 'Structured Study Plan',
    level: 'Beginner to Intermediate',
    action: 'Open Study Plan',
    destination: 'https://leetcode.com/studyplan/top-sql-50/',
    startingQuestionId: 1,
    tagline: '★ RECOMMENDED START',
    badgeColor: '#e8ff00',
  },
  {
    id: 'hackerrank-sql',
    title: 'HackerRank SQL',
    description: 'Practice SQL queries covering basic selection, aggregation, joins, and more advanced concepts.',
    category: 'SQL Practice',
    level: 'Beginner to Advanced',
    action: 'Explore HackerRank',
    destination: 'https://www.hackerrank.com/domains/sql',
    startingQuestionId: 1,
    badgeColor: '#5ec8ff',
  },
  {
    id: 'datalemur-sql',
    title: 'DataLemur SQL',
    description: 'Practice SQL interview questions focused on analytics, business problems, and data-related roles.',
    category: 'Interview Preparation',
    level: 'Beginner to Advanced',
    action: 'Explore DataLemur',
    destination: 'https://datalemur.com/questions',
    startingQuestionId: 21,
    badgeColor: '#ff5e8a',
  },
  {
    id: 'stratascratch',
    title: 'StrataScratch',
    description: 'Work through practical SQL interview challenges inspired by data science and analytics roles.',
    category: 'Interview Preparation',
    level: 'Intermediate to Advanced',
    action: 'Explore StrataScratch',
    destination: 'https://www.stratascratch.com/',
    startingQuestionId: 41,
    badgeColor: '#ffb800',
  },
  {
    id: 'sqlzoo',
    title: 'SQLZoo',
    description: 'Learn and practice SQL through interactive tutorials and exercises.',
    category: 'Interactive Learning',
    level: 'Beginner to Intermediate',
    action: 'Explore SQLZoo',
    destination: 'https://sqlzoo.net/',
    startingQuestionId: 1,
    badgeColor: '#5ec8ff',
  },
  {
    id: 'w3schools-sql',
    title: 'W3Schools SQL Exercises',
    description: 'Practice SQL fundamentals through accessible exercises designed for learners.',
    category: 'Practice and Fundamentals',
    level: 'Beginner',
    action: 'Explore SQL Exercises',
    destination: 'https://www.w3schools.com/sql/sql_exercises.asp',
    startingQuestionId: 1,
    badgeColor: '#a8ff53',
  },
];
