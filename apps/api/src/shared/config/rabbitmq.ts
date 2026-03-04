import amqp from "amqplib"
import config from "./index.js"
import logger from "./logger.js"

class Rabbitmqconnection{

    private connection: amqp.Connection | null = null 
    private channel:amqp.Channel | null = null
    private isConnecting : boolean = false 

async connect(): Promise<amqp.Channel>{

if(this.channel){
    return this.channel
}

if(this.isConnecting){

await new Promise <void> ((resolve)=>{

const checkinterval = setInterval(()=>{
if(!this.isConnecting){
    clearInterval(checkinterval)
    resolve()
}
},100)

})

return this.channel!

}

}


}
