<p align="center" style="font-size: 32px; font-weight: 800;">
Guardium
</p>

<p align="center" style="font-size: 18px; color: #555;">
Embed one line. Monitor everything.
</p>

<p align="center" style="max-width: 700px;">
Guardium is an API monitoring platform.  
Add the SDK to your Express backend and instantly get:
</p>

<p align="center">
• Real-time hit tracking via WebSockets  
• Per-endpoint latency and error analytics  
• Email alerts when your API misbehaves  
• A clean dashboard showing live traffic  
</p>

---

<p style="font-size: 20px; font-weight: 600; color: #222;">
What Guardium Does
</p>

<div style="line-height: 1.8;">

• Issues API keys to authenticated users  
• Accepts API hit events through an ingestion endpoint  
• Queues hit events in RabbitMQ for async processing  
• Persists processed hit data in MongoDB  
• Streams incoming hits in real time through WebSockets  
• Computes analytics such as total hits, endpoint distribution, average latency, and error rates  
• Sends alert emails on high latency and elevated error rate (with cooldown)  

</div>

---

<p style="font-size: 20px; font-weight: 600; color: #222;">
Monorepo Structure
</p>

<p style="color: #555;">
Guardium is organized into a few core parts
</p>

<div style="line-height: 1.8;">

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

</div>

---

<p style="font-size: 20px; font-weight: 600; color: #222;">
Architecture
</p>

<div style="line-height: 1.8;">

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

</div>

---

<p style="font-size: 20px; font-weight: 600; color: #222;">
Tech Stack
</p>

<div style="line-height: 1.8;">

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

</div>

---

<p style="font-size: 20px; font-weight: 600; color: #222;">
API Surface
</p>

<div style="line-height: 1.8;">

Auth  
POST /api/auth/register  
POST /api/auth/login  
POST /api/auth/complete-onboarding  

Client  
GET /api/client/getapikey  
GET /api/client/getprofile  

Ingest  
POST /api/ingest/hit  

Analytics  
GET /api/analytics/totalhits  
GET /api/analytics/hitsbyend  
GET /api/analytics/avglatency  
GET /api/analytics/errorrate  

</div>

---

<p style="font-size: 20px; font-weight: 600; color: #222;">
Local Development Setup
</p>

<div style="line-height: 1.8;">

Prerequisites  
Node.js 20+  
npm  
Docker + Docker Compose  

Clone and install  

<pre>git clone &lt;your-repo-url&gt;
cd Guardium
npm install</pre>

Start infrastructure  

<pre>docker compose up -d</pre>

Run backend  

<pre>cd apps/api
npm install
npm run dev</pre>

Run frontend  

<pre>cd apps/web
npm install
npm run dev</pre>

Frontend → http://localhost:3000  
Backend → http://localhost:5000  

</div>

---

<p style="font-size: 20px; font-weight: 600; color: #222;">
SDK Usage
</p>

<div style="line-height: 1.8;">

Current SDK package path  
packages/sdk  

High-level usage  

1. Initialize SDK with your Guardium API key  
2. Attach middleware to your Express app  
3. SDK captures request timing and sends hit payload to ingest endpoint  

</div>

---

<p align="center" style="font-size: 13px; color: #888;">
Built for developers who want observability without unnecessary complexity.
</p>
