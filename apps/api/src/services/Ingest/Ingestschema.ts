import { z } from "zod" 

export const ingestschema = z.object({

 apiKey : z.string().min(1),
 endpoint : z.string().min(1),
 method : z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
 statusCode : z.number().min(1),
 latencyMs : z.number().min(1),
 ip : z.string().min(1),
timestamp : z.string().min(1),

})