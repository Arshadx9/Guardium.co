import apikey from "../../shared/models/apikeys.js";
import AppError from "../../shared/Utils/Apperror.js"
import Securityutils from "../../shared/Utils/Securityutils.js"
import { createUser, findByUsername , createapikey , findusernamewithpassword, setHasOnboarded } from "./authrepository.js"
import crypto from "crypto";



export const register = async (enteredusername : string ,enteredpassword : string ) => {


 const existingUser = await findByUsername(enteredusername)
    if (existingUser) {
        throw new AppError("Username already taken", 400)
    }

const hashedpass = await Securityutils.hashpassword(enteredpassword)


 const newuser = await createUser(enteredusername , hashedpass)

const generatedapiKey = `grd_${crypto.randomBytes(32).toString('hex')}`

await createapikey(generatedapiKey  , newuser._id.toString() )

 const generatedtoken =  Securityutils.generateToken({userId : newuser._id}) 

return({
    user : newuser,
    apiKey : generatedapiKey ,
    token: generatedtoken
})

}

export const login = async (enteredusername : string , enteredpassword : string) => {

 const existingUser =  await findusernamewithpassword(enteredusername )
  
 if (!existingUser || !existingUser.password) {
        throw new AppError("Invalid credentials", 401)
    }



const isMatch = await Securityutils.comparepassword(enteredpassword , existingUser.password)

if (!isMatch) {
    throw new AppError("Invalid credentials", 401)
}

const generatedtoken =  Securityutils.generateToken({userId : existingUser._id})

return({
    user : existingUser,
    token: generatedtoken,
    hasOnboarded: existingUser.hasOnboarded
})
}

export const completeOnboarding = async (userId: string) => {
    return await setHasOnboarded(userId)
}
