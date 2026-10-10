import type { Challenge } from '../types';

export const WORKOUT_50_CHALLENGES: Challenge[] = [
  // ==========================================
  // LEVEL 1: FOUNDATION MODE (Problems 1-10)
  // ==========================================
  {
    id: 1,
    title: 'Employees Above Average Salary',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['AVG()', 'Subquery', 'WHERE'],
    xp: 100,
    description: 'Find all employees whose salary is greater than the average salary of all employees.\n\nReturn employee id, name, and salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name, salary FROM Employee WHERE salary > (SELECT AVG(salary) FROM Employee);',
    tables: [
      {
        name: 'Employee',
        description: 'Employee compensation records',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 40000 },
          { id: 2, name: 'Priya', salary: 60000 },
          { id: 3, name: 'Arjun', salary: 80000 },
          { id: 4, name: 'Neha', salary: 50000 }
        ]
      }
    ],
    hints: [
      'Calculate the overall average salary first using a subquery (SELECT AVG(salary) FROM Employee).',
      'Filter employees whose salary is strictly greater than that subquery result.'
    ]
  },
  {
    id: 2,
    title: 'Department Employee Count',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['GROUP BY', 'COUNT()'],
    xp: 100,
    description: 'Find the number of employees working in each department.\n\nReturn department_id and employee_count.',
    schemaDescription: 'Employee (id, name, department_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT department_id, COUNT(*) AS employee_count FROM Employee GROUP BY department_id;',
    tables: [
      {
        name: 'Employee',
        description: 'Department assignments',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: 10 },
          { id: 3, name: 'Arjun', department_id: 20 },
          { id: 4, name: 'Neha', department_id: 20 },
          { id: 5, name: 'Kiran', department_id: 20 }
        ]
      }
    ],
    hints: [
      'Use GROUP BY department_id.',
      'Use COUNT(*) to count how many employees exist in each group.'
    ]
  },
  {
    id: 3,
    title: 'Departments With More Than 2 Employees',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['GROUP BY', 'HAVING', 'COUNT()'],
    xp: 100,
    description: 'Find departments that have more than 2 employees.\n\nReturn department_id and employee_count.',
    schemaDescription: 'Employee (id, name, department_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT department_id, COUNT(*) AS employee_count FROM Employee GROUP BY department_id HAVING COUNT(*) > 2;',
    tables: [
      {
        name: 'Employee',
        description: 'Department assignments',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: 10 },
          { id: 3, name: 'Arjun', department_id: 20 },
          { id: 4, name: 'Neha', department_id: 20 },
          { id: 5, name: 'Kiran', department_id: 20 }
        ]
      }
    ],
    hints: [
      'Use GROUP BY department_id.',
      'Use HAVING COUNT(*) > 2 to filter aggregated groups.'
    ]
  },
  {
    id: 4,
    title: 'Highest Salary',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['MAX()', 'WHERE', 'Subquery'],
    xp: 100,
    description: 'Find the employee or employees with the highest salary.\n\nReturn employee id, name, and salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name, salary FROM Employee WHERE salary = (SELECT MAX(salary) FROM Employee);',
    tables: [
      {
        name: 'Employee',
        description: 'Compensation figures',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 50000 },
          { id: 2, name: 'Priya', salary: 80000 },
          { id: 3, name: 'Arjun', salary: 80000 },
          { id: 4, name: 'Neha', salary: 60000 }
        ]
      }
    ],
    hints: [
      'Subquery: (SELECT MAX(salary) FROM Employee).',
      'Select rows WHERE salary equals that maximum.'
    ]
  },
  {
    id: 5,
    title: 'Second Highest Salary',
    difficulty: 'Medium',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['MAX()', 'Subquery', 'DISTINCT'],
    xp: 120,
    description: 'Find the second-highest distinct salary.\n\nReturn the second-highest salary as second_highest_salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT MAX(salary) AS second_highest_salary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
    tables: [
      {
        name: 'Employee',
        description: 'Salary distribution',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 50000 },
          { id: 2, name: 'Priya', salary: 80000 },
          { id: 3, name: 'Arjun', salary: 70000 },
          { id: 4, name: 'Neha', salary: 80000 }
        ]
      }
    ],
    hints: [
      'Find the maximum salary strictly less than the overall maximum salary.'
    ]
  },
  {
    id: 6,
    title: 'Employees in a Salary Range',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['BETWEEN', 'ORDER BY'],
    xp: 100,
    description: 'Find employees earning between 30,000 and 60,000, inclusive.\n\nReturn employee id, name, salary, ordered by salary descending.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name, salary FROM Employee WHERE salary BETWEEN 30000 AND 60000 ORDER BY salary DESC;',
    tables: [
      {
        name: 'Employee',
        description: 'Employee pay records',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 25000 },
          { id: 2, name: 'Priya', salary: 40000 },
          { id: 3, name: 'Arjun', salary: 60000 },
          { id: 4, name: 'Neha', salary: 75000 }
        ]
      }
    ],
    hints: [
      'Use BETWEEN 30000 AND 60000.',
      'Add ORDER BY salary DESC.'
    ]
  },
  {
    id: 7,
    title: 'Duplicate Emails',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['GROUP BY', 'HAVING', 'COUNT()'],
    xp: 100,
    description: 'Find email addresses that appear more than once.\n\nReturn duplicated email and occurrence count.',
    schemaDescription: 'Person (id, email)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT email, COUNT(*) AS occurrence_count FROM Person GROUP BY email HAVING COUNT(*) > 1;',
    tables: [
      {
        name: 'Person',
        description: 'User email directory',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'email', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 1, email: 'a@mail.com' },
          { id: 2, email: 'b@mail.com' },
          { id: 3, email: 'a@mail.com' },
          { id: 4, email: 'c@mail.com' },
          { id: 5, email: 'b@mail.com' }
        ]
      }
    ],
    hints: [
      'GROUP BY email and use HAVING COUNT(*) > 1.'
    ]
  },
  {
    id: 8,
    title: 'Average Salary by Department',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['AVG()', 'GROUP BY'],
    xp: 100,
    description: 'Calculate the average salary for every department.\n\nReturn department_id and average_salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT department_id, AVG(salary) AS average_salary FROM Employee GROUP BY department_id;',
    tables: [
      {
        name: 'Employee',
        description: 'Department compensation table',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 40000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 60000 },
          { id: 3, name: 'Arjun', department_id: 20, salary: 80000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 70000 }
        ]
      }
    ],
    hints: [
      'GROUP BY department_id and select AVG(salary).'
    ]
  },
  {
    id: 9,
    title: 'Departments With High Average Salary',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['AVG()', 'GROUP BY', 'HAVING'],
    xp: 100,
    description: 'Find departments whose average salary is greater than 50,000.\n\nReturn department_id and average_salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT department_id, AVG(salary) AS average_salary FROM Employee GROUP BY department_id HAVING AVG(salary) > 50000;',
    tables: [
      {
        name: 'Employee',
        description: 'Department compensation records',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 40000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 60000 },
          { id: 3, name: 'Arjun', department_id: 20, salary: 80000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 70000 }
        ]
      }
    ],
    hints: [
      'Use HAVING AVG(salary) > 50000.'
    ]
  },
  {
    id: 10,
    title: 'Employee Count by Job Title',
    difficulty: 'Easy',
    level: 1,
    levelTitle: 'LEVEL 1: Foundation Mode',
    section: 'LEVEL 1: Foundation Mode',
    concepts: ['COUNT()', 'GROUP BY'],
    xp: 100,
    description: 'Count how many employees have each job title.\n\nReturn job_title and employee_count.',
    schemaDescription: 'Employee (id, name, job_title)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT job_title, COUNT(*) AS employee_count FROM Employee GROUP BY job_title;',
    tables: [
      {
        name: 'Employee',
        description: 'Employee job titles',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'job_title', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', job_title: 'Developer' },
          { id: 2, name: 'Priya', job_title: 'Developer' },
          { id: 3, name: 'Arjun', job_title: 'Tester' },
          { id: 4, name: 'Neha', job_title: 'Developer' }
        ]
      }
    ],
    hints: [
      'GROUP BY job_title and COUNT(*).'
    ]
  },

  // ==========================================
  // LEVEL 2: JOIN DETECTIVE (Problems 11-20)
  // ==========================================
  {
    id: 11,
    title: 'Employee and Department',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['INNER JOIN', 'ON'],
    xp: 110,
    description: 'Display every employee together with the name of their department.\n\nReturn employee name and department name.',
    schemaDescription: 'Employee (id, name, department_id), Department (id, department_name)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.name AS employee_name, d.department_name FROM Employee e JOIN Department d ON e.department_id = d.id;',
    tables: [
      {
        name: 'Employee',
        description: 'Employee assignments',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: 20 },
          { id: 3, name: 'Arjun', department_id: 10 }
        ]
      },
      {
        name: 'Department',
        description: 'Department registry',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'department_name', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 10, department_name: 'IT' },
          { id: 20, department_name: 'HR' }
        ]
      }
    ],
    hints: [
      'Perform an INNER JOIN between Employee and Department on department_id = id.'
    ]
  },
  {
    id: 12,
    title: 'Employees Without a Department',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['IS NULL', 'WHERE'],
    xp: 110,
    description: 'Find employees who are not assigned to any department.\n\nReturn employee id and name.',
    schemaDescription: 'Employee (id, name, department_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name FROM Employee WHERE department_id IS NULL;',
    tables: [
      {
        name: 'Employee',
        description: 'Employee roster',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: null },
          { id: 3, name: 'Arjun', department_id: 20 }
        ]
      },
      {
        name: 'Department',
        description: 'Departments',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'department_name', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 10, department_name: 'IT' },
          { id: 20, department_name: 'HR' }
        ]
      }
    ],
    hints: [
      'Filter where department_id IS NULL.'
    ]
  },
  {
    id: 13,
    title: 'Departments Without Employees',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['LEFT JOIN', 'IS NULL'],
    xp: 110,
    description: 'Find departments that currently have no employees.\n\nReturn department id and department name.',
    schemaDescription: 'Department (id, department_name), Employee (id, name, department_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT d.id, d.department_name FROM Department d LEFT JOIN Employee e ON d.id = e.department_id WHERE e.id IS NULL;',
    tables: [
      {
        name: 'Department',
        description: 'Company departments',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'department_name', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 10, department_name: 'IT' },
          { id: 20, department_name: 'HR' },
          { id: 30, department_name: 'Sales' }
        ]
      },
      {
        name: 'Employee',
        description: 'Active staff',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: 20 }
        ]
      }
    ],
    hints: [
      'LEFT JOIN Department with Employee on d.id = e.department_id WHERE e.id IS NULL.'
    ]
  },
  {
    id: 14,
    title: 'Employee and Manager',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['Self-Join', 'INNER JOIN'],
    xp: 110,
    description: 'Display each employee with their manager\'s name. Include only employees who have a manager.\n\nReturn employee_name and manager_name.',
    schemaDescription: 'Employee (id, name, manager_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.name AS employee_name, m.name AS manager_name FROM Employee e JOIN Employee m ON e.manager_id = m.id;',
    tables: [
      {
        name: 'Employee',
        description: 'Management hierarchy',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'manager_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', manager_id: null },
          { id: 2, name: 'Priya', manager_id: 1 },
          { id: 3, name: 'Arjun', manager_id: 1 },
          { id: 4, name: 'Neha', manager_id: 2 }
        ]
      }
    ],
    hints: [
      'Self-join Employee on e.manager_id = m.id.'
    ]
  },
  {
    id: 15,
    title: 'All Employees and Their Managers',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['Self-Join', 'LEFT JOIN'],
    xp: 110,
    description: 'Display every employee and their manager\'s name when a manager exists. Employees without managers must still appear.\n\nReturn employee_name and manager_name.',
    schemaDescription: 'Employee (id, name, manager_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.name AS employee_name, m.name AS manager_name FROM Employee e LEFT JOIN Employee m ON e.manager_id = m.id;',
    tables: [
      {
        name: 'Employee',
        description: 'Organization chart',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'manager_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', manager_id: null },
          { id: 2, name: 'Priya', manager_id: 1 },
          { id: 3, name: 'Arjun', manager_id: 1 },
          { id: 4, name: 'Neha', manager_id: 2 }
        ]
      }
    ],
    hints: [
      'Use a LEFT JOIN from Employee e to Employee m on e.manager_id = m.id.'
    ]
  },
  {
    id: 16,
    title: 'Customers and Orders',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['LEFT JOIN'],
    xp: 110,
    description: 'Display every customer with their order amount. Customers with no orders must still appear.\n\nReturn customer name, order_id, and amount.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.name, o.order_id, o.amount FROM Customer c LEFT JOIN "Order" o ON c.customer_id = o.customer_id;',
    tables: [
      {
        name: 'Customer',
        description: 'Customer directory',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Purchases ledger',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 500 },
          { order_id: 102, customer_id: 1, amount: 300 },
          { order_id: 103, customer_id: 2, amount: 700 }
        ]
      }
    ],
    hints: [
      'Use LEFT JOIN on customer_id.'
    ]
  },
  {
    id: 17,
    title: 'Customers Who Never Ordered',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['LEFT JOIN', 'IS NULL'],
    xp: 110,
    description: 'Find customers who have never placed an order.\n\nReturn customer_id and name.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name FROM Customer c LEFT JOIN "Order" o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;',
    tables: [
      {
        name: 'Customer',
        description: 'Registered users',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Order transactions',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 500 },
          { order_id: 102, customer_id: 2, amount: 300 }
        ]
      }
    ],
    hints: [
      'LEFT JOIN Customer with "Order" WHERE o.order_id IS NULL.'
    ]
  },
  {
    id: 18,
    title: 'Products Never Sold',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['LEFT JOIN', 'IS NULL'],
    xp: 110,
    description: 'Find products that never appear in OrderItem.\n\nReturn product_id and product name.',
    schemaDescription: 'Product (product_id, name), OrderItem (order_id, product_id, quantity)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT p.product_id, p.name FROM Product p LEFT JOIN OrderItem oi ON p.product_id = oi.product_id WHERE oi.product_id IS NULL;',
    tables: [
      {
        name: 'Product',
        description: 'Product catalog',
        columns: [
          { name: 'product_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { product_id: 1, name: 'Laptop' },
          { product_id: 2, name: 'Mouse' },
          { product_id: 3, name: 'Keyboard' }
        ]
      },
      {
        name: 'OrderItem',
        description: 'Order lines',
        columns: [
          { name: 'order_id', type: 'INTEGER' },
          { name: 'product_id', type: 'INTEGER' },
          { name: 'quantity', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, product_id: 1, quantity: 2 },
          { order_id: 102, product_id: 2, quantity: 5 }
        ]
      }
    ],
    hints: [
      'LEFT JOIN Product with OrderItem and filter WHERE oi.product_id IS NULL.'
    ]
  },
  {
    id: 19,
    title: 'Employee Department Salary',
    difficulty: 'Easy',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['INNER JOIN'],
    xp: 110,
    description: 'Display each employee\'s name, department name, and salary. Only employees belonging to a department should appear.\n\nReturn employee name, department name, salary.',
    schemaDescription: 'Employee (id, name, department_id, salary), Department (id, department_name)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.name AS employee_name, d.department_name, e.salary FROM Employee e JOIN Department d ON e.department_id = d.id;',
    tables: [
      {
        name: 'Employee',
        description: 'Staff payroll',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 50000 },
          { id: 2, name: 'Priya', department_id: 20, salary: 60000 },
          { id: 3, name: 'Arjun', department_id: 10, salary: 55000 }
        ]
      },
      {
        name: 'Department',
        description: 'Corporate units',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'department_name', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 10, department_name: 'IT' },
          { id: 20, department_name: 'HR' }
        ]
      }
    ],
    hints: [
      'Use INNER JOIN Employee and Department on department_id = d.id.'
    ]
  },
  {
    id: 20,
    title: 'Employees Earning More Than Their Manager',
    difficulty: 'Medium',
    level: 2,
    levelTitle: 'LEVEL 2: JOIN Detective',
    section: 'LEVEL 2: JOIN Detective',
    concepts: ['Self-Join', 'WHERE'],
    xp: 130,
    description: 'Find employees whose salary is greater than their direct manager\'s salary.\n\nReturn employee name, employee salary, manager name, manager salary.',
    schemaDescription: 'Employee (id, name, salary, manager_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.name AS employee_name, e.salary AS employee_salary, m.name AS manager_name, m.salary AS manager_salary FROM Employee e JOIN Employee m ON e.manager_id = m.id WHERE e.salary > m.salary;',
    tables: [
      {
        name: 'Employee',
        description: 'Compensation and manager mapping',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' },
          { name: 'manager_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 70000, manager_id: null },
          { id: 2, name: 'Priya', salary: 80000, manager_id: 1 },
          { id: 3, name: 'Arjun', salary: 60000, manager_id: 1 },
          { id: 4, name: 'Neha', salary: 90000, manager_id: 2 }
        ]
      }
    ],
    hints: [
      'Self JOIN Employee e and Employee m on e.manager_id = m.id WHERE e.salary > m.salary.'
    ]
  },

  // ==========================================
  // LEVEL 3: SUBQUERY SENSE (Problems 21-30)
  // ==========================================
  {
    id: 21,
    title: 'Employees Above Company Average',
    difficulty: 'Easy',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['AVG()', 'Subquery'],
    xp: 120,
    description: 'Find employees whose salary is greater than the company\'s average salary.\n\nReturn employee id, name, salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name, salary FROM Employee WHERE salary > (SELECT AVG(salary) FROM Employee);',
    tables: [
      {
        name: 'Employee',
        description: 'Company workforce',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 40000 },
          { id: 2, name: 'Priya', salary: 60000 },
          { id: 3, name: 'Arjun', salary: 80000 },
          { id: 4, name: 'Neha', salary: 50000 }
        ]
      }
    ],
    hints: [
      'WHERE salary > (SELECT AVG(salary) FROM Employee).'
    ]
  },
  {
    id: 22,
    title: 'Highest Paid Employee',
    difficulty: 'Easy',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['MAX()', 'Subquery'],
    xp: 120,
    description: 'Find the employee or employees whose salary equals the maximum salary.\n\nReturn employee id, name, salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name, salary FROM Employee WHERE salary = (SELECT MAX(salary) FROM Employee);',
    tables: [
      {
        name: 'Employee',
        description: 'Payroll numbers',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 50000 },
          { id: 2, name: 'Priya', salary: 80000 },
          { id: 3, name: 'Arjun', salary: 80000 },
          { id: 4, name: 'Neha', salary: 60000 }
        ]
      }
    ],
    hints: [
      'Filter WHERE salary = (SELECT MAX(salary) FROM Employee).'
    ]
  },
  {
    id: 23,
    title: 'Second Highest Salary Using a Subquery',
    difficulty: 'Medium',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['MAX()', 'Subquery'],
    xp: 130,
    description: 'Find the second-highest distinct salary. Your solution must use a subquery.\n\nReturn the second-highest salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT MAX(salary) AS second_highest_salary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
    tables: [
      {
        name: 'Employee',
        description: 'Salary list',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 50000 },
          { id: 2, name: 'Priya', salary: 80000 },
          { id: 3, name: 'Arjun', salary: 70000 },
          { id: 4, name: 'Neha', salary: 60000 }
        ]
      }
    ],
    hints: [
      'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee).'
    ]
  },
  {
    id: 24,
    title: 'Employees Above Their Department Average',
    difficulty: 'Medium',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['Correlated Subquery', 'AVG()'],
    xp: 140,
    description: 'Find employees whose salary is greater than the average salary of their own department.\n\nReturn employee id, name, department_id, salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.id, e.name, e.department_id, e.salary FROM Employee e WHERE e.salary > (SELECT AVG(salary) FROM Employee WHERE department_id = e.department_id);',
    tables: [
      {
        name: 'Employee',
        description: 'Department compensation table',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 40000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 70000 },
          { id: 3, name: 'Arjun', department_id: 20, salary: 50000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 60000 }
        ]
      }
    ],
    hints: [
      'Use a correlated subquery: WHERE e.salary > (SELECT AVG(salary) FROM Employee WHERE department_id = e.department_id).'
    ]
  },
  {
    id: 25,
    title: 'Department With Highest Average Salary',
    difficulty: 'Medium',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['AVG()', 'GROUP BY', 'HAVING'],
    xp: 140,
    description: 'Find the department or departments with the highest average employee salary.\n\nReturn department_id and average_salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT department_id, AVG(salary) AS average_salary FROM Employee GROUP BY department_id HAVING AVG(salary) = (SELECT MAX(avg_sal) FROM (SELECT AVG(salary) AS avg_sal FROM Employee GROUP BY department_id));',
    tables: [
      {
        name: 'Employee',
        description: 'Department salaries',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 40000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 60000 },
          { id: 3, name: 'Arjun', department_id: 20, salary: 80000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 70000 }
        ]
      }
    ],
    hints: [
      'Find the maximum department average salary with a nested subquery and match in HAVING.'
    ]
  },
  {
    id: 26,
    title: 'Customers With Above-Average Spending',
    difficulty: 'Medium',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['SUM()', 'AVG()', 'GROUP BY', 'HAVING'],
    xp: 140,
    description: 'Calculate each customer\'s total spending and find customers whose spending is greater than the average spending across customers who placed orders.\n\nReturn customer_id, name, total_spending.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name, SUM(o.amount) AS total_spending FROM Customer c JOIN "Order" o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name HAVING SUM(o.amount) > (SELECT AVG(spend) FROM (SELECT SUM(amount) AS spend FROM "Order" GROUP BY customer_id));',
    tables: [
      {
        name: 'Customer',
        description: 'Buyer accounts',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Order transactions',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 100 },
          { order_id: 102, customer_id: 1, amount: 300 },
          { order_id: 103, customer_id: 2, amount: 200 },
          { order_id: 104, customer_id: 3, amount: 100 }
        ]
      }
    ],
    hints: [
      'Calculate average total spend per customer and filter in HAVING SUM(amount) > avg.'
    ]
  },
  {
    id: 27,
    title: 'Products More Expensive Than Average',
    difficulty: 'Easy',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['AVG()', 'Subquery'],
    xp: 120,
    description: 'Find products whose price is greater than the average product price.\n\nReturn product_id, name, price.',
    schemaDescription: 'Product (product_id, name, price)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT product_id, name, price FROM Product WHERE price > (SELECT AVG(price) FROM Product);',
    tables: [
      {
        name: 'Product',
        description: 'Product catalog',
        columns: [
          { name: 'product_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'price', type: 'INTEGER' }
        ],
        seedData: [
          { product_id: 1, name: 'Mouse', price: 500 },
          { product_id: 2, name: 'Keyboard', price: 1000 },
          { product_id: 3, name: 'Monitor', price: 5000 },
          { product_id: 4, name: 'Cable', price: 300 }
        ]
      }
    ],
    hints: [
      'WHERE price > (SELECT AVG(price) FROM Product).'
    ]
  },
  {
    id: 28,
    title: 'Employees in the IT Department',
    difficulty: 'Easy',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['Subquery', 'WHERE'],
    xp: 120,
    description: 'Find employees belonging to the department named \'IT\'. Do not hardcode the department ID.\n\nReturn employee id and name.',
    schemaDescription: 'Employee (id, name, department_id), Department (id, department_name)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name FROM Employee WHERE department_id = (SELECT id FROM Department WHERE department_name = \'IT\');',
    tables: [
      {
        name: 'Employee',
        description: 'Employees',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: 20 },
          { id: 3, name: 'Arjun', department_id: 10 }
        ]
      },
      {
        name: 'Department',
        description: 'Departments',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'department_name', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 10, department_name: 'IT' },
          { id: 20, department_name: 'HR' }
        ]
      }
    ],
    hints: [
      'Use department_id = (SELECT id FROM Department WHERE department_name = \'IT\').'
    ]
  },
  {
    id: 29,
    title: 'Customers With At Least One Order',
    difficulty: 'Medium',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['EXISTS', 'Correlated Subquery'],
    xp: 130,
    description: 'Find customers who have placed at least one order. Solve using EXISTS.\n\nReturn customer_id and name.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name FROM Customer c WHERE EXISTS (SELECT 1 FROM "Order" o WHERE o.customer_id = c.customer_id);',
    tables: [
      {
        name: 'Customer',
        description: 'Customer list',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Order receipts',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 500 },
          { order_id: 102, customer_id: 2, amount: 300 }
        ]
      }
    ],
    hints: [
      'WHERE EXISTS (SELECT 1 FROM "Order" o WHERE o.customer_id = c.customer_id).'
    ]
  },
  {
    id: 30,
    title: 'Customers With No Orders',
    difficulty: 'Medium',
    level: 3,
    levelTitle: 'LEVEL 3: Subquery Sense',
    section: 'LEVEL 3: Subquery Sense',
    concepts: ['NOT EXISTS', 'Correlated Subquery'],
    xp: 130,
    description: 'Find customers who have never placed an order. Solve using NOT EXISTS.\n\nReturn customer_id and name.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name FROM Customer c WHERE NOT EXISTS (SELECT 1 FROM "Order" o WHERE o.customer_id = c.customer_id);',
    tables: [
      {
        name: 'Customer',
        description: 'Customer records',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Orders history',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 500 },
          { order_id: 102, customer_id: 2, amount: 300 }
        ]
      }
    ],
    hints: [
      'WHERE NOT EXISTS (SELECT 1 FROM "Order" o WHERE o.customer_id = c.customer_id).'
    ]
  },

  // ==========================================
  // LEVEL 4: QUERY BUILDER (Problems 31-40)
  // ==========================================
  {
    id: 31,
    title: 'Highest Spending Customer',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['SUM()', 'GROUP BY', 'HAVING', 'MAX()'],
    xp: 150,
    description: 'Find the customer or customers with the highest total order value.\n\nReturn customer_id, name, total_spending.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name, SUM(o.amount) AS total_spending FROM Customer c JOIN "Order" o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name HAVING SUM(o.amount) = (SELECT MAX(total_val) FROM (SELECT SUM(amount) AS total_val FROM "Order" GROUP BY customer_id));',
    tables: [
      {
        name: 'Customer',
        description: 'Client profiles',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Customer transactions',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 500 },
          { order_id: 102, customer_id: 1, amount: 300 },
          { order_id: 103, customer_id: 2, amount: 1000 },
          { order_id: 104, customer_id: 3, amount: 200 }
        ]
      }
    ],
    hints: [
      'GROUP BY customer_id and match max total in HAVING.'
    ]
  },
  {
    id: 32,
    title: 'Number of Orders Per Customer',
    difficulty: 'Easy',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['LEFT JOIN', 'COUNT()', 'GROUP BY'],
    xp: 130,
    description: 'Count orders for every customer. Customers with zero orders must appear with a count of 0.\n\nReturn customer_id, name, order_count.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name, COUNT(o.order_id) AS order_count FROM Customer c LEFT JOIN "Order" o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name;',
    tables: [
      {
        name: 'Customer',
        description: 'Accounts directory',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Order registry',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 500 },
          { order_id: 102, customer_id: 1, amount: 300 },
          { order_id: 103, customer_id: 2, amount: 1000 }
        ]
      }
    ],
    hints: [
      'Use LEFT JOIN and COUNT(o.order_id) to get 0 for customers without orders.'
    ]
  },
  {
    id: 33,
    title: 'Customers With More Than 3 Orders',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['GROUP BY', 'HAVING', 'COUNT()'],
    xp: 140,
    description: 'Find customers who have placed more than 3 orders.\n\nReturn customer_id, name, order_count.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name, COUNT(o.order_id) AS order_count FROM Customer c JOIN "Order" o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name HAVING COUNT(o.order_id) > 3;',
    tables: [
      {
        name: 'Customer',
        description: 'Client roster',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' }
        ]
      },
      {
        name: 'Order',
        description: 'Orders history',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1 },
          { order_id: 102, customer_id: 1 },
          { order_id: 103, customer_id: 1 },
          { order_id: 104, customer_id: 1 },
          { order_id: 105, customer_id: 2 }
        ]
      }
    ],
    hints: [
      'GROUP BY customer_id and HAVING COUNT(order_id) > 3.'
    ]
  },
  {
    id: 34,
    title: 'Department With Most Employees',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['COUNT()', 'MAX()', 'GROUP BY', 'HAVING'],
    xp: 150,
    description: 'Find the department or departments containing the largest number of employees.\n\nReturn department_id and employee_count.',
    schemaDescription: 'Employee (id, name, department_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT department_id, COUNT(*) AS employee_count FROM Employee GROUP BY department_id HAVING COUNT(*) = (SELECT MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM Employee GROUP BY department_id));',
    tables: [
      {
        name: 'Employee',
        description: 'Employee department data',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: 10 },
          { id: 3, name: 'Arjun', department_id: 20 },
          { id: 4, name: 'Neha', department_id: 20 },
          { id: 5, name: 'Kiran', department_id: 20 }
        ]
      }
    ],
    hints: [
      'Compare COUNT(*) in HAVING with the MAX(COUNT(*)).'
    ]
  },
  {
    id: 35,
    title: 'Department With Highest Total Salary',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['SUM()', 'MAX()', 'GROUP BY', 'HAVING'],
    xp: 150,
    description: 'Find the department or departments whose employees have the highest combined salary.\n\nReturn department_id and total_salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT department_id, SUM(salary) AS total_salary FROM Employee GROUP BY department_id HAVING SUM(salary) = (SELECT MAX(tot) FROM (SELECT SUM(salary) AS tot FROM Employee GROUP BY department_id));',
    tables: [
      {
        name: 'Employee',
        description: 'Department compensation numbers',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 50000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 60000 },
          { id: 3, name: 'Arjun', department_id: 20, salary: 90000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 80000 }
        ]
      }
    ],
    hints: [
      'GROUP BY department_id and check SUM(salary) = MAX(SUM(salary)).'
    ]
  },
  {
    id: 36,
    title: 'Products Sold More Than 100 Times',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['SUM()', 'JOIN', 'GROUP BY', 'HAVING'],
    xp: 140,
    description: 'Calculate total quantity sold for each product and return products with more than 100 units sold.\n\nReturn product_id, name, total_quantity.',
    schemaDescription: 'Product (product_id, name), OrderItem (order_id, product_id, quantity)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT p.product_id, p.name, SUM(oi.quantity) AS total_quantity FROM Product p JOIN OrderItem oi ON p.product_id = oi.product_id GROUP BY p.product_id, p.name HAVING SUM(oi.quantity) > 100;',
    tables: [
      {
        name: 'Product',
        description: 'Inventory items',
        columns: [
          { name: 'product_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { product_id: 1, name: 'Laptop' },
          { product_id: 2, name: 'Mouse' },
          { product_id: 3, name: 'Keyboard' }
        ]
      },
      {
        name: 'OrderItem',
        description: 'Sold units ledger',
        columns: [
          { name: 'order_id', type: 'INTEGER' },
          { name: 'product_id', type: 'INTEGER' },
          { name: 'quantity', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, product_id: 1, quantity: 60 },
          { order_id: 102, product_id: 1, quantity: 50 },
          { order_id: 103, product_id: 2, quantity: 20 },
          { order_id: 104, product_id: 2, quantity: 30 }
        ]
      }
    ],
    hints: [
      'JOIN Product and OrderItem, GROUP BY product_id, HAVING SUM(quantity) > 100.'
    ]
  },
  {
    id: 37,
    title: 'Average Order Value Per Customer',
    difficulty: 'Easy',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['AVG()', 'GROUP BY'],
    xp: 130,
    description: 'Calculate the average order value for each customer.\n\nReturn customer_id and average_order_value.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id, amount)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT customer_id, AVG(amount) AS average_order_value FROM "Order" GROUP BY customer_id;',
    tables: [
      {
        name: 'Customer',
        description: 'Buyer accounts',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Transactions',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, amount: 100 },
          { order_id: 102, customer_id: 1, amount: 300 },
          { order_id: 103, customer_id: 2, amount: 500 }
        ]
      }
    ],
    hints: [
      'GROUP BY customer_id on the Order table and calculate AVG(amount).'
    ]
  },
  {
    id: 38,
    title: 'Customers Who Bought More Than One Product',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['COUNT(DISTINCT)', 'JOIN', 'GROUP BY', 'HAVING'],
    xp: 150,
    description: 'Find customers who have purchased at least two distinct products.\n\nReturn customer_id and name.',
    schemaDescription: 'Customer (customer_id, name), Order (order_id, customer_id), OrderItem (order_id, product_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name FROM Customer c JOIN "Order" o ON c.customer_id = o.customer_id JOIN OrderItem oi ON o.order_id = oi.order_id GROUP BY c.customer_id, c.name HAVING COUNT(DISTINCT oi.product_id) >= 2;',
    tables: [
      {
        name: 'Customer',
        description: 'Shoppers',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Order',
        description: 'Orders',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1 },
          { order_id: 102, customer_id: 1 },
          { order_id: 103, customer_id: 2 }
        ]
      },
      {
        name: 'OrderItem',
        description: 'Order products',
        columns: [
          { name: 'order_id', type: 'INTEGER' },
          { name: 'product_id', type: 'INTEGER' }
        ],
        seedData: [
          { order_id: 101, product_id: 10 },
          { order_id: 101, product_id: 20 },
          { order_id: 102, product_id: 10 },
          { order_id: 103, product_id: 10 }
        ]
      }
    ],
    hints: [
      'Join Customer, Order, and OrderItem. Use HAVING COUNT(DISTINCT oi.product_id) >= 2.'
    ]
  },
  {
    id: 39,
    title: 'Employees in High-Paying Departments',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['IN', 'Subquery', 'AVG()'],
    xp: 140,
    description: 'Find employees who belong to departments whose average salary is greater than 60,000.\n\nReturn employee id, name, department_id, salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name, department_id, salary FROM Employee WHERE department_id IN (SELECT department_id FROM Employee GROUP BY department_id HAVING AVG(salary) > 60000);',
    tables: [
      {
        name: 'Employee',
        description: 'Employee compensation',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 40000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 50000 },
          { id: 3, name: 'Arjun', department_id: 20, salary: 80000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 90000 }
        ]
      }
    ],
    hints: [
      'Use department_id IN (SELECT department_id FROM Employee GROUP BY department_id HAVING AVG(salary) > 60000).'
    ]
  },
  {
    id: 40,
    title: 'Departments With No Employees',
    difficulty: 'Medium',
    level: 4,
    levelTitle: 'LEVEL 4: Query Builder',
    section: 'LEVEL 4: Query Builder',
    concepts: ['LEFT JOIN', 'GROUP BY', 'HAVING'],
    xp: 140,
    description: 'Find departments containing zero employees. Try solving without NOT EXISTS.\n\nReturn department id and department name.',
    schemaDescription: 'Department (id, department_name), Employee (id, name, department_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT d.id, d.department_name FROM Department d LEFT JOIN Employee e ON d.id = e.department_id GROUP BY d.id, d.department_name HAVING COUNT(e.id) = 0;',
    tables: [
      {
        name: 'Department',
        description: 'Corporate divisions',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'department_name', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 10, department_name: 'IT' },
          { id: 20, department_name: 'HR' },
          { id: 30, department_name: 'Sales' }
        ]
      },
      {
        name: 'Employee',
        description: 'Staff allocation',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10 },
          { id: 2, name: 'Priya', department_id: 20 }
        ]
      }
    ],
    hints: [
      'Use LEFT JOIN with GROUP BY and HAVING COUNT(e.id) = 0.'
    ]
  },

  // ==========================================
  // LEVEL 5: INTERVIEW ARENA (Problems 41-50)
  // ==========================================
  {
    id: 41,
    title: 'Employees With the Same Salary',
    difficulty: 'Hard',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['Self-Join', 'JOIN ON'],
    xp: 160,
    description: 'Find pairs of different employees who have exactly the same salary. Do not return the same pair twice.\n\nReturn employee1 name, employee2 name, and salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e1.name AS employee1, e2.name AS employee2, e1.salary FROM Employee e1 JOIN Employee e2 ON e1.salary = e2.salary AND e1.id < e2.id;',
    tables: [
      {
        name: 'Employee',
        description: 'Salary pairings',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 50000 },
          { id: 2, name: 'Priya', salary: 60000 },
          { id: 3, name: 'Arjun', salary: 50000 },
          { id: 4, name: 'Neha', salary: 70000 }
        ]
      }
    ],
    hints: [
      'Self-join with e1.salary = e2.salary AND e1.id < e2.id to prevent duplicate and self-pairs.'
    ]
  },
  {
    id: 42,
    title: 'Duplicate Student Emails',
    difficulty: 'Easy',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['GROUP BY', 'HAVING', 'COUNT()'],
    xp: 130,
    description: 'Find students whose email address is duplicated.\n\nReturn duplicated email addresses and their counts.',
    schemaDescription: 'Student (id, name, email)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT email, COUNT(*) AS count FROM Student GROUP BY email HAVING COUNT(*) > 1;',
    tables: [
      {
        name: 'Student',
        description: 'Student registration records',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'email', type: 'VARCHAR' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', email: 'a@mail.com' },
          { id: 2, name: 'Priya', email: 'b@mail.com' },
          { id: 3, name: 'Arjun', email: 'a@mail.com' },
          { id: 4, name: 'Neha', email: 'c@mail.com' }
        ]
      }
    ],
    hints: [
      'GROUP BY email HAVING COUNT(*) > 1.'
    ]
  },
  {
    id: 43,
    title: 'First Order of Every Customer',
    difficulty: 'Medium',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['MIN()', 'GROUP BY'],
    xp: 140,
    description: 'Find the first order date for every customer.\n\nReturn customer_id and first_order_date.',
    schemaDescription: 'Order (order_id, customer_id, order_date)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT customer_id, MIN(order_date) AS first_order_date FROM "Order" GROUP BY customer_id;',
    tables: [
      {
        name: 'Order',
        description: 'Customer order history',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'order_date', type: 'DATE' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, order_date: '2026-01-05' },
          { order_id: 102, customer_id: 1, order_date: '2026-02-10' },
          { order_id: 103, customer_id: 2, order_date: '2026-01-20' },
          { order_id: 104, customer_id: 2, order_date: '2026-03-01' }
        ]
      }
    ],
    hints: [
      'Use MIN(order_date) GROUP BY customer_id.'
    ]
  },
  {
    id: 44,
    title: 'Latest Order of Every Customer',
    difficulty: 'Hard',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['MAX()', 'JOIN', 'Subquery'],
    xp: 160,
    description: 'Find the most recent order for every customer.\n\nReturn customer_id, order_id, and latest order_date.',
    schemaDescription: 'Order (order_id, customer_id, order_date)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT o.customer_id, o.order_id, o.order_date FROM "Order" o JOIN (SELECT customer_id, MAX(order_date) AS max_date FROM "Order" GROUP BY customer_id) m ON o.customer_id = m.customer_id AND o.order_date = m.max_date;',
    tables: [
      {
        name: 'Order',
        description: 'Order timeline',
        columns: [
          { name: 'order_id', type: 'INTEGER', primaryKey: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'order_date', type: 'DATE' }
        ],
        seedData: [
          { order_id: 101, customer_id: 1, order_date: '2026-01-05' },
          { order_id: 102, customer_id: 1, order_date: '2026-02-10' },
          { order_id: 103, customer_id: 2, order_date: '2026-01-20' },
          { order_id: 104, customer_id: 2, order_date: '2026-03-01' }
        ]
      }
    ],
    hints: [
      'Subquery for MAX(order_date) per customer_id, then join back to the Order table.'
    ]
  },
  {
    id: 45,
    title: 'Employees Who Joined Before Their Manager',
    difficulty: 'Hard',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['Self-Join', 'DATE Comparison'],
    xp: 160,
    description: 'Find employees whose joining date is earlier than their manager\'s joining date.\n\nReturn employee name, employee joining date, manager name, manager joining date.',
    schemaDescription: 'Employee (id, name, manager_id, joining_date)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.name AS employee_name, e.joining_date AS employee_joining_date, m.name AS manager_name, m.joining_date AS manager_joining_date FROM Employee e JOIN Employee m ON e.manager_id = m.id WHERE e.joining_date < m.joining_date;',
    tables: [
      {
        name: 'Employee',
        description: 'Staff tenure tracking',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'manager_id', type: 'INTEGER' },
          { name: 'joining_date', type: 'DATE' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', manager_id: null, joining_date: '2020-01-01' },
          { id: 2, name: 'Priya', manager_id: 1, joining_date: '2021-01-01' },
          { id: 3, name: 'Arjun', manager_id: 1, joining_date: '2019-01-01' },
          { id: 4, name: 'Neha', manager_id: 2, joining_date: '2022-01-01' }
        ]
      }
    ],
    hints: [
      'Self-join Employee on e.manager_id = m.id WHERE e.joining_date < m.joining_date.'
    ]
  },
  {
    id: 46,
    title: 'Second Highest Salary in Each Department',
    difficulty: 'Hard',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['Correlated Subquery', 'MAX()'],
    xp: 170,
    description: 'Find the employee or employees with the second-highest distinct salary within each department.\n\nReturn department_id, employee name, and salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.department_id, e.name, e.salary FROM Employee e WHERE e.salary = (SELECT MAX(salary) FROM Employee WHERE department_id = e.department_id AND salary < (SELECT MAX(salary) FROM Employee WHERE department_id = e.department_id));',
    tables: [
      {
        name: 'Employee',
        description: 'Department salaries',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 50000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 70000 },
          { id: 3, name: 'Arjun', department_id: 10, salary: 60000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 90000 },
          { id: 5, name: 'Kiran', department_id: 20, salary: 80000 }
        ]
      }
    ],
    hints: [
      'Correlated subquery finding the maximum salary in that department strictly less than that department\'s overall maximum.'
    ]
  },
  {
    id: 47,
    title: 'Customers Who Bought Every Product',
    difficulty: 'Hard',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['COUNT(DISTINCT)', 'HAVING', 'Subquery'],
    xp: 170,
    description: 'Find customers who have purchased every product in the Product table.\n\nReturn customer_id and name.',
    schemaDescription: 'Customer (customer_id, name), Product (product_id, name), Purchase (customer_id, product_id)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT c.customer_id, c.name FROM Customer c JOIN Purchase p ON c.customer_id = p.customer_id GROUP BY c.customer_id, c.name HAVING COUNT(DISTINCT p.product_id) = (SELECT COUNT(*) FROM Product);',
    tables: [
      {
        name: 'Customer',
        description: 'Client ledger',
        columns: [
          { name: 'customer_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { customer_id: 1, name: 'Ravi' },
          { customer_id: 2, name: 'Priya' },
          { customer_id: 3, name: 'Arjun' }
        ]
      },
      {
        name: 'Product',
        description: 'Product catalog',
        columns: [
          { name: 'product_id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' }
        ],
        seedData: [
          { product_id: 10, name: 'Mouse' },
          { product_id: 20, name: 'Keyboard' },
          { product_id: 30, name: 'Monitor' }
        ]
      },
      {
        name: 'Purchase',
        description: 'Customer item purchases',
        columns: [
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'product_id', type: 'INTEGER' }
        ],
        seedData: [
          { customer_id: 1, product_id: 10 },
          { customer_id: 1, product_id: 20 },
          { customer_id: 1, product_id: 30 },
          { customer_id: 2, product_id: 10 },
          { customer_id: 2, product_id: 20 },
          { customer_id: 3, product_id: 10 }
        ]
      }
    ],
    hints: [
      'GROUP BY customer_id HAVING COUNT(DISTINCT product_id) = (SELECT COUNT(*) FROM Product).'
    ]
  },
  {
    id: 48,
    title: 'Consecutive Login Days',
    difficulty: 'Hard',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['Self-Join', 'julianday()', 'DISTINCT'],
    xp: 170,
    description: 'Find users who logged in on at least two consecutive calendar days. Each user should appear once.\n\nReturn user_id.',
    schemaDescription: 'Login (user_id, login_date)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT DISTINCT l1.user_id FROM Login l1 JOIN Login l2 ON l1.user_id = l2.user_id AND julianday(l2.login_date) = julianday(l1.login_date) + 1;',
    tables: [
      {
        name: 'Login',
        description: 'Login timestamps',
        columns: [
          { name: 'user_id', type: 'INTEGER' },
          { name: 'login_date', type: 'DATE' }
        ],
        seedData: [
          { user_id: 1, login_date: '2026-01-01' },
          { user_id: 1, login_date: '2026-01-02' },
          { user_id: 1, login_date: '2026-01-05' },
          { user_id: 2, login_date: '2026-01-01' },
          { user_id: 2, login_date: '2026-01-03' }
        ]
      }
    ],
    hints: [
      'Self-join Login l1 and l2 on user_id where julianday(l2.login_date) = julianday(l1.login_date) + 1.'
    ]
  },
  {
    id: 49,
    title: 'Employees in the Top 3 Salaries',
    difficulty: 'Medium',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['IN', 'LIMIT', 'DISTINCT', 'ORDER BY'],
    xp: 150,
    description: 'Find employees whose salary belongs to one of the top 3 distinct salary values.\n\nReturn employee id, name, and salary.',
    schemaDescription: 'Employee (id, name, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT id, name, salary FROM Employee WHERE salary IN (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 3);',
    tables: [
      {
        name: 'Employee',
        description: 'Payroll table',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', salary: 90000 },
          { id: 2, name: 'Priya', salary: 80000 },
          { id: 3, name: 'Arjun', salary: 80000 },
          { id: 4, name: 'Neha', salary: 70000 },
          { id: 5, name: 'Kiran', salary: 60000 }
        ]
      }
    ],
    hints: [
      'WHERE salary IN (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 3).'
    ]
  },
  {
    id: 50,
    title: 'Department Salary Champion',
    difficulty: 'Hard',
    level: 5,
    levelTitle: 'LEVEL 5: Interview Arena',
    section: 'LEVEL 5: Interview Arena',
    concepts: ['Correlated Subquery', 'MAX()'],
    xp: 170,
    description: 'Find the employee or employees with the highest salary in each department.\n\nReturn department_id, employee name, and salary.',
    schemaDescription: 'Employee (id, name, department_id, salary)',
    initialQuery: '// Write query here',
    solutionQuery: 'SELECT e.department_id, e.name, e.salary FROM Employee e WHERE e.salary = (SELECT MAX(salary) FROM Employee WHERE department_id = e.department_id);',
    tables: [
      {
        name: 'Employee',
        description: 'Department compensation table',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'name', type: 'VARCHAR' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'salary', type: 'INTEGER' }
        ],
        seedData: [
          { id: 1, name: 'Ravi', department_id: 10, salary: 50000 },
          { id: 2, name: 'Priya', department_id: 10, salary: 70000 },
          { id: 3, name: 'Arjun', department_id: 20, salary: 60000 },
          { id: 4, name: 'Neha', department_id: 20, salary: 60000 }
        ]
      }
    ],
    hints: [
      'Correlated subquery finding MAX(salary) for each department.'
    ]
  }
];
