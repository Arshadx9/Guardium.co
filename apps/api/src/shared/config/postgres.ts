import { PrismaClient } from "@prisma/client"
import config from "./index.js"
import logger from "./logger.js"


class Postgresconnect {


private prisma : PrismaClient | null = null;




getClient() : PrismaClient {

 if (!this.prisma) {
            this.prisma = new PrismaClient({
                log: config.node_env === "development"
                    ? ["query", "error", "warn"]
                    : ["error"],
            })
            logger.info("Prisma client created")
        }
        return this.prisma


}

async testconnection(): Promise<void> {

const prisma = this.getClient()
await prisma.$queryRaw`SELECT NOW()`
            logger.info("PostgreSQL connected successfully via Prisma")


}

async disconnect(): Promise<void>{
    if(this.prisma){
        await this.prisma.$disconnect
        this.prisma = null
                logger.info("Prisma client disconnected")

    }
}


}

export default new Postgresconnect()