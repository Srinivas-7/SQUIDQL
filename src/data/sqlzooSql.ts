import type { Challenge } from '../types';

export const SQLZOO_SQL_CHALLENGES: Challenge[] = [
  // ==========================================
  // 1. SELECT BASICS (401 - 404)
  // ==========================================
  {
    id: 401,
    track: 'sqlzoo',
    section: 'SELECT Basics',
    level: 1,
    levelTitle: 'SQLZOO',
    title: 'World Population and Area Selection',
    difficulty: 'Easy',
    concepts: ['WHERE', 'IN'],
    description: 'Show the name and the population for France, Germany, and Italy.',
    schemaDescription: 'world (name, continent, area, population, gdp)',
    tables: [
      {
        name: 'world',
        description: 'World countries dataset',
        columns: [
          { name: 'name', type: 'VARCHAR(50)', primaryKey: true },
          { name: 'continent', type: 'VARCHAR(50)' },
          { name: 'area', type: 'INT' },
          { name: 'population', type: 'INT' },
          { name: 'gdp', type: 'BIGINT' }
        ],
        seedData: [
          { name: 'France', continent: 'Europe', area: 551500, population: 65906000, gdp: 2612878000000 },
          { name: 'Germany', continent: 'Europe', area: 357022, population: 80716000, gdp: 3730267000000 },
          { name: 'Italy', continent: 'Europe', area: 301338, population: 59831000, gdp: 2144303000000 },
          { name: 'Spain', continent: 'Europe', area: 505992, population: 46704314, gdp: 1358308000000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT name, population FROM world WHERE name IN ('France', 'Germany', 'Italy');",
    hints: ["Use `WHERE name IN ('France', 'Germany', 'Italy')`."],
    xp: 100
  },
  {
    id: 402,
    track: 'sqlzoo',
    section: 'SELECT Basics',
    level: 1,
    levelTitle: 'SQLZOO',
    title: 'Per Capita GDP of Europe',
    difficulty: 'Easy',
    concepts: ['ARITHMETIC', 'WHERE'],
    description: 'Give the name and the per capita GDP for those countries with a GDP of at least one trillion (1000000000000) in Europe.',
    schemaDescription: 'world (name, continent, area, population, gdp)',
    tables: [
      {
        name: 'world',
        description: 'World countries dataset',
        columns: [
          { name: 'name', type: 'VARCHAR(50)', primaryKey: true },
          { name: 'continent', type: 'VARCHAR(50)' },
          { name: 'area', type: 'INT' },
          { name: 'population', type: 'INT' },
          { name: 'gdp', type: 'BIGINT' }
        ],
        seedData: [
          { name: 'Germany', continent: 'Europe', area: 357022, population: 80716000, gdp: 3730267000000 },
          { name: 'France', continent: 'Europe', area: 551500, population: 65906000, gdp: 2612878000000 },
          { name: 'Iceland', continent: 'Europe', area: 103000, population: 330000, gdp: 17000000000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT name, gdp/population AS per_capita_gdp FROM world WHERE continent = 'Europe' AND gdp >= 1000000000000;",
    hints: ["Calculate `gdp/population` with `WHERE continent = 'Europe' AND gdp >= 1000000000000`."],
    xp: 100
  },
  {
    id: 403,
    track: 'sqlzoo',
    section: 'SELECT Basics',
    level: 1,
    levelTitle: 'SQLZOO',
    title: 'Scandinavia Countries',
    difficulty: 'Easy',
    concepts: ['WHERE IN'],
    description: 'Show the name and the population for Sweden, Norway, and Denmark.',
    schemaDescription: 'world (name, continent, population)',
    tables: [
      {
        name: 'world',
        description: 'Countries',
        columns: [
          { name: 'name', type: 'VARCHAR(50)', primaryKey: true },
          { name: 'population', type: 'INT' }
        ],
        seedData: [
          { name: 'Sweden', population: 9600000 },
          { name: 'Norway', population: 5100000 },
          { name: 'Denmark', population: 5600000 },
          { name: 'Finland', population: 5400000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT name, population FROM world WHERE name IN ('Sweden', 'Norway', 'Denmark');",
    hints: ["Filter with `IN ('Sweden', 'Norway', 'Denmark')`."],
    xp: 100
  },
  {
    id: 404,
    track: 'sqlzoo',
    section: 'SELECT Basics',
    level: 1,
    levelTitle: 'SQLZOO',
    title: 'Just the Right Size',
    difficulty: 'Easy',
    concepts: ['BETWEEN'],
    description: 'Show the name and the area for countries that have an area between 200,000 and 250,000 sq km.',
    schemaDescription: 'world (name, area)',
    tables: [
      {
        name: 'world',
        description: 'World areas',
        columns: [
          { name: 'name', type: 'VARCHAR(50)', primaryKey: true },
          { name: 'area', type: 'INT' }
        ],
        seedData: [
          { name: 'United Kingdom', area: 242900 },
          { name: 'Romania', area: 238391 },
          { name: 'France', area: 551500 },
          { name: 'Algeria', area: 2381741 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT name, area FROM world WHERE area BETWEEN 200000 AND 250000;',
    hints: ['Use `BETWEEN 200000 AND 250000`.'],
    xp: 100
  },

  // ==========================================
  // 2. SELECT FROM WORLD & NOBEL (405 - 412)
  // ==========================================
  {
    id: 405,
    track: 'sqlzoo',
    section: 'SELECT from Nobel',
    level: 2,
    levelTitle: 'SQLZOO',
    title: '1950 Nobel Laureates',
    difficulty: 'Easy',
    concepts: ['WHERE', 'EQUALITY'],
    description: 'Change the query shown to display Nobel prizes for 1950.',
    schemaDescription: 'nobel (yr, subject, winner)',
    tables: [
      {
        name: 'nobel',
        description: 'Nobel prizes log',
        columns: [
          { name: 'yr', type: 'INT' },
          { name: 'subject', type: 'VARCHAR(50)' },
          { name: 'winner', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { yr: 1950, subject: 'Physics', winner: 'Cecil Powell' },
          { yr: 1950, subject: 'Chemistry', winner: 'Otto Diels' },
          { yr: 1950, subject: 'Peace', winner: 'Ralph Bunche' },
          { yr: 1951, subject: 'Physics', winner: 'John Cockcroft' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT yr, subject, winner FROM nobel WHERE yr = 1950;',
    hints: ['Filter with `WHERE yr = 1950`.'],
    xp: 100
  },
  {
    id: 406,
    track: 'sqlzoo',
    section: 'SELECT from Nobel',
    level: 2,
    levelTitle: 'SQLZOO',
    title: '1962 Literature Prize',
    difficulty: 'Easy',
    concepts: ['AND', 'STRINGS'],
    description: 'Show who won the 1962 prize for Literature.',
    schemaDescription: 'nobel (yr, subject, winner)',
    tables: [
      {
        name: 'nobel',
        description: 'Nobel prizes log',
        columns: [
          { name: 'yr', type: 'INT' },
          { name: 'subject', type: 'VARCHAR(50)' },
          { name: 'winner', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { yr: 1962, subject: 'Literature', winner: 'John Steinbeck' },
          { yr: 1962, subject: 'Peace', winner: 'Linus Pauling' },
          { yr: 1961, subject: 'Literature', winner: 'Ivo Andric' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT winner FROM nobel WHERE yr = 1962 AND subject = 'Literature';",
    hints: ["Use `yr = 1962 AND subject = 'Literature'`."],
    xp: 100
  },
  {
    id: 407,
    track: 'sqlzoo',
    section: 'SELECT from Nobel',
    level: 2,
    levelTitle: 'SQLZOO',
    title: 'Albert Einstein Prize',
    difficulty: 'Easy',
    concepts: ['WHERE'],
    description: 'Show the year and subject that won Albert Einstein his prize.',
    schemaDescription: 'nobel (yr, subject, winner)',
    tables: [
      {
        name: 'nobel',
        description: 'Nobel prizes log',
        columns: [
          { name: 'yr', type: 'INT' },
          { name: 'subject', type: 'VARCHAR(50)' },
          { name: 'winner', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { yr: 1921, subject: 'Physics', winner: 'Albert Einstein' },
          { yr: 1922, subject: 'Physics', winner: 'Niels Bohr' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT yr, subject FROM nobel WHERE winner = 'Albert Einstein';",
    hints: ["Filter `WHERE winner = 'Albert Einstein'`."],
    xp: 100
  },
  {
    id: 408,
    track: 'sqlzoo',
    section: 'SELECT from Nobel',
    level: 2,
    levelTitle: 'SQLZOO',
    title: 'Peace Winners Since 2000',
    difficulty: 'Easy',
    concepts: ['WHERE', 'COMPARISON'],
    description: 'Give the name of the Peace winners since the year 2000, including 2000.',
    schemaDescription: 'nobel (yr, subject, winner)',
    tables: [
      {
        name: 'nobel',
        description: 'Nobel prizes log',
        columns: [
          { name: 'yr', type: 'INT' },
          { name: 'subject', type: 'VARCHAR(50)' },
          { name: 'winner', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { yr: 2000, subject: 'Peace', winner: 'Kim Dae-jung' },
          { yr: 2001, subject: 'Peace', winner: 'Kofi Annan' },
          { yr: 1999, subject: 'Peace', winner: 'Doctors Without Borders' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT winner FROM nobel WHERE subject = 'Peace' AND yr >= 2000;",
    hints: ["Filter `subject = 'Peace' AND yr >= 2000`."],
    xp: 100
  },
  {
    id: 409,
    track: 'sqlzoo',
    section: 'SELECT from Nobel',
    level: 2,
    levelTitle: 'SQLZOO',
    title: 'Presidential Winners',
    difficulty: 'Easy',
    concepts: ['IN'],
    description: 'Show all details (yr, subject, winner) of the presidential winners: Theodore Roosevelt, Woodrow Wilson, Jimmy Carter, Barack Obama.',
    schemaDescription: 'nobel (yr, subject, winner)',
    tables: [
      {
        name: 'nobel',
        description: 'Nobel prizes',
        columns: [
          { name: 'yr', type: 'INT' },
          { name: 'subject', type: 'VARCHAR(50)' },
          { name: 'winner', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { yr: 1906, subject: 'Peace', winner: 'Theodore Roosevelt' },
          { yr: 1919, subject: 'Peace', winner: 'Woodrow Wilson' },
          { yr: 2002, subject: 'Peace', winner: 'Jimmy Carter' },
          { yr: 2009, subject: 'Peace', winner: 'Barack Obama' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT * FROM nobel WHERE winner IN ('Theodore Roosevelt', 'Woodrow Wilson', 'Jimmy Carter', 'Barack Obama');",
    hints: ['Use `IN` list.'],
    xp: 100
  },

  // ==========================================
  // 3. JOIN OPERATIONS (UEFA EURO 2012) (410 - 418)
  // ==========================================
  {
    id: 410,
    track: 'sqlzoo',
    section: 'JOIN Operations',
    level: 3,
    levelTitle: 'SQLZOO',
    title: 'Euro 2012 Goals by Germany',
    difficulty: 'Medium',
    concepts: ['JOIN', 'WHERE'],
    description: "Show the matchid and player name for all goals scored by Germany (teamid = 'GER').",
    schemaDescription: 'game (id, mdate, stadium, team1, team2), goal (matchid, teamid, player, gtime)',
    tables: [
      {
        name: 'game',
        description: 'Euro 2012 fixtures',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'mdate', type: 'DATE' },
          { name: 'stadium', type: 'VARCHAR(50)' },
          { name: 'team1', type: 'VARCHAR(10)' },
          { name: 'team2', type: 'VARCHAR(10)' }
        ],
        seedData: [
          { id: 1001, mdate: '2012-06-08', stadium: 'National Stadium, Warsaw', team1: 'POL', team2: 'GRE' },
          { id: 1002, mdate: '2012-06-09', stadium: 'Arena Lviv', team1: 'GER', team2: 'POR' }
        ]
      },
      {
        name: 'goal',
        description: 'Goals recorded',
        columns: [
          { name: 'matchid', type: 'INT' },
          { name: 'teamid', type: 'VARCHAR(10)' },
          { name: 'player', type: 'VARCHAR(50)' },
          { name: 'gtime', type: 'INT' }
        ],
        seedData: [
          { matchid: 1001, teamid: 'POL', player: 'Robert Lewandowski', gtime: 17 },
          { matchid: 1002, teamid: 'GER', player: 'Mario Gomez', gtime: 72 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT matchid, player FROM goal WHERE teamid = 'GER';",
    hints: ["Filter `teamid = 'GER'`."],
    xp: 120
  },
  {
    id: 411,
    track: 'sqlzoo',
    section: 'JOIN Operations',
    level: 3,
    levelTitle: 'SQLZOO',
    title: 'Mario Gomez Matches',
    difficulty: 'Medium',
    concepts: ['JOIN', 'EQUALITY'],
    description: "Show id, stadium, team1, team2 for game 1012 or matches where Mario Gomez scored.",
    schemaDescription: 'game (id, mdate, stadium, team1, team2), goal (matchid, teamid, player, gtime)',
    tables: [
      {
        name: 'game',
        description: 'Games',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'mdate', type: 'DATE' },
          { name: 'stadium', type: 'VARCHAR(50)' },
          { name: 'team1', type: 'VARCHAR(10)' },
          { name: 'team2', type: 'VARCHAR(10)' }
        ],
        seedData: [
          { id: 1002, mdate: '2012-06-09', stadium: 'Arena Lviv', team1: 'GER', team2: 'POR' },
          { id: 1003, mdate: '2012-06-10', stadium: 'Metalist Stadium', team1: 'NED', team2: 'DEN' }
        ]
      },
      {
        name: 'goal',
        description: 'Goals',
        columns: [
          { name: 'matchid', type: 'INT' },
          { name: 'teamid', type: 'VARCHAR(10)' },
          { name: 'player', type: 'VARCHAR(50)' },
          { name: 'gtime', type: 'INT' }
        ],
        seedData: [
          { matchid: 1002, teamid: 'GER', player: 'Mario Gomez', gtime: 72 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT g.id, g.stadium, g.team1, g.team2 FROM game g JOIN goal go ON g.id = go.matchid WHERE go.player = 'Mario Gomez';",
    hints: ["Join game on `g.id = go.matchid` where `player = 'Mario Gomez'`."],
    xp: 150
  },
  {
    id: 412,
    track: 'sqlzoo',
    section: 'JOIN Operations',
    level: 3,
    levelTitle: 'SQLZOO',
    title: 'Every Match With German Goals',
    difficulty: 'Medium',
    concepts: ['JOIN', 'WHERE'],
    description: "Show player, teamid, stadium and mdate for every German goal (teamid = 'GER').",
    schemaDescription: 'game (id, mdate, stadium, team1, team2), goal (matchid, teamid, player, gtime)',
    tables: [
      {
        name: 'game',
        description: 'Games',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'mdate', type: 'DATE' },
          { name: 'stadium', type: 'VARCHAR(50)' },
          { name: 'team1', type: 'VARCHAR(10)' },
          { name: 'team2', type: 'VARCHAR(10)' }
        ],
        seedData: [
          { id: 1002, mdate: '2012-06-09', stadium: 'Arena Lviv', team1: 'GER', team2: 'POR' }
        ]
      },
      {
        name: 'goal',
        description: 'Goals',
        columns: [
          { name: 'matchid', type: 'INT' },
          { name: 'teamid', type: 'VARCHAR(10)' },
          { name: 'player', type: 'VARCHAR(50)' },
          { name: 'gtime', type: 'INT' }
        ],
        seedData: [
          { matchid: 1002, teamid: 'GER', player: 'Mario Gomez', gtime: 72 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT go.player, go.teamid, g.stadium, g.mdate FROM game g JOIN goal go ON g.id = go.matchid WHERE go.teamid = 'GER';",
    hints: ["Join `game` and `goal` on `id = matchid` and filter `teamid = 'GER'`."],
    xp: 150
  },
  {
    id: 413,
    track: 'sqlzoo',
    section: 'JOIN Operations',
    level: 3,
    levelTitle: 'SQLZOO',
    title: 'Stadiums and Goals Scored',
    difficulty: 'Medium',
    concepts: ['GROUP BY', 'COUNT', 'JOIN'],
    description: 'For every stadium, show the stadium and the total number of goals scored there. Order by total goals descending.',
    schemaDescription: 'game (id, stadium), goal (matchid)',
    tables: [
      {
        name: 'game',
        description: 'Euro matches',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'stadium', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { id: 1001, stadium: 'National Stadium, Warsaw' },
          { id: 1002, stadium: 'Arena Lviv' },
          { id: 1003, stadium: 'Arena Lviv' }
        ]
      },
      {
        name: 'goal',
        description: 'Goal records',
        columns: [
          { name: 'matchid', type: 'INT' }
        ],
        seedData: [
          { matchid: 1001 },
          { matchid: 1002 },
          { matchid: 1003 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT g.stadium, COUNT(go.matchid) AS goals FROM game g JOIN goal go ON g.id = go.matchid GROUP BY g.stadium ORDER BY goals DESC;',
    hints: ['Join game and goal, group by stadium, and count goals.'],
    xp: 150
  },

  // ==========================================
  // 4. MORE JOINS - MOVIE DATABASE (414 - 420)
  // ==========================================
  {
    id: 414,
    track: 'sqlzoo',
    section: 'Movie Database JOINs',
    level: 4,
    levelTitle: 'SQLZOO',
    title: 'Citizen Kane Release Year',
    difficulty: 'Easy',
    concepts: ['WHERE'],
    description: "Give year of 'Citizen Kane'.",
    schemaDescription: 'movie (id, title, yr, director, budget, gross)',
    tables: [
      {
        name: 'movie',
        description: 'Films',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'title', type: 'VARCHAR(100)' },
          { name: 'yr', type: 'INT' }
        ],
        seedData: [
          { id: 1, title: 'Citizen Kane', yr: 1941 },
          { id: 2, title: 'Casablanca', yr: 1942 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT yr FROM movie WHERE title = 'Citizen Kane';",
    hints: ["Use `WHERE title = 'Citizen Kane'`."],
    xp: 100
  },
  {
    id: 415,
    track: 'sqlzoo',
    section: 'Movie Database JOINs',
    level: 4,
    levelTitle: 'SQLZOO',
    title: 'Star Trek Movies',
    difficulty: 'Easy',
    concepts: ['LIKE', 'ORDER BY'],
    description: "List all of the Star Trek movies, include the id, title and yr (all of these movies include the words 'Star Trek' in the title). Order results by year.",
    schemaDescription: 'movie (id, title, yr)',
    tables: [
      {
        name: 'movie',
        description: 'Films',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'title', type: 'VARCHAR(100)' },
          { name: 'yr', type: 'INT' }
        ],
        seedData: [
          { id: 1, title: 'Star Trek: The Motion Picture', yr: 1979 },
          { id: 2, title: 'Star Trek II: The Wrath of Khan', yr: 1982 },
          { id: 3, title: 'Blade Runner', yr: 1982 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT id, title, yr FROM movie WHERE title LIKE '%Star Trek%' ORDER BY yr ASC;",
    hints: ["Use `WHERE title LIKE '%Star Trek%' ORDER BY yr ASC`."],
    xp: 100
  },
  {
    id: 416,
    track: 'sqlzoo',
    section: 'Movie Database JOINs',
    level: 4,
    levelTitle: 'SQLZOO',
    title: 'Alien Cast List',
    difficulty: 'Medium',
    concepts: ['JOIN', 'MULTI-JOIN'],
    description: "Obtain the cast list for the film 'Alien'. Output actor name.",
    schemaDescription: 'movie (id, title), actor (id, name), casting (movieid, actorid, ord)',
    tables: [
      {
        name: 'movie',
        description: 'Movies',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'title', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { id: 1, title: 'Alien' },
          { id: 2, title: 'Titanic' }
        ]
      },
      {
        name: 'actor',
        description: 'Actors',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { id: 101, name: 'Sigourney Weaver' },
          { id: 102, name: 'Tom Skerritt' },
          { id: 103, name: 'Leonardo DiCaprio' }
        ]
      },
      {
        name: 'casting',
        description: 'Movie cast mappings',
        columns: [
          { name: 'movieid', type: 'INT' },
          { name: 'actorid', type: 'INT' },
          { name: 'ord', type: 'INT' }
        ],
        seedData: [
          { movieid: 1, actorid: 101, ord: 1 },
          { movieid: 1, actorid: 102, ord: 2 },
          { movieid: 2, actorid: 103, ord: 1 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT a.name FROM actor a JOIN casting c ON a.id = c.actorid JOIN movie m ON c.movieid = m.id WHERE m.title = 'Alien' ORDER BY c.ord ASC;",
    hints: ["Join `actor`, `casting`, and `movie` where `m.title = 'Alien'`."],
    xp: 150
  },
  {
    id: 417,
    track: 'sqlzoo',
    section: 'Movie Database JOINs',
    level: 4,
    levelTitle: 'SQLZOO',
    title: 'Lead Actor in Casablanca',
    difficulty: 'Medium',
    concepts: ['JOIN', 'ORD'],
    description: "Obtain the name of the leading actor (ord=1) for 'Casablanca'.",
    schemaDescription: 'movie (id, title), actor (id, name), casting (movieid, actorid, ord)',
    tables: [
      {
        name: 'movie',
        description: 'Movies',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'title', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { id: 1, title: 'Casablanca' }
        ]
      },
      {
        name: 'actor',
        description: 'Actors',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { id: 101, name: 'Humphrey Bogart' },
          { id: 102, name: 'Ingrid Bergman' }
        ]
      },
      {
        name: 'casting',
        description: 'Casting entries',
        columns: [
          { name: 'movieid', type: 'INT' },
          { name: 'actorid', type: 'INT' },
          { name: 'ord', type: 'INT' }
        ],
        seedData: [
          { movieid: 1, actorid: 101, ord: 1 },
          { movieid: 1, actorid: 102, ord: 2 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT a.name FROM actor a JOIN casting c ON a.id = c.actorid JOIN movie m ON c.movieid = m.id WHERE m.title = 'Casablanca' AND c.ord = 1;",
    hints: ["Filter `m.title = 'Casablanca' AND c.ord = 1`."],
    xp: 150
  },
  {
    id: 418,
    track: 'sqlzoo',
    section: 'Movie Database JOINs',
    level: 4,
    levelTitle: 'SQLZOO',
    title: 'Busy Years for Rock Hudson',
    difficulty: 'Hard',
    concepts: ['GROUP BY', 'HAVING', 'COUNT'],
    description: "Which were the busiest years for 'Rock Hudson'? Show the year and the number of movies he made each year for any year in which he made more than 2 movies.",
    schemaDescription: 'movie (id, title, yr), actor (id, name), casting (movieid, actorid)',
    tables: [
      {
        name: 'movie',
        description: 'Movie list',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'title', type: 'VARCHAR(100)' },
          { name: 'yr', type: 'INT' }
        ],
        seedData: [
          { id: 1, title: 'Has Anybody Seen My Gal?', yr: 1952 },
          { id: 2, title: 'Scarlet Angel', yr: 1952 },
          { id: 3, title: 'Horizons West', yr: 1952 },
          { id: 4, title: 'Seminole', yr: 1953 }
        ]
      },
      {
        name: 'actor',
        description: 'Actors',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { id: 10, name: 'Rock Hudson' }
        ]
      },
      {
        name: 'casting',
        description: 'Casting table',
        columns: [
          { name: 'movieid', type: 'INT' },
          { name: 'actorid', type: 'INT' }
        ],
        seedData: [
          { movieid: 1, actorid: 10 },
          { movieid: 2, actorid: 10 },
          { movieid: 3, actorid: 10 },
          { movieid: 4, actorid: 10 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT m.yr, COUNT(m.title) AS movie_count FROM movie m JOIN casting c ON m.id = c.movieid JOIN actor a ON c.actorid = a.id WHERE a.name = 'Rock Hudson' GROUP BY m.yr HAVING COUNT(m.title) > 2;",
    hints: ["Filter by `a.name = 'Rock Hudson'`, group by `yr`, and filter with `HAVING COUNT(m.title) > 2`."],
    xp: 200
  }
];
