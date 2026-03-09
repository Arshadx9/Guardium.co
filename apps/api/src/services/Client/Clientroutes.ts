import { Router } from "express";
import { apikeycontroller } from "./Clientcontroller.js";
import { profilecontroller } from "./Clientcontroller.js";
import authenticate from "../../shared/middleware/authenticate.js";


const router = Router()

router.get('/getapikey' ,authenticate,  apikeycontroller )
router.get('/getprofile' ,authenticate, profilecontroller )

export default router