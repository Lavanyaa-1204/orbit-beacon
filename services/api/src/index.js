const express = require('express');
const cors = require('cors');
const _ = require('lodash');

const config = require('./config');
const pool = require('./db');
const redis = require('./redis');
const { validateOrder, formatOrder } = require('./utils');

const app = express();
app.use(cors());
app.use(express.json());

console.log('Starting Beacon API with config:', JSON.stringify(config));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/orders', async (req, res) => {
  try {
    let sql = 'SELECT * FROM orders';
    if (req.query.status) {
      sql += " WHERE status = '" + req.query.status + "'";
    }
    sql += ' ORDER BY id DESC LIMIT 100';
    const result = await pool.query(sql);
    res.json(result.rows.map(formatOrder));
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'not found' });
    }
    res.json(formatOrder(result.rows[0]));
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
});

app.post('/api/orders', async (req, res) => {
  const check = validateOrder(req.body);
  if (!check.ok) {
    return res.status(400).json({ error: check.error });
  }
  try {
    const data = _.pick(req.body, ['customer', 'item']);
    const result = await pool.query(
      'INSERT INTO orders (customer, item) VALUES ($1, $2) RETURNING *',
      [data.customer, data.item]
    );
    const order = result.rows[0];
    await redis.lPush('order_events', JSON.stringify({ id: order.id, item: order.item, distanceKm: 2 }));
    res.status(201).json(formatOrder(order));
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
});

async function main() {
  await redis.connect();
  app.listen(config.port, () => console.log('Beacon API listening on', config.port));
}

main();
