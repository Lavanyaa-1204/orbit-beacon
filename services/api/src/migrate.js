// Runs every .sql file in /migrations, in order.
const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function run() {
  const dir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  for (const f of files) {
    console.log('running', f);
    await pool.query(fs.readFileSync(path.join(dir, f), 'utf8'));
  }
  console.log('migrations done');
  await pool.end();
}

run().catch((e) => {
  console.error('migration failed:', e.message);
  process.exit(1);
});
