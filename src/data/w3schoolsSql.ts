import type { Challenge } from '../types';

export const W3SCHOOLS_SQL_CHALLENGES: Challenge[] = [
  // ==========================================
  // 1. SELECT & FILTERING (501 - 508)
  // ==========================================
  {
    id: 501,
    track: 'w3schools-sql',
    section: 'SELECT Fundamentals',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Select All Customers',
    difficulty: 'Easy',
    concepts: ['SELECT', 'ALL COLUMNS'],
    description: 'Insert the missing statement to get all the columns from the Customers table.',
    schemaDescription: 'Customers (CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer records',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' },
          { name: 'City', type: 'VARCHAR(50)' },
          { name: 'Country', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds Futterkiste', City: 'Berlin', Country: 'Germany' },
          { CustomerID: 2, CustomerName: 'Ana Trujillo', City: 'México D.F.', Country: 'Mexico' },
          { CustomerID: 3, CustomerName: 'Antonio Moreno', City: 'México D.F.', Country: 'Mexico' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT * FROM Customers;',
    hints: ['Use `SELECT * FROM Customers;`.'],
    xp: 80
  },
  {
    id: 502,
    track: 'w3schools-sql',
    section: 'SELECT Fundamentals',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Select Specific Columns',
    difficulty: 'Easy',
    concepts: ['SELECT', 'PROJECTION'],
    description: 'Write a statement that will select the City column from the Customers table.',
    schemaDescription: 'Customers (CustomerID, CustomerName, City, Country)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer records',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'City', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, City: 'Berlin' },
          { CustomerID: 2, City: 'London' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT City FROM Customers;',
    hints: ['Specify only the `City` column.'],
    xp: 80
  },
  {
    id: 503,
    track: 'w3schools-sql',
    section: 'SELECT Fundamentals',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Select Distinct Countries',
    difficulty: 'Easy',
    concepts: ['DISTINCT'],
    description: 'Select all the different values from the Country column in the Customers table.',
    schemaDescription: 'Customers (CustomerID, Country)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer records',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'Country', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, Country: 'Germany' },
          { CustomerID: 2, Country: 'Mexico' },
          { CustomerID: 3, Country: 'Mexico' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT DISTINCT Country FROM Customers;',
    hints: ['Use `SELECT DISTINCT Country FROM Customers;`.'],
    xp: 80
  },
  {
    id: 504,
    track: 'w3schools-sql',
    section: 'WHERE Clause',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Filter by City',
    difficulty: 'Easy',
    concepts: ['WHERE', 'EQUALITY'],
    description: "Select all records where the City column has the value 'Berlin'.",
    schemaDescription: 'Customers (CustomerID, CustomerName, City)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer list',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' },
          { name: 'City', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds Futterkiste', City: 'Berlin' },
          { CustomerID: 2, CustomerName: 'Around the Horn', City: 'London' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT * FROM Customers WHERE City = 'Berlin';",
    hints: ["Use `WHERE City = 'Berlin'`."],
    xp: 80
  },
  {
    id: 505,
    track: 'w3schools-sql',
    section: 'WHERE Clause',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Filter with NOT',
    difficulty: 'Easy',
    concepts: ['NOT', '!=', 'WHERE'],
    description: "Use the NOT keyword to select all records where City is NOT 'Berlin'.",
    schemaDescription: 'Customers (CustomerID, CustomerName, City)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer list',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' },
          { name: 'City', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds Futterkiste', City: 'Berlin' },
          { CustomerID: 2, CustomerName: 'Around the Horn', City: 'London' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT * FROM Customers WHERE NOT City = 'Berlin';",
    hints: ["Use `WHERE NOT City = 'Berlin'` or `WHERE City != 'Berlin'`."],
    xp: 80
  },
  {
    id: 506,
    track: 'w3schools-sql',
    section: 'WHERE Clause',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Filter with AND & OR',
    difficulty: 'Easy',
    concepts: ['AND', 'OR'],
    description: "Select all records where the City column has the value 'Berlin' AND the PostalCode column has the value 12209.",
    schemaDescription: 'Customers (CustomerID, CustomerName, City, PostalCode)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer list',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' },
          { name: 'City', type: 'VARCHAR(50)' },
          { name: 'PostalCode', type: 'INT' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds Futterkiste', City: 'Berlin', PostalCode: 12209 },
          { CustomerID: 2, CustomerName: 'Bolex', City: 'Berlin', PostalCode: 10115 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT * FROM Customers WHERE City = 'Berlin' AND PostalCode = 12209;",
    hints: ["Use `WHERE City = 'Berlin' AND PostalCode = 12209`."],
    xp: 80
  },

  // ==========================================
  // 2. ORDER BY & SORTING (507 - 510)
  // ==========================================
  {
    id: 507,
    track: 'w3schools-sql',
    section: 'ORDER BY',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Sort Ascending and Descending',
    difficulty: 'Easy',
    concepts: ['ORDER BY', 'DESC'],
    description: 'Select all records from the Customers table, sort the result alphabetically by the column City in reverse/descending order.',
    schemaDescription: 'Customers (CustomerID, CustomerName, City)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer list',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' },
          { name: 'City', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds', City: 'Berlin' },
          { CustomerID: 2, CustomerName: 'Ana', City: 'London' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT * FROM Customers ORDER BY City DESC;',
    hints: ['Use `ORDER BY City DESC`.'],
    xp: 80
  },
  {
    id: 508,
    track: 'w3schools-sql',
    section: 'ORDER BY',
    level: 1,
    levelTitle: 'W3SCHOOLS',
    title: 'Multi-column Sorting',
    difficulty: 'Easy',
    concepts: ['ORDER BY', 'MULTI-COLUMN'],
    description: 'Select all records from the Customers table, sort the result alphabetically, first by the column Country, then by the column City.',
    schemaDescription: 'Customers (CustomerID, CustomerName, City, Country)',
    tables: [
      {
        name: 'Customers',
        description: 'Customers',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' },
          { name: 'City', type: 'VARCHAR(50)' },
          { name: 'Country', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds', City: 'Berlin', Country: 'Germany' },
          { CustomerID: 2, CustomerName: 'Otto', City: 'Munich', Country: 'Germany' },
          { CustomerID: 3, CustomerName: 'Ana', City: 'London', Country: 'UK' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT * FROM Customers ORDER BY Country ASC, City ASC;',
    hints: ['Use `ORDER BY Country, City`.'],
    xp: 80
  },

  // ==========================================
  // 3. AGGREGATES & FUNCTIONS (509 - 514)
  // ==========================================
  {
    id: 509,
    track: 'w3schools-sql',
    section: 'SQL Functions',
    level: 2,
    levelTitle: 'W3SCHOOLS',
    title: 'Min and Max Price',
    difficulty: 'Easy',
    concepts: ['MIN', 'MAX'],
    description: 'Use the MIN and MAX functions to select the lowest and highest price of all products.',
    schemaDescription: 'Products (ProductID, ProductName, Price)',
    tables: [
      {
        name: 'Products',
        description: 'Product catalog',
        columns: [
          { name: 'ProductID', type: 'INT', primaryKey: true },
          { name: 'ProductName', type: 'VARCHAR(50)' },
          { name: 'Price', type: 'INT' }
        ],
        seedData: [
          { ProductID: 1, ProductName: 'Chai', Price: 18 },
          { ProductID: 2, ProductName: 'Chang', Price: 19 },
          { ProductID: 3, ProductName: 'Aniseed Syrup', Price: 10 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT MIN(Price) AS min_price, MAX(Price) AS max_price FROM Products;',
    hints: ['Use `SELECT MIN(Price) AS min_price, MAX(Price) AS max_price FROM Products;`.'],
    xp: 100
  },
  {
    id: 510,
    track: 'w3schools-sql',
    section: 'SQL Functions',
    level: 2,
    levelTitle: 'W3SCHOOLS',
    title: 'Count, Avg, and Sum of Products',
    difficulty: 'Easy',
    concepts: ['COUNT', 'AVG', 'SUM'],
    description: 'Use the correct function to return the number of records, average price, and total sum of prices in the Products table.',
    schemaDescription: 'Products (ProductID, Price)',
    tables: [
      {
        name: 'Products',
        description: 'Product catalog',
        columns: [
          { name: 'ProductID', type: 'INT', primaryKey: true },
          { name: 'Price', type: 'INT' }
        ],
        seedData: [
          { ProductID: 1, Price: 10 },
          { ProductID: 2, Price: 20 },
          { ProductID: 3, Price: 30 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT COUNT(*) AS total_count, AVG(Price) AS avg_price, SUM(Price) AS sum_price FROM Products;',
    hints: ['Use `COUNT(*)`, `AVG(Price)`, and `SUM(Price)`.'],
    xp: 100
  },
  {
    id: 511,
    track: 'w3schools-sql',
    section: 'Pattern Matching',
    level: 2,
    levelTitle: 'W3SCHOOLS',
    title: 'Wildcard Pattern Matching (LIKE)',
    difficulty: 'Easy',
    concepts: ['LIKE', 'WILDCARD'],
    description: "Select all records where the value of the City column starts with the letter 'a'.",
    schemaDescription: 'Customers (CustomerID, CustomerName, City)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer list',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' },
          { name: 'City', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds', City: 'Aachen' },
          { CustomerID: 2, CustomerName: 'Ana', City: 'Berlin' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT * FROM Customers WHERE City LIKE 'a%';",
    hints: ["Use `WHERE City LIKE 'a%'`."],
    xp: 80
  },
  {
    id: 512,
    track: 'w3schools-sql',
    section: 'Range & Sets',
    level: 2,
    levelTitle: 'W3SCHOOLS',
    title: 'Range Filter with BETWEEN',
    difficulty: 'Easy',
    concepts: ['BETWEEN', 'RANGE'],
    description: 'Use the BETWEEN operator to select all the records where the value of the Price column is between 10 and 20.',
    schemaDescription: 'Products (ProductID, ProductName, Price)',
    tables: [
      {
        name: 'Products',
        description: 'Product catalog',
        columns: [
          { name: 'ProductID', type: 'INT', primaryKey: true },
          { name: 'ProductName', type: 'VARCHAR(50)' },
          { name: 'Price', type: 'INT' }
        ],
        seedData: [
          { ProductID: 1, ProductName: 'Chai', Price: 18 },
          { ProductID: 2, ProductName: 'Chang', Price: 25 },
          { ProductID: 3, ProductName: 'Aniseed Syrup', Price: 10 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT * FROM Products WHERE Price BETWEEN 10 AND 20;',
    hints: ['Use `WHERE Price BETWEEN 10 AND 20`.'],
    xp: 80
  },

  // ==========================================
  // 4. JOINS & GROUP BY (513 - 520)
  // ==========================================
  {
    id: 513,
    track: 'w3schools-sql',
    section: 'SQL Joins',
    level: 3,
    levelTitle: 'W3SCHOOLS',
    title: 'INNER JOIN Orders and Customers',
    difficulty: 'Medium',
    concepts: ['INNER JOIN', 'ON'],
    description: 'Join the Orders table with the Customers table on CustomerID to display OrderID, CustomerName, and OrderDate.',
    schemaDescription: 'Orders (OrderID, CustomerID, OrderDate), Customers (CustomerID, CustomerName)',
    tables: [
      {
        name: 'Orders',
        description: 'Order log',
        columns: [
          { name: 'OrderID', type: 'INT', primaryKey: true },
          { name: 'CustomerID', type: 'INT' },
          { name: 'OrderDate', type: 'DATE' }
        ],
        seedData: [
          { OrderID: 10308, CustomerID: 2, OrderDate: '1996-09-18' },
          { OrderID: 10309, CustomerID: 1, OrderDate: '1996-09-19' }
        ]
      },
      {
        name: 'Customers',
        description: 'Customers',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds Futterkiste' },
          { CustomerID: 2, CustomerName: 'Ana Trujillo' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT o.OrderID, c.CustomerName, o.OrderDate FROM Orders o INNER JOIN Customers c ON o.CustomerID = c.CustomerID;',
    hints: ['Join on `o.CustomerID = c.CustomerID`.'],
    xp: 120
  },
  {
    id: 514,
    track: 'w3schools-sql',
    section: 'SQL Joins',
    level: 3,
    levelTitle: 'W3SCHOOLS',
    title: 'LEFT JOIN Customers and Orders',
    difficulty: 'Medium',
    concepts: ['LEFT JOIN', 'ON'],
    description: 'Select all customers and any orders they might have. Output CustomerName and OrderID.',
    schemaDescription: 'Customers (CustomerID, CustomerName), Orders (OrderID, CustomerID)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer list',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'CustomerName', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, CustomerName: 'Alfreds Futterkiste' },
          { CustomerID: 2, CustomerName: 'Ana Trujillo' },
          { CustomerID: 3, CustomerName: 'Antonio Moreno' }
        ]
      },
      {
        name: 'Orders',
        description: 'Order records',
        columns: [
          { name: 'OrderID', type: 'INT', primaryKey: true },
          { name: 'CustomerID', type: 'INT' }
        ],
        seedData: [
          { OrderID: 10308, CustomerID: 2 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT c.CustomerName, o.OrderID FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID ORDER BY c.CustomerName ASC;',
    hints: ['Use `LEFT JOIN` to keep all customers even if they have no order.'],
    xp: 120
  },
  {
    id: 515,
    track: 'w3schools-sql',
    section: 'GROUP BY & HAVING',
    level: 3,
    levelTitle: 'W3SCHOOLS',
    title: 'GROUP BY Country with Count',
    difficulty: 'Medium',
    concepts: ['GROUP BY', 'COUNT', 'ORDER BY'],
    description: 'List the number of customers in each country, ordered by the country name ascending.',
    schemaDescription: 'Customers (CustomerID, Country)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer records',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'Country', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, Country: 'Germany' },
          { CustomerID: 2, Country: 'Germany' },
          { CustomerID: 3, Country: 'Mexico' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT Country, COUNT(CustomerID) AS NumberOfCustomers FROM Customers GROUP BY Country ORDER BY Country ASC;',
    hints: ['Group by `Country` and count `CustomerID`.'],
    xp: 120
  },
  {
    id: 516,
    track: 'w3schools-sql',
    section: 'GROUP BY & HAVING',
    level: 3,
    levelTitle: 'W3SCHOOLS',
    title: 'Filter Groups with HAVING',
    difficulty: 'Medium',
    concepts: ['GROUP BY', 'HAVING', 'COUNT'],
    description: 'List the number of customers in each country. Only include countries with more than 1 customer.',
    schemaDescription: 'Customers (CustomerID, Country)',
    tables: [
      {
        name: 'Customers',
        description: 'Customer records',
        columns: [
          { name: 'CustomerID', type: 'INT', primaryKey: true },
          { name: 'Country', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { CustomerID: 1, Country: 'Germany' },
          { CustomerID: 2, Country: 'Germany' },
          { CustomerID: 3, Country: 'Mexico' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT Country, COUNT(CustomerID) AS NumberOfCustomers FROM Customers GROUP BY Country HAVING COUNT(CustomerID) > 1;',
    hints: ['Use `HAVING COUNT(CustomerID) > 1` after `GROUP BY Country`.'],
    xp: 150
  },
  {
    id: 517,
    track: 'w3schools-sql',
    section: 'Conditional Logic',
    level: 3,
    levelTitle: 'W3SCHOOLS',
    title: 'CASE Statement Evaluation',
    difficulty: 'Medium',
    concepts: ['CASE', 'WHEN', 'THEN'],
    description: "Evaluate OrderDetails quantity: if Quantity > 30 return 'The quantity is greater than 30', if Quantity = 30 return 'The quantity is 30', else return 'The quantity is under 30'. Output OrderDetailID, Quantity, and QuantityText.",
    schemaDescription: 'OrderDetails (OrderDetailID, Quantity)',
    tables: [
      {
        name: 'OrderDetails',
        description: 'Order items',
        columns: [
          { name: 'OrderDetailID', type: 'INT', primaryKey: true },
          { name: 'Quantity', type: 'INT' }
        ],
        seedData: [
          { OrderDetailID: 1, Quantity: 12 },
          { OrderDetailID: 2, Quantity: 30 },
          { OrderDetailID: 3, Quantity: 40 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT OrderDetailID, Quantity, CASE WHEN Quantity > 30 THEN 'The quantity is greater than 30' WHEN Quantity = 30 THEN 'The quantity is 30' ELSE 'The quantity is under 30' END AS QuantityText FROM OrderDetails;",
    hints: ['Use `CASE WHEN Quantity > 30 ... END AS QuantityText`.'],
    xp: 150
  }
];
