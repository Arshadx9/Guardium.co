import bcrypt from "bcryptjs";
import config from "../config/index.js"
import jwt from "jsonwebtoken"

class Securityutils{

    static async hashpassword( password : string){

     const hashedpass = await  bcrypt.hash(password ,10)

        return hashedpass

    }

    static async comparepassword(password : string , hashedpass : string){
      return await  bcrypt.compare(password , hashedpass)
       
    }

 static generateToken(payload: object) {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: "24h"
    })
}


 static jwtverify(token : string ){
    
    return jwt.verify(token , config.jwt.secret)

 }

 

}

export default Securityutils