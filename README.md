Guardium

Embed one line. Monitor everything.

Guardium is an API monitoring platform.
Add the SDK to your Express backend and instantly get:
• Real-time hit tracking via WebSockets
• Per-endpoint latency and error analytics
• Email alerts when your API misbehaves
• A clean dashboard showing live traffic

⸻

What Guardium Does

• Issues API keys to authenticated users
• Accepts API hit events through an ingestion endpoint
• Queues hit events in RabbitMQ for async processing
• Persists processed hit data in MongoDB
• Streams incoming hits in real time through WebSockets
• Computes analytics such as total hits, endpoint distribution, average latency, and error rates
• Sends alert emails on high latency and elevated error rate (with cooldown)

⸻

Monorepo Structure

Guardium/
├─ apps/
│  ├─ api/                      Backend service
│  │  ├─ prisma/                Prisma schema + migrations (Postgres layer)
│  │  ├─ src/
│  │  │  ├─ services/
│  │  │  │  ├─ auth/            Register, login, onboarding
│  │  │  │  ├─ Client/          API key + profile endpoints
│  │  │  │  ├─ Ingest/          /hit ingestion endpoint + validation
│  │  │  │  ├─ Processor/       Rabbit consumer → DB write → websocket emit
│  │  │  │  ├─ Analytics/       Aggregation endpoints
│  │  │  │  └─ Notifications/   Resend email alerts
│  │  │  ├─ shared/
│  │  │  │  ├─ config/          Mongo, RabbitMQ, Prisma, logger, env
│  │  │  │  ├─ middleware/      auth, validation, error handler, request logger
│  │  │  │  ├─ models/          Mongoose schemas
│  │  │  │  └─ Utils/           AppError, security, response formatting
│  │  │  └─ index.ts            API bootstrap
│  └─ web/                      Frontend app (Next.js)
│     ├─ app/
│     │  ├─ page.tsx            Landing page
│     │  ├─ register/           Signup
│     │  ├─ login/              Login
│     │  ├─ onboarding/         API key display + copy
│     │  └─ dashboard/          Dashboard placeholder
│     └─ Components/
│        └─ Navbar.tsx
├─ packages/
│  └─ sdk/                      Client instrumentation SDK
│     └─ src/index.ts
├─ docker-compose.yml           Local infra: Postgres, Mongo, RabbitMQ, pgAdmin
└─ scripts/
└─ init-postgres.sql/        Present as directory (currently empty)

⸻

Architecture

Architecture (how a request flows through Guardium)

A request hits your API
Your backend (with Guardium SDK) captures timing, status, and metadata

The SDK sends this data to the ingest endpoint
The ingest service validates the API key

The event is pushed into a queue (RabbitMQ)
This keeps your API fast and non-blocking

A background processor consumes events from the queue
It writes structured data into MongoDB

At the same time
Real-time updates are emitted via WebSockets
Alert conditions are checked

If something goes wrong
Email alerts are triggered

The frontend dashboard receives live updates
And displays traffic, latency, and errors in real time



Tech Stack

Backend
• Node.js + TypeScript
• Express
• MongoDB + Mongoose
• RabbitMQ (AMQP)
• Socket.IO
• JWT + cookie-based auth
• Zod request validation
• Prisma + PostgreSQL schema scaffold

Frontend
• Next.js (App Router)
• React
• TypeScript
• Tailwind CSS

SDK
• TypeScript
• Middleware-style hit capture
• Async non-blocking hit dispatch

Infra
• Docker Compose
• MongoDB
• RabbitMQ (+ management UI)
• PostgreSQL
• pgAdmin

⸻

API Surface (Current)

Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/complete-onboarding  (protected)

Client
GET /api/client/getapikey  (protected)
GET /api/client/getprofile (protected)

Ingest
POST /api/ingest/hit

Analytics
GET /api/analytics/totalhits   (protected)
GET /api/analytics/hitsbyend   (protected)
GET /api/analytics/avglatency  (protected)
GET /api/analytics/errorrate   (protected)

⸻

Local Development Setup

Prerequisites
Node.js 20+
npm
Docker + Docker Compose
	
1. Clone and install

git clone 
cd Guardium
npm install
	
2. Start infrastructure

docker compose up -d

Infra defaults:
MongoDB: 27017
RabbitMQ: 5672
RabbitMQ Management: 15672
PostgreSQL: 5432
pgAdmin: 8080

3. Run backend
cd apps/api
npm install
npm run dev

4. Run frontend
cd apps/web
npm install
npm run dev

Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5000

⸻

SDK Usage

Current SDK package path:
packages/sdk

High-level usage:
	1.	Initialize SDK with your Guardium API key
	2.	Attach middleware to your Express app
	3.	SDK captures request timing and sends hit payload to ingest endpoint

