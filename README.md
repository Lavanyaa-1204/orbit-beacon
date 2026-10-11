# orbit-beacon

This is the code for **ArachNITT**, the order tracking system at Orbit Express.

You have been hired as their first DevOps engineer. Read `TASK.md` for what you need to do. The full task document has the story, the rules and how we grade.

## What is in here

```
services/
  api/        Node + Express API 
  worker/     Node worker, picks up new orders from a Redis list
  frontend/   Small static site 
TASK.md       Your checklist
```

## How it works

1. The frontend calls the API (`/api/orders`).
2. The API saves the order in Postgres and pushes an event into the Redis list `order_events`.
3. The worker takes the event from Redis and updates the order in Postgres.

Postgres needs its tables created first. The SQL files are in `services/api/migrations/`.

## Running parts locally (without Docker)

You need Node 18+, Postgres and Redis running on your machine.

```bash
cd services/api && npm install && npm run migrate && npm start
cd services/worker && npm install && npm start
cd services/frontend && npm run build && npm start
```

The API listens on port 3000 and the frontend on 8080.

## Your repo

Fork this repo and start working... Put your GitHub username in your `/version` endpoint, as the task asks.

Good luck... Continue weaving..
