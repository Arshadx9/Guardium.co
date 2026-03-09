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
        password : enteredpassword
    })

}

export const createapikey = async (enteredapikey : string, enteredClientID : string) => {
   return await apikey.create({
        key : enteredapikey,
        clientID : enteredClientID
    })
}