CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer TEXT NOT NULL,
  item TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'placed',
  eta_minutes INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
