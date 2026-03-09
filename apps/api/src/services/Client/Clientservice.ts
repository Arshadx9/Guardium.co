import AppError from "../../shared/Utils/Apperror.js"
import { findApiKeyByClientId , findprofile } from "./Clientrepo.js"

export const getApikey = async (userID : string) => {
       const apikey =     await  findApiKeyByClientId(userID)

   

       if(!apikey){
throw new AppError("apikey doesn't exist " , 404)
       }

           return apikey 
}

export const getprofile = async (userID : string) =>{
    const profile = await findprofile (userID )

    if(!profile){
        throw new AppError("profile doesn't exist " , 404)
    
    }

    return profile 
}
