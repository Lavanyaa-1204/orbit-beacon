# Your checklist

The full story, rules are in the task document. This is just the checklist.
Use these IDs in your README.

## Level 0:
- [ ] L0.1 Read everything. 
- [ ] L0.2 Fix and explain.
- [ ] L0.3 Add a risk table

## Level 1: Containers and Nginx
- [ ] L1.1 Dockerfile per service (multi-stage, pinned base, non-root, .dockerignore)
- [ ] L1.2 Add a HEALTHCHECK on every service, and a real `/health` on the API
- [ ] L1.3 docker-compose.yml for the full stack with healthy-based startup
- [ ] L1.4 All config from env vars, `.env.example` provided
- [ ] L1.5 Image size limits with before/after numbers
- [ ] L1.6 Nginx as the only public entry (gzip, headers, rate limit, caching, hidden version, custom error page)
- [ ] L1.7 Postgres and Redis not reachable from outside
- [ ] L1.8 `/version` shows commit SHA, build time and your GitHub username

## Level 2: Pipeline
- [ ] L2.1 GitHub webhook triggers Jenkins
- [ ] L2.2 Lint + test stage 
- [ ] L2.3 Secret scan stage
- [ ] L2.4 Build tagged with commit SHA
- [ ] L2.5 Image scan, fail on HIGH/CRITICAL
- [ ] L2.6 Push to registry
- [ ] L2.7 Deploy to cloud VM over SSH
- [ ] L2.8 Smoke test + automatic rollback
- [ ] L2.9 Secrets only in Jenkins credentials
- [ ] L2.10 Pipeline hygiene

## Level 3: Go live
- [ ] L3.1 Public URL
- [ ] L3.2 HTTPS with a real certificate
- [ ] L3.3 Deploy without downtime
- [ ] L3.4 Firewall rules
- [ ] L3.5 Push to deploy
- [ ] L3.6 Failure drills written up

## Bonus
- [ ] B1-B4 Terraform
- [ ] B5-B9 Ansible
- [ ] X1-X4 Monitoring

## README must have
Architecture diagram, setup guide, CI/CD flow, risk table, decision log (8+ entries), failure drills, proof, broken down steps, known gaps.
