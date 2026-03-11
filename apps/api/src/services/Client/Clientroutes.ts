import { Router } from "express";
import { apikeycontroller } from "./Clientcontroller.js";
import { profilecontroller } from "./Clientcontroller.js";
import authenticate from "../../shared/middleware/authenticate.js";


const clientrouter = Router()

clientrouter.get('/getapikey' ,authenticate,  apikeycontroller )
clientrouter.get('/getprofile' ,authenticate, profilecontroller )

export default clientrouter