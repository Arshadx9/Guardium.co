
import type { NextFunction  , Response , Request} from "express"
import { gettotalhits , getHitsByEndpoint , getAvgLatency , getErrorRate } from "./Analyticservice.js"
import ResponseFormatter from "../../shared/Utils/Responseformatter.js"

export const totalhitscontroller = async (req : Request , res : Response  , next : NextFunction) => {

try{

const yourtotalhits = await  gettotalhits()

res.status(200).json(
    ResponseFormatter.success({
        yourhits : yourtotalhits
    }, "The total hits")
)

} catch(error){
    next(error)
}

}

export const HitsByEndpointcontroller = async (req : Request , res : Response  ,  next : NextFunction) => {

try{

const yourhitsbyend = await  getHitsByEndpoint()

res.status(200).json(
    ResponseFormatter.success({
        yourhits : yourhitsbyend
    }, "The hits by endpoint")
)

} catch(error){
    next(error)
}


}


export const AvgLatencycontroller = async (req : Request , res : Response  ,  next : NextFunction) => {

try{

const yourAvgLatency = await  getAvgLatency()

res.status(200).json(
    ResponseFormatter.success({
        yourlatency : yourAvgLatency
    }, "The avg latency")
)

} catch(error){
    next(error)
}


}

export const ErrorRatecontroller = async (req : Request , res : Response  , next : NextFunction) => {

try{

const yourErrorrate = await  getErrorRate()

res.status(200).json(
    ResponseFormatter.success({
        yourrate  : yourErrorrate
    }, "The error rate ")
)

} catch(error){
    next(error)
}


}