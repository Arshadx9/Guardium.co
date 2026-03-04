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

}