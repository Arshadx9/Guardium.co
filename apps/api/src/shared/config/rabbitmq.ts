import amqp, { Connection, Channel } from "amqplib"
import config from "./index.js"
import logger from "./logger.js"

class RabbitMQConnection {

    private connection: Connection | null = null
    private channel: Channel | null = null
    private isConnecting: boolean = false

    async connect(): Promise<Channel> {

        if (this.channel) {
            return this.channel
        }

        if (this.isConnecting) {
            await new Promise<void>((resolve) => {
                const checkInterval = setInterval(() => {
                    if (!this.isConnecting) {
                        clearInterval(checkInterval)
                        resolve()
                    }
                }, 100)
            })
            return this.channel!
        }

        try {
            this.isConnecting = true
            logger.info("Connecting to RabbitMQ", config.rabbitmq.url)

            this.connection = await amqp.connect(config.rabbitmq.url)
            this.channel = await this.connection.createChannel()

            const dlqName = `${config.rabbitmq.queue}.dlq`

            await this.channel.assertQueue(dlqName, {
                durable: true
            })

            await this.channel.assertQueue(config.rabbitmq.queue, {
                durable: true,
                arguments: {
                    "x-dead-letter-exchange": "",
                    "x-dead-letter-routing-key": dlqName
                }
            })

            logger.info("RabbitMQ connected, queue:", config.rabbitmq.queue)

            this.connection.on("close", () => {
                logger.warn("RabbitMQ connection closed")
                this.connection = null
                this.channel = null
            })

            this.connection.on("error", (err: Error) => {
                logger.error("RabbitMQ connection error", err)
                this.connection = null
                this.channel = null
            })

            this.isConnecting = false
            return this.channel

        } catch (error) {
            this.isConnecting = false
            logger.error("Failed to connect to RabbitMQ", error)
            throw error
        }
    }

    getChannel(): Channel | null {
        return this.channel
    }

    getStatus(): string {
        if (!this.connection || !this.channel) return "disconnected"
        return "connected"
    }

    async close(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close()
                this.channel = null
            }
            if (this.connection) {
                await this.connection.close()
                this.connection = nullconfig.rabbitmq.queue
            }
            logger.info("RabbitMQ connection closed")
        } catch (error) {
            logger.error("Error closing RabbitMQ connection:", error)
        }
    }
}

export default new RabbitMQConnection()