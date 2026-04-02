import apikey from "../../shared/models/apikeys.js"
import bizowner from "../../shared/models/bizownerdb.js"


export const findByUsername = async (enteredusername : string) => {
     
 return await bizowner.findOne({
    username : enteredusername 
  }).select('-password')

 

}

export const findusernamewithpassword = async(enteredusername : string ) => {
    return await bizowner.findOne({
        username : enteredusername,
    })

}

export const createUser = async (enteredusername : string  , enteredpassword : string ) => {


   return await bizowner.create({
        username : enteredusername,
        password : enteredpassword,
        hasOnboarded: false
    })

}

export const createapikey = async (enteredapikey : string, enteredClientID : string) => {
   return await apikey.create({
        key : enteredapikey,
        clientID : enteredClientID
    })
}

export const setHasOnboarded = async (userId: string) => {
    return await bizowner.findByIdAndUpdate(userId, { hasOnboarded: true })
}

export const completeOnboarding = async (userId: string) => {
    return await setHasOnboarded(userId)
}