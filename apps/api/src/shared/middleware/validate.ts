import type { NextFunction , Request ,Response } from "express"
import {z} from "zod"
import AppError from "../Utils/Apperror.js"

const validate = (schema: z.ZodSchema) =>{

    return(req : Request , res : Response , next : NextFunction) =>{

        const result = schema.safeParse(req.body)

        if(!result.success){
            const message = result.error.issues[0]?.message??"Validation failed "
            throw new AppError (message , 400)
        
        }

        next()

    }

}

export default validate