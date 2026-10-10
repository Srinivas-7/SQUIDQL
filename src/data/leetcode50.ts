import type { Challenge } from '../types';

export const LEETCODE_50_CHALLENGES: Challenge[] = [
  // =========================================================================
  // 1. SELECT (1 - 5)
  // =========================================================================
  {
    id: 1,
    track: 'leetcode-50',
    section: 'Select',
    level: 1,
    levelTitle: 'SELECT',
    title: 'Recyclable and Low Fat Products',
    difficulty: 'Easy',
    concepts: ['SELECT', 'WHERE', 'AND'],
    description: 'Find the ids of products that are both low fat and recyclable. Return the result table in any order.',
    schemaDescription: 'Products (product_id, low_fats, recyclable)',
    tables: [
      {
        name: 'Products',
        description: 'Product fat and recyclable classifications',
        columns: [
          { name: 'product_id', type: 'INT', primaryKey: true },
          { name: 'low_fats', type: 'ENUM("Y", "N")' },
          { name: 'recyclable', type: 'ENUM("Y", "N")' }
        ],
        seedData: [
          { product_id: 0, low_fats: 'Y', recyclable: 'N' },
          { product_id: 1, low_fats: 'Y', recyclable: 'Y' },
          { product_id: 2, low_fats: 'N', recyclable: 'Y' },
          { product_id: 3, low_fats: 'Y', recyclable: 'Y' },
          { product_id: 4, low_fats: 'N', recyclable: 'N' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';",
    hints: [
      "Filter the rows where `low_fats = 'Y'` and `recyclable = 'Y'`.",
      "Select only the `product_id` column."
    ],
    xp: 100
  },
  {
    id: 2,
    track: 'leetcode-50',
    section: 'Select',
    level: 1,
    levelTitle: 'SELECT',
    title: 'Find Customer Referee',
    difficulty: 'Easy',
    concepts: ['SELECT', 'WHERE', 'IS NULL', 'OR'],
    description: 'Find the names of the customer that are not referred by the customer with id = 2. Return the result table in any order.',
    schemaDescription: 'Customer (id, name, referee_id)',
    tables: [
      {
        name: 'Customer',
        description: 'Customer referee relationships',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(25)' },
          { name: 'referee_id', type: 'INT', isNullable: true }
        ],
        seedData: [
          { id: 1, name: 'Will', referee_id: null },
          { id: 2, name: 'Jane', referee_id: null },
          { id: 3, name: 'Alex', referee_id: 2 },
          { id: 4, name: 'Bill', referee_id: null },
          { id: 5, name: 'Zack', referee_id: 1 },
          { id: 6, name: 'Mark', referee_id: 2 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT name FROM Customer WHERE referee_id != 2 OR referee_id IS NULL;',
    hints: [
      'Be careful with NULL values in SQL comparison operators.',
      'Check both `referee_id != 2` and `referee_id IS NULL`.'
    ],
    xp: 100
  },
  {
    id: 3,
    track: 'leetcode-50',
    section: 'Select',
    level: 1,
    levelTitle: 'SELECT',
    title: 'Big Countries',
    difficulty: 'Easy',
    concepts: ['SELECT', 'WHERE', 'OR'],
    description: 'A country is big if it has an area of at least 3 million sq km, or a population of at least 25 million. Write a solution to find the name, population, and area of the big countries.',
    schemaDescription: 'World (name, continent, area, population, gdp)',
    tables: [
      {
        name: 'World',
        description: 'Country geography and demographic stats',
        columns: [
          { name: 'name', type: 'VARCHAR(255)', primaryKey: true },
          { name: 'continent', type: 'VARCHAR(255)' },
          { name: 'area', type: 'INT' },
          { name: 'population', type: 'INT' },
          { name: 'gdp', type: 'BIGINT' }
        ],
        seedData: [
          { name: 'Afghanistan', continent: 'Asia', area: 652230, population: 25500100, gdp: 20343000000 },
          { name: 'Albania', continent: 'Europe', area: 28748, population: 2831741, gdp: 12960000000 },
          { name: 'Algeria', continent: 'Africa', area: 2381741, population: 37100000, gdp: 188600000000 },
          { name: 'Andorra', continent: 'Europe', area: 468, population: 78115, gdp: 3712000000 },
          { name: 'Angola', continent: 'Africa', area: 1246700, population: 20609294, gdp: 100990000000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT name, population, area FROM World WHERE area >= 3000000 OR population >= 25000000;',
    hints: [
      'Filter with `area >= 3000000 OR population >= 25000000`.',
      'Select `name, population, area` in the exact order.'
    ],
    xp: 100
  },
  {
    id: 4,
    track: 'leetcode-50',
    section: 'Select',
    level: 1,
    levelTitle: 'SELECT',
    title: 'Article Views I',
    difficulty: 'Easy',
    concepts: ['SELECT DISTINCT', 'ORDER BY'],
    description: 'Find all the authors that viewed at least one of their own articles. Return the result table sorted by id in ascending order.',
    schemaDescription: 'Views (article_id, author_id, viewer_id, view_date)',
    tables: [
      {
        name: 'Views',
        description: 'Log of article views by authors and viewers',
        columns: [
          { name: 'article_id', type: 'INT' },
          { name: 'author_id', type: 'INT' },
          { name: 'viewer_id', type: 'INT' },
          { name: 'view_date', type: 'DATE' }
        ],
        seedData: [
          { article_id: 1, author_id: 3, viewer_id: 5, view_date: '2019-08-01' },
          { article_id: 1, author_id: 3, viewer_id: 6, view_date: '2019-08-02' },
          { article_id: 2, author_id: 7, viewer_id: 7, view_date: '2019-08-01' },
          { article_id: 2, author_id: 7, viewer_id: 6, view_date: '2019-08-02' },
          { article_id: 4, author_id: 7, viewer_id: 1, view_date: '2019-07-22' },
          { article_id: 3, author_id: 4, viewer_id: 4, view_date: '2019-07-21' },
          { article_id: 3, author_id: 4, viewer_id: 4, view_date: '2019-07-21' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT DISTINCT author_id AS id FROM Views WHERE author_id = viewer_id ORDER BY id ASC;',
    hints: [
      'Filter where `author_id = viewer_id`.',
      'Use `DISTINCT` and alias the column as `id`.',
      'Order by `id ASC`.'
    ],
    xp: 100
  },
  {
    id: 5,
    track: 'leetcode-50',
    section: 'Select',
    level: 1,
    levelTitle: 'SELECT',
    title: 'Invalid Tweets',
    difficulty: 'Easy',
    concepts: ['LENGTH()', 'WHERE'],
    description: 'Find the IDs of the invalid tweets. A tweet is invalid if the number of characters used in the content of the tweet is strictly greater than 15.',
    schemaDescription: 'Tweets (tweet_id, content)',
    tables: [
      {
        name: 'Tweets',
        description: 'User tweet text records',
        columns: [
          { name: 'tweet_id', type: 'INT', primaryKey: true },
          { name: 'content', type: 'VARCHAR(140)' }
        ],
        seedData: [
          { tweet_id: 1, content: 'Vote for public' },
          { tweet_id: 2, content: 'Let us make the world better' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT tweet_id FROM Tweets WHERE LENGTH(content) > 15;',
    hints: [
      'Use `LENGTH(content)` to get character count.',
      'Filter with `LENGTH(content) > 15`.'
    ],
    xp: 100
  },

  // =========================================================================
  // 2. BASIC JOINS (6 - 14)
  // =========================================================================
  {
    id: 6,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 2,
    levelTitle: 'BASIC JOINS',
    title: 'Replace Employee ID With The Unique Identifier',
    difficulty: 'Easy',
    concepts: ['LEFT JOIN'],
    description: 'Show the unique ID of each user. If a user does not have a unique ID replace just show null.',
    schemaDescription: 'Employees (id, name), EmployeeUNI (id, unique_id)',
    tables: [
      {
        name: 'Employees',
        description: 'Employee name records',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { id: 1, name: 'Alice' },
          { id: 7, name: 'Bob' },
          { id: 11, name: 'Meir' },
          { id: 90, name: 'Winston' },
          { id: 3, name: 'Jonathan' }
        ]
      },
      {
        name: 'EmployeeUNI',
        description: 'Employee unique identifiers',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'unique_id', type: 'INT' }
        ],
        seedData: [
          { id: 3, unique_id: 1 },
          { id: 11, unique_id: 2 },
          { id: 90, unique_id: 3 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT u.unique_id, e.name FROM Employees e LEFT JOIN EmployeeUNI u ON e.id = u.id;',
    hints: [
      'Perform a `LEFT JOIN` between `Employees` and `EmployeeUNI` on `id`.',
      'Select `unique_id, name`.'
    ],
    xp: 100
  },
  {
    id: 7,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 2,
    levelTitle: 'BASIC JOINS',
    title: 'Product Sales Analysis I',
    difficulty: 'Easy',
    concepts: ['INNER JOIN'],
    description: 'Report the product_name, year, and price for each sale_id in the Sales table.',
    schemaDescription: 'Sales (sale_id, product_id, year, quantity, price), Product (product_id, product_name)',
    tables: [
      {
        name: 'Sales',
        description: 'Sales records with years and prices',
        columns: [
          { name: 'sale_id', type: 'INT' },
          { name: 'product_id', type: 'INT' },
          { name: 'year', type: 'INT' },
          { name: 'quantity', type: 'INT' },
          { name: 'price', type: 'INT' }
        ],
        seedData: [
          { sale_id: 1, product_id: 100, year: 2008, quantity: 10, price: 5000 },
          { sale_id: 2, product_id: 100, year: 2009, quantity: 12, price: 5000 },
          { sale_id: 7, product_id: 200, year: 2011, quantity: 15, price: 9000 }
        ]
      },
      {
        name: 'Product',
        description: 'Product master catalogue',
        columns: [
          { name: 'product_id', type: 'INT', primaryKey: true },
          { name: 'product_name', type: 'VARCHAR(10)' }
        ],
        seedData: [
          { product_id: 100, product_name: 'Nokia' },
          { product_id: 200, product_name: 'Apple' },
          { product_id: 300, product_name: 'Samsung' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT p.product_name, s.year, s.price FROM Sales s JOIN Product p ON s.product_id = p.product_id;',
    hints: [
      'Join `Sales` and `Product` on `product_id`.',
      'Select `p.product_name, s.year, s.price`.'
    ],
    xp: 100
  },
  {
    id: 8,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 2,
    levelTitle: 'BASIC JOINS',
    title: 'Customer Who Visited but Did Not Make Any Transactions',
    difficulty: 'Easy',
    concepts: ['LEFT JOIN', 'IS NULL', 'GROUP BY'],
    description: 'Find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.',
    schemaDescription: 'Visits (visit_id, customer_id), Transactions (transaction_id, visit_id, amount)',
    tables: [
      {
        name: 'Visits',
        description: 'Store visits by customers',
        columns: [
          { name: 'visit_id', type: 'INT', primaryKey: true },
          { name: 'customer_id', type: 'INT' }
        ],
        seedData: [
          { visit_id: 1, customer_id: 23 },
          { visit_id: 2, customer_id: 9 },
          { visit_id: 4, customer_id: 30 },
          { visit_id: 5, customer_id: 54 },
          { visit_id: 6, customer_id: 96 },
          { visit_id: 7, customer_id: 54 },
          { visit_id: 8, customer_id: 54 }
        ]
      },
      {
        name: 'Transactions',
        description: 'Transactions during store visits',
        columns: [
          { name: 'transaction_id', type: 'INT', primaryKey: true },
          { name: 'visit_id', type: 'INT' },
          { name: 'amount', type: 'INT' }
        ],
        seedData: [
          { transaction_id: 2, visit_id: 5, amount: 310 },
          { transaction_id: 3, visit_id: 5, amount: 300 },
          { transaction_id: 9, visit_id: 5, amount: 200 },
          { transaction_id: 12, visit_id: 1, amount: 910 },
          { transaction_id: 13, visit_id: 2, amount: 970 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans FROM Visits v LEFT JOIN Transactions t ON v.visit_id = t.visit_id WHERE t.transaction_id IS NULL GROUP BY v.customer_id;',
    hints: [
      'Left join `Visits` with `Transactions` on `visit_id`.',
      'Filter where `t.transaction_id IS NULL`.',
      'Group by `customer_id` and count `visit_id`.'
    ],
    xp: 100
  },
  {
    id: 9,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 2,
    levelTitle: 'BASIC JOINS',
    title: 'Rising Temperature',
    difficulty: 'Easy',
    concepts: ['Self Join', 'Date Difference'],
    description: 'Find all dates Id with higher temperatures compared to its previous dates (yesterday). Return the result table in any order.',
    schemaDescription: 'Weather (id, recordDate, temperature)',
    tables: [
      {
        name: 'Weather',
        description: 'Daily recorded temperatures',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'recordDate', type: 'DATE' },
          { name: 'temperature', type: 'INT' }
        ],
        seedData: [
          { id: 1, recordDate: '2015-01-01', temperature: 10 },
          { id: 2, recordDate: '2015-01-02', temperature: 25 },
          { id: 3, recordDate: '2015-01-03', temperature: 20 },
          { id: 4, recordDate: '2015-01-04', temperature: 30 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT w1.id FROM Weather w1 JOIN Weather w2 ON date(w1.recordDate) = date(w2.recordDate, '+1 day') WHERE w1.temperature > w2.temperature;",
    hints: [
      "Join `Weather` with itself where `date(w1.recordDate) = date(w2.recordDate, '+1 day')`.",
      'Filter where `w1.temperature > w2.temperature`.'
    ],
    xp: 100
  },
  {
    id: 10,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 2,
    levelTitle: 'BASIC JOINS',
    title: 'Average Time of Process per Machine',
    difficulty: 'Easy',
    concepts: ['Self Join', 'AVG()', 'ROUND()'],
    description: 'Calculate the average time each machine takes to complete a process. The time to complete a process is the "end" timestamp minus the "start" timestamp.',
    schemaDescription: 'Activity (machine_id, process_id, activity_type, timestamp)',
    tables: [
      {
        name: 'Activity',
        description: 'Machine process start and end event logs',
        columns: [
          { name: 'machine_id', type: 'INT' },
          { name: 'process_id', type: 'INT' },
          { name: 'activity_type', type: 'ENUM("start", "end")' },
          { name: 'timestamp', type: 'FLOAT' }
        ],
        seedData: [
          { machine_id: 0, process_id: 0, activity_type: 'start', timestamp: 0.712 },
          { machine_id: 0, process_id: 0, activity_type: 'end', timestamp: 1.520 },
          { machine_id: 0, process_id: 1, activity_type: 'start', timestamp: 3.140 },
          { machine_id: 0, process_id: 1, activity_type: 'end', timestamp: 4.120 },
          { machine_id: 1, process_id: 0, activity_type: 'start', timestamp: 0.550 },
          { machine_id: 1, process_id: 0, activity_type: 'end', timestamp: 1.550 },
          { machine_id: 1, process_id: 1, activity_type: 'start', timestamp: 0.430 },
          { machine_id: 1, process_id: 1, activity_type: 'end', timestamp: 1.420 },
          { machine_id: 2, process_id: 0, activity_type: 'start', timestamp: 4.100 },
          { machine_id: 2, process_id: 0, activity_type: 'end', timestamp: 4.512 },
          { machine_id: 2, process_id: 1, activity_type: 'start', timestamp: 2.500 },
          { machine_id: 2, process_id: 1, activity_type: 'end', timestamp: 5.000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time FROM Activity a1 JOIN Activity a2 ON a1.machine_id = a2.machine_id AND a1.process_id = a2.process_id AND a1.activity_type = 'start' AND a2.activity_type = 'end' GROUP BY a1.machine_id;",
    hints: [
      "Join `Activity` on `machine_id` and `process_id` matching `start` with `end`.",
      'Average the difference `AVG(a2.timestamp - a1.timestamp)` and round to 3 decimals.'
    ],
    xp: 150
  },
  {
    id: 11,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 2,
    levelTitle: 'BASIC JOINS',
    title: 'Employee Bonus',
    difficulty: 'Easy',
    concepts: ['LEFT JOIN', 'IS NULL'],
    description: 'Report the name and bonus amount of each employee with a bonus less than 1000. Return the result table in any order.',
    schemaDescription: 'Employee (empId, name, supervisor, salary), Bonus (empId, bonus)',
    tables: [
      {
        name: 'Employee',
        description: 'Employee details',
        columns: [
          { name: 'empId', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(255)' },
          { name: 'supervisor', type: 'INT', isNullable: true },
          { name: 'salary', type: 'INT' }
        ],
        seedData: [
          { empId: 3, name: 'Brad', supervisor: null, salary: 4000 },
          { empId: 1, name: 'John', supervisor: 3, salary: 1000 },
          { empId: 2, name: 'Dan', supervisor: 3, salary: 2000 },
          { empId: 4, name: 'Thomas', supervisor: 3, salary: 4000 }
        ]
      },
      {
        name: 'Bonus',
        description: 'Employee bonuses awarded',
        columns: [
          { name: 'empId', type: 'INT', primaryKey: true },
          { name: 'bonus', type: 'INT' }
        ],
        seedData: [
          { empId: 2, bonus: 500 },
          { empId: 4, bonus: 2000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT e.name, b.bonus FROM Employee e LEFT JOIN Bonus b ON e.empId = b.empId WHERE b.bonus < 1000 OR b.bonus IS NULL;',
    hints: [
      'Use `LEFT JOIN` so employees without a bonus record are included.',
      'Check `b.bonus < 1000 OR b.bonus IS NULL`.'
    ],
    xp: 100
  },
  {
    id: 12,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 2,
    levelTitle: 'BASIC JOINS',
    title: 'Students and Examinations',
    difficulty: 'Easy',
    concepts: ['CROSS JOIN', 'LEFT JOIN', 'COUNT()', 'GROUP BY'],
    description: 'Find the number of times each student attended each exam. Return the result table ordered by student_id and subject_name.',
    schemaDescription: 'Students (student_id, student_name), Subjects (subject_name), Examinations (student_id, subject_name)',
    tables: [
      {
        name: 'Students',
        description: 'Student list',
        columns: [
          { name: 'student_id', type: 'INT', primaryKey: true },
          { name: 'student_name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { student_id: 1, student_name: 'Alice' },
          { student_id: 2, student_name: 'Bob' },
          { student_id: 13, student_name: 'John' },
          { student_id: 6, student_name: 'Alex' }
        ]
      },
      {
        name: 'Subjects',
        description: 'Curriculum subjects',
        columns: [
          { name: 'subject_name', type: 'VARCHAR(20)', primaryKey: true }
        ],
        seedData: [
          { subject_name: 'Math' },
          { subject_name: 'Physics' },
          { subject_name: 'Programming' }
        ]
      },
      {
        name: 'Examinations',
        description: 'Exam attendance logs',
        columns: [
          { name: 'student_id', type: 'INT' },
          { name: 'subject_name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { student_id: 1, subject_name: 'Math' },
          { student_id: 1, subject_name: 'Physics' },
          { student_id: 1, subject_name: 'Programming' },
          { student_id: 2, subject_name: 'Programming' },
          { student_id: 1, subject_name: 'Physics' },
          { student_id: 1, subject_name: 'Math' },
          { student_id: 13, subject_name: 'Math' },
          { student_id: 13, subject_name: 'Programming' },
          { student_id: 13, subject_name: 'Physics' },
          { student_id: 2, subject_name: 'Math' },
          { student_id: 1, subject_name: 'Math' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams FROM Students s CROSS JOIN Subjects sub LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name GROUP BY s.student_id, s.student_name, sub.subject_name ORDER BY s.student_id, sub.subject_name;',
    hints: [
      '`CROSS JOIN` Students and Subjects to generate all pairs.',
      '`LEFT JOIN` Examinations on student_id and subject_name.',
      'Count `e.subject_name` so missing exams yield 0.'
    ],
    xp: 150
  },
  {
    id: 13,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 3,
    levelTitle: 'BASIC JOINS',
    title: 'Managers with at Least 5 Direct Reports',
    difficulty: 'Medium',
    concepts: ['Subquery', 'HAVING', 'COUNT()'],
    description: 'Find the managers with at least five direct reports. Return the result table in any order.',
    schemaDescription: 'Employee (id, name, department, managerId)',
    tables: [
      {
        name: 'Employee',
        description: 'Company employee hierarchy',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(255)' },
          { name: 'department', type: 'VARCHAR(255)' },
          { name: 'managerId', type: 'INT', isNullable: true }
        ],
        seedData: [
          { id: 101, name: 'John', department: 'A', managerId: null },
          { id: 102, name: 'Dan', department: 'A', managerId: 101 },
          { id: 103, name: 'James', department: 'A', managerId: 101 },
          { id: 104, name: 'Amy', department: 'A', managerId: 101 },
          { id: 105, name: 'Anne', department: 'A', managerId: 101 },
          { id: 106, name: 'Ron', department: 'B', managerId: 101 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT name FROM Employee WHERE id IN (SELECT managerId FROM Employee GROUP BY managerId HAVING COUNT(*) >= 5);',
    hints: [
      'Find `managerId` values in Employee with `COUNT(*) >= 5`.',
      'Select names of employees whose `id` matches those manager IDs.'
    ],
    xp: 200
  },
  {
    id: 14,
    track: 'leetcode-50',
    section: 'Basic Joins',
    level: 3,
    levelTitle: 'BASIC JOINS',
    title: 'Confirmation Rate',
    difficulty: 'Medium',
    concepts: ['LEFT JOIN', 'AVG()', 'CASE', 'ROUND()'],
    description: 'The confirmation rate of a user is the number of "confirmed" messages divided by the total number of requested confirmation messages. Round to 2 decimal places.',
    schemaDescription: 'Signups (user_id, time_stamp), Confirmations (user_id, time_stamp, action)',
    tables: [
      {
        name: 'Signups',
        description: 'Registered user signups',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'time_stamp', type: 'DATETIME' }
        ],
        seedData: [
          { user_id: 3, time_stamp: '2020-03-21 10:16:13' },
          { user_id: 7, time_stamp: '2020-01-04 13:57:59' },
          { user_id: 2, time_stamp: '2020-07-29 23:09:44' },
          { user_id: 6, time_stamp: '2020-12-09 10:39:37' }
        ]
      },
      {
        name: 'Confirmations',
        description: 'Confirmation action logs',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'time_stamp', type: 'DATETIME' },
          { name: 'action', type: 'ENUM("confirmed", "timeout")' }
        ],
        seedData: [
          { user_id: 3, time_stamp: '2021-01-06 03:30:46', action: 'timeout' },
          { user_id: 3, time_stamp: '2021-07-14 14:00:00', action: 'timeout' },
          { user_id: 7, time_stamp: '2021-06-12 11:57:29', action: 'confirmed' },
          { user_id: 7, time_stamp: '2021-06-13 12:58:28', action: 'confirmed' },
          { user_id: 7, time_stamp: '2021-06-14 13:59:27', action: 'confirmed' },
          { user_id: 2, time_stamp: '2021-01-22 00:00:00', action: 'confirmed' },
          { user_id: 2, time_stamp: '2021-02-28 23:59:59', action: 'timeout' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT s.user_id, ROUND(IFNULL(AVG(CASE WHEN c.action = 'confirmed' THEN 1.0 ELSE 0.0 END), 0), 2) AS confirmation_rate FROM Signups s LEFT JOIN Confirmations c ON s.user_id = c.user_id GROUP BY s.user_id;",
    hints: [
      "Left join `Signups` with `Confirmations`.",
      "Use `AVG(CASE WHEN c.action = 'confirmed' THEN 1.0 ELSE 0.0 END)` to compute confirmation rate.",
      'Use `IFNULL(..., 0)` and `ROUND(..., 2)`.'
    ],
    xp: 200
  },

  // =========================================================================
  // 3. BASIC AGGREGATE FUNCTIONS (15 - 22)
  // =========================================================================
  {
    id: 15,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 1,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Not Boring Movies',
    difficulty: 'Easy',
    concepts: ['MOD', 'WHERE', 'ORDER BY'],
    description: 'Report the movies with an odd-numbered ID and a description that is not "boring". Return the result table ordered by rating in descending order.',
    schemaDescription: 'Cinema (id, movie, description, rating)',
    tables: [
      {
        name: 'Cinema',
        description: 'Cinema catalogue and ratings',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'movie', type: 'VARCHAR(255)' },
          { name: 'description', type: 'VARCHAR(255)' },
          { name: 'rating', type: 'FLOAT' }
        ],
        seedData: [
          { id: 1, movie: 'War', description: 'great 3D', rating: 8.9 },
          { id: 2, movie: 'Science', description: 'fiction', rating: 8.5 },
          { id: 3, movie: 'irish', description: 'boring', rating: 6.2 },
          { id: 4, movie: 'Ice song', description: 'Fantacy', rating: 8.6 },
          { id: 5, movie: 'House card', description: 'Interesting', rating: 9.1 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT id, movie, description, rating FROM Cinema WHERE id % 2 = 1 AND description != 'boring' ORDER BY rating DESC;",
    hints: [
      "Filter with `id % 2 = 1` and `description != 'boring'`.",
      'Order by `rating DESC`.'
    ],
    xp: 100
  },
  {
    id: 16,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 2,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Average Selling Price',
    difficulty: 'Easy',
    concepts: ['LEFT JOIN', 'BETWEEN', 'SUM()', 'ROUND()'],
    description: 'Find the average selling price for each product. average_price should be rounded to 2 decimal places. If a product does not have any units sold, its average selling price is 0.',
    schemaDescription: 'Prices (product_id, start_date, end_date, price), UnitsSold (product_id, purchase_date, units)',
    tables: [
      {
        name: 'Prices',
        description: 'Product price tiers across dates',
        columns: [
          { name: 'product_id', type: 'INT' },
          { name: 'start_date', type: 'DATE' },
          { name: 'end_date', type: 'DATE' },
          { name: 'price', type: 'INT' }
        ],
        seedData: [
          { product_id: 1, start_date: '2019-02-17', end_date: '2019-02-28', price: 5 },
          { product_id: 1, start_date: '2019-03-01', end_date: '2019-03-22', price: 20 },
          { product_id: 2, start_date: '2019-02-01', end_date: '2019-02-20', price: 15 },
          { product_id: 2, start_date: '2019-02-21', end_date: '2019-03-31', price: 30 }
        ]
      },
      {
        name: 'UnitsSold',
        description: 'Daily units purchased per product',
        columns: [
          { name: 'product_id', type: 'INT' },
          { name: 'purchase_date', type: 'DATE' },
          { name: 'units', type: 'INT' }
        ],
        seedData: [
          { product_id: 1, purchase_date: '2019-02-25', units: 100 },
          { product_id: 1, purchase_date: '2019-03-01', units: 15 },
          { product_id: 2, purchase_date: '2019-02-10', units: 200 },
          { product_id: 2, purchase_date: '2019-03-22', units: 30 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT p.product_id, IFNULL(ROUND(SUM(p.price * u.units) * 1.0 / SUM(u.units), 2), 0) AS average_price FROM Prices p LEFT JOIN UnitsSold u ON p.product_id = u.product_id AND u.purchase_date BETWEEN p.start_date AND p.end_date GROUP BY p.product_id;',
    hints: [
      'Left join `Prices` and `UnitsSold` on product_id and purchase_date between start and end date.',
      'Compute `SUM(p.price * u.units) / SUM(u.units)` and handle nulls with `IFNULL(..., 0)`.'
    ],
    xp: 150
  },
  {
    id: 17,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 1,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Project Employees I',
    difficulty: 'Easy',
    concepts: ['JOIN', 'AVG()', 'ROUND()'],
    description: 'Report the average experience years of all the employees for each project, rounded to 2 digits.',
    schemaDescription: 'Project (project_id, employee_id), Employee (employee_id, name, experience_years)',
    tables: [
      {
        name: 'Project',
        description: 'Employee project assignments',
        columns: [
          { name: 'project_id', type: 'INT' },
          { name: 'employee_id', type: 'INT' }
        ],
        seedData: [
          { project_id: 1, employee_id: 1 },
          { project_id: 1, employee_id: 2 },
          { project_id: 1, employee_id: 3 },
          { project_id: 2, employee_id: 1 },
          { project_id: 2, employee_id: 4 }
        ]
      },
      {
        name: 'Employee',
        description: 'Employee experience years',
        columns: [
          { name: 'employee_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(10)' },
          { name: 'experience_years', type: 'INT' }
        ],
        seedData: [
          { employee_id: 1, name: 'Khaled', experience_years: 3 },
          { employee_id: 2, name: 'Ali', experience_years: 2 },
          { employee_id: 3, name: 'John', experience_years: 1 },
          { employee_id: 4, name: 'Doe', experience_years: 2 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years FROM Project p JOIN Employee e ON p.employee_id = e.employee_id GROUP BY p.project_id;',
    hints: [
      'Join `Project` with `Employee` on `employee_id`.',
      'Group by `project_id` and compute `ROUND(AVG(e.experience_years), 2)`.'
    ],
    xp: 100
  },
  {
    id: 18,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 1,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Percentage of Users Attended a Contest',
    difficulty: 'Easy',
    concepts: ['COUNT()', 'Subquery', 'ROUND()', 'ORDER BY'],
    description: 'Find the percentage of the users registered in each contest rounded to two decimals. Return result table ordered by percentage in descending order, then contest_id in ascending order.',
    schemaDescription: 'Users (user_id, user_name), Register (contest_id, user_id)',
    tables: [
      {
        name: 'Users',
        description: 'Registered contest users',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'user_name', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { user_id: 6, user_name: 'Alice' },
          { user_id: 2, user_name: 'Bob' },
          { user_id: 7, user_name: 'Alex' }
        ]
      },
      {
        name: 'Register',
        description: 'Contest registration records',
        columns: [
          { name: 'contest_id', type: 'INT' },
          { name: 'user_id', type: 'INT' }
        ],
        seedData: [
          { contest_id: 215, user_id: 6 },
          { contest_id: 209, user_id: 2 },
          { contest_id: 208, user_id: 2 },
          { contest_id: 210, user_id: 6 },
          { contest_id: 208, user_id: 6 },
          { contest_id: 209, user_id: 7 },
          { contest_id: 209, user_id: 6 },
          { contest_id: 215, user_id: 7 },
          { contest_id: 208, user_id: 7 },
          { contest_id: 210, user_id: 2 },
          { contest_id: 207, user_id: 2 },
          { contest_id: 210, user_id: 7 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT contest_id, ROUND(COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage FROM Register GROUP BY contest_id ORDER BY percentage DESC, contest_id ASC;',
    hints: [
      'Total users count is `(SELECT COUNT(*) FROM Users)`.',
      'Group by `contest_id` and compute `ROUND(COUNT(user_id) * 100.0 / total_users, 2)`.'
    ],
    xp: 150
  },
  {
    id: 19,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 2,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Queries Quality and Percentage',
    difficulty: 'Easy',
    concepts: ['AVG()', 'CASE', 'ROUND()'],
    description: 'Calculate query quality (avg rating / position) and poor query percentage (percentage of queries with rating < 3). Round both to 2 decimal places.',
    schemaDescription: 'Queries (query_name, result, position, rating)',
    tables: [
      {
        name: 'Queries',
        description: 'Search query evaluation results',
        columns: [
          { name: 'query_name', type: 'VARCHAR(30)' },
          { name: 'result', type: 'VARCHAR(50)' },
          { name: 'position', type: 'INT' },
          { name: 'rating', type: 'INT' }
        ],
        seedData: [
          { query_name: 'Dog', result: 'Golden Retriever', position: 1, rating: 5 },
          { query_name: 'Dog', result: 'German Shepherd', position: 2, rating: 5 },
          { query_name: 'Dog', result: 'Mule', position: 200, rating: 1 },
          { query_name: 'Cat', result: 'Shirazi', position: 5, rating: 2 },
          { query_name: 'Cat', result: 'Siamese', position: 3, rating: 3 },
          { query_name: 'Cat', result: 'Sphynx', position: 7, rating: 4 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT query_name, ROUND(AVG(rating * 1.0 / position), 2) AS quality, ROUND(AVG(CASE WHEN rating < 3 THEN 100.0 ELSE 0.0 END), 2) AS poor_query_percentage FROM Queries WHERE query_name IS NOT NULL GROUP BY query_name;',
    hints: [
      'Use `AVG(rating * 1.0 / position)` for quality.',
      'Use `AVG(CASE WHEN rating < 3 THEN 100.0 ELSE 0.0 END)` for poor query percentage.'
    ],
    xp: 150
  },
  {
    id: 20,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 3,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Monthly Transactions I',
    difficulty: 'Medium',
    concepts: ['GROUP BY', 'SUBSTR()', 'SUM()', 'CASE'],
    description: 'Find for each month and country: the number of transactions and their total amount, the number of approved transactions and their total amount.',
    schemaDescription: 'Transactions (id, country, state, amount, trans_date)',
    tables: [
      {
        name: 'Transactions',
        description: 'Credit card transaction records',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'country', type: 'VARCHAR(4)' },
          { name: 'state', type: 'ENUM("approved", "declined")' },
          { name: 'amount', type: 'INT' },
          { name: 'trans_date', type: 'DATE' }
        ],
        seedData: [
          { id: 121, country: 'US', state: 'approved', amount: 1000, trans_date: '2018-12-18' },
          { id: 122, country: 'US', state: 'declined', amount: 2000, trans_date: '2018-12-19' },
          { id: 123, country: 'US', state: 'approved', amount: 2000, trans_date: '2019-01-01' },
          { id: 124, country: 'DE', state: 'approved', amount: 2000, trans_date: '2019-01-07' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT SUBSTR(trans_date, 1, 7) AS month, country, COUNT(*) AS trans_count, SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(amount) AS trans_total_amount, SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount FROM Transactions GROUP BY month, country;",
    hints: [
      'Extract year-month formatted as `YYYY-MM` with `SUBSTR(trans_date, 1, 7)`.',
      'Group by `month, country` and sum amounts conditionally for approved transactions.'
    ],
    xp: 200
  },
  {
    id: 21,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 3,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Immediate Food Delivery II',
    difficulty: 'Medium',
    concepts: ['Subquery', 'MIN()', 'AVG()', 'ROUND()'],
    description: 'Find the percentage of immediate orders in the first orders of all customers, rounded to 2 decimal places.',
    schemaDescription: 'Delivery (delivery_id, customer_id, order_date, customer_pref_delivery_date)',
    tables: [
      {
        name: 'Delivery',
        description: 'Customer delivery orders',
        columns: [
          { name: 'delivery_id', type: 'INT', primaryKey: true },
          { name: 'customer_id', type: 'INT' },
          { name: 'order_date', type: 'DATE' },
          { name: 'customer_pref_delivery_date', type: 'DATE' }
        ],
        seedData: [
          { delivery_id: 1, customer_id: 1, order_date: '2019-08-01', customer_pref_delivery_date: '2019-08-02' },
          { delivery_id: 2, customer_id: 2, order_date: '2019-08-02', customer_pref_delivery_date: '2019-08-02' },
          { delivery_id: 3, customer_id: 1, order_date: '2019-08-11', customer_pref_delivery_date: '2019-08-12' },
          { delivery_id: 4, customer_id: 3, order_date: '2019-08-24', customer_pref_delivery_date: '2019-08-24' },
          { delivery_id: 5, customer_id: 3, order_date: '2019-08-21', customer_pref_delivery_date: '2019-08-22' },
          { delivery_id: 6, customer_id: 2, order_date: '2019-08-11', customer_pref_delivery_date: '2019-08-13' },
          { delivery_id: 7, customer_id: 4, order_date: '2019-08-09', customer_pref_delivery_date: '2019-08-09' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 100.0 ELSE 0.0 END) / COUNT(*), 2) AS immediate_percentage FROM Delivery WHERE (customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY customer_id);',
    hints: [
      'Filter for first orders using `(customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY customer_id)`.',
      'Compute immediate percentage where `order_date = customer_pref_delivery_date`.'
    ],
    xp: 200
  },
  {
    id: 22,
    track: 'leetcode-50',
    section: 'Basic Aggregate Functions',
    level: 3,
    levelTitle: 'BASIC AGGREGATE FUNCTIONS',
    title: 'Game Play Analysis IV',
    difficulty: 'Medium',
    concepts: ['Self Join', 'MIN()', 'ROUND()', 'Date Calculation'],
    description: 'Report the fraction of players that logged in again on the day after the day they first logged in, rounded to 2 decimal places.',
    schemaDescription: 'Activity (player_id, device_id, event_date, games_played)',
    tables: [
      {
        name: 'Activity',
        description: 'Player daily login events',
        columns: [
          { name: 'player_id', type: 'INT' },
          { name: 'device_id', type: 'INT' },
          { name: 'event_date', type: 'DATE' },
          { name: 'games_played', type: 'INT' }
        ],
        seedData: [
          { player_id: 1, device_id: 2, event_date: '2016-03-01', games_played: 5 },
          { player_id: 1, device_id: 2, event_date: '2016-03-02', games_played: 6 },
          { player_id: 2, device_id: 3, event_date: '2017-06-25', games_played: 1 },
          { player_id: 3, device_id: 1, event_date: '2016-03-02', games_played: 0 },
          { player_id: 3, device_id: 4, event_date: '2018-07-03', games_played: 5 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT ROUND(COUNT(DISTINCT a1.player_id) * 1.0 / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction FROM Activity a1 JOIN Activity a2 ON a1.player_id = a2.player_id AND date(a2.event_date) = date(a1.event_date, '+1 day') WHERE (a1.player_id, a1.event_date) IN (SELECT player_id, MIN(event_date) FROM Activity GROUP BY player_id);",
    hints: [
      'Find the first login date for each player with `MIN(event_date)`.',
      "Check if another activity row exists at `date(event_date, '+1 day')`."
    ],
    xp: 200
  },

  // =========================================================================
  // 4. SORTING AND GROUPING (23 - 29)
  // =========================================================================
  {
    id: 23,
    track: 'leetcode-50',
    section: 'Sorting and Grouping',
    level: 1,
    levelTitle: 'SORTING AND GROUPING',
    title: 'Number of Unique Subjects Taught by Each Teacher',
    difficulty: 'Easy',
    concepts: ['COUNT(DISTINCT)', 'GROUP BY'],
    description: 'Calculate the number of unique subjects each teacher teaches in the university. Return the result table in any order.',
    schemaDescription: 'Teacher (teacher_id, subject_id, dept_id)',
    tables: [
      {
        name: 'Teacher',
        description: 'Teacher subject assignments',
        columns: [
          { name: 'teacher_id', type: 'INT' },
          { name: 'subject_id', type: 'INT' },
          { name: 'dept_id', type: 'INT' }
        ],
        seedData: [
          { teacher_id: 1, subject_id: 2, dept_id: 3 },
          { teacher_id: 1, subject_id: 2, dept_id: 4 },
          { teacher_id: 1, subject_id: 3, dept_id: 3 },
          { teacher_id: 2, subject_id: 1, dept_id: 1 },
          { teacher_id: 2, subject_id: 2, dept_id: 1 },
          { teacher_id: 2, subject_id: 3, dept_id: 1 },
          { teacher_id: 2, subject_id: 4, dept_id: 1 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt FROM Teacher GROUP BY teacher_id;',
    hints: [
      'Group by `teacher_id`.',
      'Use `COUNT(DISTINCT subject_id)` as `cnt`.'
    ],
    xp: 100
  },
  {
    id: 24,
    track: 'leetcode-50',
    section: 'Sorting and Grouping',
    level: 1,
    levelTitle: 'SORTING AND GROUPING',
    title: 'User Activity for the Past 30 Days I',
    difficulty: 'Easy',
    concepts: ['COUNT(DISTINCT)', 'BETWEEN', 'GROUP BY'],
    description: 'Find the daily active user count for a period of 30 days ending 2019-07-27 inclusively. A user was active on days where they had at least one activity.',
    schemaDescription: 'Activity (user_id, session_id, activity_date, activity_type)',
    tables: [
      {
        name: 'Activity',
        description: 'User daily activities and sessions',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'session_id', type: 'INT' },
          { name: 'activity_date', type: 'DATE' },
          { name: 'activity_type', type: 'ENUM("open_session", "end_session", "scroll_down", "send_message")' }
        ],
        seedData: [
          { user_id: 1, session_id: 1, activity_date: '2019-07-20', activity_type: 'open_session' },
          { user_id: 1, session_id: 1, activity_date: '2019-07-20', activity_type: 'scroll_down' },
          { user_id: 1, session_id: 1, activity_date: '2019-07-20', activity_type: 'end_session' },
          { user_id: 2, session_id: 4, activity_date: '2019-07-20', activity_type: 'open_session' },
          { user_id: 2, session_id: 4, activity_date: '2019-07-21', activity_type: 'send_message' },
          { user_id: 2, session_id: 4, activity_date: '2019-07-21', activity_type: 'end_session' },
          { user_id: 3, session_id: 2, activity_date: '2019-07-21', activity_type: 'open_session' },
          { user_id: 3, session_id: 2, activity_date: '2019-07-21', activity_type: 'send_message' },
          { user_id: 3, session_id: 2, activity_date: '2019-07-21', activity_type: 'end_session' },
          { user_id: 4, session_id: 3, activity_date: '2019-06-25', activity_type: 'open_session' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users FROM Activity WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27' GROUP BY activity_date;",
    hints: [
      "Filter `activity_date BETWEEN '2019-06-28' AND '2019-07-27'`.",
      'Count distinct `user_id` per `activity_date`.'
    ],
    xp: 100
  },
  {
    id: 25,
    track: 'leetcode-50',
    section: 'Sorting and Grouping',
    level: 3,
    levelTitle: 'SORTING AND GROUPING',
    title: 'Product Sales Analysis III',
    difficulty: 'Medium',
    concepts: ['Subquery', 'MIN()'],
    description: 'Select the product id, year, quantity, and price for the first year of every product sold.',
    schemaDescription: 'Sales (sale_id, product_id, year, quantity, price)',
    tables: [
      {
        name: 'Sales',
        description: 'Product annual sales records',
        columns: [
          { name: 'sale_id', type: 'INT' },
          { name: 'product_id', type: 'INT' },
          { name: 'year', type: 'INT' },
          { name: 'quantity', type: 'INT' },
          { name: 'price', type: 'INT' }
        ],
        seedData: [
          { sale_id: 1, product_id: 100, year: 2008, quantity: 10, price: 5000 },
          { sale_id: 2, product_id: 100, year: 2009, quantity: 12, price: 5000 },
          { sale_id: 7, product_id: 200, year: 2011, quantity: 15, price: 9000 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT product_id, year AS first_year, quantity, price FROM Sales WHERE (product_id, year) IN (SELECT product_id, MIN(year) FROM Sales GROUP BY product_id);',
    hints: [
      'Find the minimum year for each product using `GROUP BY product_id`.',
      'Filter with `(product_id, year) IN (...)`.'
    ],
    xp: 200
  },
  {
    id: 26,
    track: 'leetcode-50',
    section: 'Sorting and Grouping',
    level: 1,
    levelTitle: 'SORTING AND GROUPING',
    title: 'Classes More Than 5 Students',
    difficulty: 'Easy',
    concepts: ['HAVING', 'COUNT()', 'GROUP BY'],
    description: 'Find all the classes that have at least five students. Return the result table in any order.',
    schemaDescription: 'Courses (student, class)',
    tables: [
      {
        name: 'Courses',
        description: 'Student course enrolments',
        columns: [
          { name: 'student', type: 'VARCHAR(255)' },
          { name: 'class', type: 'VARCHAR(255)' }
        ],
        seedData: [
          { student: 'A', class: 'Math' },
          { student: 'B', class: 'English' },
          { student: 'C', class: 'Math' },
          { student: 'D', class: 'Biology' },
          { student: 'E', class: 'Math' },
          { student: 'F', class: 'Computer' },
          { student: 'G', class: 'Math' },
          { student: 'H', class: 'Math' },
          { student: 'I', class: 'Math' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT class FROM Courses GROUP BY class HAVING COUNT(student) >= 5;',
    hints: [
      'Group by `class`.',
      'Filter using `HAVING COUNT(student) >= 5`.'
    ],
    xp: 100
  },
  {
    id: 27,
    track: 'leetcode-50',
    section: 'Sorting and Grouping',
    level: 1,
    levelTitle: 'SORTING AND GROUPING',
    title: 'Find Followers Count',
    difficulty: 'Easy',
    concepts: ['COUNT()', 'GROUP BY', 'ORDER BY'],
    description: 'Write a solution that will, for each user, return the number of followers. Return the result table ordered by user_id in ascending order.',
    schemaDescription: 'Followers (user_id, follower_id)',
    tables: [
      {
        name: 'Followers',
        description: 'Social network follower graph',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'follower_id', type: 'INT' }
        ],
        seedData: [
          { user_id: 0, follower_id: 1 },
          { user_id: 1, follower_id: 0 },
          { user_id: 2, follower_id: 0 },
          { user_id: 2, follower_id: 1 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT user_id, COUNT(follower_id) AS followers_count FROM Followers GROUP BY user_id ORDER BY user_id ASC;',
    hints: [
      'Group by `user_id`.',
      'Select `user_id, COUNT(follower_id) AS followers_count` and order by `user_id ASC`.'
    ],
    xp: 100
  },
  {
    id: 28,
    track: 'leetcode-50',
    section: 'Sorting and Grouping',
    level: 1,
    levelTitle: 'SORTING AND GROUPING',
    title: 'Biggest Single Number',
    difficulty: 'Easy',
    concepts: ['MAX()', 'HAVING', 'Subquery'],
    description: 'Find the largest single number that appears only once in the table. If there is no such number, return null.',
    schemaDescription: 'MyNumbers (num)',
    tables: [
      {
        name: 'MyNumbers',
        description: 'List of numbers with possible duplicates',
        columns: [
          { name: 'num', type: 'INT' }
        ],
        seedData: [
          { num: 8 },
          { num: 8 },
          { num: 3 },
          { num: 3 },
          { num: 1 },
          { num: 4 },
          { num: 5 },
          { num: 6 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT MAX(num) AS num FROM (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1);',
    hints: [
      'In a subquery, find all numbers where `COUNT(*) = 1`.',
      'Select `MAX(num)` from the subquery result.'
    ],
    xp: 100
  },
  {
    id: 29,
    track: 'leetcode-50',
    section: 'Sorting and Grouping',
    level: 3,
    levelTitle: 'SORTING AND GROUPING',
    title: 'Customers Who Bought All Products',
    difficulty: 'Medium',
    concepts: ['Relational Division', 'HAVING', 'COUNT(DISTINCT)'],
    description: 'Report the customer_ids from the Customer table that bought all the products in the Product table.',
    schemaDescription: 'Customer (customer_id, product_key), Product (product_key)',
    tables: [
      {
        name: 'Customer',
        description: 'Customer purchase history',
        columns: [
          { name: 'customer_id', type: 'INT' },
          { name: 'product_key', type: 'INT' }
        ],
        seedData: [
          { customer_id: 1, product_key: 5 },
          { customer_id: 2, product_key: 6 },
          { customer_id: 3, product_key: 5 },
          { customer_id: 3, product_key: 6 },
          { customer_id: 1, product_key: 6 }
        ]
      },
      {
        name: 'Product',
        description: 'Product catalogue',
        columns: [
          { name: 'product_key', type: 'INT', primaryKey: true }
        ],
        seedData: [
          { product_key: 5 },
          { product_key: 6 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT customer_id FROM Customer GROUP BY customer_id HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);',
    hints: [
      'Group by `customer_id`.',
      'Filter with `HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product)`.'
    ],
    xp: 200
  },

  // =========================================================================
  // 5. ADVANCED SELECT AND JOINS (30 - 36)
  // =========================================================================
  {
    id: 30,
    track: 'leetcode-50',
    section: 'Advanced Select and Joins',
    level: 2,
    levelTitle: 'ADVANCED SELECT AND JOINS',
    title: 'The Number of Employees Which Report to Each Employee',
    difficulty: 'Easy',
    concepts: ['Self Join', 'AVG()', 'ROUND()', 'ORDER BY'],
    description: 'For each manager with at least 1 direct report: report manager id, name, reports_count, and average_age of direct reports rounded to the nearest integer.',
    schemaDescription: 'Employees (employee_id, name, reports_to, age)',
    tables: [
      {
        name: 'Employees',
        description: 'Employee reports and age details',
        columns: [
          { name: 'employee_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' },
          { name: 'reports_to', type: 'INT', isNullable: true },
          { name: 'age', type: 'INT' }
        ],
        seedData: [
          { employee_id: 9, name: 'Hercy', reports_to: null, age: 43 },
          { employee_id: 6, name: 'Alice', reports_to: 9, age: 41 },
          { employee_id: 4, name: 'Bob', reports_to: 9, age: 36 },
          { employee_id: 2, name: 'Winston', reports_to: null, age: 37 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT e1.employee_id, e1.name, COUNT(e2.employee_id) AS reports_count, ROUND(AVG(e2.age)) AS average_age FROM Employees e1 JOIN Employees e2 ON e1.employee_id = e2.reports_to GROUP BY e1.employee_id, e1.name ORDER BY e1.employee_id ASC;',
    hints: [
      'Join `Employees` e1 (manager) to e2 (reports) on `e1.employee_id = e2.reports_to`.',
      'Count direct reports and round the average age.'
    ],
    xp: 150
  },
  {
    id: 31,
    track: 'leetcode-50',
    section: 'Advanced Select and Joins',
    level: 2,
    levelTitle: 'ADVANCED SELECT AND JOINS',
    title: 'Primary Department for Each Employee',
    difficulty: 'Easy',
    concepts: ['UNION', 'OR', 'Subquery'],
    description: "Report all the employees with their primary department. For employees who belong to one department, report that department even if primary_flag is 'N'.",
    schemaDescription: 'Employee (employee_id, department_id, primary_flag)',
    tables: [
      {
        name: 'Employee',
        description: 'Employee department memberships',
        columns: [
          { name: 'employee_id', type: 'INT' },
          { name: 'department_id', type: 'INT' },
          { name: 'primary_flag', type: 'ENUM("Y", "N")' }
        ],
        seedData: [
          { employee_id: 1, department_id: 1, primary_flag: 'N' },
          { employee_id: 2, department_id: 1, primary_flag: 'Y' },
          { employee_id: 2, department_id: 2, primary_flag: 'N' },
          { employee_id: 3, department_id: 3, primary_flag: 'N' },
          { employee_id: 4, department_id: 2, primary_flag: 'N' },
          { employee_id: 4, department_id: 3, primary_flag: 'Y' },
          { employee_id: 4, department_id: 4, primary_flag: 'N' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT employee_id, department_id FROM Employee WHERE primary_flag = 'Y' OR employee_id IN (SELECT employee_id FROM Employee GROUP BY employee_id HAVING COUNT(*) = 1);",
    hints: [
      "Select rows where `primary_flag = 'Y'`.",
      'Also include employees with only 1 department.'
    ],
    xp: 150
  },
  {
    id: 32,
    track: 'leetcode-50',
    section: 'Advanced Select and Joins',
    level: 1,
    levelTitle: 'ADVANCED SELECT AND JOINS',
    title: 'Triangle Judgement',
    difficulty: 'Easy',
    concepts: ['CASE WHEN', 'Arithmetic Condition'],
    description: 'Report for every three line segments whether they can form a triangle (x + y > z AND x + z > y AND y + z > x).',
    schemaDescription: 'Triangle (x, y, z)',
    tables: [
      {
        name: 'Triangle',
        description: 'Segment length triplets',
        columns: [
          { name: 'x', type: 'INT' },
          { name: 'y', type: 'INT' },
          { name: 'z', type: 'INT' }
        ],
        seedData: [
          { x: 13, y: 15, z: 30 },
          { x: 10, y: 20, z: 15 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT x, y, z, CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle FROM Triangle;",
    hints: [
      "Use `CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle`."
    ],
    xp: 100
  },
  {
    id: 33,
    track: 'leetcode-50',
    section: 'Advanced Select and Joins',
    level: 3,
    levelTitle: 'ADVANCED SELECT AND JOINS',
    title: 'Consecutive Numbers',
    difficulty: 'Medium',
    concepts: ['Self Join', 'DISTINCT'],
    description: 'Find all numbers that appear at least three times consecutively.',
    schemaDescription: 'Logs (id, num)',
    tables: [
      {
        name: 'Logs',
        description: 'Sequence log entries',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'num', type: 'VARCHAR(255)' }
        ],
        seedData: [
          { id: 1, num: '1' },
          { id: 2, num: '1' },
          { id: 3, num: '1' },
          { id: 4, num: '2' },
          { id: 5, num: '1' },
          { id: 6, num: '2' },
          { id: 7, num: '2' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT DISTINCT l1.num AS ConsecutiveNums FROM Logs l1 JOIN Logs l2 ON l1.id = l2.id - 1 AND l1.num = l2.num JOIN Logs l3 ON l1.id = l3.id - 2 AND l1.num = l3.num;',
    hints: [
      'Self join `Logs` 3 times: `l1.id = l2.id - 1` and `l1.id = l3.id - 2` with identical `num`.',
      'Select `DISTINCT l1.num AS ConsecutiveNums`.'
    ],
    xp: 200
  },
  {
    id: 34,
    track: 'leetcode-50',
    section: 'Advanced Select and Joins',
    level: 3,
    levelTitle: 'ADVANCED SELECT AND JOINS',
    title: 'Product Price at a Given Date',
    difficulty: 'Medium',
    concepts: ['UNION', 'Subquery', 'MAX(date)'],
    description: 'Find the prices of all products on 2019-08-16. Assume the price of all products before any change is 10.',
    schemaDescription: 'Products (product_id, new_price, change_date)',
    tables: [
      {
        name: 'Products',
        description: 'Price change history logs',
        columns: [
          { name: 'product_id', type: 'INT' },
          { name: 'new_price', type: 'INT' },
          { name: 'change_date', type: 'DATE' }
        ],
        seedData: [
          { product_id: 1, new_price: 20, change_date: '2019-08-14' },
          { product_id: 2, new_price: 50, change_date: '2019-08-14' },
          { product_id: 1, new_price: 30, change_date: '2019-08-15' },
          { product_id: 1, new_price: 35, change_date: '2019-08-16' },
          { product_id: 2, new_price: 65, change_date: '2019-08-17' },
          { product_id: 3, new_price: 20, change_date: '2019-08-18' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT product_id, new_price AS price FROM Products WHERE (product_id, change_date) IN (SELECT product_id, MAX(change_date) FROM Products WHERE change_date <= '2019-08-16' GROUP BY product_id) UNION SELECT product_id, 10 AS price FROM Products WHERE product_id NOT IN (SELECT product_id FROM Products WHERE change_date <= '2019-08-16');",
    hints: [
      "Find the latest price for each product on or before '2019-08-16'.",
      'Union with products whose first price change occurred after that date (default price 10).'
    ],
    xp: 200
  },
  {
    id: 35,
    track: 'leetcode-50',
    section: 'Advanced Select and Joins',
    level: 3,
    levelTitle: 'ADVANCED SELECT AND JOINS',
    title: 'Last Person to Fit in the Bus',
    difficulty: 'Medium',
    concepts: ['Window Function', 'SUM() OVER()', 'LIMIT 1'],
    description: 'There is a queue of people waiting to board a bus with a weight limit of 1000 kilograms. Find the name of the last person that can fit without exceeding the weight limit.',
    schemaDescription: 'Queue (person_id, person_name, weight, turn)',
    tables: [
      {
        name: 'Queue',
        description: 'Passenger boarding queue and weights',
        columns: [
          { name: 'person_id', type: 'INT', primaryKey: true },
          { name: 'person_name', type: 'VARCHAR(255)' },
          { name: 'weight', type: 'INT' },
          { name: 'turn', type: 'INT' }
        ],
        seedData: [
          { person_id: 5, person_name: 'Alice', weight: 250, turn: 1 },
          { person_id: 4, person_name: 'Bob', weight: 175, turn: 5 },
          { person_id: 3, person_name: 'Alex', weight: 350, turn: 2 },
          { person_id: 6, person_name: 'John Cena', weight: 400, turn: 3 },
          { person_id: 1, person_name: 'Winston', weight: 500, turn: 6 },
          { person_id: 2, person_name: 'Marie', weight: 200, turn: 4 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT person_name FROM (SELECT person_name, SUM(weight) OVER (ORDER BY turn) AS total_weight FROM Queue) WHERE total_weight <= 1000 ORDER BY total_weight DESC LIMIT 1;',
    hints: [
      'Compute running sum of weights: `SUM(weight) OVER (ORDER BY turn)`',
      'Filter `total_weight <= 1000` and pick the last one with `ORDER BY total_weight DESC LIMIT 1`.'
    ],
    xp: 200
  },
  {
    id: 36,
    track: 'leetcode-50',
    section: 'Advanced Select and Joins',
    level: 3,
    levelTitle: 'ADVANCED SELECT AND JOINS',
    title: 'Count Salary Categories',
    difficulty: 'Medium',
    concepts: ['UNION', 'COUNT()', 'Categorization'],
    description: 'Calculate the number of bank accounts for each salary category: Low Salary (strictly less than $20,000), Average Salary (inclusive $20,000 to $50,000), High Salary (strictly greater than $50,000).',
    schemaDescription: 'Accounts (account_id, income)',
    tables: [
      {
        name: 'Accounts',
        description: 'Bank customer incomes',
        columns: [
          { name: 'account_id', type: 'INT', primaryKey: true },
          { name: 'income', type: 'INT' }
        ],
        seedData: [
          { account_id: 3, income: 108939 },
          { account_id: 2, income: 12747 },
          { account_id: 8, income: 87709 },
          { account_id: 6, income: 91796 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT 'Low Salary' AS category, COUNT(account_id) AS accounts_count FROM Accounts WHERE income < 20000 UNION SELECT 'Average Salary' AS category, COUNT(account_id) AS accounts_count FROM Accounts WHERE income BETWEEN 20000 AND 50000 UNION SELECT 'High Salary' AS category, COUNT(account_id) AS accounts_count FROM Accounts WHERE income > 50000;",
    hints: [
      'Write 3 SELECT queries for each category (Low, Average, High) and combine with `UNION`.',
      'This guarantees categories with 0 accounts still appear.'
    ],
    xp: 200
  },

  // =========================================================================
  // 6. SUBQUERIES (37 - 43)
  // =========================================================================
  {
    id: 37,
    track: 'leetcode-50',
    section: 'Subqueries',
    level: 2,
    levelTitle: 'SUBQUERIES',
    title: 'Employees Whose Manager Left the Company',
    difficulty: 'Easy',
    concepts: ['NOT IN', 'WHERE', 'ORDER BY'],
    description: 'Find the IDs of the employees whose salary is strictly less than $30000 and whose manager left the company. Return result ordered by employee_id.',
    schemaDescription: 'Employees (employee_id, name, manager_id, salary)',
    tables: [
      {
        name: 'Employees',
        description: 'Staff directory with manager links',
        columns: [
          { name: 'employee_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(20)' },
          { name: 'manager_id', type: 'INT', isNullable: true },
          { name: 'salary', type: 'INT' }
        ],
        seedData: [
          { employee_id: 3, name: 'Mila', manager_id: 9, salary: 60301 },
          { employee_id: 12, name: 'Antonella', manager_id: null, salary: 31000 },
          { employee_id: 13, name: 'Emery', manager_id: null, salary: 67084 },
          { employee_id: 1, name: 'Kalel', manager_id: 11, salary: 21241 },
          { employee_id: 9, name: 'Mikaela', manager_id: null, salary: 50937 },
          { employee_id: 11, name: 'Joziah', manager_id: 6, salary: 28485 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT employee_id FROM Employees WHERE salary < 30000 AND manager_id IS NOT NULL AND manager_id NOT IN (SELECT employee_id FROM Employees) ORDER BY employee_id ASC;',
    hints: [
      'Filter `salary < 30000 AND manager_id IS NOT NULL`.',
      'Check `manager_id NOT IN (SELECT employee_id FROM Employees)`.'
    ],
    xp: 150
  },
  {
    id: 38,
    track: 'leetcode-50',
    section: 'Subqueries',
    level: 3,
    levelTitle: 'SUBQUERIES',
    title: 'Exchange Seats',
    difficulty: 'Medium',
    concepts: ['CASE', 'MOD', 'Arithmetic Swap'],
    description: 'Swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.',
    schemaDescription: 'Seat (id, student)',
    tables: [
      {
        name: 'Seat',
        description: 'Classroom seating assignments',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'student', type: 'VARCHAR(255)' }
        ],
        seedData: [
          { id: 1, student: 'Abbot' },
          { id: 2, student: 'Doris' },
          { id: 3, student: 'Emerson' },
          { id: 4, student: 'Green' },
          { id: 5, student: 'Jeames' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT CASE WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id WHEN id % 2 = 1 THEN id + 1 ELSE id - 1 END AS id, student FROM Seat ORDER BY id ASC;',
    hints: [
      'For odd id, add 1 (unless it is the very last seat).',
      'For even id, subtract 1.'
    ],
    xp: 200
  },
  {
    id: 39,
    track: 'leetcode-50',
    section: 'Subqueries',
    level: 3,
    levelTitle: 'SUBQUERIES',
    title: 'Movie Rating',
    difficulty: 'Medium',
    concepts: ['UNION ALL', 'AVG()', 'COUNT()', 'LIMIT 1'],
    description: 'Find the name of the user who has rated the greatest number of movies (lexicographical tie-breaker). Also find the movie name with the highest average rating in February 2020.',
    schemaDescription: 'Movies (movie_id, title), Users (user_id, name), MovieRating (movie_id, user_id, rating, created_at)',
    tables: [
      {
        name: 'Movies',
        description: 'Movie catalogue',
        columns: [
          { name: 'movie_id', type: 'INT', primaryKey: true },
          { name: 'title', type: 'VARCHAR(30)' }
        ],
        seedData: [
          { movie_id: 1, title: 'Avengers' },
          { movie_id: 2, title: 'Frozen 2' },
          { movie_id: 3, title: 'Joker' }
        ]
      },
      {
        name: 'Users',
        description: 'Platform users',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(30)' }
        ],
        seedData: [
          { user_id: 1, name: 'Daniel' },
          { user_id: 2, name: 'Monica' },
          { user_id: 3, name: 'Maria' },
          { user_id: 4, name: 'James' }
        ]
      },
      {
        name: 'MovieRating',
        description: 'User ratings given to movies',
        columns: [
          { name: 'movie_id', type: 'INT' },
          { name: 'user_id', type: 'INT' },
          { name: 'rating', type: 'INT' },
          { name: 'created_at', type: 'DATE' }
        ],
        seedData: [
          { movie_id: 1, user_id: 1, rating: 3, created_at: '2020-01-12' },
          { movie_id: 1, user_id: 2, rating: 4, created_at: '2020-02-11' },
          { movie_id: 1, user_id: 3, rating: 2, created_at: '2020-02-12' },
          { movie_id: 1, user_id: 4, rating: 1, created_at: '2020-01-01' },
          { movie_id: 2, user_id: 1, rating: 5, created_at: '2020-02-17' },
          { movie_id: 2, user_id: 2, rating: 2, created_at: '2020-02-01' },
          { movie_id: 2, user_id: 3, rating: 2, created_at: '2020-03-01' },
          { movie_id: 3, user_id: 1, rating: 3, created_at: '2020-02-22' },
          { movie_id: 3, user_id: 2, rating: 4, created_at: '2020-02-25' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT (SELECT name FROM MovieRating JOIN Users ON MovieRating.user_id = Users.user_id GROUP BY Users.user_id ORDER BY COUNT(*) DESC, name ASC LIMIT 1) AS results UNION ALL SELECT (SELECT title FROM MovieRating JOIN Movies ON MovieRating.movie_id = Movies.movie_id WHERE created_at LIKE '2020-02%' GROUP BY Movies.movie_id ORDER BY AVG(rating) DESC, title ASC LIMIT 1) AS results;",
    hints: [
      'Write query 1 for top user (order by count desc, name asc limit 1).',
      'Write query 2 for top movie in Feb 2020 (order by avg(rating) desc, title asc limit 1).',
      'Combine using `UNION ALL`.'
    ],
    xp: 200
  },
  {
    id: 40,
    track: 'leetcode-50',
    section: 'Subqueries',
    level: 3,
    levelTitle: 'SUBQUERIES',
    title: 'Restaurant Growth',
    difficulty: 'Medium',
    concepts: ['Window Function', 'Rolling Average', 'ROWS PRECEDING'],
    description: 'Compute the moving average of how much the customer paid in a seven days window (current day + 6 days before).',
    schemaDescription: 'Customer (customer_id, name, visited_on, amount)',
    tables: [
      {
        name: 'Customer',
        description: 'Customer daily bills',
        columns: [
          { name: 'customer_id', type: 'INT' },
          { name: 'name', type: 'VARCHAR(20)' },
          { name: 'visited_on', type: 'DATE' },
          { name: 'amount', type: 'INT' }
        ],
        seedData: [
          { customer_id: 1, name: 'Jhon', visited_on: '2019-01-01', amount: 100 },
          { customer_id: 2, name: 'Daniel', visited_on: '2019-01-02', amount: 110 },
          { customer_id: 3, name: 'Jade', visited_on: '2019-01-03', amount: 120 },
          { customer_id: 4, name: 'Khaled', visited_on: '2019-01-04', amount: 130 },
          { customer_id: 5, name: 'Winston', visited_on: '2019-01-05', amount: 110 },
          { customer_id: 6, name: 'Elvis', visited_on: '2019-01-06', amount: 140 },
          { customer_id: 7, name: 'Anna', visited_on: '2019-01-07', amount: 150 },
          { customer_id: 8, name: 'Maria', visited_on: '2019-01-08', amount: 80 },
          { customer_id: 9, name: 'Jaze', visited_on: '2019-01-09', amount: 110 },
          { customer_id: 1, name: 'Jhon', visited_on: '2019-01-10', amount: 130 },
          { customer_id: 3, name: 'Jade', visited_on: '2019-01-10', amount: 150 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT visited_on, amount, ROUND(average_amount, 2) AS average_amount FROM (SELECT visited_on, SUM(sum_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount, AVG(sum_amount * 1.0) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS average_amount, ROW_NUMBER() OVER (ORDER BY visited_on) AS rn FROM (SELECT visited_on, SUM(amount) AS sum_amount FROM Customer GROUP BY visited_on)) WHERE rn >= 7;',
    hints: [
      'First group daily amounts: `SELECT visited_on, SUM(amount) FROM Customer GROUP BY visited_on`.',
      'Use `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` for 7-day window and filter `rn >= 7`.'
    ],
    xp: 200
  },
  {
    id: 41,
    track: 'leetcode-50',
    section: 'Subqueries',
    level: 3,
    levelTitle: 'SUBQUERIES',
    title: 'Friend Requests II: Who Has the Most Friends',
    difficulty: 'Medium',
    concepts: ['UNION ALL', 'COUNT()', 'LIMIT 1'],
    description: 'Find the people who have the most friends and the most friends number.',
    schemaDescription: 'RequestAccepted (requester_id, accepter_id, accept_date)',
    tables: [
      {
        name: 'RequestAccepted',
        description: 'Accepted friendship records',
        columns: [
          { name: 'requester_id', type: 'INT' },
          { name: 'accepter_id', type: 'INT' },
          { name: 'accept_date', type: 'DATE' }
        ],
        seedData: [
          { requester_id: 1, accepter_id: 2, accept_date: '2016/06/03' },
          { requester_id: 1, accepter_id: 3, accept_date: '2016/06/08' },
          { requester_id: 2, accepter_id: 3, accept_date: '2016/06/08' },
          { requester_id: 3, accepter_id: 4, accept_date: '2016/06/09' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT id, COUNT(*) AS num FROM (SELECT requester_id AS id FROM RequestAccepted UNION ALL SELECT accepter_id AS id FROM RequestAccepted) GROUP BY id ORDER BY num DESC LIMIT 1;',
    hints: [
      'Union both requester and accepter ids into a single list with `UNION ALL`.',
      'Group by `id`, count, and take the top entry with `ORDER BY num DESC LIMIT 1`.'
    ],
    xp: 200
  },
  {
    id: 42,
    track: 'leetcode-50',
    section: 'Subqueries',
    level: 3,
    levelTitle: 'SUBQUERIES',
    title: 'Investments in 2016',
    difficulty: 'Medium',
    concepts: ['Subquery', 'COUNT()', 'SUM()', 'ROUND()'],
    description: 'Report the sum of all total investment values in 2016 (tiv_2016) for policyholders who have the same tiv_2015 value as one or more other policyholders, and are not located in the same city (lat, lon pair is unique).',
    schemaDescription: 'Insurance (pid, tiv_2015, tiv_2016, lat, lon)',
    tables: [
      {
        name: 'Insurance',
        description: 'Policyholder insurance values and coordinates',
        columns: [
          { name: 'pid', type: 'INT', primaryKey: true },
          { name: 'tiv_2015', type: 'FLOAT' },
          { name: 'tiv_2016', type: 'FLOAT' },
          { name: 'lat', type: 'FLOAT' },
          { name: 'lon', type: 'FLOAT' }
        ],
        seedData: [
          { pid: 1, tiv_2015: 10, tiv_2016: 5, lat: 10, lon: 10 },
          { pid: 2, tiv_2015: 20, tiv_2016: 20, lat: 20, lon: 20 },
          { pid: 3, tiv_2015: 10, tiv_2016: 30, lat: 20, lon: 20 },
          { pid: 4, tiv_2015: 10, tiv_2016: 40, lat: 40, lon: 40 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM Insurance WHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1);',
    hints: [
      'Filter `tiv_2015` occurring > 1 times.',
      'Filter `(lat, lon)` coordinates occurring exactly 1 time.'
    ],
    xp: 200
  },
  {
    id: 43,
    track: 'leetcode-50',
    section: 'Subqueries',
    level: 4,
    levelTitle: 'SUBQUERIES',
    title: 'Department Top Three Salaries',
    difficulty: 'Hard',
    concepts: ['DENSE_RANK()', 'Correlated Subquery', 'JOIN'],
    description: 'Find the employees who are high earners in each of the departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.',
    schemaDescription: 'Employee (id, name, salary, departmentId), Department (id, name)',
    tables: [
      {
        name: 'Employee',
        description: 'Employee payroll records',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(255)' },
          { name: 'salary', type: 'INT' },
          { name: 'departmentId', type: 'INT' }
        ],
        seedData: [
          { id: 1, name: 'Joe', salary: 85000, departmentId: 1 },
          { id: 2, name: 'Henry', salary: 80000, departmentId: 2 },
          { id: 3, name: 'Sam', salary: 60000, departmentId: 2 },
          { id: 4, name: 'Max', salary: 90000, departmentId: 1 },
          { id: 5, name: 'Janet', salary: 69000, departmentId: 1 },
          { id: 6, name: 'Randy', salary: 85000, departmentId: 1 },
          { id: 7, name: 'Will', salary: 70000, departmentId: 1 }
        ]
      },
      {
        name: 'Department',
        description: 'Company departments',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(255)' }
        ],
        seedData: [
          { id: 1, name: 'IT' },
          { id: 2, name: 'Sales' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT d.name AS Department, e1.name AS Employee, e1.salary AS Salary FROM Employee e1 JOIN Department d ON e1.departmentId = d.id WHERE 3 > (SELECT COUNT(DISTINCT e2.salary) FROM Employee e2 WHERE e2.departmentId = e1.departmentId AND e2.salary > e1.salary);',
    hints: [
      'Filter where there are fewer than 3 distinct salaries higher than the current salary in the same department.'
    ],
    xp: 300
  },

  // =========================================================================
  // 7. ADVANCED STRING FUNCTIONS / REGEX / CLAUSE (44 - 50)
  // =========================================================================
  {
    id: 44,
    track: 'leetcode-50',
    section: 'Advanced String Functions / Regex / Clause',
    level: 1,
    levelTitle: 'ADVANCED STRING FUNCTIONS',
    title: 'Fix Names in a Table',
    difficulty: 'Easy',
    concepts: ['UPPER()', 'LOWER()', 'SUBSTR()', 'CONCAT'],
    description: 'Fix the names so that only the first character is uppercase and the rest are lowercase. Return the result table ordered by user_id.',
    schemaDescription: 'Users (user_id, name)',
    tables: [
      {
        name: 'Users',
        description: 'User accounts with mixed casing names',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(40)' }
        ],
        seedData: [
          { user_id: 1, name: 'aLice' },
          { user_id: 2, name: 'bOB' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT user_id, UPPER(SUBSTR(name, 1, 1)) || LOWER(SUBSTR(name, 2)) AS name FROM Users ORDER BY user_id ASC;',
    hints: [
      'Use `UPPER(SUBSTR(name, 1, 1))` for the first letter.',
      'Concatenate with `LOWER(SUBSTR(name, 2))` and order by `user_id ASC`.'
    ],
    xp: 100
  },
  {
    id: 45,
    track: 'leetcode-50',
    section: 'Advanced String Functions / Regex / Clause',
    level: 1,
    levelTitle: 'ADVANCED STRING FUNCTIONS',
    title: 'Patients With a Condition',
    difficulty: 'Easy',
    concepts: ['LIKE', 'String Pattern Matching'],
    description: 'Find the patient_id, patient_name, and conditions of the patients who have Type I Diabetes. Type I Diabetes code always starts with DIAB1 prefix.',
    schemaDescription: 'Patients (patient_id, patient_name, conditions)',
    tables: [
      {
        name: 'Patients',
        description: 'Medical patient condition records',
        columns: [
          { name: 'patient_id', type: 'INT', primaryKey: true },
          { name: 'patient_name', type: 'VARCHAR(30)' },
          { name: 'conditions', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { patient_id: 1, patient_name: 'Daniel', conditions: 'YFEV COUGH' },
          { patient_id: 2, patient_name: 'Alice', conditions: '' },
          { patient_id: 3, patient_name: 'Bob', conditions: 'DIAB100 MYOP' },
          { patient_id: 4, patient_name: 'George', conditions: 'ACNE DIAB100' },
          { patient_id: 5, patient_name: 'Alain', conditions: 'DIAB201' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT patient_id, patient_name, conditions FROM Patients WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';",
    hints: [
      "`conditions LIKE 'DIAB1%'` matches when DIAB1 is the first condition.",
      "`conditions LIKE '% DIAB1%'` matches when DIAB1 is a subsequent condition preceded by space."
    ],
    xp: 100
  },
  {
    id: 46,
    track: 'leetcode-50',
    section: 'Advanced String Functions / Regex / Clause',
    level: 1,
    levelTitle: 'ADVANCED STRING FUNCTIONS',
    title: 'Delete Duplicate Emails',
    difficulty: 'Easy',
    concepts: ['DELETE', 'Self Join', 'MIN()'],
    description: 'Delete all duplicate emails, keeping only one unique email with the smallest id.',
    schemaDescription: 'Person (id, email)',
    tables: [
      {
        name: 'Person',
        description: 'User email registry',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'email', type: 'VARCHAR(255)' }
        ],
        seedData: [
          { id: 1, email: 'john@example.com' },
          { id: 2, email: 'bob@example.com' },
          { id: 3, email: 'john@example.com' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT MIN(id) AS id, email FROM Person GROUP BY email;',
    hints: [
      'Group by `email` and select `MIN(id)` for each unique email address.'
    ],
    xp: 100
  },
  {
    id: 47,
    track: 'leetcode-50',
    section: 'Advanced String Functions / Regex / Clause',
    level: 2,
    levelTitle: 'ADVANCED STRING FUNCTIONS',
    title: 'Second Highest Salary',
    difficulty: 'Medium',
    concepts: ['MAX()', 'Subquery', 'Null Handling'],
    description: 'Find the second highest distinct salary from the Employee table. If there is no second highest salary, return null.',
    schemaDescription: 'Employee (id, salary)',
    tables: [
      {
        name: 'Employee',
        description: 'Employee salaries',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'salary', type: 'INT' }
        ],
        seedData: [
          { id: 1, salary: 100 },
          { id: 2, salary: 200 },
          { id: 3, salary: 300 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
    hints: [
      'Filter where `salary < (SELECT MAX(salary) FROM Employee)`.',
      'Select `MAX(salary)` from that filtered set.'
    ],
    xp: 150
  },
  {
    id: 48,
    track: 'leetcode-50',
    section: 'Advanced String Functions / Regex / Clause',
    level: 2,
    levelTitle: 'ADVANCED STRING FUNCTIONS',
    title: 'Group Sold Products By The Date',
    difficulty: 'Easy',
    concepts: ['GROUP_CONCAT', 'COUNT(DISTINCT)', 'GROUP BY'],
    description: 'Find for each date the number of different products sold and their names, ordered lexicographically. Return the result table ordered by sell_date.',
    schemaDescription: 'Activities (sell_date, product)',
    tables: [
      {
        name: 'Activities',
        description: 'Daily product sale records',
        columns: [
          { name: 'sell_date', type: 'DATE' },
          { name: 'product', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { sell_date: '2020-05-30', product: 'Headphone' },
          { sell_date: '2020-06-01', product: 'Pencil' },
          { sell_date: '2020-06-02', product: 'Mask' },
          { sell_date: '2020-05-30', product: 'Basketball' },
          { sell_date: '2020-06-01', product: 'Bible' },
          { sell_date: '2020-06-02', product: 'Mask' },
          { sell_date: '2020-05-30', product: 'T-Shirt' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT sell_date, COUNT(DISTINCT product) AS num_sold, GROUP_CONCAT(DISTINCT product) AS products FROM Activities GROUP BY sell_date ORDER BY sell_date ASC;',
    hints: [
      'Group by `sell_date`.',
      'Use `COUNT(DISTINCT product)` and `GROUP_CONCAT(DISTINCT product)`.'
    ],
    xp: 150
  },
  {
    id: 49,
    track: 'leetcode-50',
    section: 'Advanced String Functions / Regex / Clause',
    level: 2,
    levelTitle: 'ADVANCED STRING FUNCTIONS',
    title: 'List the Products Ordered in a Period',
    difficulty: 'Easy',
    concepts: ['JOIN', 'SUM()', 'HAVING', 'BETWEEN'],
    description: 'Get the names of products that have at least 100 units ordered in February 2020 and their amount.',
    schemaDescription: 'Products (product_id, product_name, product_category), Orders (product_id, order_date, unit)',
    tables: [
      {
        name: 'Products',
        description: 'Store products list',
        columns: [
          { name: 'product_id', type: 'INT', primaryKey: true },
          { name: 'product_name', type: 'VARCHAR(40)' },
          { name: 'product_category', type: 'VARCHAR(40)' }
        ],
        seedData: [
          { product_id: 1, product_name: 'Leetcode Solutions', product_category: 'Book' },
          { product_id: 2, product_name: 'Jewels of Stringology', product_category: 'Book' },
          { product_id: 3, product_name: 'HP', product_category: 'Laptop' },
          { product_id: 4, product_name: 'Lenovo', product_category: 'Laptop' },
          { product_id: 5, product_name: 'Leetcode Kit', product_category: 'T-shirt' }
        ]
      },
      {
        name: 'Orders',
        description: 'Product customer orders',
        columns: [
          { name: 'product_id', type: 'INT' },
          { name: 'order_date', type: 'DATE' },
          { name: 'unit', type: 'INT' }
        ],
        seedData: [
          { product_id: 1, order_date: '2020-02-05', unit: 60 },
          { product_id: 1, order_date: '2020-02-10', unit: 70 },
          { product_id: 2, order_date: '2020-01-18', unit: 30 },
          { product_id: 2, order_date: '2020-02-11', unit: 80 },
          { product_id: 3, order_date: '2020-02-17', unit: 2 },
          { product_id: 3, order_date: '2020-02-24', unit: 3 },
          { product_id: 4, order_date: '2020-03-01', unit: 20 },
          { product_id: 4, order_date: '2020-03-04', unit: 30 },
          { product_id: 4, order_date: '2020-03-04', unit: 60 },
          { product_id: 5, order_date: '2020-02-25', unit: 50 },
          { product_id: 5, order_date: '2020-02-27', unit: 50 },
          { product_id: 5, order_date: '2020-03-01', unit: 50 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT p.product_name, SUM(o.unit) AS unit FROM Products p JOIN Orders o ON p.product_id = o.product_id WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29' GROUP BY p.product_name HAVING SUM(o.unit) >= 100;",
    hints: [
      "Filter orders in Feb 2020: `o.order_date BETWEEN '2020-02-01' AND '2020-02-29'`.",
      'Group by product_name and filter `HAVING SUM(o.unit) >= 100`.'
    ],
    xp: 150
  },
  {
    id: 50,
    track: 'leetcode-50',
    section: 'Advanced String Functions / Regex / Clause',
    level: 2,
    levelTitle: 'ADVANCED STRING FUNCTIONS',
    title: 'Find Users With Valid E-Mails',
    difficulty: 'Easy',
    concepts: ['LIKE', 'GLOB', 'String Validation'],
    description: 'Find the users who have valid emails. A valid email has a prefix name that starts with a letter, contains valid characters, and domain must be @leetcode.com.',
    schemaDescription: 'Users (user_id, name, mail)',
    tables: [
      {
        name: 'Users',
        description: 'User email addresses',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(30)' },
          { name: 'mail', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { user_id: 1, name: 'Winston', mail: 'winston@leetcode.com' },
          { user_id: 2, name: 'Jonathan', mail: 'jonathanisgreat' },
          { user_id: 3, name: 'Annabelle', mail: 'bella-@leetcode.com' },
          { user_id: 4, name: 'Sally', mail: 'sally.come@leetcode.com' },
          { user_id: 5, name: 'Marwan', mail: 'quarz#2020@leetcode.com' },
          { user_id: 6, name: 'David', mail: 'david69@gmail.com' },
          { user_id: 7, name: 'Shapiro', mail: '.shapo@leetcode.com' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT user_id, name, mail FROM Users WHERE mail LIKE '%@leetcode.com' AND SUBSTR(mail, 1, 1) GLOB '[a-zA-Z]*';",
    hints: [
      "Check `mail LIKE '%@leetcode.com'`.",
      "Check prefix starts with a letter using `SUBSTR(mail, 1, 1) GLOB '[a-zA-Z]*'`."
    ],
    xp: 150
  }
];
