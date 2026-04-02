# @guardium/sdk

Lightweight, non-blocking API monitoring SDK for Guardium. Automatically capture and send API hit metrics (latency, status codes, endpoints) to your Guardium instance in real-time.

## Features

- ✅ Express middleware integration
- ✅ Automatic request timing capture
- ✅ Non-blocking async hit dispatch
- ✅ Configurable API endpoint
- ✅ Zero dependencies (uses native fetch)
- ✅ TypeScript support

## Installation

```bash
npm install @guardium/sdk
```

## Quick Start

```ts
import express from "express"
import { init, middleware } from "@guardium/sdk"

const app = express()

// Initialize with your Guardium API key
init("grd_your_api_key_here")

// Attach middleware (must run before route handlers)
app.use(middleware())

// Your routes
app.get("/api/users", (_req, res) => {
  res.json({ success: true })
})

app.listen(4000)
```

Every request will now be automatically tracked and sent to Guardium.

## Usage

### Initialize

```ts
import { init } from "@guardium/sdk"

// Call this once at app startup
init("grd_your_api_key")
```

### Middleware

```ts
import { middleware } from "@guardium/sdk"

app.use(middleware())
```

The middleware captures:
- Request path (endpoint)
- HTTP method (GET, POST, etc.)
- Response status code
- Request processing time (latency in ms)
- Client IP address
- Timestamp

### What Gets Sent

Each hit payload includes:

```json
{
  "apiKey": "grd_...",
  "endpoint": "/api/users",
  "method": "GET",
  "statusCode": 200,
  "latencyMs": 45,
  "ip": "192.168.1.1",
  "timestamp": "2026-04-02T10:30:45.123Z"
}
```

## Configuration

### Custom Ingest URL

The default ingest URL is `https://guardium.com/api/ingest/hit`. If you're running Guardium on your own server:

Edit the `INGEST_URL` in your code (or extend the SDK to accept a config parameter):

```ts
// packages/sdk/src/index.ts
const INGEST_URL = "http://localhost:5000/api/ingest/hit"
```

Then rebuild:

```bash
npm run build
```

## Error Handling

The SDK silently fails by design:
- Network errors do not interrupt your application
- Hits are dropped if Guardium is unreachable
- Your API continues to function even if monitoring is down

This ensures zero operational risk from the monitoring layer.

## Performance Impact

- Negligible: hit dispatch is fire-and-forget
- No blocking: all I/O is async
- No middleware overhead on request path

## Troubleshooting

### Hits not appearing in Guardium?

1. Verify your API key is correct
2. Check that Guardium ingest endpoint is reachable
3. Confirm middleware is attached before your route handlers
4. Check your Guardium instance logs for errors

### Build errors?

Ensure TypeScript is installed:

```bash
npm install --save-dev typescript @types/node
```

## API Reference

### `init(apiKey: string): void`

Initialize the SDK with your Guardium API key. Must be called before attaching middleware.

**Parameters:**
- `apiKey` (string): Your Guardium API key (format: `grd_...`)

```ts
init("grd_abc123def456")
```

### `middleware(): (req, res, next) => void`

Express middleware for automatic hit capture. Attach to your app with `app.use()`.

```ts
app.use(middleware())
```

## License

MIT

## Support

For issues, feature requests, or questions:
- GitHub Issues: https://github.com/yourusername/guardium/issues
- Documentation: https://guardium.com/docs

## Contributing

Pull requests are welcome! Please read our contributing guidelines and run tests before submitting.
