import type { NextFunction , Request , Response} from "express"
import AppError from "../Utils/Apperror.js"
import Securityutils from "../Utils/Securityutils.js"

declare global {
    namespace Express{
        interface Request{
            userId? : string
        }
    }
}

const authenticate = (req : Request , res : Response , next : NextFunction) => {

    const token = req.cookies.token 

    if(!token){
        throw new AppError("No token provided" , 401)
    }

    try{
        const decoded = Securityutils.jwtverify(token) as { userId: string }

        req.userId = decoded.userId
        next()
    }
    catch(error){
              throw new AppError("Invalid or expired token", 401)
    }

}
export default authenticate