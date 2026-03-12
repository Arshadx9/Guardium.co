import { Resend } from "resend"
import config from "../../shared/config/index.js"
import logger from "../../shared/config/logger.js"
import apihit from "../../shared/models/apihits.js"


const resend = new Resend(config.resend.apiKey)

let lasterrorsent : number | null = null 
let lastlatsent : number | null = null 
const COOLDOWN = 60 * 60 * 1000 

export const Checknotify = async (hitData : {
     endpoint: string
    statusCode: number
    latencyMs: number
    ip: string
    timestamp: string
}) => {

try{
 
    if(hitData.latencyMs>500){
        if(!lastlatsent  || Date.now() - lastlatsent  > COOLDOWN  ){
            await resend.emails.send({
                 from: "alerts@yourdomain.com",
                    to: "owner@gmail.com",
                    subject: "Your API is running slow",
                    html: `<p>Endpoint <strong>${hitData.endpoint}</strong> responded in ${hitData.latencyMs}ms</p>`
            })
             lastlatsent =Date.now()
             logger.info("Latency email sent")
        }
    }

    const totalHits = await apihit.countDocuments()
        const errorHits = await apihit.countDocuments({ statusCode: { $gte: 400 } })
        const errorRate = (errorHits / totalHits) * 100

        if (errorRate > 10) {
            if (!lasterrorsent || Date.now() - lasterrorsent > COOLDOWN) {
                await resend.emails.send({
                    from: "alerts@yourdomain.com",
                    to: "owner@gmail.com",
                    subject: "Your API error rate is high",
                    html: `<p>Your API error rate is <strong>${errorRate.toFixed(2)}%</strong></p>`
                })
                lasterrorsent = Date.now()
                logger.info("Error rate alert email sent")
            }
        }



} catch(error){
       logger.error("Failed to send notification", error)
}

}

