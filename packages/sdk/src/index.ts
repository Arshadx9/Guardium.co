const INGEST_URL = "http://13.49.148.61:5000/api/ingest/hit"

let guardiumApiKey: string = ""

export function init(apiKey: string) {
    guardiumApiKey = apiKey
}

async function sendHit(hitData: object) {
    try {
        await fetch(INGEST_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hitData)
        })
    } catch (error) {
        // silent fail — never interrupt the main request
    }
}

export function middleware() {
    return (req: any, res: any, next: any) => {

        if (!guardiumApiKey) {
            next()
            return
        }

        const start = Date.now()

        res.on("finish", () => {
            const hitData = {
                apiKey: guardiumApiKey,
                endpoint: req.path,
                method: req.method,
                statusCode: res.statusCode,
                latencyMs: Date.now() - start,
                ip: req.ip || req.headers["x-forwarded-for"] || "unknown",
                timestamp: new Date().toISOString()
            }

            sendHit(hitData)
        })

        next()
    }
}