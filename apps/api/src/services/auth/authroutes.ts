import { Router } from "express";
import { Logincontroller, Registercontroller } from "./authcontroller.js";
import validate from "../../shared/middleware/validate.js";
import { loginSchema, registerSchema } from "./authschema.js";

const router = Router()

router.post('/register',   validate(registerSchema)  , Registercontroller )
router.post("./login" , validate(loginSchema)     , Logincontroller)

export default router