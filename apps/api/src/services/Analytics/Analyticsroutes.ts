import { Router } from "express"
import authenticate from "../../shared/middleware/authenticate.js"
import { totalhitscontroller ,HitsByEndpointcontroller , AvgLatencycontroller ,ErrorRatecontroller} from "./Ananlyticscontroller.js"

const analrouter = Router()

analrouter.get("/totalhits" , authenticate , totalhitscontroller)
analrouter.get("/hitsbyend", authenticate , HitsByEndpointcontroller  )
analrouter.get("/avglatency" , authenticate ,AvgLatencycontroller )
analrouter.get("/errorrate" ,authenticate , ErrorRatecontroller)

export default analrouter