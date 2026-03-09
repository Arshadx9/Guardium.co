import { Router } from "express";
import { ingestcontroller } from "./Ingestcontroller.js";

const router = Router()

router.post("/hit" , ingestcontroller)

export default router