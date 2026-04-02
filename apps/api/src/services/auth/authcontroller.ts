import type { NextFunction , Request , Response } from "express"
import { login, register, completeOnboarding } from "./authservice.js"
import config from "../../shared/config/index.js"
import ResponseFormatter from "../../shared/Utils/Responseformatter.js"
import AppError from "../../shared/Utils/Apperror.js"

export const Registercontroller = async (req : Request , res : Response , next : NextFunction) => {
 
 
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

   

export const Logincontroller = async (req : Request , res : Response , next: NextFunction) =>{


    try{
        const {username , password} = req.body 

const result = await login(username , password)

res.cookie("token" , result.token  ,{
    httpOnly : true ,
    secure: config.cookie.secure,
    maxAge : config.cookie.expiresIn
})

  return res.status(200).json(
            ResponseFormatter.success(
                {
                    user: result.user
                },
                "logged in successfully"
            )
        )


    }

    catch(error){
        next(error)
    }


}

export const completeOnboardingController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) throw new AppError("Unauthorized", 401)
        await completeOnboarding(req.userId)
        res.status(200).json(ResponseFormatter.success(null, "Onboarding complete"))
    } catch (error) {
        next(error)
    }
}


