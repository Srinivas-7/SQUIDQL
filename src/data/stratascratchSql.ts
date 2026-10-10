import type { Challenge } from '../types';

export const STRATASCRATCH_SQL_CHALLENGES: Challenge[] = [
  // ==========================================
  // 1. BUSINESS & COMPENSATION (301 - 308)
  // ==========================================
  {
    id: 301,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Salaries Differences [Dropbox]',
    difficulty: 'Easy',
    concepts: ['MAX()', 'ABS()', 'Subquery'],
    description: 'Calculate the absolute difference between the highest salaries in the marketing and engineering departments. Output only the difference as salary_difference.',
    schemaDescription: 'db_employee (id, first_name, last_name, salary, department_id), db_dept (id, department)',
    tables: [
      {
        name: 'db_employee',
        description: 'Company employee compensation records',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'first_name', type: 'VARCHAR(50)' },
          { name: 'last_name', type: 'VARCHAR(50)' },
          { name: 'salary', type: 'INT' },
          { name: 'department_id', type: 'INT' }
        ],
        seedData: [
          { id: 10306, first_name: 'Ashley', last_name: 'Wilson', salary: 143000, department_id: 1 },
          { id: 10307, first_name: 'Joseph', last_name: 'Flores', salary: 125000, department_id: 1 },
          { id: 10308, first_name: 'Carlos', last_name: 'Sanchez', salary: 120000, department_id: 2 },
          { id: 10309, first_name: 'Rachel', last_name: 'Rivera', salary: 112000, department_id: 2 }
        ]
      },
      {
        name: 'db_dept',
        description: 'Department mappings',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'department', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { id: 1, department: 'marketing' },
          { id: 2, department: 'engineering' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT ABS((SELECT MAX(e.salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'marketing') - (SELECT MAX(e.salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'engineering')) AS salary_difference;",
    hints: ['Compute `MAX(salary)` for marketing and engineering, then use `ABS(...)`.'],
    xp: 150
  },
  {
    id: 302,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Finding Updated Records [Microsoft]',
    difficulty: 'Easy',
    concepts: ['MAX()', 'GROUP BY', 'ORDER BY'],
    description: 'Find the current (highest salary) record for each employee. Output employee id, first_name, last_name, department_id, and salary ordered by id ascending.',
    schemaDescription: 'ms_employee_salary (id, first_name, last_name, salary, department_id)',
    tables: [
      {
        name: 'ms_employee_salary',
        description: 'Employee salary history entries',
        columns: [
          { name: 'id', type: 'INT' },
          { name: 'first_name', type: 'VARCHAR(50)' },
          { name: 'last_name', type: 'VARCHAR(50)' },
          { name: 'salary', type: 'INT' },
          { name: 'department_id', type: 'INT' }
        ],
        seedData: [
          { id: 1, first_name: 'Todd', last_name: 'Wilson', salary: 110000, department_id: 1006 },
          { id: 1, first_name: 'Todd', last_name: 'Wilson', salary: 106119, department_id: 1006 },
          { id: 2, first_name: 'Justin', last_name: 'Simon', salary: 128922, department_id: 1005 },
          { id: 2, first_name: 'Justin', last_name: 'Simon', salary: 130000, department_id: 1005 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT id, first_name, last_name, department_id, MAX(salary) AS salary FROM ms_employee_salary GROUP BY id, first_name, last_name, department_id ORDER BY id ASC;',
    hints: ['Group by employee attributes and take `MAX(salary)`.'],
    xp: 150
  },
  {
    id: 303,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Acceptance Rate By Date [Meta]',
    difficulty: 'Medium',
    concepts: ['LEFT JOIN', 'COUNT', 'CASE WHEN'],
    description: 'Calculate the overall friend request acceptance rate by date. Display date and percentage of sent requests that were accepted.',
    schemaDescription: 'fb_friend_requests (user_id_sender, user_id_receiver, date, action)',
    tables: [
      {
        name: 'fb_friend_requests',
        description: 'Friend request activities',
        columns: [
          { name: 'user_id_sender', type: 'VARCHAR(50)' },
          { name: 'user_id_receiver', type: 'VARCHAR(50)' },
          { name: 'date', type: 'DATE' },
          { name: 'action', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { user_id_sender: 'adrl992nYe', user_id_receiver: '8816520', date: '2020-01-04', action: 'sent' },
          { user_id_sender: 'adrl992nYe', user_id_receiver: '8816520', date: '2020-01-06', action: 'accepted' },
          { user_id_sender: 'bb182nYe', user_id_receiver: '9916520', date: '2020-01-04', action: 'sent' },
          { user_id_sender: 'cc182nYe', user_id_receiver: '1116520', date: '2020-01-05', action: 'sent' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT a.date, CAST(COUNT(b.user_id_receiver) AS FLOAT) / COUNT(a.user_id_sender) AS percentage_acceptance FROM (SELECT * FROM fb_friend_requests WHERE action = 'sent') a LEFT JOIN (SELECT * FROM fb_friend_requests WHERE action = 'accepted') b ON a.user_id_sender = b.user_id_sender AND a.user_id_receiver = b.user_id_receiver GROUP BY a.date ORDER BY a.date ASC;",
    hints: ['Left join sent actions with accepted actions on sender and receiver.'],
    xp: 200
  },
  {
    id: 304,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Order Details [Amazon]',
    difficulty: 'Easy',
    concepts: ['JOIN', 'IN', 'ORDER BY'],
    description: "Find order details made by customers named 'Jill' or 'Eva'. Output first_name, order_date, order_details, and total_order_cost. Sort by cust_id ascending.",
    schemaDescription: 'customers (id, first_name, last_name, city, address, phone_number), orders (id, cust_id, order_date, order_details, total_order_cost)',
    tables: [
      {
        name: 'customers',
        description: 'Customer profiles',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'first_name', type: 'VARCHAR(50)' },
          { name: 'last_name', type: 'VARCHAR(50)' },
          { name: 'city', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { id: 3, first_name: 'Jill', last_name: 'Smith', city: 'Denver' },
          { id: 4, first_name: 'Eva', last_name: 'Brown', city: 'Miami' },
          { id: 5, first_name: 'Mark', last_name: 'Johnson', city: 'Atlanta' }
        ]
      },
      {
        name: 'orders',
        description: 'Orders history',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'cust_id', type: 'INT' },
          { name: 'order_date', type: 'DATE' },
          { name: 'order_details', type: 'VARCHAR(50)' },
          { name: 'total_order_cost', type: 'INT' }
        ],
        seedData: [
          { id: 1, cust_id: 3, order_date: '2019-03-01', order_details: 'Coat', total_order_cost: 100 },
          { id: 2, cust_id: 4, order_date: '2019-03-05', order_details: 'Shoes', total_order_cost: 75 },
          { id: 3, cust_id: 5, order_date: '2019-03-10', order_details: 'Shirts', total_order_cost: 50 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT c.first_name, o.order_date, o.order_details, o.total_order_cost FROM customers c JOIN orders o ON c.id = o.cust_id WHERE c.first_name IN ('Jill', 'Eva') ORDER BY c.id ASC;",
    hints: ["Join `customers` and `orders` where `c.first_name IN ('Jill', 'Eva')`."],
    xp: 100
  },
  {
    id: 305,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Top Cool Votes [Yelp]',
    difficulty: 'Medium',
    concepts: ['MAX', 'WHERE', 'SUBQUERY'],
    description: 'Find the business_name and review_text for the review(s) with the highest number of cool votes.',
    schemaDescription: 'yelp_reviews (business_name, review_id, user_id, stars, review_date, review_text, funny, useful, cool)',
    tables: [
      {
        name: 'yelp_reviews',
        description: 'Yelp user reviews and vote counters',
        columns: [
          { name: 'business_name', type: 'VARCHAR(50)' },
          { name: 'review_text', type: 'TEXT' },
          { name: 'cool', type: 'INT' }
        ],
        seedData: [
          { business_name: 'Touch of Class', review_text: 'Awesome haircuts and service!', cool: 10 },
          { business_name: 'Metro Grill', review_text: 'Great pasta and wine selection.', cool: 25 },
          { business_name: 'Cafe Luna', review_text: 'Best espresso in town.', cool: 25 },
          { business_name: 'Green Leaf Salad', review_text: 'Fresh organic greens.', cool: 8 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT business_name, review_text FROM yelp_reviews WHERE cool = (SELECT MAX(cool) FROM yelp_reviews);',
    hints: ['Find the records where `cool = (SELECT MAX(cool) FROM yelp_reviews)`.'],
    xp: 150
  },
  {
    id: 306,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Workers With The Highest Salaries [Amazon]',
    difficulty: 'Medium',
    concepts: ['DENSE_RANK', 'MAX', 'JOIN'],
    description: 'Find the job title(s) of the worker(s) who earn the highest salary in the company. Output the worker_title.',
    schemaDescription: 'worker (worker_id, first_name, last_name, salary, joining_date, department), title (worker_ref_id, worker_title, affected_from)',
    tables: [
      {
        name: 'worker',
        description: 'Employee details',
        columns: [
          { name: 'worker_id', type: 'INT', primaryKey: true },
          { name: 'first_name', type: 'VARCHAR(50)' },
          { name: 'salary', type: 'INT' }
        ],
        seedData: [
          { worker_id: 1, first_name: 'Monika', salary: 100000 },
          { worker_id: 2, first_name: 'Niharika', salary: 80000 },
          { worker_id: 3, first_name: 'Vishal', salary: 300000 },
          { worker_id: 4, first_name: 'Amitabh', salary: 500000 },
          { worker_id: 5, first_name: 'Vivek', salary: 500000 }
        ]
      },
      {
        name: 'title',
        description: 'Worker designations',
        columns: [
          { name: 'worker_ref_id', type: 'INT' },
          { name: 'worker_title', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { worker_ref_id: 1, worker_title: 'Executive' },
          { worker_ref_id: 2, worker_title: 'Lead' },
          { worker_ref_id: 3, worker_title: 'Associate' },
          { worker_ref_id: 4, worker_title: 'Manager' },
          { worker_ref_id: 5, worker_title: 'VP' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT t.worker_title FROM worker w JOIN title t ON w.worker_id = t.worker_ref_id WHERE w.salary = (SELECT MAX(salary) FROM worker) ORDER BY t.worker_title ASC;',
    hints: ['Match workers with highest salary using a subquery and join with title.'],
    xp: 150
  },
  {
    id: 307,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Customer Details [DoorDash]',
    difficulty: 'Easy',
    concepts: ['LEFT JOIN', 'ORDER BY'],
    description: 'Find the details of each customer along with their total order details. Include customers who have not placed any orders. Order results by first_name and order_details ascending.',
    schemaDescription: 'customers (id, first_name, last_name, city), orders (cust_id, order_details, total_order_cost)',
    tables: [
      {
        name: 'customers',
        description: 'Customer directory',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'first_name', type: 'VARCHAR(50)' },
          { name: 'last_name', type: 'VARCHAR(50)' },
          { name: 'city', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { id: 1, first_name: 'John', last_name: 'Doe', city: 'Seattle' },
          { id: 2, first_name: 'Mary', last_name: 'Jane', city: 'Austin' },
          { id: 3, first_name: 'Frank', last_name: 'Castle', city: 'New York' }
        ]
      },
      {
        name: 'orders',
        description: 'Orders placed',
        columns: [
          { name: 'cust_id', type: 'INT' },
          { name: 'order_details', type: 'VARCHAR(50)' },
          { name: 'total_order_cost', type: 'INT' }
        ],
        seedData: [
          { cust_id: 1, order_details: 'Book', total_order_cost: 20 },
          { cust_id: 1, order_details: 'Pen', total_order_cost: 5 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT c.first_name, c.last_name, c.city, o.order_details, o.total_order_cost FROM customers c LEFT JOIN orders o ON c.id = o.cust_id ORDER BY c.first_name ASC, o.order_details ASC;',
    hints: ['Left join `customers` and `orders` and order by first_name and order_details.'],
    xp: 100
  },
  {
    id: 308,
    track: 'stratascratch',
    section: 'Business Intelligence',
    level: 2,
    levelTitle: 'STRATASCRATCH',
    title: 'Total Monies for Sales & Marketing [Uber]',
    difficulty: 'Easy',
    concepts: ['SUM', 'WHERE IN', 'JOIN'],
    description: 'Find the total budget across the Sales and Marketing departments combined.',
    schemaDescription: 'ms_employee_budget (department_id, budget), ms_departments (id, department_name)',
    tables: [
      {
        name: 'ms_employee_budget',
        description: 'Budgets assigned',
        columns: [
          { name: 'department_id', type: 'INT' },
          { name: 'budget', type: 'INT' }
        ],
        seedData: [
          { department_id: 1, budget: 150000 },
          { department_id: 2, budget: 200000 },
          { department_id: 3, budget: 500000 }
        ]
      },
      {
        name: 'ms_departments',
        description: 'Department directory',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'department_name', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { id: 1, department_name: 'Sales' },
          { id: 2, department_name: 'Marketing' },
          { id: 3, department_name: 'Engineering' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT SUM(b.budget) AS total_budget FROM ms_employee_budget b JOIN ms_departments d ON b.department_id = d.id WHERE d.department_name IN ('Sales', 'Marketing');",
    hints: ["Join tables and use `SUM(b.budget)` where `d.department_name IN ('Sales', 'Marketing')`."],
    xp: 100
  },

  // ==========================================
  // 2. PRODUCT & USER ENGAGEMENT (309 - 318)
  // ==========================================
  {
    id: 309,
    track: 'stratascratch',
    section: 'Product Analytics',
    level: 3,
    levelTitle: 'STRATASCRATCH',
    title: 'Finding User Purchases [Amazon]',
    difficulty: 'Medium',
    concepts: ['SELF JOIN', 'JULIANDAY', 'DISTINCT'],
    description: 'Find active users who made a second purchase within 7 days of any other purchase.',
    schemaDescription: 'amazon_transactions (id, user_id, item, created_at, revenue)',
    tables: [
      {
        name: 'amazon_transactions',
        description: 'Transaction log',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'user_id', type: 'INT' },
          { name: 'created_at', type: 'DATE' },
          { name: 'revenue', type: 'INT' }
        ],
        seedData: [
          { id: 1, user_id: 101, created_at: '2021-03-01', revenue: 100 },
          { id: 2, user_id: 101, created_at: '2021-03-05', revenue: 50 },
          { id: 3, user_id: 102, created_at: '2021-03-01', revenue: 200 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT DISTINCT t1.user_id FROM amazon_transactions t1 JOIN amazon_transactions t2 ON t1.user_id = t2.user_id AND t1.id != t2.id WHERE (JULIANDAY(t2.created_at) - JULIANDAY(t1.created_at)) BETWEEN 0 AND 7 ORDER BY t1.user_id ASC;',
    hints: ['Self-join transactions on same user_id and check day difference between 0 and 7.'],
    xp: 150
  },
  {
    id: 310,
    track: 'stratascratch',
    section: 'Product Analytics',
    level: 3,
    levelTitle: 'STRATASCRATCH',
    title: 'Highest Target Under Manager [Salesforce]',
    difficulty: 'Medium',
    concepts: ['DENSE_RANK', 'WHERE', 'MAX'],
    description: 'Find the sales rep with the highest target under manager 13. Output first name and target.',
    schemaDescription: 'salesforce_employees (id, first_name, manager_id, target)',
    tables: [
      {
        name: 'salesforce_employees',
        description: 'Sales force quotas',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'first_name', type: 'VARCHAR(50)' },
          { name: 'manager_id', type: 'INT' },
          { name: 'target', type: 'INT' }
        ],
        seedData: [
          { id: 1, first_name: 'Alice', manager_id: 13, target: 200 },
          { id: 2, first_name: 'Bob', manager_id: 13, target: 250 },
          { id: 3, first_name: 'Charlie', manager_id: 13, target: 250 },
          { id: 4, first_name: 'David', manager_id: 14, target: 300 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT first_name, target FROM salesforce_employees WHERE manager_id = 13 AND target = (SELECT MAX(target) FROM salesforce_employees WHERE manager_id = 13);',
    hints: ['Filter `manager_id = 13` and match `target = (SELECT MAX(target)...)`.'],
    xp: 150
  },
  {
    id: 311,
    track: 'stratascratch',
    section: 'Product Analytics',
    level: 3,
    levelTitle: 'STRATASCRATCH',
    title: 'Number of Bathrooms and Bedrooms [Airbnb]',
    difficulty: 'Easy',
    concepts: ['AVG', 'GROUP BY', 'ROUND'],
    description: 'Find the average number of bathrooms and bedrooms for each city and property type. Output city, property_type, avg_bathrooms, avg_bedrooms.',
    schemaDescription: 'airbnb_search_details (id, city, property_type, bathrooms, bedrooms)',
    tables: [
      {
        name: 'airbnb_search_details',
        description: 'Airbnb listings metadata',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'city', type: 'VARCHAR(50)' },
          { name: 'property_type', type: 'VARCHAR(50)' },
          { name: 'bathrooms', type: 'INT' },
          { name: 'bedrooms', type: 'INT' }
        ],
        seedData: [
          { id: 1, city: 'NYC', property_type: 'Apartment', bathrooms: 1, bedrooms: 2 },
          { id: 2, city: 'NYC', property_type: 'Apartment', bathrooms: 2, bedrooms: 2 },
          { id: 3, city: 'NYC', property_type: 'House', bathrooms: 2, bedrooms: 3 },
          { id: 4, city: 'SF', property_type: 'Apartment', bathrooms: 1, bedrooms: 1 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT city, property_type, AVG(bathrooms) AS avg_bathrooms, AVG(bedrooms) AS avg_bedrooms FROM airbnb_search_details GROUP BY city, property_type ORDER BY city ASC, property_type ASC;',
    hints: ['Group by city and property_type and compute averages.'],
    xp: 120
  },
  {
    id: 312,
    track: 'stratascratch',
    section: 'Product Analytics',
    level: 3,
    levelTitle: 'STRATASCRATCH',
    title: 'Share of Active Users [Meta]',
    difficulty: 'Medium',
    concepts: ['COUNT', 'CASE WHEN', 'FLOAT'],
    description: 'Calculate the share of active users from the USA. Output the active ratio as active_users_share.',
    schemaDescription: 'fb_active_users (user_id, name, status, country)',
    tables: [
      {
        name: 'fb_active_users',
        description: 'User status by country',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
          { name: 'status', type: 'VARCHAR(20)' },
          { name: 'country', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { user_id: 1, name: 'Alice', status: 'open', country: 'USA' },
          { user_id: 2, name: 'Bob', status: 'closed', country: 'USA' },
          { user_id: 3, name: 'Charlie', status: 'open', country: 'USA' },
          { user_id: 4, name: 'David', status: 'open', country: 'UK' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT CAST(COUNT(CASE WHEN status = 'open' THEN 1 END) AS FLOAT) / COUNT(*) AS active_users_share FROM fb_active_users WHERE country = 'USA';",
    hints: ["Filter `country = 'USA'` and divide open count by total USA count."],
    xp: 150
  },
  {
    id: 313,
    track: 'stratascratch',
    section: 'Product Analytics',
    level: 3,
    levelTitle: 'STRATASCRATCH',
    title: 'Users By Average Session Time [Meta]',
    difficulty: 'Medium',
    concepts: ['MIN', 'MAX', 'JULIANDAY', 'GROUP BY'],
    description: 'Calculate each user’s average daily session duration (in seconds) between their earliest page_load and latest page_exit.',
    schemaDescription: 'facebook_web_log (user_id, timestamp, action)',
    tables: [
      {
        name: 'facebook_web_log',
        description: 'Action logs',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'timestamp', type: 'DATETIME' },
          { name: 'action', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { user_id: 1, timestamp: '2019-04-25 13:30:00', action: 'page_load' },
          { user_id: 1, timestamp: '2019-04-25 13:45:00', action: 'page_exit' },
          { user_id: 2, timestamp: '2019-04-25 09:00:00', action: 'page_load' },
          { user_id: 2, timestamp: '2019-04-25 09:30:00', action: 'page_exit' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT user_id, AVG((JULIANDAY(exit_time) - JULIANDAY(load_time)) * 86400) AS session_time_seconds FROM (SELECT user_id, DATE(timestamp) AS session_date, MAX(CASE WHEN action = 'page_load' THEN timestamp END) AS load_time, MIN(CASE WHEN action = 'page_exit' THEN timestamp END) AS exit_time FROM facebook_web_log GROUP BY user_id, DATE(timestamp)) WHERE load_time IS NOT NULL AND exit_time IS NOT NULL GROUP BY user_id;",
    hints: ['Compute daily start and exit times per user, then average the difference in seconds.'],
    xp: 200
  },
  {
    id: 314,
    track: 'stratascratch',
    section: 'Product Analytics',
    level: 3,
    levelTitle: 'STRATASCRATCH',
    title: 'Top 5 States With 5-Star Businesses [Yelp]',
    difficulty: 'Medium',
    concepts: ['COUNT', 'GROUP BY', 'LIMIT', 'ORDER BY'],
    description: 'Find the top 5 states with the highest number of 5-star businesses. Output state and count of 5-star businesses.',
    schemaDescription: 'yelp_business (business_id, state, stars)',
    tables: [
      {
        name: 'yelp_business',
        description: 'Business entries',
        columns: [
          { name: 'business_id', type: 'INT', primaryKey: true },
          { name: 'state', type: 'VARCHAR(50)' },
          { name: 'stars', type: 'INT' }
        ],
        seedData: [
          { business_id: 1, state: 'CA', stars: 5 },
          { business_id: 2, state: 'CA', stars: 5 },
          { business_id: 3, state: 'NV', stars: 5 },
          { business_id: 4, state: 'AZ', stars: 4 },
          { business_id: 5, state: 'TX', stars: 5 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT state, COUNT(*) AS n_businesses FROM yelp_business WHERE stars = 5 GROUP BY state ORDER BY n_businesses DESC, state ASC LIMIT 5;',
    hints: ['Filter `stars = 5`, group by state, order by count descending, limit 5.'],
    xp: 150
  },
  {
    id: 315,
    track: 'stratascratch',
    section: 'Product Analytics',
    level: 3,
    levelTitle: 'STRATASCRATCH',
    title: 'Highest Cost Orders [Amazon]',
    difficulty: 'Medium',
    concepts: ['JOIN', 'MAX', 'GROUP BY'],
    description: 'Find the customer(s) with the highest total order cost between 2019-02-01 and 2019-05-01. Output first_name, order_date, and total_order_cost.',
    schemaDescription: 'customers (id, first_name), orders (cust_id, order_date, total_order_cost)',
    tables: [
      {
        name: 'customers',
        description: 'Customer list',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'first_name', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { id: 1, first_name: 'Jill' },
          { id: 2, first_name: 'Eva' },
          { id: 3, first_name: 'Mark' }
        ]
      },
      {
        name: 'orders',
        description: 'Orders history',
        columns: [
          { name: 'cust_id', type: 'INT' },
          { name: 'order_date', type: 'DATE' },
          { name: 'total_order_cost', type: 'INT' }
        ],
        seedData: [
          { cust_id: 1, order_date: '2019-03-01', total_order_cost: 150 },
          { cust_id: 2, order_date: '2019-03-15', total_order_cost: 300 },
          { cust_id: 3, order_date: '2019-04-01', total_order_cost: 200 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT c.first_name, o.order_date, o.total_order_cost FROM customers c JOIN orders o ON c.id = o.cust_id WHERE o.order_date BETWEEN '2019-02-01' AND '2019-05-01' AND o.total_order_cost = (SELECT MAX(total_order_cost) FROM orders WHERE order_date BETWEEN '2019-02-01' AND '2019-05-01');",
    hints: ['Filter by the date range and select the order where cost equals the max cost in that window.'],
    xp: 150
  },

  // ==========================================
  // 3. ADVANCED ALGORITHMIC ANALYTICS (316 - 325)
  // ==========================================
  {
    id: 316,
    track: 'stratascratch',
    section: 'Advanced Analytics',
    level: 4,
    levelTitle: 'STRATASCRATCH',
    title: 'Activity Rank [Google]',
    difficulty: 'Medium',
    concepts: ['ROW_NUMBER', 'COUNT', 'GROUP BY'],
    description: 'Find the email activity rank for each user. Email activity is total emails sent. Order by total emails descending, then from_user ascending.',
    schemaDescription: 'google_gmail_emails (id, from_user, to_user, day)',
    tables: [
      {
        name: 'google_gmail_emails',
        description: 'Gmail transaction logs',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'from_user', type: 'VARCHAR(50)' },
          { name: 'to_user', type: 'VARCHAR(50)' },
          { name: 'day', type: 'INT' }
        ],
        seedData: [
          { id: 1, from_user: 'alice@gmail.com', to_user: 'bob@gmail.com', day: 1 },
          { id: 2, from_user: 'alice@gmail.com', to_user: 'carol@gmail.com', day: 1 },
          { id: 3, from_user: 'bob@gmail.com', to_user: 'alice@gmail.com', day: 2 },
          { id: 4, from_user: 'carol@gmail.com', to_user: 'alice@gmail.com', day: 2 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT from_user, COUNT(*) AS total_emails, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, from_user ASC) AS activity_rank FROM google_gmail_emails GROUP BY from_user ORDER BY activity_rank ASC;',
    hints: ['Use `ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, from_user ASC)`.'],
    xp: 180
  },
  {
    id: 317,
    track: 'stratascratch',
    section: 'Advanced Analytics',
    level: 4,
    levelTitle: 'STRATASCRATCH',
    title: 'Top Ranked Songs [Spotify]',
    difficulty: 'Medium',
    concepts: ['COUNT', 'GROUP BY', 'HAVING'],
    description: 'Find all songs that have reached the #1 position on the charts. Count how many times each song made it to #1. Sort by count descending.',
    schemaDescription: 'spotify_worldwide_daily_song_ranking (id, position, trackname, artist, streams, url, date, region)',
    tables: [
      {
        name: 'spotify_worldwide_daily_song_ranking',
        description: 'Daily music chart rankings',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'position', type: 'INT' },
          { name: 'trackname', type: 'VARCHAR(100)' },
          { name: 'artist', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { id: 1, position: 1, trackname: 'Blinding Lights', artist: 'The Weeknd' },
          { id: 2, position: 1, trackname: 'Blinding Lights', artist: 'The Weeknd' },
          { id: 3, position: 2, trackname: 'Stay', artist: 'Kid LAROI' },
          { id: 4, position: 1, trackname: 'Stay', artist: 'Kid LAROI' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT trackname, COUNT(*) AS times_top1 FROM spotify_worldwide_daily_song_ranking WHERE position = 1 GROUP BY trackname ORDER BY times_top1 DESC, trackname ASC;',
    hints: ['Filter `position = 1` and group by trackname.'],
    xp: 150
  },
  {
    id: 318,
    track: 'stratascratch',
    section: 'Advanced Analytics',
    level: 4,
    levelTitle: 'STRATASCRATCH',
    title: 'New Products [Salesforce]',
    difficulty: 'Medium',
    concepts: ['COUNT', 'CASE WHEN', 'GROUP BY'],
    description: 'Calculate the difference between the net count of products launched in 2020 versus 2019 per company. Output company_name and total_launch_difference.',
    schemaDescription: 'car_launches (year, company_name, product_name)',
    tables: [
      {
        name: 'car_launches',
        description: 'Vehicle brand product launch registry',
        columns: [
          { name: 'year', type: 'INT' },
          { name: 'company_name', type: 'VARCHAR(50)' },
          { name: 'product_name', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { year: 2019, company_name: 'Tesla', product_name: 'Model Y' },
          { year: 2020, company_name: 'Tesla', product_name: 'Cybertruck' },
          { year: 2020, company_name: 'Tesla', product_name: 'Roadster' },
          { year: 2019, company_name: 'Ford', product_name: 'Mach-E' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT company_name, (COUNT(CASE WHEN year = 2020 THEN 1 END) - COUNT(CASE WHEN year = 2019 THEN 1 END)) AS launch_diff FROM car_launches GROUP BY company_name ORDER BY company_name ASC;',
    hints: ['Count products in 2020 minus count in 2019 for each company.'],
    xp: 150
  },
  {
    id: 319,
    track: 'stratascratch',
    section: 'Advanced Analytics',
    level: 4,
    levelTitle: 'STRATASCRATCH',
    title: 'Distance Traveled [Lyft]',
    difficulty: 'Medium',
    concepts: ['JOIN', 'SUM', 'ORDER BY', 'LIMIT'],
    description: 'Find the top 10 users who have traveled the greatest cumulative distance. Output user_id, name, and total distance traveled.',
    schemaDescription: 'lyft_users (user_id, name), lyft_rides (ride_id, user_id, distance)',
    tables: [
      {
        name: 'lyft_users',
        description: 'Passenger details',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { user_id: 1, name: 'Alice' },
          { user_id: 2, name: 'Bob' },
          { user_id: 3, name: 'Charlie' }
        ]
      },
      {
        name: 'lyft_rides',
        description: 'Completed ride logs',
        columns: [
          { name: 'ride_id', type: 'INT', primaryKey: true },
          { name: 'user_id', type: 'INT' },
          { name: 'distance', type: 'INT' }
        ],
        seedData: [
          { ride_id: 101, user_id: 1, distance: 45 },
          { ride_id: 102, user_id: 1, distance: 30 },
          { ride_id: 103, user_id: 2, distance: 90 },
          { ride_id: 104, user_id: 3, distance: 10 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT u.user_id, u.name, SUM(r.distance) AS total_distance FROM lyft_users u JOIN lyft_rides r ON u.user_id = r.user_id GROUP BY u.user_id, u.name ORDER BY total_distance DESC, u.user_id ASC LIMIT 10;',
    hints: ['Join users and rides, sum distances, group by user, and limit to 10.'],
    xp: 150
  },
  {
    id: 320,
    track: 'stratascratch',
    section: 'Advanced Analytics',
    level: 4,
    levelTitle: 'STRATASCRATCH',
    title: 'Expensive Projects [Microsoft]',
    difficulty: 'Medium',
    concepts: ['JOIN', 'SUM', 'ROUND', 'GROUP BY'],
    description: 'Find projects where the cost per employee is higher than the average cost across all projects.',
    schemaDescription: 'ms_projects (id, title, budget), ms_emp_projects (emp_id, project_id)',
    tables: [
      {
        name: 'ms_projects',
        description: 'Project budgets',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'title', type: 'VARCHAR(50)' },
          { name: 'budget', type: 'INT' }
        ],
        seedData: [
          { id: 1, title: 'Project Titan', budget: 50000 },
          { id: 2, title: 'Project Apollo', budget: 120000 },
          { id: 3, title: 'Project Orion', budget: 30000 }
        ]
      },
      {
        name: 'ms_emp_projects',
        description: 'Staff allocation',
        columns: [
          { name: 'emp_id', type: 'INT' },
          { name: 'project_id', type: 'INT' }
        ],
        seedData: [
          { emp_id: 10, project_id: 1 },
          { emp_id: 11, project_id: 1 },
          { emp_id: 12, project_id: 2 },
          { emp_id: 13, project_id: 3 },
          { emp_id: 14, project_id: 3 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT p.title, ROUND(CAST(p.budget AS FLOAT) / COUNT(ep.emp_id), 0) AS budget_per_employee FROM ms_projects p JOIN ms_emp_projects ep ON p.id = ep.project_id GROUP BY p.id, p.title, p.budget ORDER BY budget_per_employee DESC;',
    hints: ['Divide budget by `COUNT(emp_id)` for each project.'],
    xp: 150
  }
];
