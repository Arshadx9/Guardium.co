import { Router } from "express";
import { Logincontroller, Registercontroller } from "./authcontroller.js";
import validate from "../../shared/middleware/validate.js";
import { loginSchema, registerSchema } from "./authschema.js";

const authrouter = Router()

authrouter.post('/register',   validate(registerSchema)  , Registercontroller )
authrouter.post("./login" , validate(loginSchema)     , Logincontroller)

export default authrouter