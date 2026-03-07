import type { NextFunction ,Request , Response } from "express"
import AppError from "../Utils/Apperror.js"
import ResponseFormatter from "../Utils/Responseformatter.js"
import logger from "../config/logger.js"

const Errorhandler= (err :Error ,  req : Request , res: Response , next : NextFunction  ) => {


if (err instanceof AppError){
    var statuscode = err.statusCode
    var message = err.message

    res.status(statuscode).json(
        ResponseFormatter.error(message)
    )

}

else {
   logger.error(err.message)
   res.status(500).json(
          ResponseFormatter.error("Something went wrong")
   )
}


}
export default Errorhandler