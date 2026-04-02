import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { Logincontroller, Registercontroller } from "./authcontroller.js";
import { completeOnboarding } from "./authservice.js";
import validate from "../../shared/middleware/validate.js";
import { loginSchema, registerSchema } from "./authschema.js";
import authenticate from "../../shared/middleware/authenticate.js";
import AppError from "../../shared/Utils/Apperror.js";
import ResponseFormatter from "../../shared/Utils/Responseformatter.js";
const authrouter = Router()

const completeOnboardingController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.userId) throw new AppError("Unauthorized", 401)
		await completeOnboarding(req.userId)
		res.status(200).json(ResponseFormatter.success(null, "Onboarding complete"))
	} catch (error) {
		next(error)
	}
}

authrouter.post('/register',   validate(registerSchema)  , Registercontroller )
authrouter.post("/login" , validate(loginSchema)     , Logincontroller)
authrouter.post("/complete-onboarding", authenticate, completeOnboardingController)

export default authrouter