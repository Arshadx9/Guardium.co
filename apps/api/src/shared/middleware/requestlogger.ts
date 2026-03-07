import type { NextFunction , Request , Response } from "express"
import logger from "../config/logger.js"

const RequestLogger= ( req : Request , res : Response , next : NextFunction )=>{

logger.info(`${req.method} ${req.path}` , {

    ip : req.ip,
    useragent : req.headers['user-agent']

})

next()

}

export default RequestLogger