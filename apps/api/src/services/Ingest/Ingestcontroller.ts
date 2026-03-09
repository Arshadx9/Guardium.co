import type { NextFunction, Request, Response } from "express"
import { processHit } from "./Ingestservice.js"
import ResponseFormatter from "../../shared/Utils/Responseformatter.js"
export const ingestcontroller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { apiKey, endpoint, method, statusCode, latencyMs, ip, timestamp } = req.body

        await processHit(apiKey, endpoint, method, statusCode, latencyMs, ip, timestamp)

        res.status(200).json(ResponseFormatter.success(null, "Hit recorded"))

    } catch (error) {
        next(error)
    }
}