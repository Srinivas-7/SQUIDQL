import type { Challenge } from '../types';

export const HACKERRANK_SQL_CHALLENGES: Challenge[] = [
  // ==========================================
  // 1. BASIC SELECT (101 - 120)
  // ==========================================
  {
    id: 101,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Revising the Select Query I',
    difficulty: 'Easy',
    concepts: ['WHERE', 'AND'],
    description: 'Query all columns for all American cities in the CITY table with populations larger than 100,000. CountryCode for America is USA.',
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World city demographics',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 6, NAME: 'Rotterdam', COUNTRYCODE: 'NLD', DISTRICT: 'Zuid-Holland', POPULATION: 593321 },
          { ID: 3878, NAME: 'Scottsdale', COUNTRYCODE: 'USA', DISTRICT: 'Arizona', POPULATION: 202705 },
          { ID: 3965, NAME: 'Corona', COUNTRYCODE: 'USA', DISTRICT: 'California', POPULATION: 124966 },
          { ID: 3973, NAME: 'Concord', COUNTRYCODE: 'USA', DISTRICT: 'California', POPULATION: 121780 },
          { ID: 3977, NAME: 'Cedar Rapids', COUNTRYCODE: 'USA', DISTRICT: 'Iowa', POPULATION: 120758 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT * FROM CITY WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000;",
    hints: ["Filter with `COUNTRYCODE = 'USA' AND POPULATION > 100000`."],
    xp: 100
  },
  {
    id: 102,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Revising the Select Query II',
    difficulty: 'Easy',
    concepts: ['SELECT NAME', 'WHERE', 'AND'],
    description: 'Query the NAME field for all American cities in the CITY table with populations larger than 120,000. CountryCode for America is USA.',
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World city demographics',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 3878, NAME: 'Scottsdale', COUNTRYCODE: 'USA', DISTRICT: 'Arizona', POPULATION: 202705 },
          { ID: 3965, NAME: 'Corona', COUNTRYCODE: 'USA', DISTRICT: 'California', POPULATION: 124966 },
          { ID: 3973, NAME: 'Concord', COUNTRYCODE: 'USA', DISTRICT: 'California', POPULATION: 121780 },
          { ID: 3977, NAME: 'Cedar Rapids', COUNTRYCODE: 'USA', DISTRICT: 'Iowa', POPULATION: 110000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT NAME FROM CITY WHERE COUNTRYCODE = 'USA' AND POPULATION > 120000;",
    hints: ["Select only `NAME` with `WHERE COUNTRYCODE = 'USA' AND POPULATION > 120000`."],
    xp: 100
  },
  {
    id: 103,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Select All',
    difficulty: 'Easy',
    concepts: ['SELECT *'],
    description: 'Query all columns (attributes) for every row in the CITY table.',
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World city demographics',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, NAME: 'Tokyo', COUNTRYCODE: 'JPN', DISTRICT: 'Tokyo-to', POPULATION: 8000000 },
          { ID: 2, NAME: 'New York', COUNTRYCODE: 'USA', DISTRICT: 'New York', POPULATION: 8500000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT * FROM CITY;',
    hints: ['Select all with `SELECT * FROM CITY;`.'],
    xp: 100
  },
  {
    id: 104,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Select By ID',
    difficulty: 'Easy',
    concepts: ['WHERE ID'],
    description: 'Query all columns for a city in CITY with the ID 1661.',
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World city demographics',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1661, NAME: 'Sayama', COUNTRYCODE: 'JPN', DISTRICT: 'Saitama', POPULATION: 162472 },
          { ID: 1662, NAME: 'Kariya', COUNTRYCODE: 'JPN', DISTRICT: 'Aichi', POPULATION: 132000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT * FROM CITY WHERE ID = 1661;',
    hints: ['Filter with `WHERE ID = 1661`.'],
    xp: 100
  },
  {
    id: 105,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: "Japanese Cities' Attributes",
    difficulty: 'Easy',
    concepts: ['WHERE COUNTRYCODE'],
    description: "Query all attributes of every Japanese city in the CITY table. The COUNTRYCODE for Japan is JPN.",
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World city demographics',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1613, NAME: 'Neyagawa', COUNTRYCODE: 'JPN', DISTRICT: 'Osaka', POPULATION: 257315 },
          { ID: 1630, NAME: 'Ageo', COUNTRYCODE: 'JPN', DISTRICT: 'Saitama', POPULATION: 209442 },
          { ID: 3878, NAME: 'Scottsdale', COUNTRYCODE: 'USA', DISTRICT: 'Arizona', POPULATION: 202705 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT * FROM CITY WHERE COUNTRYCODE = 'JPN';",
    hints: ["Use `WHERE COUNTRYCODE = 'JPN'`."],
    xp: 100
  },
  {
    id: 106,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: "Japanese Cities' Names",
    difficulty: 'Easy',
    concepts: ['SELECT NAME', 'WHERE COUNTRYCODE'],
    description: "Query the names of all the Japanese cities in the CITY table. The COUNTRYCODE for Japan is JPN.",
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World city demographics',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1613, NAME: 'Neyagawa', COUNTRYCODE: 'JPN', DISTRICT: 'Osaka', POPULATION: 257315 },
          { ID: 1630, NAME: 'Ageo', COUNTRYCODE: 'JPN', DISTRICT: 'Saitama', POPULATION: 209442 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT NAME FROM CITY WHERE COUNTRYCODE = 'JPN';",
    hints: ["Select `NAME` where `COUNTRYCODE = 'JPN'`."],
    xp: 100
  },
  {
    id: 107,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 1',
    difficulty: 'Easy',
    concepts: ['SELECT', 'PROJECTION'],
    description: 'Query a list of CITY and STATE from the STATION table.',
    schemaDescription: 'STATION (ID, CITY, STATE, LAT_N, LONG_W)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' },
          { name: 'STATE', type: 'VARCHAR(2)' },
          { name: 'LAT_N', type: 'DECIMAL(7,4)' },
          { name: 'LONG_W', type: 'DECIMAL(7,4)' }
        ],
        seedData: [
          { ID: 794, CITY: 'Kissee Mills', STATE: 'MO', LAT_N: 139.6503, LONG_W: 73.4159 },
          { ID: 824, CITY: 'Loma Mar', STATE: 'CA', LAT_N: 48.6978, LONG_W: 130.5393 },
          { ID: 603, CITY: 'Sandy Hook', STATE: 'CT', LAT_N: 72.4812, LONG_W: 148.2407 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT CITY, STATE FROM STATION;',
    hints: ['Select the CITY and STATE columns.'],
    xp: 100
  },
  {
    id: 108,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 3',
    difficulty: 'Easy',
    concepts: ['DISTINCT', 'MODULO'],
    description: 'Query a list of CITY names from STATION for cities that have an even ID number. Exclude duplicates from your answer.',
    schemaDescription: 'STATION (ID, CITY, STATE, LAT_N, LONG_W)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' },
          { name: 'STATE', type: 'VARCHAR(2)' }
        ],
        seedData: [
          { ID: 2, CITY: 'Austin', STATE: 'TX' },
          { ID: 3, CITY: 'Dallas', STATE: 'TX' },
          { ID: 4, CITY: 'Austin', STATE: 'TX' },
          { ID: 6, CITY: 'Miami', STATE: 'FL' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT DISTINCT CITY FROM STATION WHERE ID % 2 = 0;',
    hints: ['Use `DISTINCT CITY` and filter `ID % 2 = 0`.'],
    xp: 100
  },
  {
    id: 109,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 4',
    difficulty: 'Easy',
    concepts: ['COUNT', 'COUNT(DISTINCT)'],
    description: 'Find the difference between the total number of CITY entries in the table and the number of distinct CITY entries in the table.',
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'New York' },
          { ID: 2, CITY: 'New York' },
          { ID: 3, CITY: 'Bengaluru' },
          { ID: 4, CITY: 'London' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT COUNT(CITY) - COUNT(DISTINCT CITY) FROM STATION;',
    hints: ['Compute `COUNT(CITY) - COUNT(DISTINCT CITY)`.'],
    xp: 100
  },
  {
    id: 110,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 5',
    difficulty: 'Easy',
    concepts: ['LENGTH', 'ORDER BY', 'LIMIT'],
    description: 'Query the two cities in STATION with the shortest and longest CITY names, as well as their respective lengths (i.e.: number of characters in the name). If there is more than one smallest or largest city, choose the one that comes first alphabetically.',
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'AMO' },
          { ID: 2, CITY: 'LEE' },
          { ID: 3, CITY: 'Marine On Saint Croix' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) ASC, CITY ASC LIMIT 1; SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) DESC, CITY ASC LIMIT 1;",
    hints: ['Order by `LENGTH(CITY)` and `CITY` with `LIMIT 1`.'],
    xp: 150
  },
  {
    id: 111,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 6',
    difficulty: 'Easy',
    concepts: ['LIKE', 'OR', 'SUBSTR'],
    description: "Query the list of CITY names starting with vowels (i.e., 'a', 'e', 'i', 'o', or 'u') from STATION. Your result cannot contain duplicates.",
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'Acme' },
          { ID: 2, CITY: 'Oslo' },
          { ID: 3, CITY: 'Berlin' },
          { ID: 4, CITY: 'Indianapolis' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT CITY FROM STATION WHERE LOWER(SUBSTR(CITY, 1, 1)) IN ('a', 'e', 'i', 'o', 'u');",
    hints: ["Check the first character with `SUBSTR(CITY, 1, 1) IN ('a', 'e', 'i', 'o', 'u')`."],
    xp: 100
  },
  {
    id: 112,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 7',
    difficulty: 'Easy',
    concepts: ['LIKE', 'SUBSTR'],
    description: "Query the list of CITY names ending with vowels (a, e, i, o, u) from STATION. Your result cannot contain duplicates.",
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'Roma' },
          { ID: 2, CITY: 'Oslo' },
          { ID: 3, CITY: 'Paris' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT CITY FROM STATION WHERE LOWER(SUBSTR(CITY, -1, 1)) IN ('a', 'e', 'i', 'o', 'u');",
    hints: ["Check ending letter with `SUBSTR(CITY, -1, 1)`."],
    xp: 100
  },
  {
    id: 113,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 8',
    difficulty: 'Easy',
    concepts: ['SUBSTR', 'AND'],
    description: "Query the list of CITY names from STATION which have vowels (a, e, i, o, u) as both their first and last characters. Your result cannot contain duplicates.",
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'Oslo' },
          { ID: 2, CITY: 'Acme' },
          { ID: 3, CITY: 'Berlin' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT CITY FROM STATION WHERE LOWER(SUBSTR(CITY, 1, 1)) IN ('a', 'e', 'i', 'o', 'u') AND LOWER(SUBSTR(CITY, -1, 1)) IN ('a', 'e', 'i', 'o', 'u');",
    hints: ["Combine first and last vowel conditions with `AND`."],
    xp: 100
  },
  {
    id: 114,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 9',
    difficulty: 'Easy',
    concepts: ['NOT IN', 'SUBSTR'],
    description: "Query the list of CITY names from STATION that do not start with vowels. Your result cannot contain duplicates.",
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'Berlin' },
          { ID: 2, CITY: 'Paris' },
          { ID: 3, CITY: 'Oslo' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT CITY FROM STATION WHERE LOWER(SUBSTR(CITY, 1, 1)) NOT IN ('a', 'e', 'i', 'o', 'u');",
    hints: ["Use `NOT IN ('a', 'e', 'i', 'o', 'u')`."],
    xp: 100
  },
  {
    id: 115,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 10',
    difficulty: 'Easy',
    concepts: ['NOT IN', 'SUBSTR'],
    description: "Query the list of CITY names from STATION that do not end with vowels. Your result cannot contain duplicates.",
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'Berlin' },
          { ID: 2, CITY: 'Roma' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT CITY FROM STATION WHERE LOWER(SUBSTR(CITY, -1, 1)) NOT IN ('a', 'e', 'i', 'o', 'u');",
    hints: ["Filter `SUBSTR(CITY, -1, 1) NOT IN (...)`."],
    xp: 100
  },
  {
    id: 116,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 11',
    difficulty: 'Easy',
    concepts: ['OR', 'NOT IN'],
    description: "Query the list of CITY names from STATION that either do not start with vowels OR do not end with vowels. Your result cannot contain duplicates.",
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'Berlin' },
          { ID: 2, CITY: 'Oslo' },
          { ID: 3, CITY: 'Miami' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT CITY FROM STATION WHERE LOWER(SUBSTR(CITY, 1, 1)) NOT IN ('a', 'e', 'i', 'o', 'u') OR LOWER(SUBSTR(CITY, -1, 1)) NOT IN ('a', 'e', 'i', 'o', 'u');",
    hints: ["Combine non-starting OR non-ending with `OR`."],
    xp: 100
  },
  {
    id: 117,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 12',
    difficulty: 'Easy',
    concepts: ['AND', 'NOT IN'],
    description: "Query the list of CITY names from STATION that do not start with vowels AND do not end with vowels. Your result cannot contain duplicates.",
    schemaDescription: 'STATION (ID, CITY, STATE)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather observation stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'CITY', type: 'VARCHAR(21)' }
        ],
        seedData: [
          { ID: 1, CITY: 'Berlin' },
          { ID: 2, CITY: 'London' },
          { ID: 3, CITY: 'Oslo' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT DISTINCT CITY FROM STATION WHERE LOWER(SUBSTR(CITY, 1, 1)) NOT IN ('a', 'e', 'i', 'o', 'u') AND LOWER(SUBSTR(CITY, -1, 1)) NOT IN ('a', 'e', 'i', 'o', 'u');",
    hints: ["Use `AND` between both conditions."],
    xp: 100
  },
  {
    id: 118,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Higher Than 75 Marks',
    difficulty: 'Easy',
    concepts: ['SUBSTR', 'ORDER BY', 'WHERE'],
    description: "Query the Name of any student in STUDENTS who scored higher than 75 Marks. Order your output by the last three characters of each name. If two or more students both have names ending in the same last three characters, secondary sort them by ascending ID.",
    schemaDescription: 'STUDENTS (ID, Name, Marks)',
    tables: [
      {
        name: 'STUDENTS',
        description: 'Student test scores',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'Name', type: 'VARCHAR(20)' },
          { name: 'Marks', type: 'INT' }
        ],
        seedData: [
          { ID: 1, Name: 'Ashley', Marks: 81 },
          { ID: 2, Name: 'Samantha', Marks: 75 },
          { ID: 3, Name: 'Julia', Marks: 76 },
          { ID: 4, Name: 'Belvet', Marks: 84 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT Name FROM STUDENTS WHERE Marks > 75 ORDER BY SUBSTR(Name, -3), ID ASC;',
    hints: ['Filter `Marks > 75` and order by `SUBSTR(Name, -3), ID ASC`.'],
    xp: 100
  },
  {
    id: 119,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Employee Names',
    difficulty: 'Easy',
    concepts: ['ORDER BY ASC'],
    description: 'Write a query that prints a list of employee names from the Employee table in alphabetical order.',
    schemaDescription: 'Employee (employee_id, name, months, salary)',
    tables: [
      {
        name: 'Employee',
        description: 'Employee directory',
        columns: [
          { name: 'employee_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { employee_id: 1, name: 'Rose' },
          { employee_id: 2, name: 'Angela' },
          { employee_id: 3, name: 'Frank' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT name FROM Employee ORDER BY name ASC;',
    hints: ['Order by `name ASC`.'],
    xp: 100
  },
  {
    id: 120,
    track: 'hackerrank-sql',
    section: 'Basic Select',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Employee Salaries',
    difficulty: 'Easy',
    concepts: ['WHERE', 'ORDER BY'],
    description: 'Write a query that prints a list of employee names for employees in Employee having a salary greater than $2000 per month who have been employees for less than 10 months. Sort your result by ascending employee_id.',
    schemaDescription: 'Employee (employee_id, name, months, salary)',
    tables: [
      {
        name: 'Employee',
        description: 'Employee details',
        columns: [
          { name: 'employee_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' },
          { name: 'months', type: 'INT' },
          { name: 'salary', type: 'INT' }
        ],
        seedData: [
          { employee_id: 12228, name: 'Rose', months: 15, salary: 1968 },
          { employee_id: 33645, name: 'Angela', months: 1, salary: 3443 },
          { employee_id: 45692, name: 'Frank', months: 17, salary: 1608 },
          { employee_id: 56118, name: 'Patrick', months: 7, salary: 4992 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT name FROM Employee WHERE salary > 2000 AND months < 10 ORDER BY employee_id ASC;',
    hints: ['Filter `salary > 2000 AND months < 10` and order by `employee_id ASC`.'],
    xp: 100
  },

  // ==========================================
  // 2. ADVANCED SELECT (121 - 125)
  // ==========================================
  {
    id: 121,
    track: 'hackerrank-sql',
    section: 'Advanced Select',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Type of Triangle',
    difficulty: 'Easy',
    concepts: ['CASE WHEN'],
    description: "Write a query identifying the type of each record in the TRIANGLES table using its three side lengths (A, B, C): Equilateral, Isosceles, Scalene, or Not A Triangle.",
    schemaDescription: 'TRIANGLES (A, B, C)',
    tables: [
      {
        name: 'TRIANGLES',
        description: 'Triangle side measurements',
        columns: [
          { name: 'A', type: 'INT' },
          { name: 'B', type: 'INT' },
          { name: 'C', type: 'INT' }
        ],
        seedData: [
          { A: 20, B: 20, C: 23 },
          { A: 20, B: 20, C: 20 },
          { A: 20, B: 21, C: 22 },
          { A: 13, B: 14, C: 30 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT CASE WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle' WHEN A = B AND B = C THEN 'Equilateral' WHEN A = B OR B = C OR A = C THEN 'Isosceles' ELSE 'Scalene' END FROM TRIANGLES;",
    hints: ['Check triangle inequality `A + B <= C` first, then equality of sides.'],
    xp: 120
  },
  {
    id: 122,
    track: 'hackerrank-sql',
    section: 'Advanced Select',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'The PADS',
    difficulty: 'Medium',
    concepts: ['CONCAT', 'GROUP BY', 'SUBSTR'],
    description: "1. Query an alphabetically ordered list of all names in OCCUPATIONS, immediately followed by the first letter of each profession as a parenthetical (i.e.: Name(P)). 2. Query the number of occurrences of each occupation in OCCUPATIONS. Sort the occurrences in ascending order.",
    schemaDescription: 'OCCUPATIONS (Name, Occupation)',
    tables: [
      {
        name: 'OCCUPATIONS',
        description: 'Professions roster',
        columns: [
          { name: 'Name', type: 'VARCHAR(20)' },
          { name: 'Occupation', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { Name: 'Samantha', Occupation: 'Doctor' },
          { Name: 'Julia', Occupation: 'Actor' },
          { Name: 'Maria', Occupation: 'Actor' },
          { Name: 'Meera', Occupation: 'Singer' },
          { Name: 'Ashely', Occupation: 'Professor' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT Name || '(' || SUBSTR(Occupation, 1, 1) || ')' FROM OCCUPATIONS ORDER BY Name ASC;",
    hints: ["Use `Name || '(' || SUBSTR(Occupation, 1, 1) || ')'`."],
    xp: 150
  },
  {
    id: 123,
    track: 'hackerrank-sql',
    section: 'Advanced Select',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Occupations',
    difficulty: 'Medium',
    concepts: ['PIVOT', 'ROW_NUMBER', 'CASE WHEN'],
    description: 'Pivot the Occupation column in OCCUPATIONS so that each Name is sorted alphabetically and displayed under its corresponding Occupation column header: Doctor, Professor, Singer, Actor.',
    schemaDescription: 'OCCUPATIONS (Name, Occupation)',
    tables: [
      {
        name: 'OCCUPATIONS',
        description: 'Occupations list',
        columns: [
          { name: 'Name', type: 'VARCHAR(20)' },
          { name: 'Occupation', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { Name: 'Jenny', Occupation: 'Doctor' },
          { Name: 'Ashley', Occupation: 'Professor' },
          { Name: 'Julia', Occupation: 'Singer' },
          { Name: 'Samantha', Occupation: 'Actor' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT MAX(CASE WHEN Occupation = 'Doctor' THEN Name END) AS Doctor, MAX(CASE WHEN Occupation = 'Professor' THEN Name END) AS Professor, MAX(CASE WHEN Occupation = 'Singer' THEN Name END) AS Singer, MAX(CASE WHEN Occupation = 'Actor' THEN Name END) AS Actor FROM (SELECT Name, Occupation, ROW_NUMBER() OVER (PARTITION BY Occupation ORDER BY Name) AS rn FROM OCCUPATIONS) t GROUP BY rn;",
    hints: ['Partition by occupation using `ROW_NUMBER()` and group by row index.'],
    xp: 170
  },
  {
    id: 124,
    track: 'hackerrank-sql',
    section: 'Advanced Select',
    level: 3,
    levelTitle: 'HACKERRANK SQL',
    title: 'Binary Tree Nodes',
    difficulty: 'Medium',
    concepts: ['CASE WHEN', 'IN', 'IS NULL'],
    description: "Write a query to find the node type of Binary Tree ordered by the value of the node. Output 'Root', 'Leaf', or 'Inner'.",
    schemaDescription: 'BST (N, P)',
    tables: [
      {
        name: 'BST',
        description: 'Binary search tree node connections',
        columns: [
          { name: 'N', type: 'INT', primaryKey: true },
          { name: 'P', type: 'INT' }
        ],
        seedData: [
          { N: 1, P: 2 },
          { N: 3, P: 2 },
          { N: 6, P: 8 },
          { N: 9, P: 8 },
          { N: 2, P: 5 },
          { N: 8, P: 5 },
          { N: 5, P: null }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT N, CASE WHEN P IS NULL THEN 'Root' WHEN N IN (SELECT P FROM BST WHERE P IS NOT NULL) THEN 'Inner' ELSE 'Leaf' END FROM BST ORDER BY N ASC;",
    hints: ['Root has P IS NULL, Inner exists in P column, else Leaf.'],
    xp: 150
  },
  {
    id: 125,
    track: 'hackerrank-sql',
    section: 'Advanced Select',
    level: 3,
    levelTitle: 'HACKERRANK SQL',
    title: 'New Companies',
    difficulty: 'Medium',
    concepts: ['COUNT(DISTINCT)', 'JOIN', 'GROUP BY'],
    description: "Amber's conglomerate corporation just acquired some new companies. Write a query to print the company_code, founder name, total number of lead managers, senior managers, managers, and employees. Order your output by ascending company_code.",
    schemaDescription: 'Company (company_code, founder), Employee (employee_code, manager_code, senior_manager_code, lead_manager_code, company_code)',
    tables: [
      {
        name: 'Company',
        description: 'Companies list',
        columns: [
          { name: 'company_code', type: 'VARCHAR(10)', primaryKey: true },
          { name: 'founder', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { company_code: 'C1', founder: 'Monika' },
          { company_code: 'C2', founder: 'Samantha' }
        ]
      },
      {
        name: 'Employee',
        description: 'Employee corporate hierarchy',
        columns: [
          { name: 'employee_code', type: 'VARCHAR(10)', primaryKey: true },
          { name: 'company_code', type: 'VARCHAR(10)' }
        ],
        seedData: [
          { employee_code: 'E1', company_code: 'C1' },
          { employee_code: 'E2', company_code: 'C1' },
          { employee_code: 'E3', company_code: 'C2' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT c.company_code, c.founder, COUNT(DISTINCT e.employee_code) FROM Company c LEFT JOIN Employee e ON c.company_code = e.company_code GROUP BY c.company_code, c.founder ORDER BY c.company_code ASC;',
    hints: ['Join company with employee table and group by company_code and founder.'],
    xp: 150
  },

  // ==========================================
  // 3. AGGREGATIONS (126 - 138)
  // ==========================================
  {
    id: 126,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Revising Aggregations - The Count Function',
    difficulty: 'Easy',
    concepts: ['COUNT', 'WHERE'],
    description: 'Query a count of the number of cities in CITY having a Population larger than 100,000.',
    schemaDescription: 'CITY (ID, NAME, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'Cities demographic data',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, NAME: 'Scottsdale', POPULATION: 202705 },
          { ID: 2, NAME: 'Corona', POPULATION: 124966 },
          { ID: 3, NAME: 'Smallville', POPULATION: 50000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT COUNT(*) FROM CITY WHERE POPULATION > 100000;',
    hints: ['Use `COUNT(*)` where `POPULATION > 100000`.'],
    xp: 100
  },
  {
    id: 127,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Revising Aggregations - The Sum Function',
    difficulty: 'Easy',
    concepts: ['SUM', 'WHERE'],
    description: 'Query the total population of all cities in CITY where District is California.',
    schemaDescription: 'CITY (ID, NAME, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'Cities data',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, NAME: 'Corona', DISTRICT: 'California', POPULATION: 124966 },
          { ID: 2, NAME: 'Concord', DISTRICT: 'California', POPULATION: 121780 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT SUM(POPULATION) FROM CITY WHERE DISTRICT = 'California';",
    hints: ["Use `SUM(POPULATION)` with `WHERE DISTRICT = 'California'`."],
    xp: 100
  },
  {
    id: 128,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Revising Aggregations - Averages',
    difficulty: 'Easy',
    concepts: ['AVG', 'WHERE'],
    description: 'Query the average population of all cities in CITY where District is California.',
    schemaDescription: 'CITY (ID, NAME, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'Cities data',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'DISTRICT', type: 'VARCHAR(20)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, NAME: 'Corona', DISTRICT: 'California', POPULATION: 124966 },
          { ID: 2, NAME: 'Concord', DISTRICT: 'California', POPULATION: 121780 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT AVG(POPULATION) FROM CITY WHERE DISTRICT = 'California';",
    hints: ["Use `AVG(POPULATION)`."],
    xp: 100
  },
  {
    id: 129,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Average Population',
    difficulty: 'Easy',
    concepts: ['AVG', 'ROUND', 'FLOOR'],
    description: 'Query the average population for all cities in CITY, rounded down to the nearest integer.',
    schemaDescription: 'CITY (ID, NAME, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World cities',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, NAME: 'City A', POPULATION: 100000 },
          { ID: 2, NAME: 'City B', POPULATION: 155000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT FLOOR(AVG(POPULATION)) FROM CITY;',
    hints: ['Use `FLOOR(AVG(POPULATION))` or `ROUND(...)`.'],
    xp: 100
  },
  {
    id: 130,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Japan Population',
    difficulty: 'Easy',
    concepts: ['SUM', 'WHERE'],
    description: 'Query the total population of all cities in CITY where COUNTRYCODE is JPN.',
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, DISTRICT, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'World city demographics',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1613, NAME: 'Neyagawa', COUNTRYCODE: 'JPN', POPULATION: 257315 },
          { ID: 1630, NAME: 'Ageo', COUNTRYCODE: 'JPN', POPULATION: 209442 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT SUM(POPULATION) FROM CITY WHERE COUNTRYCODE = 'JPN';",
    hints: ["Filter by `COUNTRYCODE = 'JPN'` and compute `SUM(POPULATION)`."],
    xp: 100
  },
  {
    id: 131,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Population Density Difference',
    difficulty: 'Easy',
    concepts: ['MAX', 'MIN'],
    description: 'Query the difference between the maximum and minimum populations in CITY.',
    schemaDescription: 'CITY (ID, NAME, POPULATION)',
    tables: [
      {
        name: 'CITY',
        description: 'Cities dataset',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, NAME: 'MaxCity', POPULATION: 1000000 },
          { ID: 2, NAME: 'MinCity', POPULATION: 10000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT MAX(POPULATION) - MIN(POPULATION) FROM CITY;',
    hints: ['Compute `MAX(POPULATION) - MIN(POPULATION)`.'],
    xp: 100
  },
  {
    id: 132,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'The Blunder',
    difficulty: 'Easy',
    concepts: ['REPLACE', 'AVG', 'CEIL'],
    description: "Samantha was tasked with calculating the average monthly salaries for all employees in the EMPLOYEES table, but did not realize her keyboard's 0 key was broken. Write a query calculating the amount of error (i.e.: actual - miscalculated average salaries), rounded up to the next integer.",
    schemaDescription: 'EMPLOYEES (ID, Name, Salary)',
    tables: [
      {
        name: 'EMPLOYEES',
        description: 'Employee salaries',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'Name', type: 'VARCHAR(20)' },
          { name: 'Salary', type: 'INT' }
        ],
        seedData: [
          { ID: 1, Name: 'Kristeen', Salary: 1420 },
          { ID: 2, Name: 'Ashley', Salary: 2006 },
          { ID: 3, Name: 'Julia', Salary: 2210 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT CAST(ROUND(AVG(Salary) - AVG(CAST(REPLACE(CAST(Salary AS TEXT), '0', '') AS INTEGER)) + 0.5) AS INT) FROM EMPLOYEES;",
    hints: ["Use `REPLACE(CAST(Salary AS TEXT), '0', '')` to simulate broken zero key."],
    xp: 120
  },
  {
    id: 133,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Top Earners',
    difficulty: 'Easy',
    concepts: ['MAX', 'COUNT', 'GROUP BY', 'ORDER BY'],
    description: "Find the maximum total earnings for all employees as well as the total number of employees who have maximum total earnings (salary * months).",
    schemaDescription: 'Employee (employee_id, name, months, salary)',
    tables: [
      {
        name: 'Employee',
        description: 'Employee compensation and tenure',
        columns: [
          { name: 'employee_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' },
          { name: 'months', type: 'INT' },
          { name: 'salary', type: 'INT' }
        ],
        seedData: [
          { employee_id: 12228, name: 'Rose', months: 15, salary: 1968 },
          { employee_id: 33645, name: 'Angela', months: 1, salary: 3443 },
          { employee_id: 56118, name: 'Patrick', months: 7, salary: 4992 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT salary * months AS total_earnings, COUNT(*) FROM Employee GROUP BY total_earnings ORDER BY total_earnings DESC LIMIT 1;',
    hints: ['Compute `salary * months`, group by earnings, order descending limit 1.'],
    xp: 120
  },
  {
    id: 134,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 2',
    difficulty: 'Easy',
    concepts: ['ROUND', 'SUM'],
    description: 'Query the sum of all values in LAT_N rounded to 2 decimal places, and the sum of all values in LONG_W rounded to 2 decimal places.',
    schemaDescription: 'STATION (ID, LAT_N, LONG_W)',
    tables: [
      {
        name: 'STATION',
        description: 'Weather stations',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'LAT_N', type: 'DECIMAL(7,4)' },
          { name: 'LONG_W', type: 'DECIMAL(7,4)' }
        ],
        seedData: [
          { ID: 1, LAT_N: 139.6503, LONG_W: 73.4159 },
          { ID: 2, LAT_N: 48.6978, LONG_W: 130.5393 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(SUM(LAT_N), 2), ROUND(SUM(LONG_W), 2) FROM STATION;',
    hints: ['Use `ROUND(SUM(LAT_N), 2)` and `ROUND(SUM(LONG_W), 2)`.'],
    xp: 100
  },
  {
    id: 135,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 13',
    difficulty: 'Easy',
    concepts: ['SUM', 'WHERE', 'ROUND'],
    description: 'Query the sum of Northern Latitudes (LAT_N) from STATION having values greater than 38.7880 and less than 137.2345. Truncate your answer to 4 decimal places.',
    schemaDescription: 'STATION (ID, LAT_N, LONG_W)',
    tables: [
      {
        name: 'STATION',
        description: 'Stations dataset',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'LAT_N', type: 'DECIMAL(7,4)' }
        ],
        seedData: [
          { ID: 1, LAT_N: 50.1234 },
          { ID: 2, LAT_N: 100.5678 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(SUM(LAT_N), 4) FROM STATION WHERE LAT_N > 38.7880 AND LAT_N < 137.2345;',
    hints: ['Filter with `LAT_N > 38.7880 AND LAT_N < 137.2345`.'],
    xp: 100
  },
  {
    id: 136,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 14',
    difficulty: 'Easy',
    concepts: ['MAX', 'WHERE', 'ROUND'],
    description: 'Query the greatest value of the Northern Latitudes (LAT_N) from STATION that is less than 137.2345. Truncate your answer to 4 decimal places.',
    schemaDescription: 'STATION (ID, LAT_N)',
    tables: [
      {
        name: 'STATION',
        description: 'Stations list',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'LAT_N', type: 'DECIMAL(7,4)' }
        ],
        seedData: [
          { ID: 1, LAT_N: 120.1234 },
          { ID: 2, LAT_N: 136.5678 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(MAX(LAT_N), 4) FROM STATION WHERE LAT_N < 137.2345;',
    hints: ['Compute `MAX(LAT_N)` with `LAT_N < 137.2345`.'],
    xp: 100
  },
  {
    id: 137,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 15',
    difficulty: 'Easy',
    concepts: ['WHERE', 'ORDER BY', 'LIMIT'],
    description: 'Query the Western Longitude (LONG_W) for the largest Northern Latitude (LAT_N) in STATION that is less than 137.2345. Round to 4 decimal places.',
    schemaDescription: 'STATION (ID, LAT_N, LONG_W)',
    tables: [
      {
        name: 'STATION',
        description: 'Stations data',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'LAT_N', type: 'DECIMAL(7,4)' },
          { name: 'LONG_W', type: 'DECIMAL(7,4)' }
        ],
        seedData: [
          { ID: 1, LAT_N: 120.1234, LONG_W: 80.5000 },
          { ID: 2, LAT_N: 136.5678, LONG_W: 90.1234 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(LONG_W, 4) FROM STATION WHERE LAT_N < 137.2345 ORDER BY LAT_N DESC LIMIT 1;',
    hints: ['Filter `LAT_N < 137.2345` and order by `LAT_N DESC LIMIT 1`.'],
    xp: 100
  },
  {
    id: 138,
    track: 'hackerrank-sql',
    section: 'Aggregations',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Weather Observation Station 20',
    difficulty: 'Medium',
    concepts: ['MEDIAN', 'ROW_NUMBER', 'PERCENTILE'],
    description: 'A median is defined as a number separating the higher half of a data set from the lower half. Query the median of the Northern Latitudes (LAT_N) from STATION and round your answer to 4 decimal places.',
    schemaDescription: 'STATION (ID, LAT_N)',
    tables: [
      {
        name: 'STATION',
        description: 'Stations dataset',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'LAT_N', type: 'DECIMAL(7,4)' }
        ],
        seedData: [
          { ID: 1, LAT_N: 10.0000 },
          { ID: 2, LAT_N: 20.0000 },
          { ID: 3, LAT_N: 30.0000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(AVG(LAT_N), 4) FROM (SELECT LAT_N, ROW_NUMBER() OVER (ORDER BY LAT_N) AS rn, COUNT(*) OVER () AS cnt FROM STATION) WHERE rn IN (cnt/2, cnt/2 + 1);',
    hints: ['Use window functions to find the middle row.'],
    xp: 150
  },

  // ==========================================
  // 4. BASIC JOIN (139 - 145)
  // ==========================================
  {
    id: 139,
    track: 'hackerrank-sql',
    section: 'Basic Join',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Population Census',
    difficulty: 'Easy',
    concepts: ['INNER JOIN', 'SUM'],
    description: 'Given the CITY and COUNTRY tables, query the sum of the populations of all cities where the CONTINENT is Asia.',
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE, POPULATION), COUNTRY (CODE, NAME, CONTINENT)',
    tables: [
      {
        name: 'CITY',
        description: 'Cities data',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, NAME: 'Kabul', COUNTRYCODE: 'AFG', POPULATION: 1780000 },
          { ID: 2, NAME: 'Qandahar', COUNTRYCODE: 'AFG', POPULATION: 237500 },
          { ID: 3, NAME: 'Amsterdam', COUNTRYCODE: 'NLD', POPULATION: 731200 }
        ]
      },
      {
        name: 'COUNTRY',
        description: 'Country continents',
        columns: [
          { name: 'CODE', type: 'VARCHAR(3)', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(44)' },
          { name: 'CONTINENT', type: 'VARCHAR(13)' }
        ],
        seedData: [
          { CODE: 'AFG', NAME: 'Afghanistan', CONTINENT: 'Asia' },
          { CODE: 'NLD', NAME: 'Netherlands', CONTINENT: 'Europe' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT SUM(c.POPULATION) FROM CITY c JOIN COUNTRY co ON c.COUNTRYCODE = co.CODE WHERE co.CONTINENT = 'Asia';",
    hints: ["Join on `c.COUNTRYCODE = co.CODE` where `co.CONTINENT = 'Asia'`."],
    xp: 100
  },
  {
    id: 140,
    track: 'hackerrank-sql',
    section: 'Basic Join',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'African Cities',
    difficulty: 'Easy',
    concepts: ['INNER JOIN', 'WHERE'],
    description: 'Given the CITY and COUNTRY tables, query the names of all cities where the CONTINENT is Africa.',
    schemaDescription: 'CITY (ID, NAME, COUNTRYCODE), COUNTRY (CODE, CONTINENT)',
    tables: [
      {
        name: 'CITY',
        description: 'Cities list',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'NAME', type: 'VARCHAR(17)' },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' }
        ],
        seedData: [
          { ID: 1, NAME: 'Cairo', COUNTRYCODE: 'EGY' },
          { ID: 2, NAME: 'Paris', COUNTRYCODE: 'FRA' }
        ]
      },
      {
        name: 'COUNTRY',
        description: 'Countries list',
        columns: [
          { name: 'CODE', type: 'VARCHAR(3)', primaryKey: true },
          { name: 'CONTINENT', type: 'VARCHAR(13)' }
        ],
        seedData: [
          { CODE: 'EGY', CONTINENT: 'Africa' },
          { CODE: 'FRA', CONTINENT: 'Europe' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT c.NAME FROM CITY c JOIN COUNTRY co ON c.COUNTRYCODE = co.CODE WHERE co.CONTINENT = 'Africa';",
    hints: ["Join on `c.COUNTRYCODE = co.CODE` where `co.CONTINENT = 'Africa'`."],
    xp: 100
  },
  {
    id: 141,
    track: 'hackerrank-sql',
    section: 'Basic Join',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Average Population of Each Continent',
    difficulty: 'Easy',
    concepts: ['GROUP BY', 'AVG', 'FLOOR'],
    description: 'Given the CITY and COUNTRY tables, query the names of all the continents (COUNTRY.Continent) and their respective average city populations (CITY.Population) rounded down to the nearest integer.',
    schemaDescription: 'CITY (ID, COUNTRYCODE, POPULATION), COUNTRY (CODE, CONTINENT)',
    tables: [
      {
        name: 'CITY',
        description: 'Cities data',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'COUNTRYCODE', type: 'VARCHAR(3)' },
          { name: 'POPULATION', type: 'INT' }
        ],
        seedData: [
          { ID: 1, COUNTRYCODE: 'AFG', POPULATION: 1000000 },
          { ID: 2, COUNTRYCODE: 'NLD', POPULATION: 800000 }
        ]
      },
      {
        name: 'COUNTRY',
        description: 'Country data',
        columns: [
          { name: 'CODE', type: 'VARCHAR(3)', primaryKey: true },
          { name: 'CONTINENT', type: 'VARCHAR(13)' }
        ],
        seedData: [
          { CODE: 'AFG', CONTINENT: 'Asia' },
          { CODE: 'NLD', CONTINENT: 'Europe' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT co.CONTINENT, FLOOR(AVG(c.POPULATION)) FROM CITY c JOIN COUNTRY co ON c.COUNTRYCODE = co.CODE GROUP BY co.CONTINENT;',
    hints: ['Group by `co.CONTINENT` and compute `FLOOR(AVG(c.POPULATION))`.'],
    xp: 100
  },
  {
    id: 142,
    track: 'hackerrank-sql',
    section: 'Basic Join',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'The Report',
    difficulty: 'Medium',
    concepts: ['BETWEEN', 'CASE WHEN', 'ORDER BY'],
    description: "You are given two tables: Students and Grades. Generate a report containing Name, Grade, and Mark. Do not display names of students who achieved Grade < 8.",
    schemaDescription: 'Students (ID, Name, Marks), Grades (Grade, Min_Mark, Max_Mark)',
    tables: [
      {
        name: 'Students',
        description: 'Students info',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'Name', type: 'VARCHAR(20)' },
          { name: 'Marks', type: 'INT' }
        ],
        seedData: [
          { ID: 1, Name: 'Julia', Marks: 88 },
          { ID: 2, Name: 'Samantha', Marks: 68 },
          { ID: 3, Name: 'Maria', Marks: 99 }
        ]
      },
      {
        name: 'Grades',
        description: 'Grade scale intervals',
        columns: [
          { name: 'Grade', type: 'INT', primaryKey: true },
          { name: 'Min_Mark', type: 'INT' },
          { name: 'Max_Mark', type: 'INT' }
        ],
        seedData: [
          { Grade: 7, Min_Mark: 60, Max_Mark: 69 },
          { Grade: 8, Min_Mark: 70, Max_Mark: 79 },
          { Grade: 9, Min_Mark: 80, Max_Mark: 89 },
          { Grade: 10, Min_Mark: 90, Max_Mark: 100 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT CASE WHEN g.Grade < 8 THEN NULL ELSE s.Name END AS Name, g.Grade, s.Marks FROM Students s JOIN Grades g ON s.Marks BETWEEN g.Min_Mark AND g.Max_Mark ORDER BY g.Grade DESC, s.Name ASC, s.Marks ASC;',
    hints: ['Join on `s.Marks BETWEEN g.Min_Mark AND g.Max_Mark`.'],
    xp: 150
  },
  {
    id: 143,
    track: 'hackerrank-sql',
    section: 'Basic Join',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Top Competitors',
    difficulty: 'Medium',
    concepts: ['INNER JOIN', 'COUNT', 'HAVING'],
    description: 'Write a query to print the respective hacker_id and name of hackers who achieved full scores for more than one challenge. Order your output in descending order by the total number of challenges in which the hacker earned a full score.',
    schemaDescription: 'Hackers (hacker_id, name), Difficulty (difficulty_level, score), Challenges (challenge_id, hacker_id, difficulty_level), Submissions (submission_id, hacker_id, challenge_id, score)',
    tables: [
      {
        name: 'Hackers',
        description: 'Hackers roster',
        columns: [
          { name: 'hacker_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { hacker_id: 5580, name: 'Rose' },
          { hacker_id: 8439, name: 'Angela' }
        ]
      },
      {
        name: 'Submissions',
        description: 'Scores',
        columns: [
          { name: 'submission_id', type: 'INT', primaryKey: true },
          { name: 'hacker_id', type: 'INT' },
          { name: 'challenge_id', type: 'INT' },
          { name: 'score', type: 'INT' }
        ],
        seedData: [
          { submission_id: 1, hacker_id: 5580, challenge_id: 101, score: 100 },
          { submission_id: 2, hacker_id: 5580, challenge_id: 102, score: 100 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT h.hacker_id, h.name FROM Hackers h JOIN Submissions s ON h.hacker_id = s.hacker_id GROUP BY h.hacker_id, h.name HAVING COUNT(s.submission_id) > 1 ORDER BY COUNT(s.submission_id) DESC, h.hacker_id ASC;',
    hints: ['Join tables and filter with `HAVING COUNT(...) > 1`.'],
    xp: 150
  },

  // ==========================================
  // 5. ADVANCED JOIN & INTERMEDIATE (144 - 150)
  // ==========================================
  {
    id: 144,
    track: 'hackerrank-sql',
    section: 'Advanced Join',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: "Ollivander's Inventory",
    difficulty: 'Medium',
    concepts: ['SUBQUERY', 'MIN', 'JOIN'],
    description: "Harry Potter and his friends are at Ollivander's with Ron, finally replacing Charlie's old broken wand. Write a query to print the id, age, coins_needed, and power of the wands that Ron's interested in, sorted in order of descending power.",
    schemaDescription: 'Wands (id, code, coins_needed, power), Wands_Property (code, age, is_evil)',
    tables: [
      {
        name: 'Wands',
        description: 'Wand attributes',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'code', type: 'INT' },
          { name: 'coins_needed', type: 'INT' },
          { name: 'power', type: 'INT' }
        ],
        seedData: [
          { id: 1, code: 10, coins_needed: 500, power: 10 },
          { id: 2, code: 10, coins_needed: 400, power: 10 }
        ]
      },
      {
        name: 'Wands_Property',
        description: 'Properties',
        columns: [
          { name: 'code', type: 'INT', primaryKey: true },
          { name: 'age', type: 'INT' },
          { name: 'is_evil', type: 'INT' }
        ],
        seedData: [
          { code: 10, age: 25, is_evil: 0 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT w.id, wp.age, w.coins_needed, w.power FROM Wands w JOIN Wands_Property wp ON w.code = wp.code WHERE wp.is_evil = 0 ORDER BY w.power DESC, wp.age DESC;',
    hints: ['Filter non-evil wands with minimum coins needed for each age and power combination.'],
    xp: 150
  },
  {
    id: 145,
    track: 'hackerrank-sql',
    section: 'Advanced Join',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Challenges',
    difficulty: 'Medium',
    concepts: ['COUNT', 'HAVING', 'SUBQUERY'],
    description: 'Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order.',
    schemaDescription: 'Hackers (hacker_id, name), Challenges (challenge_id, hacker_id)',
    tables: [
      {
        name: 'Hackers',
        description: 'Hackers dataset',
        columns: [
          { name: 'hacker_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { hacker_id: 1, name: 'Julia' },
          { hacker_id: 2, name: 'Samantha' }
        ]
      },
      {
        name: 'Challenges',
        description: 'Challenges created',
        columns: [
          { name: 'challenge_id', type: 'INT', primaryKey: true },
          { name: 'hacker_id', type: 'INT' }
        ],
        seedData: [
          { challenge_id: 101, hacker_id: 1 },
          { challenge_id: 102, hacker_id: 1 },
          { challenge_id: 103, hacker_id: 2 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT h.hacker_id, h.name, COUNT(c.challenge_id) AS total FROM Hackers h JOIN Challenges c ON h.hacker_id = c.hacker_id GROUP BY h.hacker_id, h.name ORDER BY total DESC, h.hacker_id ASC;',
    hints: ['Group by hacker and order by count descending.'],
    xp: 150
  },
  {
    id: 146,
    track: 'hackerrank-sql',
    section: 'Advanced Join',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Contest Leaderboard',
    difficulty: 'Medium',
    concepts: ['SUM', 'MAX', 'GROUP BY'],
    description: 'The total score of a hacker is the sum of their maximum scores for all of the challenges. Write a query to print the hacker_id, name, and total score of the hackers ordered by the descending score.',
    schemaDescription: 'Hackers (hacker_id, name), Submissions (submission_id, hacker_id, challenge_id, score)',
    tables: [
      {
        name: 'Hackers',
        description: 'Hackers data',
        columns: [
          { name: 'hacker_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { hacker_id: 1, name: 'Angela' },
          { hacker_id: 2, name: 'Frank' }
        ]
      },
      {
        name: 'Submissions',
        description: 'Submissions logs',
        columns: [
          { name: 'submission_id', type: 'INT', primaryKey: true },
          { name: 'hacker_id', type: 'INT' },
          { name: 'challenge_id', type: 'INT' },
          { name: 'score', type: 'INT' }
        ],
        seedData: [
          { submission_id: 1, hacker_id: 1, challenge_id: 1, score: 50 },
          { submission_id: 2, hacker_id: 1, challenge_id: 1, score: 70 },
          { submission_id: 3, hacker_id: 2, challenge_id: 1, score: 80 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT h.hacker_id, h.name, SUM(m.max_score) AS total_score FROM Hackers h JOIN (SELECT hacker_id, challenge_id, MAX(score) AS max_score FROM Submissions GROUP BY hacker_id, challenge_id) m ON h.hacker_id = m.hacker_id GROUP BY h.hacker_id, h.name HAVING total_score > 0 ORDER BY total_score DESC, h.hacker_id ASC;',
    hints: ['Compute max score per challenge in a subquery, then sum up.'],
    xp: 150
  },
  {
    id: 147,
    track: 'hackerrank-sql',
    section: 'Advanced Join',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Placements',
    difficulty: 'Medium',
    concepts: ['MULTIPLE JOINS', 'WHERE'],
    description: 'Write a query to output the names of those students whose best friends got offered a higher salary than them. Names must be ordered by the salary amount offered to the best friends.',
    schemaDescription: 'Students (ID, Name), Friends (ID, Friend_ID), Packages (ID, Salary)',
    tables: [
      {
        name: 'Students',
        description: 'Students',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'Name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { ID: 1, Name: 'Ashley' },
          { ID: 2, Name: 'Samantha' }
        ]
      },
      {
        name: 'Friends',
        description: 'Best friend pairs',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'Friend_ID', type: 'INT' }
        ],
        seedData: [
          { ID: 1, Friend_ID: 2 },
          { ID: 2, Friend_ID: 1 }
        ]
      },
      {
        name: 'Packages',
        description: 'Job offer salary amounts',
        columns: [
          { name: 'ID', type: 'INT', primaryKey: true },
          { name: 'Salary', type: 'DECIMAL(10,2)' }
        ],
        seedData: [
          { ID: 1, Salary: 15.20 },
          { ID: 2, Salary: 20.06 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT s.Name FROM Students s JOIN Friends f ON s.ID = f.ID JOIN Packages p1 ON s.ID = p1.ID JOIN Packages p2 ON f.Friend_ID = p2.ID WHERE p2.Salary > p1.Salary ORDER BY p2.Salary ASC;',
    hints: ['Join Packages twice for student salary and friend salary.'],
    xp: 150
  },
  {
    id: 148,
    track: 'hackerrank-sql',
    section: 'Advanced Join',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Symmetric Pairs',
    difficulty: 'Medium',
    concepts: ['SELF JOIN', 'GROUP BY', 'HAVING'],
    description: 'Two pairs (X1, Y1) and (X2, Y2) are said to be symmetric pairs if X1 = Y2 and X2 = Y1. Write a query to output all such symmetric pairs in ascending order by the value of X.',
    schemaDescription: 'Functions (X, Y)',
    tables: [
      {
        name: 'Functions',
        description: 'Coordinate values',
        columns: [
          { name: 'X', type: 'INT' },
          { name: 'Y', type: 'INT' }
        ],
        seedData: [
          { X: 20, Y: 20 },
          { X: 20, Y: 20 },
          { X: 20, Y: 21 },
          { X: 23, Y: 22 },
          { X: 21, Y: 20 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT f1.X, f1.Y FROM Functions f1 JOIN Functions f2 ON f1.X = f2.Y AND f1.Y = f2.X GROUP BY f1.X, f1.Y HAVING COUNT(*) > 1 OR f1.X < f1.Y ORDER BY f1.X ASC;',
    hints: ['Self join on `f1.X = f2.Y AND f1.Y = f2.X`.'],
    xp: 150
  },
  {
    id: 149,
    track: 'hackerrank-sql',
    section: 'Advanced Join',
    level: 3,
    levelTitle: 'HACKERRANK SQL',
    title: 'Interviews',
    difficulty: 'Hard',
    concepts: ['LEFT JOIN', 'SUM', 'GROUP BY'],
    description: 'Samantha interviews many candidates from different colleges. Write a query to print the contest_id, hacker_id, name, and the sums of total_submissions, total_accepted_submissions, total_views, and total_unique_views for each contest.',
    schemaDescription: 'Contests (contest_id, hacker_id, name), Colleges (college_id, contest_id)',
    tables: [
      {
        name: 'Contests',
        description: 'Contests records',
        columns: [
          { name: 'contest_id', type: 'INT', primaryKey: true },
          { name: 'hacker_id', type: 'INT' },
          { name: 'name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { contest_id: 66406, hacker_id: 17973, name: 'Rose' },
          { contest_id: 66556, hacker_id: 79153, name: 'Angela' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT contest_id, hacker_id, name FROM Contests ORDER BY contest_id ASC;',
    hints: ['Aggregate submissions and view stats before joining to avoid Cartesian product multiplication.'],
    xp: 170
  },
  {
    id: 150,
    track: 'hackerrank-sql',
    section: 'Alternative Queries',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Draw The Triangle 1',
    difficulty: 'Easy',
    concepts: ['RECURSIVE', 'PATTERN'],
    description: 'P(R) represents a pattern drawn by Julia in R rows. Write a query to print the pattern P(20) descending asterisks (*).',
    schemaDescription: 'Pattern generation',
    tables: [
      {
        name: 'Numbers',
        description: 'Reference integers',
        columns: [
          { name: 'n', type: 'INT' }
        ],
        seedData: [
          { n: 5 }, { n: 4 }, { n: 3 }, { n: 2 }, { n: 1 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT REPEAT('* ', n) FROM Numbers ORDER BY n DESC;",
    hints: ['Print descending stars using repeating characters.'],
    xp: 100
  },
  {
    id: 151,
    track: 'hackerrank-sql',
    section: 'Alternative Queries',
    level: 1,
    levelTitle: 'HACKERRANK SQL',
    title: 'Draw The Triangle 2',
    difficulty: 'Easy',
    concepts: ['RECURSIVE', 'PATTERN'],
    description: 'P(R) represents a pattern drawn by Julia in R rows. Write a query to print the pattern P(20) ascending asterisks (*).',
    schemaDescription: 'Pattern generation',
    tables: [
      {
        name: 'Numbers',
        description: 'Reference integers',
        columns: [
          { name: 'n', type: 'INT' }
        ],
        seedData: [
          { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT REPEAT('* ', n) FROM Numbers ORDER BY n ASC;",
    hints: ['Print ascending stars.'],
    xp: 100
  },
  {
    id: 152,
    track: 'hackerrank-sql',
    section: 'Alternative Queries',
    level: 2,
    levelTitle: 'HACKERRANK SQL',
    title: 'Print Prime Numbers',
    difficulty: 'Medium',
    concepts: ['PRIME', 'MODULO', 'GROUP_CONCAT'],
    description: 'Write a query to print all prime numbers less than or equal to 1000. Print your result on a single line, and use the ampersand (&) character as your separator.',
    schemaDescription: 'Primes generator',
    tables: [
      {
        name: 'Primes',
        description: 'Prime numbers table',
        columns: [
          { name: 'num', type: 'INT' }
        ],
        seedData: [
          { num: 2 }, { num: 3 }, { num: 5 }, { num: 7 }, { num: 11 }, { num: 13 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT GROUP_CONCAT(num, '&') FROM Primes;",
    hints: ['Use `GROUP_CONCAT(num, "&")`.'],
    xp: 150
  }
];
