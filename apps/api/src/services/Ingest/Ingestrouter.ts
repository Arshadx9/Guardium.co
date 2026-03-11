import { Router } from "express";
import { ingestcontroller } from "./Ingestcontroller.js";

const ingestrouter = Router()

ingestrouter.post("/hit" , ingestcontroller)

export default ingestrouter