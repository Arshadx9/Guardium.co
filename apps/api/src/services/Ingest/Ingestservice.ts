import rabbitmqConnection from "../../shared/config/rabbitmq.js"
import AppError from "../../shared/Utils/Apperror.js"
import { findapikey } from "./Ingestrepo.js"
import config from "../../shared/config/index.js"

export const processHit = async (
    apiKey: string,
    endpoint: string,
    method: string,
    statusCode: number,
    latencyMs: number,
    ip: string,
    timestamp: string,
) => {

    const theapikey = await findapikey(apiKey)

    if (!theapikey) {
        throw new AppError("Invalid Api key", 401)
    }

        if (!theapikey.isActive) {
           throw new AppError("Api key is inactive", 401)
    }

        const channel = rabbitmqConnection.getChannel()

     if (!channel) {
          throw new AppError("RabbitMQ not connected", 500)
    }

        const hitData = {
        apiKey,
        endpoint,
        method,
        statusCode,
        latencyMs,
        ip,
        timestamp
    }

channel.sendToQueue(
        config.rabbitmq.queue,
        Buffer.from(JSON.stringify(hitData))
    )

}