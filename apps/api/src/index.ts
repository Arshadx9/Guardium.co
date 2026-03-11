import express from "express"
import RequestLogger from "./shared/middleware/requestlogger.js"
import cookieParser from "cookie-parser"
import { startprocess } from "./services/Processor/processor.js"
import MongoConnection from "./shared/config/mongodb.js"
import RabbitMQConnection from "./shared/config/rabbitmq.js"
import authrouter from "./services/auth/authroutes.js"
import clientrouter from "./services/Client/Clientroutes.js"
import ingestrouter from "./services/Ingest/Ingestrouter.js"
import analrouter from "./services/Analytics/Analyticsroutes.js"
import Errorhandler from "./shared/middleware/errorhandler.js"
import config from "./shared/config/index.js"
import { createServer } from "http"


const app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use(RequestLogger)
    const httpserver = createServer(app)


await MongoConnection.connect()
await RabbitMQConnection.connect()

await startprocess()

app.use("/api/auth" , authrouter)
app.use("/api/client", clientrouter)
app.use("/api/ingest" , ingestrouter)
app.use("/api/analytics" , analrouter)

 app.use(Errorhandler)

   app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`)
    })

    process.on("SIGTERM", async () => {
        await MongoConnection.disconnect()
        await RabbitMQConnection.close()
        process.exit(0)
    })



