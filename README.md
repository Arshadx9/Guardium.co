<p align="center" style="font-size: 28px; font-weight: 700;">
Guardium
</p>

<p align="center" style="font-size: 18px;">
Embed one line. Monitor everything.
</p>

Guardium is an API monitoring platform.  
Add the SDK to your Express backend and instantly get:  

• Real-time hit tracking via WebSockets  
• Per-endpoint latency and error analytics  
• Email alerts when your API misbehaves  
• A clean dashboard showing live traffic  

---

What Guardium Does  

• Issues API keys to authenticated users  
• Accepts API hit events through an ingestion endpoint  
• Queues hit events in RabbitMQ for async processing  
• Persists processed hit data in MongoDB  
• Streams incoming hits in real time through WebSockets  
• Computes analytics such as total hits, endpoint distribution, average latency, and error rates  
• Sends alert emails on high latency and elevated error rate (with cooldown)  

---

Monorepo Structure  

Guardium is organized into a few core parts  

apps/api  
Backend service containing authentication, ingestion, processing, analytics, and notifications  

apps/web  
Frontend application (Next.js) handling onboarding and dashboard  

packages/sdk  
Client SDK used to capture and send API hit data  

docker-compose.yml  
Runs MongoDB, RabbitMQ, PostgreSQL, and pgAdmin locally  

scripts  
Database initialization utilities  

---

Architecture  

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

---

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

---

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

---

Local Development Setup  

Prerequisites  
Node.js 20+  
npm  
Docker + Docker Compose  

1) Clone and install  

git clone <your-repo-url>  
cd Guardium  
npm install  

2) Start infrastructure  

docker compose up -d  

Infra defaults:  
MongoDB: 27017  
RabbitMQ: 5672  
RabbitMQ Management: 15672  
PostgreSQL: 5432  
pgAdmin: 8080  

3) Run backend  

cd apps/api  
npm install  
npm run dev  

4) Run frontend  

cd apps/web  
npm install  
npm run dev  

Frontend runs on:  
http://localhost:3000  

Backend runs on:  
http://localhost:5000  

---

SDK Usage  

Current SDK package path:  
packages/sdk  

High-level usage:  

1. Initialize SDK with your Guardium API key  
2. Attach middleware to your Express app  
3. SDK captures request timing and sends hit payload to ingest endpoint  

---

<p align="center" style="font-size: 14px; opacity: 0.7;">
Built for developers who want observability without unnecessary complexity.
</p>
