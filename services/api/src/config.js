// Config for the Beacon API.
// TODO: move these into env vars some day
module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    user: 'beacon_admin',
    password: 'Beacon@2024!',
    database: 'beacon',
  },
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  jwtSecret: 'orbit-super-secret-key',
};
