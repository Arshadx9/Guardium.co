import rabbitmqConnection from "../../shared/config/rabbitmq.js"
import AppError from "../../shared/Utils/Apperror.js"
import config from "../../shared/config/index.js"
import apihit from "../../shared/models/apihits.js"
import logger from "../../shared/config/logger.js"
import { io } from "../../index.js"
import { Checknotify } from "../Notifications/notification.js"

export const startprocess = async () => {



 const channel = rabbitmqConnection.getChannel()

  if (!channel) {
          throw new AppError("RabbitMQ not connected", 500)
    }

channel.consume(config.rabbitmq.queue , async (msg)=>{

        if (!msg) return

        try{
   const hitData = JSON.parse(msg.content.toString())
    await apihit.create(hitData)
    await Checknotify(hitData)
    channel.ack(msg)
    io.emit("newHit" , hitData)
            logger.info("Hit saved to MongoDB")
        }
    catch(error){
 logger.error("Failed to process hit", error)
            channel.nack(msg, false, false)
    }
})

    logger.info("Processor started, listening to queue:", config.rabbitmq.queue)


}

