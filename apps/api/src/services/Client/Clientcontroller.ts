import type { NextFunction , Response , Request  } from "express";
import { getApikey, getprofile } from "./Clientservice.js";
import AppError from "../../shared/Utils/Apperror.js";
import ResponseFormatter from "../../shared/Utils/Responseformatter.js";


export const apikeycontroller = async (req : Request , res : Response , next : NextFunction) => {


try{

if (!req.userId) {
            throw new AppError("Unauthorized", 401)
        }


const userID = req.userId 

const yourapikey = await getApikey ( userID )

res.status(200).json(ResponseFormatter.success({
    apikey : yourapikey 
} , "Your api key"))


}catch (error){
    next(error)
}

}

export const profilecontroller = async(req : Request , res : Response , next : NextFunction) => {


    try{
 if (!req.userId) {
            throw new AppError("Unauthorized", 401)
        }


const userID = req.userId 

const yourprofile = await getprofile(userID)

res.status(200).json(ResponseFormatter.success({
profile : yourprofile
}, "your profile details"))

    }catch (error){
    next(error)
}

  
 
}