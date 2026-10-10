import type { Challenge } from '../types';

export const DATALEMUR_SQL_CHALLENGES: Challenge[] = [
  // =========================================================================
  // 1. EASY SQL INTERVIEW QUESTIONS (201 - 221)
  // =========================================================================
  {
    id: 201,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Histogram of Tweets [Twitter]',
    difficulty: 'Easy',
    concepts: ['COUNT', 'GROUP BY', 'SUBQUERY'],
    description: 'Calculate the total number of users who posted each total number of tweets in 2022. Output the tweet bucket as tweet_bucket and number of users as users_num.',
    schemaDescription: 'tweets (tweet_id, user_id, msg, tweet_date)',
    tables: [
      {
        name: 'tweets',
        description: 'Twitter user tweets log',
        columns: [
          { name: 'tweet_id', type: 'INT', primaryKey: true },
          { name: 'user_id', type: 'INT' },
          { name: 'tweet_date', type: 'DATETIME' }
        ],
        seedData: [
          { tweet_id: 214252, user_id: 111, tweet_date: '2022-02-12 00:00:00' },
          { tweet_id: 739252, user_id: 111, tweet_date: '2022-03-21 00:00:00' },
          { tweet_id: 846402, user_id: 254, tweet_date: '2022-06-02 00:00:00' },
          { tweet_id: 241425, user_id: 148, tweet_date: '2022-01-05 00:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT tweet_count AS tweet_bucket, COUNT(user_id) AS users_num FROM (SELECT user_id, COUNT(tweet_id) AS tweet_count FROM tweets WHERE tweet_date >= '2022-01-01' AND tweet_date <= '2022-12-31' GROUP BY user_id) GROUP BY tweet_count;",
    hints: ['Count tweets per user in 2022 in a subquery, then group by tweet_count.'],
    xp: 100
  },
  {
    id: 202,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Data Science Skills [LinkedIn]',
    difficulty: 'Easy',
    concepts: ['HAVING', 'COUNT(DISTINCT)', 'IN'],
    description: 'Find all candidate IDs who possess all three required skills: Python, Tableau, and PostgreSQL. Sort by candidate_id ascending.',
    schemaDescription: 'candidates (candidate_id, skill)',
    tables: [
      {
        name: 'candidates',
        description: 'Candidate skill sets',
        columns: [
          { name: 'candidate_id', type: 'INT' },
          { name: 'skill', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { candidate_id: 123, skill: 'Python' },
          { candidate_id: 123, skill: 'Tableau' },
          { candidate_id: 123, skill: 'PostgreSQL' },
          { candidate_id: 234, skill: 'R' },
          { candidate_id: 147, skill: 'Python' },
          { candidate_id: 147, skill: 'PostgreSQL' },
          { candidate_id: 147, skill: 'Tableau' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT candidate_id FROM candidates WHERE skill IN ('Python', 'Tableau', 'PostgreSQL') GROUP BY candidate_id HAVING COUNT(DISTINCT skill) = 3 ORDER BY candidate_id ASC;",
    hints: ["Filter `skill IN ('Python', 'Tableau', 'PostgreSQL')` and check `HAVING COUNT(DISTINCT skill) = 3`."],
    xp: 100
  },
  {
    id: 203,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Page With No Likes [Facebook]',
    difficulty: 'Easy',
    concepts: ['LEFT JOIN', 'IS NULL', 'ORDER BY'],
    description: 'Find the IDs of the Facebook pages that have zero likes. The output should be sorted in ascending order of page_id.',
    schemaDescription: 'pages (page_id, page_name), page_likes (user_id, page_id, liked_date)',
    tables: [
      {
        name: 'pages',
        description: 'Facebook pages created',
        columns: [
          { name: 'page_id', type: 'INT', primaryKey: true },
          { name: 'page_name', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { page_id: 20701, page_name: 'Drop Seeds Not Bombs' },
          { page_id: 32728, page_name: 'Camp情节' },
          { page_id: 35648, page_name: 'Cochin' }
        ]
      },
      {
        name: 'page_likes',
        description: 'Page like events',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'page_id', type: 'INT' },
          { name: 'liked_date', type: 'DATETIME' }
        ],
        seedData: [
          { user_id: 111, page_id: 20701, liked_date: '2022-04-08 00:00:00' },
          { user_id: 121, page_id: 20701, liked_date: '2022-04-09 00:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT p.page_id FROM pages p LEFT JOIN page_likes l ON p.page_id = l.page_id WHERE l.page_id IS NULL ORDER BY p.page_id ASC;',
    hints: ['Left join `pages` and `page_likes` and filter where `l.page_id IS NULL`.'],
    xp: 100
  },
  {
    id: 204,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Unfinished Parts [Tesla]',
    difficulty: 'Easy',
    concepts: ['IS NULL', 'WHERE'],
    description: 'Tesla is investigating production bottlenecks. Write a query to determine which parts have begun the assembly process but are not yet finished.',
    schemaDescription: 'parts_assembly (part, finish_date, assembly_step)',
    tables: [
      {
        name: 'parts_assembly',
        description: 'Factory production line tracker',
        columns: [
          { name: 'part', type: 'VARCHAR(50)' },
          { name: 'finish_date', type: 'DATETIME' },
          { name: 'assembly_step', type: 'INT' }
        ],
        seedData: [
          { part: 'battery', finish_date: '2022-01-22 00:00:00', assembly_step: 1 },
          { part: 'battery', finish_date: null, assembly_step: 2 },
          { part: 'bumper', finish_date: '2022-01-22 00:00:00', assembly_step: 1 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT DISTINCT part, assembly_step FROM parts_assembly WHERE finish_date IS NULL;',
    hints: ['Filter rows where `finish_date IS NULL`.'],
    xp: 100
  },
  {
    id: 205,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Laptop vs. Mobile Viewership [NY Times]',
    difficulty: 'Easy',
    concepts: ['CASE WHEN', 'SUM()'],
    description: 'Calculate the total viewership for laptops (laptop_views) and the total viewership for mobile devices (mobile_views, which includes tablet and phone).',
    schemaDescription: 'viewership (user_id, device_type, view_time)',
    tables: [
      {
        name: 'viewership',
        description: 'Article page views by device type',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'device_type', type: 'VARCHAR(20)' },
          { name: 'view_time', type: 'DATETIME' }
        ],
        seedData: [
          { user_id: 123, device_type: 'laptop', view_time: '2022-02-04 00:00:00' },
          { user_id: 125, device_type: 'laptop', view_time: '2022-02-07 00:00:00' },
          { user_id: 128, device_type: 'tablet', view_time: '2022-02-07 00:00:00' },
          { user_id: 129, device_type: 'phone', view_time: '2022-02-09 00:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT SUM(CASE WHEN device_type = 'laptop' THEN 1 ELSE 0 END) AS laptop_views, SUM(CASE WHEN device_type IN ('tablet', 'phone') THEN 1 ELSE 0 END) AS mobile_views FROM viewership;",
    hints: ['Use conditional sums with `CASE WHEN` for laptop and mobile categories.'],
    xp: 100
  },
  {
    id: 206,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Average Post Hiatus (Part 1) [Facebook]',
    difficulty: 'Easy',
    concepts: ['DATEDIFF', 'JULIANDAY', 'HAVING'],
    description: 'Calculate the number of days between each user’s first post and last post in 2021 for users who posted at least twice in 2021. Output user_id and days_between.',
    schemaDescription: 'posts (user_id, post_id, post_date)',
    tables: [
      {
        name: 'posts',
        description: 'Facebook user posts',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'post_id', type: 'INT', primaryKey: true },
          { name: 'post_date', type: 'DATETIME' }
        ],
        seedData: [
          { user_id: 151652, post_id: 599415, post_date: '2021-07-10 12:00:00' },
          { user_id: 151652, post_id: 661425, post_date: '2021-07-20 12:00:00' },
          { user_id: 661093, post_id: 442560, post_date: '2021-03-19 12:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT user_id, CAST(MAX(JULIANDAY(post_date)) - MIN(JULIANDAY(post_date)) AS INT) AS days_between FROM posts WHERE post_date >= '2021-01-01' AND post_date <= '2021-12-31' GROUP BY user_id HAVING COUNT(post_id) >= 2;",
    hints: ['Filter for 2021 posts and take difference between MAX and MIN post dates.'],
    xp: 100
  },
  {
    id: 207,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Teams Power Users [Microsoft]',
    difficulty: 'Easy',
    concepts: ['COUNT()', 'GROUP BY', 'LIMIT'],
    description: 'Find the top 2 users who sent the highest number of messages on Microsoft Teams in August 2022. Display sender_id and message_count.',
    schemaDescription: 'messages (message_id, sender_id, receiver_id, content, sent_date)',
    tables: [
      {
        name: 'messages',
        description: 'Teams chat logs',
        columns: [
          { name: 'message_id', type: 'INT', primaryKey: true },
          { name: 'sender_id', type: 'INT' },
          { name: 'receiver_id', type: 'INT' },
          { name: 'content', type: 'VARCHAR(255)' },
          { name: 'sent_date', type: 'DATETIME' }
        ],
        seedData: [
          { message_id: 901, sender_id: 3601, receiver_id: 4500, content: 'Hi', sent_date: '2022-08-03 00:00:00' },
          { message_id: 902, sender_id: 3601, receiver_id: 4500, content: 'Sync today?', sent_date: '2022-08-04 00:00:00' },
          { message_id: 903, sender_id: 2520, receiver_id: 4500, content: 'Done', sent_date: '2022-08-10 00:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT sender_id, COUNT(message_id) AS message_count FROM messages WHERE sent_date >= '2022-08-01' AND sent_date <= '2022-08-31' GROUP BY sender_id ORDER BY message_count DESC LIMIT 2;",
    hints: ['Filter by August 2022 dates, group by sender_id, order by count desc limit 2.'],
    xp: 100
  },
  {
    id: 208,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Duplicate Job Listings [LinkedIn]',
    difficulty: 'Easy',
    concepts: ['COUNT', 'GROUP BY', 'HAVING'],
    description: 'Find the number of companies that have posted duplicate job listings. Duplicate listings have the same title and description within the same company.',
    schemaDescription: 'job_listings (job_id, company_id, title, description)',
    tables: [
      {
        name: 'job_listings',
        description: 'LinkedIn job postings',
        columns: [
          { name: 'job_id', type: 'INT', primaryKey: true },
          { name: 'company_id', type: 'INT' },
          { name: 'title', type: 'VARCHAR(50)' },
          { name: 'description', type: 'VARCHAR(100)' }
        ],
        seedData: [
          { job_id: 248, company_id: 827, title: 'Business Analyst', description: 'Analytics role' },
          { job_id: 149, company_id: 845, title: 'Data Engineer', description: 'Data pipeline work' },
          { job_id: 945, company_id: 845, title: 'Data Engineer', description: 'Data pipeline work' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT COUNT(DISTINCT company_id) AS duplicate_companies FROM (SELECT company_id, title, description, COUNT(job_id) FROM job_listings GROUP BY company_id, title, description HAVING COUNT(job_id) > 1);',
    hints: ['Group by company_id, title, description and count duplicates.'],
    xp: 100
  },
  {
    id: 209,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Cities With Completed Trades [Robinhood]',
    difficulty: 'Easy',
    concepts: ['JOIN', 'COUNT', 'LIMIT'],
    description: 'Write a query to retrieve the top 3 cities that have the highest number of completed trade orders. Output the city and number of completed orders.',
    schemaDescription: 'trades (order_id, user_id, price, quantity, status), users (user_id, city)',
    tables: [
      {
        name: 'trades',
        description: 'Trade transaction records',
        columns: [
          { name: 'order_id', type: 'INT', primaryKey: true },
          { name: 'user_id', type: 'INT' },
          { name: 'status', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { order_id: 100101, user_id: 111, status: 'Completed' },
          { order_id: 100102, user_id: 111, status: 'Completed' },
          { order_id: 100103, user_id: 148, status: 'Completed' }
        ]
      },
      {
        name: 'users',
        description: 'User details',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'city', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { user_id: 111, city: 'San Francisco' },
          { user_id: 148, city: 'Boston' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT u.city, COUNT(t.order_id) AS total_orders FROM trades t JOIN users u ON t.user_id = u.user_id WHERE t.status = 'Completed' GROUP BY u.city ORDER BY total_orders DESC LIMIT 3;",
    hints: ["Join on `user_id` where `status = 'Completed'`, group by city, order descending limit 3."],
    xp: 100
  },
  {
    id: 210,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Average Review Ratings [Amazon]',
    difficulty: 'Easy',
    concepts: ['EXTRACT', 'STRFTIME', 'AVG', 'ROUND'],
    description: 'Calculate the average star rating for each product, grouped by month. Output the month (mth), product_id, and avg_stars rounded to 2 decimal places.',
    schemaDescription: 'reviews (review_id, user_id, submit_date, product_id, stars)',
    tables: [
      {
        name: 'reviews',
        description: 'Product customer ratings',
        columns: [
          { name: 'review_id', type: 'INT', primaryKey: true },
          { name: 'product_id', type: 'INT' },
          { name: 'stars', type: 'INT' },
          { name: 'submit_date', type: 'DATETIME' }
        ],
        seedData: [
          { review_id: 6171, product_id: 50001, stars: 4, submit_date: '2022-06-10 00:00:00' },
          { review_id: 7802, product_id: 50001, stars: 5, submit_date: '2022-06-18 00:00:00' },
          { review_id: 5293, product_id: 69852, stars: 3, submit_date: '2022-06-08 00:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT CAST(STRFTIME('%m', submit_date) AS INT) AS mth, product_id, ROUND(AVG(stars), 2) AS avg_stars FROM reviews GROUP BY mth, product_id ORDER BY mth, product_id;",
    hints: ['Extract month, group by month and product_id.'],
    xp: 100
  },
  {
    id: 211,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'App Click-through Rate (CTR) [Facebook]',
    difficulty: 'Easy',
    concepts: ['CASE WHEN', 'SUM', 'ROUND'],
    description: 'Calculate the click-through rate (CTR) for each app in 2022 and round the results to 2 decimal places. CTR = 100.0 * total_clicks / total_impressions.',
    schemaDescription: 'events (app_id, event_type, timestamp)',
    tables: [
      {
        name: 'events',
        description: 'App user interaction log',
        columns: [
          { name: 'app_id', type: 'INT' },
          { name: 'event_type', type: 'VARCHAR(20)' },
          { name: 'timestamp', type: 'DATETIME' }
        ],
        seedData: [
          { app_id: 123, event_type: 'impression', timestamp: '2022-07-18 11:36:12' },
          { app_id: 123, event_type: 'click', timestamp: '2022-07-18 11:37:01' },
          { app_id: 123, event_type: 'impression', timestamp: '2022-07-19 09:12:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT app_id, ROUND(100.0 * SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) / SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END), 2) AS ctr FROM events WHERE timestamp >= '2022-01-01' AND timestamp <= '2022-12-31' GROUP BY app_id;",
    hints: ['Compute clicks / impressions * 100.'],
    xp: 100
  },
  {
    id: 212,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Pharmacy Analytics (Part 1) [CVS Health]',
    difficulty: 'Easy',
    concepts: ['ORDER BY DESC', 'LIMIT'],
    description: 'Write a query to find the top 3 most profitable drugs and calculate the total profit for each drug. Output drug name and total_profit.',
    schemaDescription: 'pharmacy_sales (drug, total_sales, cogs)',
    tables: [
      {
        name: 'pharmacy_sales',
        description: 'Pharmacy drug sales ledger',
        columns: [
          { name: 'drug', type: 'VARCHAR(50)', primaryKey: true },
          { name: 'total_sales', type: 'DECIMAL(10,2)' },
          { name: 'cogs', type: 'DECIMAL(10,2)' }
        ],
        seedData: [
          { drug: 'humira', total_sales: 24924768.32, cogs: 994575.64 },
          { drug: 'keytruda', total_sales: 11100498.02, cogs: 561630.36 },
          { drug: 'eliquis', total_sales: 6414658.11, cogs: 381121.31 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT drug, total_sales - cogs AS total_profit FROM pharmacy_sales ORDER BY total_profit DESC LIMIT 3;',
    hints: ['Compute `total_sales - cogs` and order descending limit 3.'],
    xp: 100
  },
  {
    id: 213,
    track: 'datalemur-sql',
    section: 'Easy SQL Interview Questions',
    level: 1,
    levelTitle: 'DATALEMUR SQL',
    title: 'Compressed Mean [Alibaba]',
    difficulty: 'Easy',
    concepts: ['SUM', 'ROUND'],
    description: 'Calculate the average number of items per order rounded to 1 decimal place using the item_count and order_occurrences columns.',
    schemaDescription: 'items_per_order (item_count, order_occurrences)',
    tables: [
      {
        name: 'items_per_order',
        description: 'Order distribution frequency table',
        columns: [
          { name: 'item_count', type: 'INT' },
          { name: 'order_occurrences', type: 'INT' }
        ],
        seedData: [
          { item_count: 1, order_occurrences: 500 },
          { item_count: 2, order_occurrences: 1000 },
          { item_count: 3, order_occurrences: 800 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT ROUND(CAST(SUM(item_count * order_occurrences) AS FLOAT) / SUM(order_occurrences), 1) AS mean FROM items_per_order;',
    hints: ['Take weighted sum `item_count * order_occurrences` divided by sum of occurrences.'],
    xp: 100
  },

  // =========================================================================
  // 2. MEDIUM FAANG SQL QUESTIONS (222 - 240)
  // =========================================================================
  {
    id: 222,
    track: 'datalemur-sql',
    section: 'Medium FAANG SQL Questions',
    level: 2,
    levelTitle: 'DATALEMUR SQL',
    title: "User's Third Transaction [Uber]",
    difficulty: 'Medium',
    concepts: ['ROW_NUMBER', 'OVER', 'PARTITION BY'],
    description: "Write a query to obtain the third transaction of every user. Output the user_id, spend and transaction_date.",
    schemaDescription: 'transactions (user_id, spend, transaction_date)',
    tables: [
      {
        name: 'transactions',
        description: 'Ride and delivery spend transactions',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'spend', type: 'DECIMAL(10,2)' },
          { name: 'transaction_date', type: 'DATETIME' }
        ],
        seedData: [
          { user_id: 111, spend: 100.50, transaction_date: '2022-01-08 12:00:00' },
          { user_id: 111, spend: 55.00, transaction_date: '2022-01-10 12:00:00' },
          { user_id: 111, spend: 89.60, transaction_date: '2022-01-29 12:00:00' },
          { user_id: 148, spend: 312.00, transaction_date: '2022-01-27 12:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT user_id, spend, transaction_date FROM (SELECT user_id, spend, transaction_date, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY transaction_date ASC) AS row_num FROM transactions) WHERE row_num = 3;',
    hints: ['Use `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY transaction_date)` and filter `row_num = 3`.'],
    xp: 150
  },
  {
    id: 223,
    track: 'datalemur-sql',
    section: 'Medium FAANG SQL Questions',
    level: 2,
    levelTitle: 'DATALEMUR SQL',
    title: 'Sending vs. Opening Snaps [Snapchat]',
    difficulty: 'Medium',
    concepts: ['CASE WHEN', 'SUM', 'JOIN', 'ROUND'],
    description: 'Calculate the percentage of time spent sending vs. opening snaps as a percentage of total time spent for each age bucket. Round to 2 decimal places.',
    schemaDescription: 'activities (activity_id, user_id, activity_type, time_spent), age_breakdown (user_id, age_bucket)',
    tables: [
      {
        name: 'activities',
        description: 'Snap interaction timestamps',
        columns: [
          { name: 'activity_id', type: 'INT', primaryKey: true },
          { name: 'user_id', type: 'INT' },
          { name: 'activity_type', type: 'VARCHAR(20)' },
          { name: 'time_spent', type: 'FLOAT' }
        ],
        seedData: [
          { activity_id: 7274, user_id: 123, activity_type: 'open', time_spent: 4.50 },
          { activity_id: 2425, user_id: 123, activity_type: 'send', time_spent: 3.50 },
          { activity_id: 1413, user_id: 456, activity_type: 'send', time_spent: 5.67 }
        ]
      },
      {
        name: 'age_breakdown',
        description: 'Demographics mapping',
        columns: [
          { name: 'user_id', type: 'INT', primaryKey: true },
          { name: 'age_bucket', type: 'VARCHAR(20)' }
        ],
        seedData: [
          { user_id: 123, age_bucket: '21-25' },
          { user_id: 456, age_bucket: '26-30' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT ab.age_bucket, ROUND(100.0 * SUM(CASE WHEN a.activity_type = 'send' THEN a.time_spent ELSE 0 END) / SUM(a.time_spent), 2) AS send_perc, ROUND(100.0 * SUM(CASE WHEN a.activity_type = 'open' THEN a.time_spent ELSE 0 END) / SUM(a.time_spent), 2) AS open_perc FROM activities a JOIN age_breakdown ab ON a.user_id = ab.user_id WHERE a.activity_type IN ('send', 'open') GROUP BY ab.age_bucket;",
    hints: ['Filter for send and open activities, join with age_breakdown and compute ratio.'],
    xp: 150
  },
  {
    id: 224,
    track: 'datalemur-sql',
    section: 'Medium FAANG SQL Questions',
    level: 2,
    levelTitle: 'DATALEMUR SQL',
    title: "Tweets' Rolling Averages [Twitter]",
    difficulty: 'Medium',
    concepts: ['WINDOW FUNCTION', 'AVG', 'ROWS BETWEEN'],
    description: 'Calculate the 3-day rolling average of tweets for each user. Output user_id, tweet_date, and rolling_avg_3d rounded to 2 decimal places.',
    schemaDescription: 'tweets (user_id, tweet_date, tweet_count)',
    tables: [
      {
        name: 'tweets',
        description: 'Twitter user posting activity',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'tweet_date', type: 'DATETIME' },
          { name: 'tweet_count', type: 'INT' }
        ],
        seedData: [
          { user_id: 111, tweet_date: '2022-06-01 00:00:00', tweet_count: 2 },
          { user_id: 111, tweet_date: '2022-06-02 00:00:00', tweet_count: 1 },
          { user_id: 111, tweet_date: '2022-06-03 00:00:00', tweet_count: 3 },
          { user_id: 111, tweet_date: '2022-06-04 00:00:00', tweet_count: 4 }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT user_id, tweet_date, ROUND(AVG(tweet_count) OVER (PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_3d FROM tweets;',
    hints: ['Use `AVG(tweet_count) OVER (PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`.'],
    xp: 150
  },
  {
    id: 225,
    track: 'datalemur-sql',
    section: 'Medium FAANG SQL Questions',
    level: 2,
    levelTitle: 'DATALEMUR SQL',
    title: 'Highest-Grossing Items [Amazon]',
    difficulty: 'Medium',
    concepts: ['DENSE_RANK', 'SUM', 'PARTITION BY'],
    description: 'Identify the top 2 highest-grossing products within each category in the year 2022. Output category, product, and total_spend.',
    schemaDescription: 'product_spend (category, product, user_id, spend, transaction_date)',
    tables: [
      {
        name: 'product_spend',
        description: 'Amazon product sales ledger',
        columns: [
          { name: 'category', type: 'VARCHAR(50)' },
          { name: 'product', type: 'VARCHAR(50)' },
          { name: 'spend', type: 'DECIMAL(10,2)' },
          { name: 'transaction_date', type: 'DATETIME' }
        ],
        seedData: [
          { category: 'appliance', product: 'refrigerator', spend: 299.99, transaction_date: '2022-01-01 00:00:00' },
          { category: 'appliance', product: 'washing machine', spend: 499.99, transaction_date: '2022-01-02 00:00:00' },
          { category: 'electronics', product: 'vacuum', spend: 145.00, transaction_date: '2022-02-04 00:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT category, product, total_spend FROM (SELECT category, product, SUM(spend) AS total_spend, DENSE_RANK() OVER (PARTITION BY category ORDER BY SUM(spend) DESC) AS rnk FROM product_spend WHERE transaction_date >= '2022-01-01' AND transaction_date <= '2022-12-31' GROUP BY category, product) WHERE rnk <= 2;",
    hints: ['Compute category rank using `DENSE_RANK() OVER (PARTITION BY category ORDER BY SUM(spend) DESC)`.'],
    xp: 150
  },
  {
    id: 226,
    track: 'datalemur-sql',
    section: 'Medium FAANG SQL Questions',
    level: 2,
    levelTitle: 'DATALEMUR SQL',
    title: 'Top Three Salaries [FAANG]',
    difficulty: 'Medium',
    concepts: ['DENSE_RANK', 'JOIN'],
    description: 'Find top three high earning employees in each department. Output department name, employee name, and salary.',
    schemaDescription: 'employee (id, name, salary, department_id), department (id, name)',
    tables: [
      {
        name: 'employee',
        description: 'Employee compensation records',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(50)' },
          { name: 'salary', type: 'INT' },
          { name: 'department_id', type: 'INT' }
        ],
        seedData: [
          { id: 1, name: 'Joe', salary: 85000, department_id: 1 },
          { id: 2, name: 'Henry', salary: 80000, department_id: 2 },
          { id: 3, name: 'Sam', salary: 60000, department_id: 2 },
          { id: 4, name: 'Max', salary: 90000, department_id: 1 }
        ]
      },
      {
        name: 'department',
        description: 'Department list',
        columns: [
          { name: 'id', type: 'INT', primaryKey: true },
          { name: 'name', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { id: 1, name: 'IT' },
          { id: 2, name: 'Sales' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT d.name AS department_name, e.name AS employee_name, e.salary FROM (SELECT id, name, salary, department_id, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employee) e JOIN department d ON e.department_id = d.id WHERE e.rnk <= 3;',
    hints: ['Use `DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)`.'],
    xp: 150
  },
  {
    id: 227,
    track: 'datalemur-sql',
    section: 'Medium FAANG SQL Questions',
    level: 2,
    levelTitle: 'DATALEMUR SQL',
    title: 'Supercloud Customer [Microsoft]',
    difficulty: 'Medium',
    concepts: ['COUNT(DISTINCT)', 'HAVING', 'JOIN'],
    description: 'Find customer IDs who bought at least one product from each product category in the Product catalog.',
    schemaDescription: 'customer_contracts (customer_id, product_id), products (product_id, product_category)',
    tables: [
      {
        name: 'customer_contracts',
        description: 'Customer purchase history',
        columns: [
          { name: 'customer_id', type: 'INT' },
          { name: 'product_id', type: 'INT' }
        ],
        seedData: [
          { customer_id: 1, product_id: 1 },
          { customer_id: 1, product_id: 2 },
          { customer_id: 1, product_id: 3 },
          { customer_id: 2, product_id: 1 }
        ]
      },
      {
        name: 'products',
        description: 'Azure product directory',
        columns: [
          { name: 'product_id', type: 'INT', primaryKey: true },
          { name: 'product_category', type: 'VARCHAR(50)' }
        ],
        seedData: [
          { product_id: 1, product_category: 'Analytics' },
          { product_id: 2, product_category: 'Compute' },
          { product_id: 3, product_category: 'Storage' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT c.customer_id FROM customer_contracts c JOIN products p ON c.product_id = p.product_id GROUP BY c.customer_id HAVING COUNT(DISTINCT p.product_category) = (SELECT COUNT(DISTINCT product_category) FROM products);',
    hints: ['Count distinct categories bought and compare to total catalog categories.'],
    xp: 150
  },

  // =========================================================================
  // 3. HARD ANALYTICS & ADVANCED SQL (241 - 254)
  // =========================================================================
  {
    id: 241,
    track: 'datalemur-sql',
    section: 'Hard Analytics & Advanced SQL',
    level: 3,
    levelTitle: 'DATALEMUR SQL',
    title: 'Active User Retention [Facebook]',
    difficulty: 'Hard',
    concepts: ['SELF JOIN', 'EXTRACT', 'COUNT(DISTINCT)'],
    description: 'Calculate the number of monthly active users (MAUs) in July 2022 who were also active in the previous month (June 2022). Output month (7) and monthly_active_users.',
    schemaDescription: 'user_actions (user_id, event_type, event_date)',
    tables: [
      {
        name: 'user_actions',
        description: 'User actions audit log',
        columns: [
          { name: 'user_id', type: 'INT' },
          { name: 'event_type', type: 'VARCHAR(20)' },
          { name: 'event_date', type: 'DATETIME' }
        ],
        seedData: [
          { user_id: 445, event_type: 'sign-in', event_date: '2022-06-10 12:00:00' },
          { user_id: 445, event_type: 'like', event_date: '2022-07-05 12:00:00' },
          { user_id: 742, event_type: 'sign-in', event_date: '2022-07-08 12:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT 7 AS mth, COUNT(DISTINCT user_id) AS monthly_active_users FROM user_actions WHERE event_date >= '2022-07-01' AND event_date <= '2022-07-31' AND user_id IN (SELECT user_id FROM user_actions WHERE event_date >= '2022-06-01' AND event_date <= '2022-06-30');",
    hints: ['Check that July users also have records in June.'],
    xp: 170
  },
  {
    id: 242,
    track: 'datalemur-sql',
    section: 'Hard Analytics & Advanced SQL',
    level: 3,
    levelTitle: 'DATALEMUR SQL',
    title: 'Y-on-Y Growth Rate [Wayfair]',
    difficulty: 'Hard',
    concepts: ['LAG', 'SUM', 'PARTITION BY'],
    description: 'Calculate the year-on-year growth rate for total spend for each product. Output year, product_id, curr_year_spend, prev_year_spend, and yoy_rate.',
    schemaDescription: 'user_transactions (transaction_id, product_id, spend, transaction_date)',
    tables: [
      {
        name: 'user_transactions',
        description: 'E-commerce purchase records',
        columns: [
          { name: 'transaction_id', type: 'INT', primaryKey: true },
          { name: 'product_id', type: 'INT' },
          { name: 'spend', type: 'DECIMAL(10,2)' },
          { name: 'transaction_date', type: 'DATETIME' }
        ],
        seedData: [
          { transaction_id: 1342, product_id: 123424, spend: 1500.60, transaction_date: '2019-12-31 12:00:00' },
          { transaction_id: 1004, product_id: 123424, spend: 1000.20, transaction_date: '2020-12-31 12:00:00' },
          { transaction_id: 2056, product_id: 123424, spend: 1250.00, transaction_date: '2021-12-31 12:00:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT yr, product_id, curr_year_spend, prev_year_spend, ROUND(100.0 * (curr_year_spend - prev_year_spend) / prev_year_spend, 2) AS yoy_rate FROM (SELECT CAST(STRFTIME('%Y', transaction_date) AS INT) AS yr, product_id, SUM(spend) AS curr_year_spend, LAG(SUM(spend)) OVER (PARTITION BY product_id ORDER BY STRFTIME('%Y', transaction_date)) AS prev_year_spend FROM user_transactions GROUP BY yr, product_id);",
    hints: ['Group by year and product, then use `LAG()` to get previous year spend.'],
    xp: 170
  },
  {
    id: 243,
    track: 'datalemur-sql',
    section: 'Hard Analytics & Advanced SQL',
    level: 3,
    levelTitle: 'DATALEMUR SQL',
    title: 'Repeated Payments [Stripe]',
    difficulty: 'Hard',
    concepts: ['LAG', 'JULIANDAY', 'WHERE'],
    description: 'Find the number of repeated payments made by the same merchant to the same credit card for the exact same amount within 10 minutes of each other.',
    schemaDescription: 'transactions (transaction_id, merchant_id, credit_card_id, amount, transaction_timestamp)',
    tables: [
      {
        name: 'transactions',
        description: 'Payment authorization feed',
        columns: [
          { name: 'transaction_id', type: 'INT', primaryKey: true },
          { name: 'merchant_id', type: 'INT' },
          { name: 'credit_card_id', type: 'INT' },
          { name: 'amount', type: 'DECIMAL(10,2)' },
          { name: 'transaction_timestamp', type: 'DATETIME' }
        ],
        seedData: [
          { transaction_id: 1, merchant_id: 101, credit_card_id: 1, amount: 100, transaction_timestamp: '2022-09-25 12:00:00' },
          { transaction_id: 2, merchant_id: 101, credit_card_id: 1, amount: 100, transaction_timestamp: '2022-09-25 12:08:00' },
          { transaction_id: 3, merchant_id: 101, credit_card_id: 1, amount: 100, transaction_timestamp: '2022-09-25 12:28:00' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: 'SELECT COUNT(*) AS payment_count FROM (SELECT merchant_id, credit_card_id, amount, (JULIANDAY(transaction_timestamp) - JULIANDAY(LAG(transaction_timestamp) OVER (PARTITION BY merchant_id, credit_card_id, amount ORDER BY transaction_timestamp))) * 24 * 60 AS minute_diff FROM transactions) WHERE minute_diff <= 10;',
    hints: ['Compute time difference with `LAG(transaction_timestamp)` partition by merchant, card, and amount.'],
    xp: 170
  },
  {
    id: 244,
    track: 'datalemur-sql',
    section: 'Hard Analytics & Advanced SQL',
    level: 3,
    levelTitle: 'DATALEMUR SQL',
    title: 'Server Utilization Time [Amazon]',
    difficulty: 'Hard',
    concepts: ['LEAD', 'SUM', 'JULIANDAY'],
    description: 'Calculate the total server utilization time across all servers rounded to whole days.',
    schemaDescription: 'server_utilization (server_id, status_time, session_status)',
    tables: [
      {
        name: 'server_utilization',
        description: 'Server uptime and stop sessions',
        columns: [
          { name: 'server_id', type: 'INT' },
          { name: 'status_time', type: 'DATETIME' },
          { name: 'session_status', type: 'VARCHAR(10)' }
        ],
        seedData: [
          { server_id: 1, status_time: '2022-08-02 10:00:00', session_status: 'start' },
          { server_id: 1, status_time: '2022-08-04 10:00:00', session_status: 'stop' },
          { server_id: 2, status_time: '2022-08-17 10:00:00', session_status: 'start' },
          { server_id: 2, status_time: '2022-08-18 10:00:00', session_status: 'stop' }
        ]
      }
    ],
    initialQuery: '//Write query here',
    solutionQuery: "SELECT CAST(ROUND(SUM(JULIANDAY(stop_time) - JULIANDAY(status_time))) AS INT) AS total_uptime_days FROM (SELECT server_id, status_time, session_status, LEAD(status_time) OVER (PARTITION BY server_id ORDER BY status_time) AS stop_time FROM server_utilization) WHERE session_status = 'start';",
    hints: ['Pair each start event with its subsequent stop event using `LEAD()` and sum the duration.'],
    xp: 170
  }
];
