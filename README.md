<p align="center">
  <h1 align="center">Guardium</h1>
  <p align="center"><i>Embed one line. Monitor everything.</i></p>
</p>

<br/>

<p align="center">
Guardium is an API monitoring platform.  
Add the SDK to your Express backend and instantly get:
</p>

<br/>

<p align="center">
• Real-time hit tracking via WebSockets  
• Per-endpoint latency and error analytics  
• Email alerts when your API misbehaves  
• A clean dashboard showing live traffic  
</p>

---

## What Guardium Does

• Issues API keys to authenticated users  
• Accepts API hit events through an ingestion endpoint  
• Queues hit events in RabbitMQ for async processing  
• Persists processed hit data in MongoDB  
• Streams incoming hits in real time through WebSockets  
• Computes analytics such as total hits, endpoint distribution, average latency, and error rates  
• Sends alert emails on high latency and elevated error rate (with cooldown)  

---

## Monorepo Structure

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

## Architecture

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

## Tech Stack

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

## API Surface

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

---

## Local Development Setup

Prerequisites  
Node.js 20+  
npm  
Docker + Docker Compose  

Clone and install  

```bash
git clone <your-repo-url>
cd Guardium
npm install
