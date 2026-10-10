import initSqlJs from 'sql.js';
import type { Database, SqlJsStatic } from 'sql.js';
import type { Challenge, QueryResult, SubmissionResult, TableSchema } from '../types';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

let SQL: SqlJsStatic | null = null;
let sqlInitPromise: Promise<SqlJsStatic> | null = null;

export async function getSqlEngine(): Promise<SqlJsStatic> {
  if (SQL) return SQL;
  if (!sqlInitPromise) {
    sqlInitPromise = initSqlJs({
      locateFile: () => sqlWasmUrl
    }).then((engine) => {
      SQL = engine;
      return engine;
    });
  }
  return sqlInitPromise;
}

/**
 * Creates and populates an in-memory SQLite sandbox database for the given tables.
 */
export async function createSandboxDatabase(tables: TableSchema[]): Promise<Database> {
  const engine = await getSqlEngine();
  const db = new engine.Database();

  for (const table of tables) {
    // Build CREATE TABLE statement
    const colDefs = table.columns.map((c) => {
      let def = `"${c.name}" ${c.type}`;
      if (c.primaryKey) def += ' PRIMARY KEY';
      if (c.isNullable === false) def += ' NOT NULL';
      return def;
    }).join(', ');

    db.run(`CREATE TABLE "${table.name}" (${colDefs});`);

    // Insert seed records
    const records = table.seedData || table.rows || [];
    if (records.length > 0) {
      for (const row of records) {
        const keys = Object.keys(row);
        const colNames = keys.map((k) => `"${k}"`).join(', ');
        const placeholders = keys.map(() => '?').join(', ');
        const values = keys.map((k) => row[k]);

        db.run(`INSERT INTO "${table.name}" (${colNames}) VALUES (${placeholders});`, values);
      }
    }
  }

  return db;
}

/**
 * Executes a user SQL query in an isolated SQLite database.
 */
export async function executeQuery(
  rawSql: string,
  tables: TableSchema[],
  timeoutMs: number = 3000
): Promise<QueryResult> {
  const sql = rawSql.trim();
  if (!sql) {
    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTimeMs: 0,
      error: 'Query is empty. Please enter a valid SQL query.'
    };
  }

  // Basic security check: disallow pragma/attach attempts in sandbox
  const lowerSql = sql.toLowerCase();
  if (lowerSql.includes('pragma ') || lowerSql.includes('attach ') || lowerSql.includes('load_extension')) {
    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTimeMs: 0,
      error: 'Security Sandbox: PRAGMA and ATTACH operations are restricted in this environment.'
    };
  }

  let db: Database | null = null;
  const startTime = performance.now();

  try {
    db = await createSandboxDatabase(tables);

    // Run query with timeout safety
    const execPromise = new Promise<{ columns: string[]; values: any[][] }>((resolve, reject) => {
      try {
        const res = db!.exec(sql);
        if (!res || res.length === 0) {
          resolve({ columns: [], values: [] });
        } else {
          // Take the result of the last executed statement
          const lastResult = res[res.length - 1];
          // Limit to max 500 rows for browser performance
          const values = lastResult.values.slice(0, 500);
          resolve({
            columns: lastResult.columns,
            values: values
          });
        }
      } catch (err: any) {
        reject(err);
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Query execution timeout exceeded (3000ms). Check for infinite recursion or unindexed Cartesian joins.')), timeoutMs);
    });

    const result = await Promise.race([execPromise, timeoutPromise]);
    const executionTimeMs = Math.round(performance.now() - startTime);

    return {
      columns: result.columns,
      values: result.values,
      rowCount: result.values.length,
      executionTimeMs
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    const friendlyError = formatFriendlyError(err.message || 'Unknown SQL execution error');

    return {
      columns: [],
      values: [],
      rowCount: 0,
      executionTimeMs,
      error: friendlyError.message,
      line: friendlyError.line,
      column: friendlyError.column
    };
  } finally {
    if (db) {
      try {
        db.close();
      } catch {
        // ignore close errors
      }
    }
  }
}

/**
 * Evaluates the user query against the reference query.
 */
export async function submitChallengeQuery(
  userSql: string,
  challenge: Challenge
): Promise<SubmissionResult> {
  const userResult = await executeQuery(userSql, challenge.tables);

  if (userResult.error) {
    return {
      success: false,
      message: 'Query failed with a syntax or execution error.',
      hint: userResult.error,
      executionTimeMs: userResult.executionTimeMs
    };
  }

  // Execute reference solution
  const refQuery = challenge.solutionQuery || (challenge.testCases && challenge.testCases[0]?.query) || '';
  const refResult = await executeQuery(refQuery, challenge.tables);

  if (refResult.error) {
    console.error('Reference solution error in challenge', challenge.id, refResult.error);
  }

  // Compare Column count
  if (userResult.columns.length !== refResult.columns.length) {
    return {
      success: false,
      message: `Expected ${refResult.columns.length} output column(s), but your query returned ${userResult.columns.length}.`,
      expectedColumns: refResult.columns,
      receivedColumns: userResult.columns,
      hint: `Expected columns: ${refResult.columns.join(', ')}`,
      executionTimeMs: userResult.executionTimeMs
    };
  }

  // Check column naming (case-insensitive check)
  const normalizedUserCols = userResult.columns.map((c) => c.toLowerCase());
  const normalizedRefCols = refResult.columns.map((c) => c.toLowerCase());
  const columnMatch = normalizedUserCols.every((col, i) => col === normalizedRefCols[i]);

  if (!columnMatch) {
    return {
      success: false,
      message: `Column names or aliases do not match expected format.`,
      expectedColumns: refResult.columns,
      receivedColumns: userResult.columns,
      hint: `Check your SELECT clause aliases. Expected: ${refResult.columns.join(', ')}`,
      executionTimeMs: userResult.executionTimeMs
    };
  }

  // Compare Row count
  if (userResult.values.length !== refResult.values.length) {
    return {
      success: false,
      message: `Row count mismatch. Expected ${refResult.values.length} row(s), but received ${userResult.values.length}.`,
      expectedRowCount: refResult.values.length,
      receivedRowCount: userResult.values.length,
      rowCountDiff: Math.abs(refResult.values.length - userResult.values.length),
      hint: challenge.hints[0],
      executionTimeMs: userResult.executionTimeMs
    };
  }

  // Compare Dataset Values
  const isMatch = compareDataSets(userResult.values, refResult.values, challenge.orderDependent ?? false);

  if (!isMatch) {
    return {
      success: false,
      message: 'The query produced results, but the returned values do not match the expected solution.',
      hint: challenge.hints[1] || 'Double check your WHERE filters, JOIN conditions, and aggregations.',
      executionTimeMs: userResult.executionTimeMs
    };
  }

  return {
    success: true,
    message: 'Nice. Your query produces the exact expected result set!',
    xpGained: challenge.xp,
    executionTimeMs: userResult.executionTimeMs
  };
}

/**
 * Normalizes values for comparison (floats, numbers, string cases, nulls).
 */
function normalizeVal(val: any): string {
  if (val === null || val === undefined) return '__NULL__';
  if (typeof val === 'number') {
    // Round to 4 decimals to avoid float epsilon differences
    return Math.round(val * 10000) / 10000 + '';
  }
  return String(val).trim();
}

/**
 * Compares two 2D value matrices.
 */
function compareDataSets(userVals: any[][], refVals: any[][], orderDependent: boolean): boolean {
  if (userVals.length !== refVals.length) return false;

  const userRows = userVals.map((row) => row.map(normalizeVal).join(':::'));
  const refRows = refVals.map((row) => row.map(normalizeVal).join(':::'));

  if (orderDependent) {
    for (let i = 0; i < userRows.length; i++) {
      if (userRows[i] !== refRows[i]) return false;
    }
    return true;
  }

  // Unordered comparison (multiset matching)
  const userCounts = new Map<string, number>();
  for (const r of userRows) {
    userCounts.set(r, (userCounts.get(r) || 0) + 1);
  }

  for (const r of refRows) {
    const count = userCounts.get(r);
    if (!count || count <= 0) return false;
    userCounts.set(r, count - 1);
  }

  return true;
}

function formatFriendlyError(rawMsg: string): { message: string; line?: number; column?: number } {
  // Parse SQLite error messages cleanly
  if (rawMsg.includes('no such table')) {
    const tableName = rawMsg.split('no such table:')[1]?.trim() || '';
    return { message: `Table "${tableName}" does not exist in this database schema. Check the schema panel on the right.` };
  }
  if (rawMsg.includes('no such column')) {
    const colName = rawMsg.split('no such column:')[1]?.trim() || '';
    return { message: `Column "${colName}" does not exist. Check spelling and table aliases.` };
  }
  if (rawMsg.includes('misuse of aggregate function')) {
    return { message: `Cannot use aggregate function directly in WHERE clause. Try using a subquery or HAVING clause.` };
  }
  if (rawMsg.includes('syntax error')) {
    return { message: `SQL Syntax Error: ${rawMsg}` };
  }
  return { message: rawMsg };
}
