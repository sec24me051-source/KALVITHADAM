const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { eq } = require('drizzle-orm');
const { db, schema } = require('../config/db');

let cachedSecret = null;

// Use JWT_SECRET when configured; otherwise generate one and persist it in the database
const getJwtSecret = async () => {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (cachedSecret) return cachedSecret;

  const { appSettings } = schema;
  await db
    .insert(appSettings)
    .values({ key: 'jwt_secret', value: crypto.randomBytes(48).toString('hex') })
    .onConflictDoNothing();
  const [row] = await db.select().from(appSettings).where(eq(appSettings.key, 'jwt_secret'));
  cachedSecret = row.value;
  return cachedSecret;
};

const generateToken = async (id) => {
  return jwt.sign({ id }, await getJwtSecret(), { expiresIn: '7d' });
};

module.exports = generateToken;
module.exports.getJwtSecret = getJwtSecret;
