import config from "./index.js"
import mongoose from "mongoose"
import type { Connection } from "mongoose"
import logger from "./logger.js"

class MongoConnection {

    connection : any | null

    constructor (){
        this.connection = null ;
    }


async connect () {

if(this.connection){
    logger.info("connection already exists")
    return this.connection
}

await mongoose.connect(config.mongo.uri)
this.connection = mongoose.connection as Connection


logger.info(`connected to Mongodb ${config.mongo.uri}`)

this.connection.on("error" ,(err : Error) =>{
 logger.error("MongoDB connection error", err)
})

 this.connection.on("disconnected", () => {
                logger.error("MongoDB Disconnected")
            })

            return this.connection
}

async disconnect () {
    if(this.connection){
       await mongoose.disconnect()
        this.connection = null
        logger.info("mongodb disconnected")
    }

}

async getconnection() {
    return this.connection
}

}

export default new MongoConnection()

