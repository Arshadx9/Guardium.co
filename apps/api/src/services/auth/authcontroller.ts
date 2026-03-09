import type { NextFunction , Request , Response } from "express"
import { login, register } from "./authservice.js"
import config from "../../shared/config/index.js"
import ResponseFormatter from "../../shared/Utils/Responseformatter.js"


export const registercontroller = async (req : Request , res : Response , next : NextFunction) => {
 
 
try{
 const{username , password } = req.body

   const result = await register(username , password)

   res.cookie('token' , result.token , {
    httpOnly : true ,
    secure: config.cookie.secure,
    maxAge : config.cookie.expiresIn

   } )

   res.status(201).json(
    ResponseFormatter.success({
        apikey : result.apiKey 
    } , "registered sucessfully")
   )

}

catch(error) {
    next(error)
}

}

   

export const logincontroller = async (req : Request , res : Response , next: NextFunction) =>{


    try{
        const {username , password} = req.body 

const result = await login(username , password)

res.cookie("token" , result.token  ,{
    httpOnly : true ,
    secure: config.cookie.secure,
    maxAge : config.cookie.expiresIn
})


    }

    catch(error){
        next(error)
    }


}


