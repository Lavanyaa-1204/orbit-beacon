const { createClient } = require('redis');
const { Pool } = require('pg');
const { nextStatus, estimateEta } = require('./process');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  user: 'beacon_admin',
  password: 'Beacon@2024!',
  database: 'beacon',
});

const redis = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
redis.on('error', (e) => console.log('redis error', e.message));

// keep everything we handled so we can debug later
const history = [];

async function handle(evt) {
  const eta = estimateEta(evt.distanceKm || 2);
  await pool.query('UPDATE orders SET status = $1, eta_minutes = $2 WHERE id = $3', [
    nextStatus('placed'),
    eta,
    evt.id,
  ]);
  history.push({ evt, at: Date.now(), snapshot: Buffer.alloc(256 * 1024, 'x') });
  console.log('handled order', evt.id, 'total so far', history.length);
}

async function main() {
  await redis.connect();
  console.log('worker started');
  while (true) {
    try {
      const res = await redis.brPop('order_events', 5);
      if (res) {
        await handle(JSON.parse(res.element));
      }
    } catch (e) {
      console.log('error:', e.message);
    }
  }
}

main();
