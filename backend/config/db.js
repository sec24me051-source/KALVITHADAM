// Netlify Database (managed Postgres) via Drizzle ORM.
// The connection is configured automatically by the Netlify platform.
const { count, getTableColumns } = require('drizzle-orm');
const { db, ...schema } = require('../../db');

// Shape a DB row like the API has always returned it (with `_id`)
const toDoc = (row) => (row ? { _id: row.id, ...row } : row);

// Keep only writable columns of a table from a request body
const pickColumns = (table, body = {}) => {
  const data = {};
  for (const [key, column] of Object.entries(getTableColumns(table))) {
    if (['id', 'createdAt', 'updatedAt'].includes(key)) continue;
    let value = body[key];
    if (value === undefined) continue;
    if (column.dataType.startsWith('number')) {
      if (value === '' || value === null) continue;
      value = Number(value);
    } else if (column.dataType.includes('date')) {
      value = value ? new Date(value) : null;
    } else if (column.dimensions && typeof value === 'string') {
      value = value.split(',').map((s) => s.trim()).filter(Boolean);
    }
    data[key] = value;
  }
  return data;
};

// Count rows of a table, optionally filtered
const countWhere = async (table, where) => {
  const [row] = await db.select({ value: count() }).from(table).where(where);
  return Number(row.value);
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isId = (value) => typeof value === 'string' && UUID_RE.test(value);

module.exports = { db, schema, toDoc, pickColumns, countWhere, isId };
